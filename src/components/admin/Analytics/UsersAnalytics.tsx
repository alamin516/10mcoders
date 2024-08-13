"use client";
import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetUsersAnalyticsQuery } from "../../../lib/features/analytics/analyticsApi";

type Props = {
  isDashboard?: boolean;
};

const UsersAnalytics: React.FC<Props> = (isDashboard) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({});

  const analyticsData =
    data?.payload?.user?.last12Months.map((item: any) => ({
      name: item.month,
      count: item.count,
    })) || [];

  if (isLoading) {
    return (
      <div className="w-full !min-h-[50vh] flex items-center justify-center ">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-150"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full ${
        isDashboard ? "w-full" : "1100px:w-[80%]"
      } mx-auto h-[310px] p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md`}
    >
      <h2 className="text-lg font-semibold dark:text-white mb-4">
        Order Analytics (Last 12 Months)
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={analyticsData}
          margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00ff00" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00ff00" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" tick={{ fill: "#00ff00" }} hide />
          <YAxis tick={{ fill: "#00ff00" }} hide />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#00ff00"
            fillOpacity={1}
            fill="url(#colorArea)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsersAnalytics;
