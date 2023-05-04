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
            }),
            providesTags: ['User'],
            transformResponse: async (response, meta) => {
                // Extract the value of the "X-CSRF-Token" header from the response
                const token = meta.response.headers.get('x-csrftoken')

                const data = await response;
                // Return an object containing the parsed response data and the token value
                return { data, token };
               

            }
        }),
    })
})




export const {
    useLoginMutation
} = authApiSlice;
