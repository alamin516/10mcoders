import { styles } from "@/styles/style";
import {
  AddCircleOutlineOutlined,
  AddLinkOutlined,
  DeleteOutlineOutlined,
  EditOutlined,
  KeyboardArrowDownOutlined,
} from "@mui/icons-material";
import React, { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: React.FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapsedToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updateData = [...courseContentData];
    updateData[index].links.splice(linkIndex, 1);
    setCourseContentData(updateData);
  };

  const handleAddLink = (index: number) => {
    const updateData = [...courseContentData];
    updateData[index].links.push({ title: "", url: "" });
    setCourseContentData(updateData);
  };

  const handleNewContent = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields");
    } else {
      let newVideoSection = "";

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleNext = () => {
    if (
      courseContentData[courseContentData.length - 1].title !== "" ||
      courseContentData[courseContentData.length - 1].description !== "" ||
      courseContentData[courseContentData.length - 1].videoUrl !== "" ||
      courseContentData[courseContentData.length - 1].links[0].title !== "" ||
      courseContentData[courseContentData.length - 1].links[0].url !== ""
    ) {
      setActive(active + 1);
      handleCourseSubmit();
    } else {
      toast.error("Please fill the empty fields to go to next");
    }
  };

  return (
    <div className="w-[80%] m-auto mt-5">
      <form onSubmit={handleSubmit}>
        {/* Start Section */}
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;
          return (
            <>
              <div key={index}
                className={`w-full dark:bg-gray-800 shadow-md dark:shadow-none p-4 ${
                  showSectionInput ? "mt-10" : "mb-0"
                } ${!isCollapsed ? "flex justify-between" : "flex-none"}`}
              >
                {showSectionInput && (
                  <>
                    {/* Start Section Title */}
                    <div className="flex justify-between items-center">
                      <div className={"flex w-full items-center"}>
                        <input
                          type="text"
                          value={item.videoSection}
                          onChange={(e) => {
                            const updateData = courseContentData.map((content: any, i: number) => 
                              i === index 
                                ? { ...content, videoSection: e.target.value }
                                : content
                            );
                            setCourseContentData(updateData);
                          }}
                          className={`text-base ${
                            item.videoSection === "Untitled Section"
                              ? "w-[180px]"
                              : "w-min"
                          } font-Poppins dark:text-white bg-transparent outline-none`}
                        />
                        <EditOutlined className="cursor-pointer dark:text-white" />
                      </div>
                    </div>
                  </>
                )}
                <div className="relative">
                  {/* Arrow button for collapsed video content */}
                  <div
                    className={`${
                      isCollapsed ? "absolute right-0" : "absolute right-0"
                    }`}
                  >
                    <DeleteOutlineOutlined
                      className={`dark:text-white text-[20px] mr-2 ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updateData = [...courseContentData];
                          updateData.splice(index, 1);
                          setCourseContentData(updateData);
                        }
                      }}
                    />

                    <KeyboardArrowDownOutlined
                      className="dark:text-white"
                      style={{
                        transform: isCollapsed[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                      onClick={() => handleCollapsedToggle(index)}
                    />
                  </div>
                  {/* Collapsed Title */}
                  <div className={`flex w-full items-center my-0`}>
                    {isCollapsed[index] ? (
                      <>
                        {item.title ? (
                          <p className="font-Poppins dark:text-white">
                            {index + 1}. {item.title}
                          </p>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  {!isCollapsed[index] && (
                    <>
                      {/* Video Title */}
                      <div className="mb-3">
                        <label className={`${styles.label}`}>Video Title</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const updateData = courseContentData.map((content: any, i: number) => 
                              i === index 
                                ? { ...content, title: e.target.value }
                                : content
                            );
                            setCourseContentData(updateData);
                          }}
                          className={`text-base ${styles.input}`}
                          placeholder="Video title ....."
                        />
                      </div>
                      {/* Video URl */}
                      <div className="mb-3">
                        <label className={`${styles.label}`}>Video URL</label>
                        <input
                          type="text"
                          value={item.videoUrl}
                          onChange={(e) => {
                            const updateData = courseContentData.map((content: any, i: number) => 
                              i === index 
                                ? { ...content, videoUrl: e.target.value }
                                : content
                            );
                            setCourseContentData(updateData);
                          }}
                          className={`text-base ${styles.input}`}
                          placeholder="Video url ....."
                        />
                      </div>
                      {/* Video Description */}
                      <div className="mb-3">
                        <label className={`${styles.label}`}>
                          Video description
                        </label>
                        <textarea
                          rows={6}
                          cols={30}
                          value={item.description}
                          onChange={(e) => {
                            const updateData = courseContentData.map((content: any, i: number) => 
                              i === index 
                                ? { ...content, description: e.target.value }
                                : content
                            );
                            setCourseContentData(updateData);
                          }}
                          className={`text-base ${styles.input} !h-min`}
                          placeholder="Video description....."
                        />
                      </div>

                      {/* Links */}
                      {item?.links.map((link: any, linkIndex: number) => (
                        <div key={linkIndex} className="mb-3 block">
                          <div className="w-full flex items-center justify-between">
                            <label className={`${styles.label}`}>
                              Link {linkIndex + 1}
                            </label>
                            <DeleteOutlineOutlined
                              className={`dark:text-white text-[20px] mr-2 ${
                                linkIndex > 0
                                  ? "cursor-pointer"
                                  : "cursor-no-drop"
                              }`}
                              onClick={() => {
                                linkIndex === 0
                                  ? null
                                  : handleRemoveLink(index, linkIndex);
                              }}
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="Source Code ... (Link title)"
                            className={`${styles.input}`}
                            value={link?.title}
                            onChange={(e) => {
                              const updateData = courseContentData.map((content: any, i: number) => 
                                i === index 
                                  ? { 
                                      ...content, 
                                      links: content.links.map((l: any, li: number) => 
                                        li === linkIndex 
                                          ? { ...l, title: e.target.value }
                                          : l
                                      )
                                    }
                                  : content
                              );
                              setCourseContentData(updateData);
                            }}
                          />
                          <input
                            type="url"
                            placeholder="Source Code ... (Link URL)"
                            className={`${styles.input}`}
                            value={link?.url}
                            onChange={(e) => {
                              const updateData = courseContentData.map((content: any, i: number) => 
                                i === index 
                                  ? { 
                                      ...content, 
                                      links: content.links.map((l: any, li: number) => 
                                        li === linkIndex 
                                          ? { ...l, url: e.target.value }
                                          : l
                                      )
                                    }
                                  : content
                              );
                              setCourseContentData(updateData);
                            }}
                          />
                        </div>
                      ))}

                      {/*Start Add New Link and Title */}
                      <div className="inline-block mb-3">
                        <p
                          className="flex items-center text-lg dark:text-white text-black cursor-pointer"
                          onClick={(e) => handleAddLink(index)}
                        >
                          <AddLinkOutlined className="mr-2" /> Add Link
                        </p>
                      </div>
                      {/*End Add New Link and Title */}
                    </>
                  )}
                  {/* Add new content */}
                  {index === courseContentData.length - 1 && (
                    <div className="mt-4">
                      <p
                        className="flex items-center text-lg dark:text-white text-black cursor-pointer"
                        onClick={(e) => handleNewContent(item)}
                      >
                        <AddCircleOutlineOutlined className="mr-2" /> Add New
                        Content
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          );
        })}
        {/* End Section */}

        {/* Add New Section */}
        <div
          className="flex items-center justify-end mt-4 text-xl dark:text-white text-black cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AddCircleOutlineOutlined className="mr-2" /> Add New Section
        </div>

        {/* Prev and Next Button */}
        <div className="mt-4 flex items-center justify-between">
          <div
            className="w-full 800px:w-[180px] bg-green-500 rounded-md text-center py-2 cursor-pointer"
            onClick={prevButton}
          >
            Previous
          </div>
          <div
            className="w-full 800px:w-[180px] bg-green-500 rounded-md text-center py-2 text-white cursor-pointer"
            onClick={handleNext}
          >
            Next
          </div>
        </div>
      </form>
    </div>
  );
};

export default CourseContent;
