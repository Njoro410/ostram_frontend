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
      query: ({ data, memberNo }) => {
        // Log the memberNo parameter
        console.log("Member No:", data);

        // Return the query object for the mutation
        return {
          url: `/members/member/${memberNo}/`,
          method: "PUT",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

    // updateMember: builder.mutation({
    //   query: (data, memberNo) => ({
    //     url: `/members/member/${memberNo}/`,
    //     method: "PUT",
    //     body: data,
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }),
    // }),

    deleteMember: builder.mutation({
      query: (mbr_no) => ({
        url: `/members/member/${mbr_no}/`,
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
