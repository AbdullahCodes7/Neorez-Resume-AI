// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice';
import resumeSlice from './resumeSlice';
import coverLetterSlice from './coverLetterSlice';
import userInfo from './userInfo';
import resumeSlice2 from './resumeSlice2';
import apiMiddleware from "./middleWare";
export const store = configureStore({
    reducer: {
        user: userReducer,
        // resume: resumeSlice,
        resume: resumeSlice2,
        coverLetter: coverLetterSlice,
        userData: userInfo
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiMiddleware),

});
