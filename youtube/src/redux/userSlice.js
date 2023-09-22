import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        signinStart: (state) => {
            state.loading = true;
        },
        signinSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        signininFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        subscription: (state, action) => {
            if (state.currentUser.subscribeUsers?.includes(action.payload)) {
                state.currentUser.subscribeUsers.splice(
                    state.currentUser.subscribedUsers.findIndex(
                        (channelId) => channelId === action.payload
                    ),
                    1
                );
            } else {
                //if not subscribed before
                state.currentUser.subscribeUsers?.push(action.payload);
            }
        },
    },
});



export const { loginStart, loginSuccess, loginFailure, logout, subscription, signinStart, signinSuccess, signininFailure } =
    userSlice.actions;

export default userSlice.reducer;