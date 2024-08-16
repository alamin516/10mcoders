import Skeleton from "@/components/common/Skeleton";
import { OndemandVideo, PlayCircle } from "@mui/icons-material";
import React from "react";

type Props = {
  course: any;
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
  [key: string]: Video[];
};

const CourseContent: React.FC<Props> = ({ course, isLoading }) => {
  const [expandedSectionIndex, setExpandedSectionIndex] = React.useState<
    number | null
  >(null);

  const toggleSection = (index: number) => {
    setExpandedSectionIndex(expandedSectionIndex === index ? null : index);
  };

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
    <>
      <div>
        {isLoading ? (
          // Display Skeleton Loader when loading
          <>
            {[...Array(3)].map((_, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center justify-between cursor-pointer py-2">
                  <div className="flex items-center">
                    <Skeleton className="w-6 h-6 mr-2 rounded-full" />
                    <Skeleton className="h-6 w-48" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            ))}
          </>
        ) : (
          // Display the actual content when not loading
          Object.entries(groupedSections).map(
            ([sectionTitle, videos], index: number) => {
              const totalMinutes = videos?.reduce(
                (acc: number, video: Video) => acc + video.videoLength,
                0
              );

              const formattedDuration =
                totalMinutes >= 60
                  ? `${Math.floor(totalMinutes / 60)} hr ${(
                      totalMinutes % 60
                    ).toFixed(0)} min`
                  : `${totalMinutes.toFixed(0)} min`;

              return (
                <div key={index} className={`section ${expandedSectionIndex === index ? "border-b border-gray-200" : ""}`}>
                  <div
                    className={`flex items-center justify-between cursor-pointer py-4 px-6 border-b border-gray-200`}
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
                        {videos?.length} lectures {""}
                      {formattedDuration}
                    </div>
                  </div>
                  {expandedSectionIndex === index && (
                    <div className="px-6 py-4">
                      {videos?.map((video: Video, videoIndex: number) => (
                        <div
                          key={videoIndex}
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
            }
          )
        )}
      </div>
    </>
  );
};

export default CourseContent;
