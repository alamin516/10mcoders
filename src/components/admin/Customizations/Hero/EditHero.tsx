"use client";
import {
  useEditLayoutDataMutation,
  useGetHeroDataQuery,
} from "@/lib/features/layout/layoutApi";
import { styles } from "@/styles/style";
import { PenIcon, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const EditHero: React.FC<Props> = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [subTitle2, setSubTitle2] = useState("");
  const [url, setUrl] = useState("");
  const [linkText, setLinkText] = useState("View Courses");

  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayoutData, { isSuccess, error }] = useEditLayoutDataMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner?.title || "");
      setSubTitle(data?.layout?.banner?.subTitle || "");
      setSubTitle2(data?.layout?.banner?.subTitle2 || "");
      setUrl(data?.layout?.banner?.url || "");
      setLinkText(data?.layout?.banner?.url_text || "");
      setImage(data?.layout?.banner?.image || "");
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Layout updated successfully");
    }
    if (error) {
      const errorMessage = (error as any)?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }
  }, [refetch, isSuccess, error]);

  const handleEdit = async () => {
    await editLayoutData({
      type: "Banner",
      title,
      subTitle,
      subTitle2,
      url,
      url_text: linkText
    });
  };

  const hasChanges =
    data?.layout?.banner?.title !== title ||
    data?.layout?.banner?.subTitle !== subTitle ||
    data?.layout?.banner?.subTitle2 !== subTitle2 ||
    data?.layout?.banner?.url !== url ||
    data?.layout?.banner?.url_text !== linkText ||
    data?.layout?.banner?.image !== image;

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="w-full 1000px:flex min-h-screen items-center justify-center relative">
      <div className="absolute top-[80px] 1000px:w-[700px] 1100px:w-[600px] w-full hero_animation -z-50"></div>
      <div className="1000px:w-[80%] 1500px:w-[100%] flex flex-col items-center 1000px:mt-0 text-center 1000px:text-center 800px:mt-[150px] mt-[75px] z-10">
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          rows={3}
          className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:!w-[55%] 800px:pt-[100px] bg-transparent border-none outline-none text-center resize-none"
        />
        <br />
        <textarea
          value={subTitle}
          rows={3}
          onChange={(e) => setSubTitle(e.target.value)}
          className="dark:text-white text-[#000000c7] text-[18px] font-[600] font-Josefin 1500px:!w-[30%] 1100px:!w-[50%] w-[80%] px-3 bg-transparent border-none outline-none text-center resize-none"
        />
        <br />
        <br />
        <div className="1500px:w-[40%] 1100px:w-[40%] w-[90%] h-[50px] bg-transparent relative px-3 -z-10">
          <input
            type="search"
            placeholder="Search Course......"
            className="bg-transparent border border-green-200 dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] p-2 w-full h-full outline-none text-green-300 dark:text-[#ffffffe5] text-xl font-medium font-Josefin rounded-l-[5px]"
          />
          <div className="absolute flex items-center justify-center w-[80px] cursor-pointer h-[50px] right-0 top-0 bg-green-600 rounded-r-[5px] shadow-lg">
            <Search className="text-white" />
          </div>
        </div>
        <br />
        <br />
        <div className="1500px:w-[60%] 1100px:w-[80%] w-full flex items-center justify-center px-3">
          <Image
            src={"/assets/images/hsp.webp"}
            alt="hero-image"
            width={50}
            height={50}
            className="rounded-full h-[50px] w-[50px] border-[2px] dark:border-white border-green-500"
          />
          <Image
            src={"/assets/images/hsp-1.webp"}
            alt="hero-image"
            width={50}
            height={50}
            className="rounded-full h-[50px] w-[50px] ml-[-20px] border-[2px] dark:border-white border-green-500"
          />
          <Image
            src={"/assets/images/hsp-2.webp"}
            alt="hero-image"
            width={50}
            height={50}
            className="rounded-full h-[50px] w-[50px] ml-[-20px] border-[2px] dark:border-white border-green-500"
          />

          <div className="flex justify-center items-center ml-2 relative">
            <p className="font-Josefin dark:text-green-200 text-[#000000b2] text-[18px] font-[600]">
              {subTitle2}{" "}
              <Link href={`/${url}`} className="text-green-600 cursor-pointer">
                {linkText}
              </Link>
            </p>
            <button
              onClick={handleToggleEdit}
              className="mt-2 ml-2  dark:text-white py-2 px-4 rounded"
            >
              <PenIcon />
            </button>

            {/*  */}
            {isEditing && (
              <div className="absolute dark:bg-slate-900 bg-white -top-40 right-0 1100px:!w-[500px] w-full p-4 rounded-md dark:text-white">
                <span className="font-Josefin dark:text-white  text-[18px] font-[600]">
                    Text:
                  </span>
                <textarea
                  value={subTitle2}
                  rows={2}
                  onChange={(e) => setSubTitle2(e.target.value)}
                  className="bg-transparent border border-green-200 border-none dark:placeholder:text-white h-full outline-none w-full text-center text-[18px] font-[600] resize-none"
                  placeholder="Add your subtitle here..."
                ></textarea>
                <div className="flex items-center mt-2">
                  <span className="font-Josefin text-[18px] font-[600]">
                    Edit Link:
                  </span>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="ml-2 bg-transparent border border-none dark:placeholder:text-[#ffffffdd] outline-none w-[60%] p-1 text-green-600 rounded"
                    placeholder="name"
                  />
                </div>
                <div className="flex items-center mt-2">
                  <span className="font-Josefin text-[18px] font-[600]">
                    Edit Link Text:
                  </span>
                  <input
                    type="text"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    className="ml-2 bg-transparent border-none  outline-none w-[60%] p-1 text-green-600 rounded"
                    placeholder="Enter Link Text"
                  />
                </div>
                <button
                  onClick={handleToggleEdit}
                  className="mt-3 bg-green-600 text-white py-2 px-4 rounded"
                >
                  ok
                </button>
              </div>
            )}
            {/*  */}
          </div>
        </div>
      </div>

      <div
        className={`fixed right-6 bottom-10 !w-20 !h-10 z-10 ${
          styles.button
        } dark:text-white text-black ${
          hasChanges ? "!cursor-pointer" : "!cursor-not-allowed"
        }`}
        onClick={hasChanges ? handleEdit : () => null}
      >
        update
      </div>
    </div>
  );
};

export default EditHero;
