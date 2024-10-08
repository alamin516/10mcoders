import Courses from "@/components/client/Pages/Courses/Courses";
import SimpleLayout from "@/components/master/SimpleLayout";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <SimpleLayout>
      <Courses/>
    </SimpleLayout>
  );
};

export default page;
