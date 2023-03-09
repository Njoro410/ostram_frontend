import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
                headers: {
                    "Content-Type": "application/json"
                  },
            })
        }),
    })
})



export const {
    useLoginMutation
} = authApiSlice