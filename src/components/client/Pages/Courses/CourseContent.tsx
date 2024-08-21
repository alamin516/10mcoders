import Skeleton from "@/components/common/Skeleton";
import { Circle, OndemandVideo, PlayCircle } from "@mui/icons-material";
import React from "react";

type Props = {
  course: {
    courseData: Video[];
  } | null;
  isLoading: boolean;
  
};

type Video = {
  title: string;
  videoSection: string;
  description: string;
  videoLength: number;
  _id: string;
};

type GroupedSections = {
  [sectionTitle: string]: Video[];
};

const CourseContent: React.FC<Props> = ({ course, isLoading }) => {
  const [expandedSectionIndex, setExpandedSectionIndex] = React.useState<
    number | null
  >(null);

  const toggleSection = (index: number) => {
    setExpandedSectionIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  };

  const groupVideosBySection = (videos: Video[]): GroupedSections => {
    return videos.reduce<GroupedSections>((sections, video) => {
      const { videoSection } = video;
      if (!sections[videoSection]) {
        sections[videoSection] = [];
      }
      sections[videoSection].push(video);
      return sections;
    }, {});
  };

  const renderSkeleton = () => (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center justify-between cursor-pointer py-4 px-6">
            <div className="flex items-center">
              <Skeleton className="w-6 h-6 mr-2 rounded-full" />
              <Skeleton className="h-6 w-48" />
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      ))}
    </>
  );

  const renderVideoSection = (
    sectionTitle: string,
    videos: Video[],
    index: number
  ) => {
    const totalMinutes = videos.reduce(
      (total, video) => total + video.videoLength,
      0
    );

    const formattedDuration =
      totalMinutes >= 60
        ? `${Math.floor(totalMinutes / 60).toFixed(0)} hr ${(totalMinutes % 60).toFixed(
            0
          )} min`
        : `${totalMinutes.toFixed(0)} min`;

    return (
      <div
        key={sectionTitle}
        className={`section ${
          expandedSectionIndex === index ? "border-b border-gray-200" : ""
        }`}
      >
        <div
          className="transition-all duration-300 flex items-center justify-between cursor-pointer py-4 px-6 border-b border-gray-200"
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
            {videos.length} lectures {""}<Circle style={{fontSize: "10px", margin: "0px 10px"}}/> {""} {formattedDuration}
          </div>
        </div>
        {expandedSectionIndex === index && (
          <div className="px-6 py-4 transition-all duration-300">
            {videos.map((video) => (
              <div
                key={video._id}
                className="flex items-center justify-between py-2 text-sm text-gray-600 dark:text-gray-300"
              >
                <div className="flex items-center">
                  <OndemandVideo className="mr-2 text-gray-400 dark:text-gray-500" />
                  <span>{video.title}</span>
                </div>
                <div>{video.videoLength} min</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return <div>{renderSkeleton()}</div>;
  }

  if (!course || !course.courseData.length) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-300">
        No course content available.
      </div>
    );
  }

  const groupedSections = groupVideosBySection(course.courseData);

  return (
    <div>
      {Object.entries(groupedSections).map(([sectionTitle, videos], index) =>
        renderVideoSection(sectionTitle, videos, index)
      )}
    </div>
  );
};

export default CourseContent;
