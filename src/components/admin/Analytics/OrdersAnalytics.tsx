"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { useGetOrdersAnalyticsQuery } from "../../../lib/features/analytics/analyticsApi";

type Props = {
  isDashboard?: boolean
};

const OrdersAnalytics: React.FC<Props> = ({isDashboard}) => {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({});

  const analyticsData = data?.payload.order.last12Months.map((item: any) => ({
    name: item.month,
    count: item.count,
  })) || [];

  if (isLoading) {
    return <div className="w-full !min-h-[50vh] flex items-center justify-center ">
    <div className="flex items-center justify-center space-x-2">
      <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-150"></div>
      <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-300"></div>
    </div>
  </div>
  }

  return (
    <div className={`w-full ${isDashboard ? "w-full":"1100px:w-[80%]"} mx-auto h-[310px] p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md`}>
      <h2 className="text-lg font-semibold dark:text-white mb-4">User Analytics (Last 12 Months)</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={analyticsData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: '#00ff00' }} />
          <YAxis tick={{ fill: '#00ff00' }} />
          <Tooltip />
          <Bar dataKey="count" fill='#00ff00' barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersAnalytics;
