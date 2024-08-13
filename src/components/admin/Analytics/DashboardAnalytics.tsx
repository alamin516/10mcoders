"use client";
import { useGetOrdersAnalyticsQuery } from "@/lib/features/analytics/analyticsApi";
import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import OrdersAnalytics from "./OrdersAnalytics";

interface AnalyticsData {
  users: { month: string; count: number }[];
  visitors: { month: string; count: number }[];
  courses: { month: string; completed: number; started: number }[];
  posts: { month: string; count: number }[];
  categories: { name: string; value: number }[];
}

const DashboardAnalytics: React.FC = () => {
  const data: AnalyticsData = {
    users: [
      { month: "Jan", count: 400 },
      { month: "Feb", count: 300 },
    ],
    visitors: [
      { month: "Jan", count: 800 },
      { month: "Feb", count: 600 },
    ],
    courses: [
      { month: "Jan", completed: 20, started: 50 },
      { month: "Feb", completed: 15, started: 40 },
    ],
    posts: [
      { month: "Jan", count: 10 },
      { month: "Feb", count: 8 },
    ],
    categories: [
      { name: "Tech", value: 300 },
      { name: "Art", value: 200 },
    ],
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="dashboard-analytics p-4 space-y-6 dark:text-white">
      {/* Header */}
      <div className="header flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard Analytics</h1>
        {/* Add date picker or filters here */}
      </div>

      {/* Summary Cards */}
      <div className="summary-cards grid grid-cols-1 800px:grid-cols-2 1100px:grid-cols-4 gap-4">
        <div className="card bg-blue-500 text-white p-4 rounded">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl">1,234</p>
        </div>
        <div className="card bg-green-500 text-white p-4 rounded">
          <h2 className="text-lg font-semibold">Total Visitors</h2>
          <p className="text-2xl">2,567</p>
        </div>
        <div className="card bg-yellow-500 text-white p-4 rounded">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl">256</p>
        </div>
        <div className="card bg-orange-500 text-white p-4 rounded">
          <h2 className="text-lg font-semibold">Total Income</h2>
          <p className="text-2xl">$25,600</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Users Analytics */}
        <div className="analytics-section">
          <h2 className="text-xl font-semibold mb-2 text-center">
            Users Analytics
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.users}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Visitors Analytics */}
        <div className="analytics-section">
          <h2 className="text-xl font-semibold mb-2 text-center">
            Visitors Analytics
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.visitors}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Courses Analytics */}
      <div className="analytics-section grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bar-chart">
          <h2 className="text-xl font-semibold mb-2 text-center">
            Courses Completed vs Started
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.courses}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" fill="#8884d8" />
              <Bar dataKey="started" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="pie-chart">
          <h2 className="text-xl font-semibold mb-2 text-center">
            Course Categories
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.categories}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.categories.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="analytics-section grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Orders Analytics */}
        <div className="analytics-section">
          <OrdersAnalytics isDashboard={true}/>
        </div>

        {/* Posts Analytics */}
        <div className="analytics-section">
          <h2 className="text-xl font-semibold mb-2 text-center">
            Posts Analytics
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.posts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
