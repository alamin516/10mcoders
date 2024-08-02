import WavingHand from "@/components/admin/WavingHand";
import Heading from "@/utils/Heading";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Heading title="Admin - Dot Learning" description="" keywords="" />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <h2 className="text-3xl 800px:text-6xl dark:text-white text-center font-Poppins 800px:leading-[80px]"><WavingHand/> <br />Welcome to <br />Admin Dashboard</h2>
      </div>
    </div>
  );
};

export default page;
