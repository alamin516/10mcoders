"use client";
import { useLoadUserQuery } from "@/lib/features/api/apiSlice";
import { useGetCourseContentQuery } from "@/lib/features/courses/coursesApi";
import Heading from "@/utils/Heading";
import Loader from "@/utils/Loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CourseContentMedia from "./CourseContentMedia";

type Props = {
  id: string;
};

const CourseContents = ({ id }: Props) => {
  const { data: userData } = useLoadUserQuery("loadUser");
  const { data, isLoading, error } = useGetCourseContentQuery(id);
  const router = useRouter();
  const [activeVideo, setActiveVideo] = useState<number>(0);

  const course = data?.content;

  useEffect(() => {
    if (userData && data) {
      const user = userData?.user;
      const isEnrolled = user?.courses?.some(
        (item: any) => item.courseId === id
      );

      if (!isEnrolled || error) {
        router.push("/");
      }
    }
  }, [data, error, isLoading, userData, id, router]);

  const activeCourseVideo = course?.[activeVideo];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Heading
            title={activeCourseVideo?.title || "Course"}
            description={activeCourseVideo?.description || ""}
            keywords={activeCourseVideo?.tags || ""}
          />
          
          <div className="w-full grid 800px:grid-cols-10">
            <div className="col-span-7">
              <CourseContentMedia
                course={course}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseContents;
