"use client";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/lib/features/user/userApi";
import { styles } from "@/styles/style";
import Loader from "@/utils/Loader";
import { Delete } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useTheme from "next-theme";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { format } from "timeago.js";
import CreateMember from "./CreateMember";
import DeleteUser from "./DeleteUser";

type Props = {};

const Team = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation();
  const { data, isLoading, error, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteUser, { error: deleteError, isSuccess: deleteSuccess }] =
    useDeleteUserMutation();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [userId, setUserId] = useState("");
  const [newUserData, setNewUserData] = useState({
    email: "",
    role: "",
  });

  useEffect(() => {
    if (updateError) {
      const erroeMessage = updateError as any;
      toast.error(erroeMessage.data.message);
    }
    if (isSuccess) {
      refetch();
      setOpen(false);
      toast.success("User role updated successfully");
      setNewUserData({
        email: "",
        role: "",
      });
    }

    if (deleteSuccess) {
      refetch();
      setActive(false);
      toast.success("User deleted successfully");
    }
    if (deleteError) {
      const errorMessage = deleteError as any;
      toast.error(errorMessage.data.message);
    }
  }, [updateError, isSuccess, refetch, deleteSuccess, deleteError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const user = { email: newUserData?.email, role: newUserData?.role };
      await updateUserRole(user);
    } catch (error: any) {
      console.log("Updating role error");
    }
  };

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
  ];

  const rows: any = [];
  {
    data &&
      data.payload.admin.forEach((item: any) => {
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
          <h1 className={`text-xl font-medium dark:text-white`}>
            Team Members
          </h1>
          <button
            onClick={(e) => setOpen(true)}
            className={`${styles.button} w-max  bg-green-500 border-white`}
          >
            Add New Member
          </button>
          {open && (
            <>
              <CreateMember
                newUserData={newUserData}
                setNewUserData={setNewUserData}
                setOpen={setOpen}
                handleSubmit={handleSubmit}
              />
            </>
          )}
          {active && (
            <DeleteUser
              active={active}
              setActive={setActive}
              handleDeleteUser={handleDeleteUser}
            />
          )}
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
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
                    theme === "dark"
                      ? "#f5f5f5!important"
                      : "#424242!important",
                  borderTop: "none",
                },
                "& .MuiCheckbox-root": {
                  color:
                    theme === "dark"
                      ? "#f5f5f5!important"
                      : "#424242!important",
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color:
                    theme === "dark"
                      ? "#f5f5f5!important"
                      : "#424242!important",
                },
              }}
            >
              <DataGrid checkboxSelection rows={rows} columns={columns} />
            </Box>
          </>
        )}
      </Box>
    </div>
  );
};

export default Team;
