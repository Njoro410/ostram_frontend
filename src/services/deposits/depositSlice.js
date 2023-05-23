import { apiSlice } from "../../app/api/apiSlice";

export const depositSlices = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMemberDeposits: builder.query({
      query: (mbr_no) => ({
        url: `/deposits/member_deposits/${mbr_no}/`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMemberDepositsQuery } = depositSlices;
