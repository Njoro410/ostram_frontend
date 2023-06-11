import { apiSlice } from "../../app/api/apiSlice";

export const loanSlices = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLoanTypes: builder.query({
            query: () => ({
                url: "/loans/loan_types/",
                method: "GET"
            })
        }),

        getLoanStatus: builder.query({
            query: () => ({
                url: "/loans/loan_status/",
                method: "GET"
            })
        }),

        getAllLoans: builder.query({
            query: () => ({
                url: "/loans/all_loans/",
                method: "GET"
            })
        }),

    })
})


export const {
    useGetLoanTypesQuery,
    useGetLoanStatusQuery,
    useGetAllLoansQuery,
} = loanSlices