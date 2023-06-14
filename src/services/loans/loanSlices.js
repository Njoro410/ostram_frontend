import { apiSlice } from "../../app/api/apiSlice";

export const loanSlices = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoanTypes: builder.query({
      query: () => ({
        url: "/loans/loan_types/",
        method: "GET",
      }),
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

    getMemberLoans: builder.query({
      query: (mbr_no) => ({
        url: `/loans/member_loans/${mbr_no}/`,
        method: "GET",
      }),
    }),

    getLoanDocuments: builder.query({
      query: (loan_id) => ({
        url: loan_id ? `/loans/loan_documents/${loan_id}/` : `/loans/loan_documents/`,
        method: "GET",
      }),
    }),

    getLoanDocumentsTypes: builder.query({
      query: (document_id) => ({
        url: document_id ? `/loans/loan_document_types/${document_id}/` : `/loans/loan_document_types/`,
        method: "GET",
      }),
    }),

  })
})


export const {
  useGetLoanTypesQuery,
  useGetLoanStatusQuery,
  useGetAllLoansQuery,
  useGetMemberLoansQuery,
  useLazyGetLoanDocumentsQuery,
  useGetLoanDocumentsTypesQuery
} = loanSlices

