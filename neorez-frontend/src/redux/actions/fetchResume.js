// src/redux/actions/fetchResume.js

import axios from 'axios';
import { updateAllSections, updateColor, updateFontFamily, updateFontSize, updateLineHeight, updateMargin, updateResumeName, updateTemplateId } from '../resumeSlice2';
import { useContext } from 'react';
import { useSectionsContext } from '../../App';


export const fetchResumeData = (uid, setSectionsState) => async (dispatch) => {
    // const { setSectionsState } = useContext(useSectionsContext);

    // console.log("uid passed", uid)

    // console.log("in outside")
    const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;
    if (uid) {
        // console.log("in fetchResumeData function")

        try {
            const response = await axios.get(`${ApiUrl}/resume/draft/${uid}`);
            const resumeData = response?.data;
            // console.log("resumeData fetched draft", resumeData)
            if (resumeData) {
                // Dispatch actions to update the redux store
                dispatch(updateAllSections({ sections: resumeData.sections }));
                dispatch(updateTemplateId(resumeData.templateId));
                dispatch(updateFontSize(resumeData.design.fontSize));
                dispatch(updateFontFamily(resumeData.design.fontFamily));
                dispatch(updateMargin(resumeData.design.margin));
                dispatch(updateColor(resumeData.design.color));
                dispatch(updateLineHeight(resumeData.design.lineHeight));
                dispatch(updateResumeName(resumeData.resumeName));

            }
            // Update context API
            setSectionsState((prevState) => ({
                ...prevState,
                sections: resumeData.sections,
                design: resumeData.design,
                templateId: resumeData.templateId,
            }));
        } catch (error) {
            console.error("Error fetching resume data:", error);
        }
    }
};
