import CoursePlayer from "@/components/admin/courses/CoursePlayer";
import Skeleton from "@/components/common/Skeleton";
import { styles } from "@/styles/style";
import React from "react";

type Props = {
  course: any;
  isLoading: boolean;
};

const CourseInfo: React.FC<Props> = ({ course, isLoading }) => {
  return (
    <>
      <CoursePlayer videoUrl={course?.demoUrl} title={course?.title} />
      <div className="p-5">
        <div className="flex items-center space-x-4">
          <p className="text-xl my-3">
            {isLoading ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <>{course?.price === 0 ? "Free" : <>${course?.price}</>}</>
            )}
          </p>
          {course?.estimatedPrice && course?.price !== 0 && (
            <p className="text-lg text-gray-500 dark:text-gray-400 line-through">
              {course?.estimatedPrice === course?.price ? (
                ""
              ) : (
                <>
                  {isLoading ? (
                    <Skeleton className="h-8 w-full mb-6" />
                  ) : (
                    `$${course?.estimatedPrice}`
                  )}
                </>
              )}
            </p>
          )}
        </div>
        <div className="mt-6">
          <button className={`${styles.button} !rounded-none cursor-pointer`}>
            Enroll Now
          </button>
        </div>
      </div>
    </>
  );
};

export default CourseInfo;
