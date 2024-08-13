"use client";
import CoursePlayer from "@/components/admin/courses/CoursePlayer";
import { useGetSingleCourseQuery } from "@/lib/features/courses/coursesApi";
import Loader from "@/utils/Loader";
import Ratings from "@/utils/Ratings";
import { Group, PlayCircle, Share } from "@mui/icons-material";
import Image from "next/image";
import React from "react";

type Props = {
  courseId: string;
};

type Video = {
  title: string;
  videoSection: string;
  description: string;
  videoLength: number;
  _id: string;
};

type GroupedSections = {
  [key: string]: Video[];
};

const SingleCourse: React.FC<Props> = ({ courseId }) => {
  const { data, isLoading, isError } = useGetSingleCourseQuery({
    id: courseId,
  });

  const [expandedSectionIndex, setExpandedSectionIndex] = React.useState<
    number | null
  >(null);

  const toggleSection = (index: number) => {
    setExpandedSectionIndex(expandedSectionIndex === index ? null : index);
  };

  const course = data?.course;

  if (isLoading) return <Loader />;
  if (isError) return <p>Error loading course data.</p>;

  // Group videos by their section
  const groupedSections: GroupedSections = course?.courseData.reduce(
    (acc: any, video: any) => {
      if (!acc[video.videoSection]) {
        acc[video.videoSection] = [];
      }
      acc[video.videoSection].push(video);
      return acc;
    },
    {}
  );

  return (
    <div className="w-full 800px:w-[90%] 1100px:w-[1260px]  mx-auto p-6">
      {/* Course Overview */}
      <div className="course-overview flex flex-col lg:flex-row gap-6 mb-12 relative">
        <div className="course-thumbnail w-full lg:w-8/12">
          <CoursePlayer videoUrl={course?.demoUrl} title={course?.title} />

          {/* Course Content */}
          <div className="course-content bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-20">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Course Content
            </h2>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {Object.entries(groupedSections).map(
                ([sectionTitle, videos], index: number) => (
                  <div key={index} className="section mb-4">
                    <div
                      className="flex items-center justify-between cursor-pointer py-2"
                      onClick={() => toggleSection(index)}
                    >
                      <div className="flex items-center">
                        <PlayCircle
                          className={`mr-2 transition-transform transform dark:text-white ${
                            expandedSectionIndex === index ? "rotate-90" : ""
                          }`}
                        />
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                          {sectionTitle}
                        </h3>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {videos.reduce(
                          (acc, video) => acc + video.videoLength,
                          0
                        )}{" "}
                        min
                      </div>
                    </div>
                    {expandedSectionIndex === index && (
                      <div className="mt-2 pl-6">
                        {videos.map((video, videoIndex) => (
                          <div
                            key={videoIndex}
                            className="flex items-center justify-between py-2 text-sm text-gray-600 dark:text-gray-300"
                          >
                            <div className="flex items-center">
                              <PlayCircle className="mr-2 text-gray-400 dark:text-gray-500" />
                              <span>{video.title}</span>
                              {/* {video.isPreview && (
                          <span className="ml-2 text-blue-500 dark:text-blue-400">Preview</span>
                        )} */}
                            </div>
                            <div>{video.videoLength} min</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Instructor Section */}
          <div className="instructor-section mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Instructor
            </h2>
            <div className="flex items-center space-x-4">
              <div className="instructor-avatar w-16 h-16">
                <Image
                  src={
                    course?.instructor?.avatar || "/assets/images/hsp-1.webp"
                  }
                  alt={course?.instructor?.name || "Instructor Name"}
                  width={64}
                  height={64}
                  className="rounded-full w-16 h-16"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {course?.instructor?.name || "Instructor Name"}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {course?.instructor?.bio ||
                    "Instructor bio or details go here."}
                </p>
              </div>
            </div>
          </div>

          {/* Student Feedback */}
          <div className="student-feedback mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Student Feedback
            </h2>
            {/* Render student reviews here */}
          </div>
        </div>
        <div className="course-info w-full 1000px:w-4/12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {course?.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            {course?.description}
          </p>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center text-yellow-500 dark:text-yellow-400">
              <Ratings rating={course?.ratings} />
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Group className="mr-1" />
              <span>{course?.sold} students</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              ${course?.price === 0 ? "Free" : course?.price}
            </p>
            {course?.estimatedPrice && course?.price !== 0 && (
              <p className="text-lg text-gray-500 dark:text-gray-400 line-through">
                {course?.estimatedPrice === course?.price
                  ? ""
                  : `$${course?.estimatedPrice}`}
              </p>
            )}
          </div>
          <div className="mt-6">
            <button className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
              Enroll Now
            </button>
            <button className="ml-4 mt-10 text-blue-600 dark:text-blue-400 flex items-center">
              <Share className="mr-2" /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
