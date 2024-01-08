import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({ url: "/auth/user/", method: "GET" }),
      providesTags: ['User'],
    }),
  }),
});

export const {
    useGetUserQuery
} = usersApiSlice 