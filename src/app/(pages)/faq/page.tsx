import FAQ from "@/components/FAQ/FAQ";
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
        <>
        <FAQ/>
        </>
      </SimpleLayout>
    </>
  );
};

export default page;
