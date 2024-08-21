import Skeleton from "@/components/common/Skeleton";
import { Circle, OndemandVideo, PlayCircle } from "@mui/icons-material";
import React from "react";

type Props = {
  course: any[];
  isLoading: boolean;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
};

type Video = {
  title: string;
  videoSection: string;
  videoLength: number;
  _id: string;
};

type GroupedSections = {
  [sectionTitle: string]: Video[];
};

const CourseContentList: React.FC<Props> = ({
  course,
  isLoading,
  activeVideo,
  setActiveVideo,
}) => {
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
      {Array.from({ length: 5 }).map((_, index) => (
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

  if (isLoading) {
    return <div>{renderSkeleton()}</div>;
  }

  if (!course || !course.length) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-300">
        No course content available.
      </div>
    );
  }

  const groupedSections = groupVideosBySection(course);

  return (
    <div className="w-[90%] 800px:w-[86%] p-4 m-auto mt-4 shadow-md rounded-sm">
      {Object.entries(groupedSections).map(
        ([sectionTitle, videos], sectionIndex) => {
          const totalMinutes = videos.reduce(
            (total, video) => total + video.videoLength,
            0
          );
          const formattedDuration =
            totalMinutes >= 60
              ? `${Math.floor(totalMinutes / 60)} hr ${totalMinutes % 60} min`
              : `${totalMinutes} min`;

          return (
            <div
              key={sectionTitle}
              className={`section ${
                expandedSectionIndex === sectionIndex
                  ? "border-b last:border-none border-gray-200"
                  : ""
              }`}
            >
              <div
                className="transition-all duration-300 flex items-center justify-between cursor-pointer py-4 px-6 border-b border-gray-200"
                onClick={() => toggleSection(sectionIndex)}
              >
                <div className="flex items-center">
                  <PlayCircle
                    className={`mr-2 transition-transform transform dark:text-white ${
                      expandedSectionIndex === sectionIndex ? "rotate-90" : ""
                    }`}
                  />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {sectionTitle}
                  </h3>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {videos.length} lectures{" "}
                  <Circle style={{ fontSize: "10px", margin: "0px 10px" }} />{" "}
                  {formattedDuration}
                </div>
              </div>
              {expandedSectionIndex === sectionIndex && (
                <div className="">
                  {videos.map((video, videoIndex) => {
                    const absoluteIndex =
                      sectionIndex * videos.length + videoIndex;
                    return (
                      <div
                        key={video._id}
                        className={`flex items-center justify-between px-6 py-2 text-sm ${
                          absoluteIndex === activeVideo ? "bg-slate-200" : "transition-all duration-300"
                        }`}
                        onClick={() => setActiveVideo(absoluteIndex)}
                      >
                        <div className="flex items-center">
                          <OndemandVideo className="mr-2 dark:text-white" />
                          <span>{video.title}</span>
                        </div>
                        <div>{video.videoLength} min</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }
      )}
    </div>
  );
};

export default CourseContentList;
