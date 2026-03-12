// slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: JSON.parse(localStorage.getItem('user')) || null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        clearUser: (state) => {
            state.userInfo = null;
            localStorage.removeItem('user');
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
