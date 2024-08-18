import AllOrders from "@/components/admin/Orders/AllOrders";
import Heading from "@/utils/Heading";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Heading title="Orders - Dot Learning" description="" keywords="" />
      <AllOrders/>
    </div>
  );
};

export default page;
