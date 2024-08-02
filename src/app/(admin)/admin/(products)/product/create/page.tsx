import CreateCourse from "@/components/admin/courses/CreateCourse";
import Heading from "@/utils/Heading";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <Heading title="Create Course" description="" keywords="" />
      <CreateCourse />
    </>
  );
};

export default page;
