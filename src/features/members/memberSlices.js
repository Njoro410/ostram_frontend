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
        })
    })
})

export const {
    useRegisterMemberMutation
} = memberRegisterSlice;