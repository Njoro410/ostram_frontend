import { apiSlice } from "../../app/api/apiSlice";

export const savingsSlices = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMemberSavings: builder.query({
      query: (mbr_no) => ({
        url: `/savings/member_savings/${mbr_no}/`,
        method: "GET",
      }),
    }),

    getSavingsAccounts: builder.query({
      query: () => ({
        url: `/savings/saving_accounts/`,
        method: "GET",
      }),
    }),

    addMemberSavings: builder.mutation({
      query: ({ memberId, data }) => ({
        url: `/savings/add_savings/${memberId}/`,
        method: "POST",
        body: data, 
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    WithdrawMemberSavings: builder.mutation({
      query: ({ memberId, data }) => ({
        url: `/savings/withdraw_savings/${memberId}/`,
        method: "POST",
        body: data, 
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    getSavingHistory: builder.query({
      query: (mbr_no) => ({
        url: `/savings/members/${mbr_no}/savings_received/`,
        method: "GET",
      })
    }),

    getSavingWithdrawal: builder.query({
      query: (mbr_no) => ({
        url: `/savings/members/${mbr_no}/savings_withdrawals/`,
        method: "GET",
      })
    })


  }),
});

export const {
  useLazyGetMemberSavingsQuery,
  useGetSavingsAccountsQuery,
  useAddMemberSavingsMutation,
  useWithdrawMemberSavingsMutation,
  useLazyGetSavingHistoryQuery,
  useLazyGetSavingWithdrawalQuery } = savingsSlices;
