// import axios from 'axios';
// import { updateCoverLetter } from '../coverLetterSlice';
// import { store } from "../store.js"

// // Global function to handle saving data to Redux and API
// export const saveCoverLetterData = async (field, value) => {
//     const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;

//     // Dispatch Redux action to update state
//     store.dispatch(updateCoverLetter({ name: field, value }));

//     // Get the current state from the store
//     const state = store.getState();
//     const userId = state.user.userInfo.data._id;
//     const uid = state.coverLetter.uid;

//     console.log("uid in cover letter", uid)

//     // Prepare the payload
//     const coverLetterData = { ...state.coverLetter, userId, uid }; // Include userId in the payload

//     // console.log("API URL:", ApiUrl);
//     console.log("Payload being sent:", coverLetterData);

//     try {
//         // Call the API to save the data
//         const response = await axios.post(`${ApiUrl}/cover/save`, coverLetterData);
//         console.log("Data saved successfully!", response.data);
//     } catch (error) {
//         console.error("Error saving data:", error.response ? error.response.data : error.message);
//     }
// };

import axios from 'axios';
import { updateCoverLetter } from '../coverLetterSlice';
import { store } from "../store.js";
import { toast } from 'react-toastify';

// Global function to handle saving data to Redux and API
export const saveCoverLetterData = async (field, value) => {
    const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;

    // Dispatch Redux action to update the state
    store.dispatch(updateCoverLetter({ name: field, value }));

    // Get the current state from the store
    const state = store.getState();
    const userId = state.user.userInfo?.data?._id; // Use optional chaining for safety
    const uid = state.coverLetter.uid;
    const templateId = state.coverLetter.templateId

    // console.log("UID in cover letter:", uid);

    // Check if both userId and uid are present before proceeding
    if (!userId || !uid || !templateId) {
        console.warn("Missing user ID or UID. Cannot save data.");
        return;
    }

    // Prepare the payload
    const coverLetterData = {
        ...state.coverLetter,
        userId, // Include userId in the payload
        uid,
    };

    // console.log("Payload being sent:", coverLetterData);

    try {
        // Call the API to save the data
        const response = await axios.post(`${ApiUrl}/cover/save`, coverLetterData);
        // console.log("Data saved successfully!", response.data);
        toast.success("CoverLetter saved successfully", { toastId: "saveSuccess" })
    } catch (error) {
        // Enhanced error logging to capture detailed responses
        if (error.response) {
            console.error("Error saving data:", error.response.data);
            console.error("Status code:", error.response.status);
        } else {
            console.error("Error saving data:", error.message);
        }
    }
};

