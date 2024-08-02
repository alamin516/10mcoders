import AllUsers from "@/components/admin/users/AllUser";
import Heading from "@/utils/Heading";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Heading title="Users - Dot Learning" description="" keywords="" />
      <AllUsers/>
    </div>
  );
};

export default page;
