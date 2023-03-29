import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { accesstoken: null, refreshtoken: null, csrfToken:null },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken, refreshToken } = action.payload
            state.accesstoken = accessToken
            state.refreshtoken = refreshToken
        },
        setCSRFToken :(state, action) => {
            state.csrfToken = action.payload
        },
        logOut: (state, action) => {
            state.token = null
            state.refresh = null
        }
    },
})

export const { setCredentials, setCSRFToken, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.accesstoken
export const selectCSRFToken = (state) => state.auth.csrfToken;