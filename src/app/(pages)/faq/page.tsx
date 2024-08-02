import SimpleLayout from "@/components/master/SimpleLayout";
import Heading from "@/utils/Heading";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <Heading
        title={`FAQ`}
        description="This is a learning platform for beginner"
        keywords="Programming, React, JavaScript"
      />

      <SimpleLayout>
        <div className="min-h-[calc(100vh-80px)] w-full flex justify-center items-center">
          <h2 className="text-2xl dark:text-white">FAQ</h2>
        </div>
      </SimpleLayout>
    </>
  );
};

export default page;
