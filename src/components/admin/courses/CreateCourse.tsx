"use client";
import { useCreateCourseMutation } from "@/lib/features/courses/coursesApi";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CourseContent from "./CourseContent";
import CourseData from "./CourseData";
import CourseInformation from "./CourseInfo";
import CourseOptions from "./CourseOptions";
import CoursePreview from "./CoursePreview";

type Props = {};

interface CustomError {
  data?: {
    message?: string;
  };
}

const CreateCourse = (props: Props) => {
  const [createCourse, { isLoading, isSuccess, error }] =
    useCreateCourseMutation();
  const [active, setActive] = useState(0);

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    category: "",
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
      videoLength: 0,
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

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course created successfully");
      redirect("/admin/courses");
    }
    if (error) {
      const customError = error as CustomError;
      toast.error(customError?.data?.message || "An unexpected error occurred");
    }
  }, [isSuccess, error]);

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
      videoLength: courseContent.videoLength,
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
      categories: courseInfo.category,
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

  // Create Course
  const handleSubmitCourse = async () => {
    const data = courseData; 
    console.log(data)
    if (!isLoading) {
      await createCourse(data);
    }
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
          />
        )}
      </div>
      <div className="w-[20%] fixed top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
