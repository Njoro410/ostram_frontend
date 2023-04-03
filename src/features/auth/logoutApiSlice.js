import { apiSlice } from "../../app/api/apiSlice";

export const logoutApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        logout: builder.mutation({
            query: () => ({ url: "/auth/logout", credentials: "include" }),
        }),
    }),
});

export const {
    useLogoutMutation
} = logoutApiSlice 