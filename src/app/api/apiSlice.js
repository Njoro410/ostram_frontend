import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, setCSRFToken, logOut } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    },
    fetchFn: async (...args) => {
        const response = await fetch(...args);
        const csrftoken = response.headers.get('csrftoken');
        if (csrftoken) {
            // Update the authentication slice with the CSRF token
            //   store.dispatch(authSlice.actions.setCSRFToken(csrftoken));
            store.dispatch(setCSRFToken(csrftoken));

        }
        return response;
    },
})

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//     let result = await baseQuery(args, api, extraOptions)

//     if (result?.error?.originalStatus === 401) {
//         console.log('sending refresh token')
//         // send refresh token to get new access token 
//         const refreshResult = await baseQuery('/auth/refresh-token', api, extraOptions)
//         console.log(refreshResult)
//         if (refreshResult?.data) {
//             const user = api.getState().auth.user
//             // store the new token 
//             api.dispatch(setCredentials({ ...refreshResult.data, user }))
//             // retry the original query with new access token 
//             result = await baseQuery(args, api, extraOptions)
//         } else {
//             api.dispatch(logOut())
//         }
//     }

//     return result
// }

export const apiSlice = createApi({
    baseQuery,
    endpoints: builder => ({})
})