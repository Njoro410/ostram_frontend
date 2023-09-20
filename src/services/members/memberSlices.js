import { apiSlice } from "../../app/api/apiSlice";

export const memberRegisterSlice = apiSlice.injectEndpoints({
  tagTypes: ["Member"],
  endpoints: (builder) => ({
    getMembers: builder.query({
      query: () => ({
        url: "/members/members_list/",
        method: "GET",
      }),
      providesTags: ["Member"],
    }),

    registerMember: builder.mutation({
      query: (credentials) => ({
        url: "/members/members_list/",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Member"],
    }),

    getResidential: builder.query({
      query: () => ({
        url: "/members/residential_areas/",
        method: "GET",
      }),
      providesTags: ["Residential"],
    }),

    getMemberDetails: builder.query({
      query: (mbr_no) => ({
        url: `/members/member/${mbr_no}/`,
        method: "GET",
      }),
    }),

    updateMember: builder.mutation({
      query: ({ memberNo, data }) => ({
        url: `/members/member/${memberNo}/`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Member"],
    }),

    deleteMember: builder.mutation({
      query: (memberNo) => ({
        url: `/members/member/${memberNo}/`,
        method: "DELETE",
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
  useDeleteMemberMutation,
} = memberRegisterSlice;
