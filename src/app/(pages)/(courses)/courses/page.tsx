import SimpleLayout from "@/components/master/SimpleLayout";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <SimpleLayout>
      <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center">
        <h2 className="text-2xl dark:text-white">Courses</h2>
      </div>
    </SimpleLayout>
  );
};

export default page;
