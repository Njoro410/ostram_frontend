import { apiSlice } from "../../app/api/apiSlice";

export const authorizationSlices = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStaff: builder.query({
      query: (staff_id) => ({
        url: `/auth/user_id/${staff_id}/`,
        method: "GET",
      }),
    }),

    getAllStaff: builder.query({
      query: () => ({
        url: "/auth/all-users/",
        method: "GET",
      }),
    }),

    registerStaff: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register/",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    getAllPerms: builder.query({
      query: () => ({
        url: "/auth/permissions/",
        method: "GET",
      }),
    }),

    getAllPermGroups: builder.query({
      query: () => ({
        url: "/auth/all_permission_groups/",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLazyGetStaffQuery,
  useGetAllStaffQuery,
  useRegisterStaffMutation,
  useGetAllPermsQuery,
  useGetAllPermGroupsQuery } = authorizationSlices;