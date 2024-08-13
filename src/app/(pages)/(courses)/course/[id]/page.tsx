import SingleCourse from "@/components/client/Pages/Courses/SingleCourse";
import SimpleLayout from "@/components/master/SimpleLayout";
import React from "react";

type Props = {};

const page = ({params}: any) => {
  const courseId  = params?.id;

  return (
    <SimpleLayout>
        <SingleCourse courseId ={courseId}/>
    </SimpleLayout>
  );
};

export default page;
