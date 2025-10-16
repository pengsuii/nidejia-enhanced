import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api',
    prepareHeaders: async (headers)=>{
        const session = await getSession();
        if (session?.user.token) {
            headers.set("Authorization", `Bearer ${session.user.token}`)
        }
        headers.set('Accept', 'application/json');
        return headers;
    },
});

// Enhanced base query with error handling
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);
    
    // Log error details for debugging
    if (result.error) {
        console.error('API Error Details:', {
            status: result.error.status,
            data: result.error.data,
            url: args.url,
            method: args.method || 'GET'
        });
    }
    
    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});