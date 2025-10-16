import { apiSlice } from "./base-query";

export const listingApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllListing: builder.query({
            query: (params: Record<string, any> = {}) => {
                const hasParams = params && Object.keys(params).length > 0;
                return {
                    url: hasParams ? "/listings" : "/listing",
                    method: "GET",
                    params: hasParams ? params : undefined,
                };
            },
        }),
        getDetailListing: builder.query({
            query: (slug: string) => ({
                url: `/listing/${slug}`,
                method: "GET",
            }),
        }),        
    }),
});

export const {useGetAllListingQuery, useGetDetailListingQuery} = listingApi;