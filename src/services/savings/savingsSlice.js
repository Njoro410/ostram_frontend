import { apiSlice } from "../../app/api/apiSlice";

export const savingsSlices = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMemberSavings: builder.query({
      query: (mbr_no) => ({
        url: `/savings/member_savings/${mbr_no}/`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMemberSavingsQuery } = savingsSlices;
