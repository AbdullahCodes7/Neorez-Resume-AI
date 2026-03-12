// src/redux/actions/fetchResume.js

import axios from 'axios';
import { setCoverLetter } from '../coverLetterSlice';



export const fetchCoverLetterData = (uid) => async (dispatch) => {
    const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;

    // console.log("fetch cover letter", uid)
    if (uid) {
        // setLoading(true)
        try {
            const response = await axios.get(`${ApiUrl}/cover/draft/${uid}`);

            const coverLetterData = response.data;
            // console.log("Cover Letter Data fetched draft", coverLetterData);

            // Dispatch actions to update the redux store with fetched data
            if (coverLetterData) {
                dispatch(setCoverLetter(coverLetterData)); // Dispatch the entire fetched data
            }
            // setLoading(false)

        } catch (error) {
            // setLoading(false)

            console.error("Error fetching resume data:", error);
        }
    }
};
