import { apiSlice } from "../../app/api/apiSlice";

export const contributionsSlices = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContributions: builder.query({
      query: (filters) => {
        const { year, month, quarter } = filters;
        let url = "/contributions/daily_contributions/";
        let params = {};

        if (year !== null) {
          params["year"] = year;
        }

        if (month !== null) {
          params["month"] = month;
        }

        if (quarter !== null) {
          params["quarter"] = quarter;
        }

        if (Object.keys(params).length > 0) {
          url += `?${new URLSearchParams(params).toString()}`;
        }

        return { url, method: "GET" };
      },
    }),
  }),
});

export const { useGetContributionsQuery } = contributionsSlices;
