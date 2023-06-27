import { apiSlice } from "../../app/api/apiSlice";

export const loanSlices = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoanTypes: builder.query({
      query: () => ({
        url: "/loans/loan_types/",
        method: "GET",
      }),
    }),

    createLoanProduct: builder.mutation({
      query: credentials => ({
        url: "/loans/loan_types/",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json"
        }
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

    getDocumentStatus: builder.query({
      query: () => ({
        url: "/loans/loan_document_status/",
        method: "GET"
      })
    }),

    createLoanDocumentType: builder.mutation({
      query: credentials => ({
        url: "/loans/loan_document_types/",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json"
        }
      })
    }),

    getLoanAssets: builder.query({
      query: (loan_id) => ({
        url: loan_id ? `/assets/loan_assets/${loan_id}/` : `/assets/loan_assets/`,
        method: "GET",
      }),
    }),

    getLoanAssetDocuments: builder.query({
      query: (asset_id) => ({
        url: asset_id ? `/assets/loan_asset_document/${asset_id}/` : `/assets/loan_asset_document/`,
        method: "GET",
      }),
    }),

    createLoan: builder.mutation({
      query: credentials => ({
        url: '/loans/create_loan/',
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json"
        }
      })
    }),

    payLoan: builder.mutation({
      query: credentials => ({
        url: '/loans/pay_loan/',
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json"
        }
      })
    }),

    getLoanById: builder.query({
      query: (loan_id) => ({
        url: `/loans/loan/${loan_id}/`,
        method: "GET",
      }),
    }),

    getLoanInstallmentsById: builder.query({
      query: (loan_id) => ({
        url: `/loans/installments/${loan_id}/`,
        method: "GET",
      }),
    }),

    createLoanDocument: builder.mutation({
      query: (formData) => ({
        url: '/loans/loan_documents/',
        method: "POST",
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data;',
        }
      })
    }),

  })
})


export const {
  useGetLoanTypesQuery,
  useCreateLoanProductMutation,
  useGetLoanStatusQuery,
  useGetAllLoansQuery,
  useLazyGetMemberLoansQuery,
  useLazyGetLoanDocumentsQuery,
  useGetDocumentStatusQuery,
  useGetLoanDocumentsTypesQuery,
  useCreateLoanDocumentTypeMutation,
  useLazyGetLoanAssetsQuery,
  useGetLoanAssetDocumentsQuery,
  useCreateLoanMutation,
  useLazyGetLoanByIdQuery,
  useLazyGetLoanInstallmentsByIdQuery,
  useCreateLoanDocumentMutation,
  usePayLoanMutation
} = loanSlices

