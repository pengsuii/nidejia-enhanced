import { apiSlice } from "./base-query";

export const transactionAPI = apiSlice.injectEndpoints({
    endpoints : (build) => ({
        checkAvailability: build.mutation({
            query: (payload) => ({
                url: "/transaction/is-available",
                method: "POST",
                body: payload,
            }),
        }),
        transaction: build.mutation({
            query: (payload) => ({
                url: "/transaction",
                method: "POST",
                body: payload,
            }),
        }),
        getTransactions: build.query({
            query: () => ({
                url: `/transaction`,
                method: "GET"
            }),
        }),
        getDetailTransaction: build.query({
            query: (id) => ({
                url: `/transaction/${id}`,
                method: "GET"
            })
        })
    }),
});

export const {useCheckAvailabilityMutation, useTransactionMutation, useGetDetailTransactionQuery, useGetTransactionsQuery} = transactionAPI;