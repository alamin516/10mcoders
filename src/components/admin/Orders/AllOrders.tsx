"use client";
import { useGetAllOrderQuery } from "@/lib/features/orders/ordersApi";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/lib/features/user/userApi";
import Loader from "@/utils/Loader";
import { Delete, Email } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useTheme from "next-theme";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { format } from "timeago.js";

type Props = {};

const AllOrders = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const { data, isLoading, error, refetch } = useGetAllOrderQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [active, setActive] = useState(false);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
  ];

  const rows: any = [];

  if (data) {
    data.payload.orders.forEach((item: any) => {
      rows.push({
        id: item._id,
        created_at: format(item.createdAt),
      });
    });
  }

  return (
    <div className="mt-10">
      <Box m="20px">
        <div className="w-full flex justify-between items-center">
          <h1 className={`text-xl font-medium dark:text-white`}>All Orders</h1>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <Box
            m="40px 0 0 0"
            height={"80vh"}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#f5f5f5" : "#424242",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#f5f5f5" : "#424242",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#f5f5f5" : "#424242",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #3e4396!important"
                    : "1px solid #e0e0e0!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#f5f5f5" : "#424242",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#f5f5f5" : "#424242",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#1f2a40" : "#f5f5f5",
                borderBottom: "none",
                color: theme === "dark" ? "#000" : "#424242",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1f2a40" : "#ffffff",
              },
              "& .MuiDataGrid-footerContainer": {
                color:
                  theme === "dark" ? "#f5f5f5!important" : "#424242!important",
                borderTop: "none",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? "#f5f5f5!important" : "#424242!important",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color:
                  theme === "dark" ? "#f5f5f5!important" : "#424242!important",
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
        )}
      </Box>
    </div>
  );
};

export default AllOrders;
