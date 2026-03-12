// src/redux/apiMiddleware.js

import axios from "axios";
import { addSection, updateResumeName, updateSection, updateTemplateId } from "./resumeSlice2";
import { toast } from "react-toastify";

const apiMiddleware = (store) => (next) => async (action) => {
    // console.log("Action received in middleware:", store);
    const ApiUrl = import.meta.env.VITE_APP_BACKEND_API
    // const ApiUrl = "import.meta.env.VITE_APP_BACKEND_API"
    // console.log("first 1")

    const result = next(action);
    if (action.type === addSection.type ||
        action.type === updateSection.type ||
        action.type === updateTemplateId.type ||
        action.type === updateResumeName.type
    ) {
        // console.log("first 2")

        setTimeout(async () => {
            // console.log("first")
            const state = store.getState();
            const resumeData = state.resume;
            // console.log("resumeData", resumeData)
            // Retrieve the user object from localStorage
            const userString = localStorage.getItem("user");

            // Parse the JSON string into an object
            const user = JSON.parse(userString);
            const userGoogleId = user?.userId;

            const userId = state.user?.userInfo?.data?._id || userGoogleId
            // console.log("resumeData", resumeData)
            // console.log("resumeData.templateId", resumeData.templateId)
            // console.log("resumeData.uid", resumeData.uid)
            if (resumeData.templateId && resumeData.uid) {

                //     console.log("Attempting to send data to API:", {
                //         userId,
                //         sections: resumeData.sections,
                //         templateId: resumeData.templateId,
                //         design: resumeData.design,
                //         uid: resumeData.uid,
                //     });

                try {
                    // API call to save the resume data (to MongoDB or other backend)
                    await axios.post(`${ApiUrl}/resume/draft`, {
                        userId: userId,
                        sections: resumeData.sections,
                        templateId: resumeData.templateId,
                        design: resumeData.design,
                        uid: resumeData.uid,
                        resumeName: resumeData.resumeName
                    });
                    // console.log("Data saved successfully!");
                    toast.success("Data saved successfully!", { toastId: "saveSuccess" });
                } catch (error) {
                    console.error("Error saving data:", error);
                }
            }
        }, 0);
    }

    return result;
};

export default apiMiddleware;
