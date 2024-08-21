"use client";
import { Person } from "@mui/icons-material";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const yearlySalesData = [
  { month: "January", sales: 24000 },
  { month: "February", sales: 13980 },
  { month: "March", sales: 98000 },
  { month: "April", sales: 39080 },
  { month: "May", sales: 48000 },
  { month: "June", sales: 38000 },
  { month: "July", sales: 43000 },
  { month: "August", sales: 47000 },
  { month: "September", sales: 30000 },
  { month: "October", sales: 60000 },
  { month: "November", sales: 75000 },
  { month: "December", sales: 90000 },
];

type Props = {};

const Stats = (props: Props) => {
  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Column 1 */}
      <div className="grid grid-cols-2 gap-8 !font-Poppins">
        <div className="bg-white rounded-lg shadow-lg p-8 h-[220px] border">
          <div className="text-2xl font-bold mb-2">7</div>
          <div className="text-gray-400 font-medium text-sm">
            Total Customer
          </div>
          <div className="mt-4">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="text-gray-700 text-sm">Top Customers</div>
            </div>
            <div className="flex">
              <div className="w-10 h-10 rounded-full border border-white shadow-sm bg-gray-200 flex items-center justify-center">
                <Person />
              </div>
              <div className="w-10 h-10 rounded-full border border-white shadow-sm bg-gray-200 flex items-center justify-center -ml-3">
                <Person />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8 h-[220px] border">
          <div className="text-2xl font-bold mb-2">297</div>
          <div className="text-gray-400 font-medium text-sm">
            Total Products
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>{" "}
                <h5>Inhouse Products</h5>
              </div>
              <div className="w-10 text-center">297</div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>{" "}
                <h5>Sellers Products</h5>
              </div>
              <div className="w-10 text-center">0</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8 h-[220px] border">
          <div className="text-2xl font-bold mb-2">66</div>
          <div className="text-gray-400 font-medium text-sm">
            Total Category
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8 h-[220px] border">
          <div className="text-2xl font-bold mb-2">77</div>
          <div className="text-gray-400 font-medium text-sm">Total Brands</div>
          <div className="mt-4">
            <div className="flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="text-gray-500 mt-2">Top Brands</div>
          </div>
        </div>
      </div>
      {/* Column 2 */}
      <div className="grid grid-cols-2 gap-8">
        {/* Grid */}
        <div className="bg-white rounded-lg shadow-lg p-8 h-[470px] border">
          <div className="text-2xl font-bold mb-2">0</div>
          <div className="text-gray-400 font-medium text-sm">Total Sales</div>
          <div className="mt-4">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 flex items-center">
              Sales this month
              <span className="ml-2 font-Poppins">$0.00</span>
            </div>
            <div className="text-gray-500 mt-2 mb-3">Sales Stat</div>
            <div className="flex items-center mt-4">
              <div style={{ width: "100%", height: "137px" }}>
                <ResponsiveContainer>
                  <LineChart data={yearlySalesData}>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="month" style={{ fontSize: "10px" }} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#82ca9d"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>{" "}
                <h5>In-house Sales</h5>
              </div>
              <div className="w-10 text-center font-Poppins">$0.00</div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>{" "}
                <h5>Sellers Sales</h5>
              </div>
              <div className="w-10 text-center font-Poppins">$0.00</div>
            </div>
          </div>
        </div>
        {/* Grid 4 */}
        <div className="bg-white rounded-lg shadow-lg p-8 h-[470px] border">
          <div className="text-2xl font-bold mb-2">3</div>
          <div className="text-gray-400 font-medium text-sm">Total sellers</div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="w-4 h-4 rounded-full bg-red-500 mr-2"></span>{" "}
                <h5>Pending Seller</h5>
              </div>
              <div className="w-10 text-center">3</div>
            </div>
            <div className="flex items-center mb-2 mt-4">
              <span className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></span>{" "}
              <h5>Top Sellers</h5>
            </div>
            <div className="mt-4">
              <button className="bg-green-100 hover:bg-green-200 text-gray-700 font-bold py-2 px-4 rounded-md">
                All Sellers
              </button>
              <button className="bg-red-100 hover:bg-red-200 text-gray-700 font-bold py-2 px-4 rounded-md mt-2">
                Pending Sellers
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
