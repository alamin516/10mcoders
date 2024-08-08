"use client";
import { useCreateCourseMutation, useEditCourseMutation, useGetAllCoursesQuery } from "@/lib/features/courses/coursesApi";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CourseOptions from "../CourseOptions";
import CoursePreview from "../CoursePreview";
import CourseContent from "../CourseContent";
import CourseData from "../CourseData";
import CourseInformation from "../CourseInfo";

type Props = {
    id: string
};

interface CustomError {
  data?: {
    message?: string;
  };
}

const EditCourse:React.FC<Props> = ({id}) => {
  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: 0,
    estimatedPrice: 0,
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      title: "",
      description: "",
      videoUrl: "",
      videoSection: "Untitled Section",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);

  const [courseData, setCourseData] = useState({});
  const { data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [editCourse, {isSuccess, isLoading, error}] = useEditCourseMutation()

  useEffect(() => {
    if(isSuccess){
        toast.success("Course updated successfully")
        redirect("/admin/courses")
    }
    if(error){
        const errorMessage = error as any
        toast.error(errorMessage.data.message)
    }
  }, [isSuccess, error]);



  const editCourseData = data && data.payload.courses.find((i: any) => i._id === id);
  
  useEffect(() => {
    if(editCourseData){
        setCourseInfo({
            name: editCourseData.name,
            description: editCourseData.description,
            price: editCourseData.price,
            estimatedPrice: editCourseData?.estimatedPrice,
            tags: editCourseData.tags,
            level: editCourseData.level,
            demoUrl: editCourseData.demoUrl,
            thumbnail: editCourseData.thumbnail?.url,
        })
        setBenefits(editCourseData.benefits);
        setPrerequisites(editCourseData.prerequisites);
        setCourseContentData(editCourseData.courseData)
    }
  }, [editCourseData]);

  const handleSubmit = async () => {
    // Format benefits array
    const formatBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    // Format benefits array
    const formatPrerequisite = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    // format course content
    const formatCourseContentData = courseContentData.map((courseContent) => ({
      title: courseContent.title,
      videoUrl: courseContent.videoUrl,
      description: courseContent.description,
      videoSection: courseContent.videoSection,
      links: courseContent.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: courseContent.suggestion,
    }));

    // prepare course data object
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      thumbnail: courseInfo.thumbnail,
      totalVideos: courseContentData.length,
      benefits: formatBenefits,
      prerequisites: formatPrerequisite,
      courseData: formatCourseContentData,
    };

    setCourseData(data);
  };

  // Edit Course
  const handleSubmitCourse = async () => {
    const data = courseData; 
      await editCourse({id: editCourseData?._id, data});
  };

  return (
    <div className="w-full flex ">
      <div className="w-[80%] mt-18">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            active={active}
            setActive={setActive}
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
          />
        )}
        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleSubmitCourse={handleSubmitCourse}
            isEdit={true}
            isLoading={isLoading}
          />
        )}
      </div>
      <div className="w-[20%] fixed top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};


export default EditCourse