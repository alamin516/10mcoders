"use client";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/lib/features/courses/coursesApi";
import Loader from "@/utils/Loader";
import { Delete, Edit } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useTheme from "next-theme";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { format } from "timeago.js";
import DeleteCourseModal from "./DeleteCourseModal";
import Link from "next/link";

type Props = {};

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const { data, isLoading, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [courseDelete, { isSuccess, error }] = useDeleteCourseMutation();
  const [courseId, setCourseId] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Course deleted successfully!");
      setOpen(false);
    }
    if (error) {
      const errorMessage = error as any;
      toast.error(errorMessage.data.message);
    }
  }, [refetch, isSuccess, error]);

  const handleDelete = async () => {
    const id = courseId;
    await courseDelete(id);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.4 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "price", headerName: "Course Price", flex: 0.3 },
    { field: "ratings", headerName: "Ratings", flex: 0.3 },
    { field: "purchased", headerName: "Purchased", flex: 0.4 },
    { field: "created_at", headerName: "Create At", flex: 0.5 },
    {
      field: "  ",
      headerName: "Edit",
      flex: 0.3,
      renderCell: (params: any) => {
        return (
          <Link href={`/admin/edit-course/${params.row.id}`}>
            <Edit className={theme === "dark" ? "text-white" : "text-black"} />
          </Link>
        );
      },
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.4,
      renderCell: (params: any) => {
        return (
          <Button
            onClick={() => {
              setCourseId(params.row.id);
              setOpen(true);
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
      data.payload.courses.forEach((item: any) => {
        rows.push({
          id: item._id,
          title: item.name,
          price: `$${item.price}`,
          ratings: item.ratings,
          purchased: item.sold,
          created_at: format(item.createdAt),
        });
      });
  }

  return (
    <div className="mt-10">
      <Box m="20px">
      <div className="w-full flex justify-between items-center">
          <h1 className={`text-xl font-medium dark:text-white`}>All courses</h1>
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
      {open && (
        <DeleteCourseModal
          open={open}
          setOpen={setOpen}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default AllCourses;
