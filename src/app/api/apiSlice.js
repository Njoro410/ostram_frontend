import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api',
    credentials: 'include',
    mode: 'cors',
    method: 'POST',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accesstoken
        const csrftoken = getState().auth.csrfToken
        if (token ) {
            headers.set("Authorization", `Bearer ${token}`)
            headers.set('X-CSRFToken', csrftoken)
        }


        return headers
    },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions);

    if (result.meta.response?.status === 401) {
        console.log('sending refresh token')
        // send refresh token to get new access token 
        try {
            const refreshResult = await baseQuery('/auth/refresh-token', api, extraOptions);
            api.dispatch(setCredentials( refreshResult.data.access ))
            result = await baseQuery(args, api, extraOptions);
          } catch (error) {
            api.dispatch(logOut());
          }
    }

    return result
}



export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})