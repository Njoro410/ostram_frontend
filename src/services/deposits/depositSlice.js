import { apiSlice } from "../../app/api/apiSlice";

export const depositSlices = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMemberDeposits: builder.query({
      query: (mbr_no) => ({
        url: `/deposits/member_deposits/${mbr_no}/`,
        method: "GET",
      }),
    }),

    getDepositsAccounts: builder.query({
      query: () => ({
        url: `/deposits/deposits_accounts/`,
        method: "GET",
      }),
    }),

    addMemberDeposits: builder.mutation({
      query: ({ memberId, data }) => ({
        url: `/deposits/add_deposits/${memberId}/`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    WithdrawMemberDeposits: builder.mutation({
      query: ({ memberId, data }) => ({
        url: `/deposits/withdraw_deposits/${memberId}/`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    getDepositsHistory: builder.query({
      query: (mbr_no) => ({
        url: `/deposits/members/${mbr_no}/deposits_received/`,
        method: "GET",
      })
    }),

    getDepositsWithdrawal: builder.query({
      query: (mbr_no) => ({
        url: `/deposits/members/${mbr_no}/deposits_withdrawals/`,
        method: "GET",
      })
    })
  }),


});

export const {
  useLazyGetMemberDepositsQuery,
  useGetDepositsAccountsQuery,
  useLazyGetDepositsHistoryQuery,
  useLazyGetDepositsWithdrawalQuery,
  useAddMemberDepositsMutation,
  useWithdrawMemberDepositsMutation } = depositSlices;
