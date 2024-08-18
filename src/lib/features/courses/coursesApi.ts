import { apiSlice } from "../api/apiSlice";

export const courseAPi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "course/create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),

    getAllCourses: builder.query({
      query: () => ({
        url: "all-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),

    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),

    // Users
    getCourses: builder.query({
      query: () => ({
        url: "courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getSingleCourse: builder.query({
      query: ({ id }) => ({
        url: `course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getCourseContent: builder.query({
      query: (id) => ({
        url: `course-content/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetCoursesQuery,
  useGetSingleCourseQuery,
  useGetCourseContentQuery,
} = courseAPi;
