import { apiSlice } from "../../app/api/apiSlice";

export const savingsSlices = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMemberSavings: builder.query({
      query: (mbr_no) => ({
        url: `/savings/member_savings/${mbr_no}/`,
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
  }),
});

export const { useGetMemberSavingsQuery, useAddMemberSavingsMutation } = savingsSlices;
