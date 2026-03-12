// import axios from "axios";
// import { updateCoverLetter, updateTemplateId } from "../coverLetterSlice";

// const apiMiddlewareCoverletter = (store) => (next) => async (action) => {
//     const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;
//     console.log("Middleware triggered for action:", action.type); // <-- Add this

//     const result = next(action);

//     // Check for both updateCoverLetter and updateTemplateId actions
//     if (action.type === updateCoverLetter.type || action.type === updateTemplateId.type) {
//         console.log("API Call Triggered"); // <-- Add this to confirm the condition is met
//         const state = store.getState();
//         const coverLetterData = state.coverLetter;
//         console.log("Current cover letter state:", coverLetterData);

//         const userId = state.user.userInfo?.data?._id;

//         // Only proceed if uid and userId are available
//         if (coverLetterData.uid && userId) {
//             try {
//                 console.log("Making API call with data:", coverLetterData); // <-- Log data sent to API
//                 // API call to save the updated cover letter data
//                 await axios.post(`${ApiUrl}/cover/save`, {
//                     uid: coverLetterData.uid,
//                     userId: userId,
//                     title: coverLetterData.title,
//                     body: coverLetterData.body,
//                     description: coverLetterData.description,
//                     to: coverLetterData.to,
//                     name: coverLetterData.name,
//                     address: coverLetterData.address,
//                     phone: coverLetterData.phone,
//                     email: coverLetterData.email,
//                     additionalInfo: coverLetterData.additionalInfo,
//                     templateId: coverLetterData.templateId, // Ensures the updated templateId is included
//                     design: coverLetterData.design,
//                     links: coverLetterData.links,
//                     regards: coverLetterData.regards,
//                 });
//                 console.log("Data saved successfully!");
//             } catch (error) {
//                 console.error("Error saving data:", error);
//             }
//         } else {
//             console.warn("UID or user ID is missing. Data not saved.");
//         }
//     }

//     return result;
// };

// export default apiMiddlewareCoverletter;
