'use client'
import Header from "@/components/common/Header";
import Heading from "@/utils/Heading";
import LightGradient from "@/utils/LightGradient";
import Link from "next/link";

type Props = {};

const NotFound = (props: Props) => {
  return (
    <>
    <Heading
        title={`Not Found - 404`}
        description=""
        keywords=""
      />
      <Header />
      <div className="w-full ">
        <LightGradient
          classes={
            "absolute top-[80px] min-h-[calc(100vh-80px)] w-full bg-gradient-to-l from-green-100 via-blue-50 to-white -z-10"

          }
        />

        <div className="w-full min-h-[calc(100vh-80px)] flex flex-col space-x-3 items-center justify-center">
          <h2 className="text-[45px] text-black dark:text-white font-Josefin mb-6">
            Not Found
          </h2>
          <p className="text-xl mb-5 dark:text-white">Could not find requested resource</p>
          <Link
            className="bg-green-500 text-white px-5 py-1 rounded-md"
            href="/"
          >
            Return Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
