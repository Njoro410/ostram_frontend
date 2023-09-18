import { apiSlice } from "../../app/api/apiSlice";

export const memberRegisterSlice = apiSlice.injectEndpoints({
  tagTypes: ["Members"],
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
      invalidatesTags: ["Members"],
    }),

    getResidential: builder.query({
      query: () => ({
        url: "/members/residential_areas/",
        method: "GET",
      }),
      providesTags: ["Residential"],
    }),

    getMembers: builder.query({
      query: () => ({
        url: "/members/members_list/",
        method: "GET",
      }),
      providesTags: ["Members"],
    }),

    getMemberDetails: builder.query({
      query: (mbr_no) => ({
        url: `/members/member/${mbr_no}/`,
        method: "GET",
      }),
    }),

    updateMember: builder.mutation({
      query: ({ memberNo, data }) => {
        // Log the memberNo parameter
        console.log("Member No:", data, memberNo);
        console.log(`/members/member/${memberNo}/`, "url:");
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
      invalidatesTags: ["Members"],
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
