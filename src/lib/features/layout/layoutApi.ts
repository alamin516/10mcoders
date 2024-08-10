import { apiSlice } from "./../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Hero Data Start
    getHeroData: builder.query({
      query: (type) => ({
        url: `get-layout/${type}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    // Get Hero Data End
    // Edit Hero Data Start
    editLayoutData: builder.mutation({
      query: ({type, title, subTitle, subTitle2, url, url_text, faq, categories}) => ({
        url: `edit-layout`,
        method: "PUT",
        body: {
            type,
            title,
            subTitle,
            subTitle2,
            url,
            url_text,
            faq,
            categories
        },
        credentials: "include" as const,
      }),
    }),
    // Edit Hero Data End
  }),
});

export const { useGetHeroDataQuery, useEditLayoutDataMutation } = layoutApi;
