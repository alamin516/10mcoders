import DashboardAnalytics from "@/components/admin/Analytics/DashboardAnalytics";
import Heading from "@/utils/Heading";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Heading title="Admin - Dot Learning" description="" keywords="" />
      <DashboardAnalytics/>
    </div>
  );
};

export default page;
