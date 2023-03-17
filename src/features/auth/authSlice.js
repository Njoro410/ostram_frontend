import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null, refresh: null, csrftoken:null },
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken, refreshToken } = action.payload
            state.user = user
            state.token = accessToken
            state.refresh = refreshToken
        },
        setCSRFToken :(state, action) => {
            const { csrftoken } = action.payload
            state.csrftoken = csrftoken
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
            state.refresh = null
        }
    },
})

export const { setCredentials, setCSRFToken, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
export const selectCSRFToken = (state) => state.auth.csrftoken;