'use server'
import {FC} from "react";
import Heading from "../utils/Heading";
import Header from "@/components/common/Header";
import Hero from "@/components/client/Pages/Root/Hero";
import SimpleLayout from "@/components/master/SimpleLayout";

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
    </SimpleLayout>
  );
};

export default Page;
