import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setAccessToken, logOut, setCSRFToken } from '../../features/auth/authSlice'


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api',
    credentials: 'include',
    mode: 'cors',
    method: 'POST',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accesstoken
        const csrftoken = getState().auth.csrfToken
        if (token && csrftoken) {
            headers.set("Authorization", `Bearer ${token}`)
            headers.set('X-CSRFToken', csrftoken)
        }


        return headers
    },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions);
    // console.log(result.meta.response?.status)

    if (result.meta.response?.status === 401) {
        // console.log('sending csrf token')
        // send refresh token to get new access token 
        try {
            const refreshResult = await baseQuery('/auth/refresh-token', api, extraOptions);
            api.dispatch(setAccessToken(refreshResult.data.access))
            api.dispatch(setCSRFToken(refreshResult.meta.response.headers.get('x-csrftoken')))

            //proceed with original response
            result = await baseQuery(args, api, extraOptions);
        } catch (error) {
            console.log('logging out via apiSlice')
            await baseQuery('/auth/logout', api, extraOptions);
            api.dispatch(logOut());
        }
    }

    return result
}



export const apiSlice = createApi({
    reducerPath: 'authSlice',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User'],
    endpoints: builder => ({}),
    keepUnusedDataFor: 6000,
})