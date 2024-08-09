import { apiSlice } from './../api/apiSlice';

export const layoutApi = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getHeroData: builder.query({
            query: (type) =>({
                url: `get-layout/${type}`,
                method: 'GET',
                credentials: 'include' as const
            })
        })
        // Get Hero Data End



    })
})



export const {useGetHeroDataQuery} = layoutApi;
