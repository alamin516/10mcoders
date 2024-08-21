import DashboardAnalytics from "@/components/admin/Analytics/DashboardAnalytics";
import Stats from "@/components/admin/Stats";
import Heading from "@/utils/Heading";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Heading title="Admin - Dot Learning" description="" keywords="" />
      <Stats/>
    </div>
  );
};

export default page;
