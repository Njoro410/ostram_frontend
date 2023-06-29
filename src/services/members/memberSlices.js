import { apiSlice } from "../../app/api/apiSlice";

export const memberRegisterSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerMember: builder.mutation({
      query: (credentials) => ({
        url: "/members/members_list/",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    getResidential: builder.query({
      query: () => ({
        url: "/members/residential_areas/",
        method: "GET",
      }),
    }),

    getMembers: builder.query({
      query: () => ({
        url: "/members/members_list/",
        method: "GET",
      }),
    }),

    getMemberDetails: builder.query({
      query: (mbr_no) => ({
        url: `/members/member/${mbr_no}/`,
        method: "GET",
      }),
    }),
    updateMember: builder.mutation({
      query: (credentials) => ({
        url: `/members/member/${mbr_no}/`,
        method: "PUT",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useRegisterMemberMutation,
  useGetResidentialQuery,
  useGetMembersQuery,
  useGetMemberDetailsQuery,
  useUpdateMemberMutation,
} = memberRegisterSlice;
