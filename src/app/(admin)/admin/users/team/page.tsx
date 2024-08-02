
import Team from "@/components/admin/users/Team";
import Heading from "@/utils/Heading";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Heading title="Users - Dot Learning" description="" keywords="" />
      <Team/>
    </div>
  );
};

export default page;
