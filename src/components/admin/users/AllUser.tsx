"use client";
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
import DeleteUser from "./DeleteUser";

type Props = {};

const AllUsers = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const { data, isLoading, error, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [userId, setUserId] = useState("");
  const [active, setActive] = useState(false);
  const [deleteUser, { error: deleteError, isSuccess }] =
    useDeleteUserMutation();

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("User deleted successfully");
      setActive(false);
    }
    if (deleteError) {
      const errorMessage = deleteError as any;
      toast.error(errorMessage.data.message);
    }
  }, [isSuccess, deleteError, refetch]);

  const handleDeleteUser = async () => {
    const id = userId;
    await deleteUser(id);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "User Name", flex: 0.5 },
    { field: "email", headerName: "email", flex: 1 },
    { field: "role", headerName: "Role", flex: 0.3 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.3,
      renderCell: (params: any) => {
        return (
          <Button
            onClick={() => {
              setActive(!active);
              setUserId(params.row.id);
            }}
          >
            <Delete
              className={theme === "dark" ? "text-white" : "text-black"}
            />
          </Button>
        );
      },
    },
    {
      field: "  ",
      headerName: "Mail",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <a href={`mailto:${params.row.email}`}>
            <Email className={theme === "dark" ? "text-white" : "text-black"} />
          </a>
        );
      },
    },
  ];

  const rows: any = [];

  if (data) {
    data.payload.users.forEach((item: any) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        created_at: format(item.createdAt),
      });
    });
  }

  return (
    <div className="mt-10">
      <Box m="20px">
        <div className="w-full flex justify-between items-center">
          <h1 className={`text-xl font-medium dark:text-white`}>All users</h1>
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
      {active && (
        <DeleteUser
          active={active}
          setActive={setActive}
          handleDeleteUser={handleDeleteUser}
        />
      )}
    </div>
  );
};

export default AllUsers;
