import { apiSlice } from "../../app/api/apiSlice";

export const memberRegisterSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        registerMember: builder.mutation({
            query: credentials => ({
                url: '/members/members_list/',
                method: 'POST',
                body: credentials,
                headers: {
                    "Content-Type": "application/json"
                },
            })
        }),

        getResidential: builder.query({
            query: () => ({
                url: "/members/residential_areas/",
                method: "GET"
            })
        })
        
    })
})

export const {
    useRegisterMemberMutation,
    useGetResidentialQuery,
} = memberRegisterSlice;