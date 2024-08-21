import CoursePlayer from "@/components/admin/courses/CoursePlayer";
import { styles } from "@/styles/style";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useState } from "react";

type Props = {
  course: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
};

const CourseContentMedia = ({
  course,
  id,
  activeVideo,
  setActiveVideo,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  return (
    <div className="w-[90%] 800px:w-[86%] py-4 m-auto sticky top-10">
      <CoursePlayer
        title={course[activeVideo]?.title}
        videoUrl={course[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <ArrowBack /> Previous Lession
        </div>
        <div
          className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${
            course?.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              course && course.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          <ArrowForward /> Next Lession
        </div>
      </div>
      <h2 className="pt-2 text-2xl font-[600] dark:text-white">
        {course[activeVideo]?.title}
      </h2>

      <br />
      <div className="p-4 mb-5">
        <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner mb-2">
          {["Overview", "Resource", "Q&A", "Reviews"].map((text, index) => (
            <h5
              key={index}
              className={`800px:text-lg cursor-pointer  ${
                activeBar === index ? "text-red-500" : "dark:text-white"
              }`}
              onClick={() => setActiveBar(index)}
            >
              {text}
            </h5>
          ))}
        </div>
        <div className="">
          {activeBar === 0 && (
            <p className="text-lg whitespace-pre-line dark:text-white">
              {course[activeVideo]?.description}
            </p>
          )}
          {activeBar === 1 && (
            <div className="text-lg whitespace-pre-line dark:text-white">
              {course[activeVideo]?.links.map((item: any, index: number) => (
                <div key={index}>
                  <h3 className="mb-3">{item.title}</h3>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.url}
                  </a>
                </div>
              ))}
            </div>
          )}
          {activeBar === 2 && (
            <div className="text-lg whitespace-pre-line dark:text-white opacity-60 text-center">
              Nothing yet
            </div>
          )}
          {activeBar === 3 && (
            <div className="text-lg whitespace-pre-line dark:text-white opacity-60 text-center">
              Nothing yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseContentMedia;
