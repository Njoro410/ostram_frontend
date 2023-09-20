import { apiSlice } from "../../app/api/apiSlice";

export const contributionsSlices = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    makeContributions: builder.mutation({
      query: (credentials) => ({
        url: "/contributions/daily_contributions/",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    getContributions: builder.query({
      query: () => ({
        url: "/contributions/daily_contributions/",
        method: "GET",
      }),
    }),

    getMemberContributions: builder.query({
      query: (memberNo) => ({
        url: `/contributions/member_contributions/${memberNo}/`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetContributionsQuery, useGetMemberContributionsQuery } =
  contributionsSlices;
