'use server'
import {FC} from "react";
import Heading from "../utils/Heading";
import Header from "@/components/common/Header";
import Hero from "@/components/client/Pages/Root/Hero";
import SimpleLayout from "@/components/master/SimpleLayout";
import Courses from "@/components/client/Pages/Courses/Courses";
import FAQ from "@/components/FAQ/FAQ";

interface Props {}

const Page: FC<Props> = (props) => {
  
  return (
    <SimpleLayout>
      <Heading
        title="Dot Learning"
        description="This is a learning platform for beginner"
        keywords="Programming, React, JavaScript"
      />
      <Hero/>
      <Courses/>
      <FAQ/>
    </SimpleLayout>
  );
};

export default Page;
