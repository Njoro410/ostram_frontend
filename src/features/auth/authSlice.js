import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { accesstoken: null, refreshtoken: null, csrfToken:null, userId:null },
    reducers: {
        setAccessToken: (state, action) => {
            state.accesstoken = action.payload
            
        },
        setRefreshToken: (state, action) => {
            state.refreshtoken = action.payload
        },
        setCSRFToken :(state, action) => {
            state.csrfToken = action.payload
        },
        setUserId :(state, action) => {
            state.userId = action.payload
        },
        logOut: (state, action) => {
            state.accesstoken = null
            state.refreshtoken = null
            state.csrfToken = null
        }
    },
})

export const { setAccessToken, setRefreshToken, setCSRFToken,setUserId, logOut } = authSlice.actions

export default authSlice.reducer


export const selectCurrentToken = (state) => state.auth.accesstoken
export const selectCSRFToken = (state) => state.auth.csrfToken;
export const selectUserId = (state) => state.auth.userId;