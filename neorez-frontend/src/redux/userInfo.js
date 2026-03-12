import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: '',
    name: '',
    // lastName: '',
    email: '',
    contactNumber: '',
    country: '',
    address: '',
    skills: [{
        name: "",
        level: "Advanced",
    }],
    desiredLocation: '',
    desiredJobTitle: '',
    education: [
        { institution: 'Concordia Colleges', degree: 'Intermediate in Computer Science', reference: '', startDate: '', endDate: '' }
    ],
};

const userInfoSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        updateField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
        addEducation: (state) => {
            state.education.push({
                schoolName: '',
                city: '',
                country: '',
                timePeriodFrom: '',
                timePeriodTo: ''
            });
        },
        updateEducation: (state, action) => {
            const { index, field, value } = action.payload;
            state.education[index][field] = value;
        },
        addSkills: (state) => {
            state.skills.push({
                name: "",
                level: "Advanced",
            });
        },
        deleteSkills: (state, action) => {
            // console.log("test delete skill", action.payload)
            state.skills = state.skills.filter((_, index) => index !== action.payload);
        },
        updateSkills: (state, action) => {
            const { index, field, value } = action.payload;
            state.skills[index][field] = value;
        },
        setUserInfo: (state, action) => {
            Object.assign(state, action.payload);
        },
        UpdateUserInfo: (state, action) => {
            const data = action.payload;

            // console.log("data: ", data);

            // Map response data to state fields
            // state.userId = data.userId || "";
            state.name = data.profile?.name || "";
            state.email = data.profile?.email || "";
            state.contactNumber = data.profile?.contactNumber || "";
            state.country = data.profile?.country || "";
            state.address = data.profile?.address || "";
            state.desiredLocation = data.desiredLocation || "";
            state.desiredJobTitle = data.desiredJobTitle || "";

            // Map skills
            state.skills = data.skills?.items?.map((skill) => ({
                name: skill.name || "",
                level: skill.level || "Advanced",
            })) || [];

            // Map education
            state.education = data.education?.items?.map((edu) => ({
                institution: edu.institution || "",
                degree: edu.degree || "",
                reference: edu.reference || "",
                startDate: edu.startDate || "",
                endDate: edu.endDate || "",
            })) || [];
        },
        resetuserInfo: (state) => {
            // Reset the entire state to the initial state
            Object.assign(state, initialState);
        },
    }
});

export const { updateField, UpdateUserInfo, deleteSkills, addEducation, updateEducation, addSkills, updateSkills, setUserInfo, resetuserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
