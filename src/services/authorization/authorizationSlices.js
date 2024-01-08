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

    updateStaff: builder.mutation({
      query: (staffId, data) => ({
        url: `/auth/user_id/${staffId}/`,
        method: "PUT",
        body: data,
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

    createPermissionGroup: builder.mutation({
      query: (data) => ({
        url: "/auth/all_permission_groups/",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    deletePermissionGroup: builder.mutation({
      query: (data) => ({
        url: "/auth/delete_permission_group/",
        method: "DELETE",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }),

    enable2FA: builder.mutation({
      query: ({ data }) => ({
        url: "/auth/set_two_factor_auth/",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ['User'],
    }),

    verify2FA: builder.mutation({
      query: ({ data }) => ({
        url: "/auth/verify_two_factor/",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

  }),
});

export const {
  useLazyGetStaffQuery,
  useGetAllStaffQuery,
  useRegisterStaffMutation,
  useUpdateStaffMutation,
  useGetAllPermsQuery,
  useGetAllPermGroupsQuery,
  useCreatePermissionGroupMutation,
  useDeletePermissionGroupMutation,
  useEnable2FAMutation,
  useVerify2FAMutation
} = authorizationSlices;