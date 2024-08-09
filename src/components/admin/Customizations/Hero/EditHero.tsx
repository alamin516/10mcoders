"use client";
import { useGetHeroDataQuery } from "@/lib/features/layout/layoutApi";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {};

const EditHero: React.FC<Props> = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const { data } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });


  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner.image);
    }
  }, [data]);


  return (
    <>
      <div className="w-full 1000px:flex min-h-screen items-center justify-center">
        <div className="absolute top-[80px] 1000px:w-[700px] 1100px:w-[600px] w-full hero_animation -z-50"></div>
        <div className="1000px:w-[80%] 1500px:w-[100%] flex flex-col items-center 1000px:mt-0 text-center 1000px:text-center 800px:mt-[150px] mt-[75px] z-10">
          <textarea
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:!w-[55%] 800px:pt-[100px] bg-transparent border-none outline-none text-center min-h"
          />
          <br />
          <textarea
            value={subTitle}
            onChange={(e)=> setSubTitle(e.target.value)}
            className="dark:text-white text-[#000000c7] text-[18px] font-[600] font-Josefin  1500px:!w-[30%] 1100px:!w-[40%] w-[78%] px-3 bg-transparent border-none outline-none text-center"
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
          <div className="1500px:w-[55%] 1100px:w-[78%] w-full flex items-center justify-center px-3">
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
            <p className="font-Josefin dark:text-green-200 text-[#000000b2] 1000px:pl-3 text-[18px] font-[600]">
              50k+ People already trusted us.{" "}
              <Link href={"/courses"} className="text-green-600 cursor-pointer">
                View Courses
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHero;
