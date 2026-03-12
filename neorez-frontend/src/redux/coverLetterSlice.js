import { createSlice } from '@reduxjs/toolkit';
// Initial state for the design properties
const initialDesignState = {
    lineHeight: 1.4,
    fontSize: 12, // Default font size
    margin: 5,    // Default margin
    color: "",    // Default text color
    fontFamily: "Poppins", // Default font family
};
const initialState = {
    userId: null,
    title: "",
    body: [{
        description: ` I am writing to apply to the Spring 2016 public relations internship at LaForce + Stevens. The agency’s innovative digital branding strategies, especially for high-end fashion clients, are redefining the industry, particularly in its work with Perry Ellis. My experience in public relations and background in fashion design would make me a great fit for the fast-paced LaForce + Stevens team.
         <br /><br /> As an account executive at PRLab at Boston University, I created a social media strategy for my client Ben & Jerry’s.I collaborated with other account executives to integrate innovative ideas into our online brand conversations to engage potential and existing followers.Throughout the semester, we have increased social media followers by 45 % and engaged the community—especially the thousands of Boston - area students—in the brand through traditional and social media.In addition, I built a media list for Ben & Jerry’s of contacts in local, college, and national media to gain more earned coverage for the brand.So far, two local papers have published articles based on the press kit I assembled and pitches I wrote to journalists.
            <br /><br /> In addition to my social media experience, I have been designing and making clothes for years in class and on my own. I understand the demands of the fashion industry and have the keen sense of style necessary to create brand strategies that compellingly represent high-end fashion brands. From my public relations experience and background in fashion, I would be an enthusiastic, creative asset to the public relations department here.
            I look forward to talking to you further about my skills and qualifications for the spring 2016 public relations internship at LaForce + Stevens. I can be reached by phone at (617) 353-3490 and email at dmeagle@bu.edu. Thank you for your time and consideration.
   ` }
    ],
    description: "",
    letterTo: "Dear Ms. Morris,",
    linkedIn: '',
    name: "",
    address: "[Organization/Company Mailing Address]",
    person: "",
    phone: "",
    email: "",
    designation: "",
    additionalInfo: "",
    regards: "Sincerely,",
    links: [""],
    visibility: {
        // profileImage: false,
        // name: true,
        phone: false,
        email: true,
        address: true,
        designation: true,
        links: true,
    },
    design: {
        lineHeight: 1.4,
        fontSize: 12, // Default font size
        margin: 5,    // Default margin
        color: "",    // Default text color
        fontFamily: "", // Default font family
    },
    templateId: '1',
    coverRef: null,
    company: "[Organization/Company Name]",
    date: "[Today’s Date]",
    uid: ""

};

const coverLetterSlice = createSlice({
    name: 'coverLetter',
    initialState,
    reducers: {
        setCoverLetter: (state, action) => {
            const { links, ...rest } = action.payload;
            // console.log(action);

            // Merge other fields
            Object.assign(state, rest);

            // If links are provided, add them to the existing array
            if (links && Array.isArray(links)) {
                state.links = links;
                // state.links = [...state.links, ...links];
            }
        },


        setupCoverLetter: (state, action) => {
            const { body, designation, name, email, location, phone } = action.payload;

            // Update the state with new fields
            state.body = body || state.body; // Add the body (cover letter content)
            state.designation = designation || state.designation;
            state.name = name || state.name;
            state.email = email || state.email;
            state.location = location || state.location;
            state.phone = phone || state.phone;
        },

        // setCoverLetter: (state, action) => {
        //     return { ...state, ...action.payload };
        // },
        updateCoverLetter: (state, action) => {
            // console.log(state);
            // console.log(action.payload);

            const { name, value } = action.payload;
            state[name] = value
            // return { ...state, ...action.payload };
        },
        updateCoverLetterExtension: (state, action) => {
            // const { name, value } = action.payload;
            // state.design[name] = value
            return { ...state, ...action.payload };
        },






        updateBodyDescription: (state, action) => {
            const { index, description } = action.payload;
            // console.log(index, description);
            if (state.body[index]) {
                state.body[index].description = description; // Update specific body description
            }
        },
        addBodySection: (state) => {
            state.body.push({ description: "" }); // Add a new body section
        },
        removeBodySection: (state, action) => {
            const index = action.payload;
            // console.log("Deleting index:", index);
            // console.log("Before deletion:", state.body);

            if (index >= 0 && index < state.body.length) {
                // Filter out the object at the index
                state.body = state.body.filter((_, i) => i !== index);
                // console.log("After deletion:", state.body); // Should show the updated array
            }
        },

        // Design updates
        updateFontSize(state, action) {
            state.design.fontSize = action.payload;
        },
        updateFontFamily(state, action) {
            state.design.fontFamily = action.payload;
        },
        updateMargin(state, action) {
            state.design.margin = action.payload;
        },
        updateColor(state, action) {
            state.design.color = action.payload;
        },
        updateLineHeight(state, action) {
            state.design.lineHeight = action.payload;
        },
        updateCLTemplateId(state, action) {
            state.templateId = action.payload;
        },
        updateResumeRef: (state, action) => {
            // console.log("action.payload ref", action.payload)
            state.coverRef = action.payload;  // Add this action for resumeRef
        },
        resetCoverLetter: () => initialState,
        // Action to reset design settings to defaults
        resetDesignDefaults(state) {
            state.design = initialDesignState; // Reset to initial design state
        },
        updateCoverLetterUid(state, action) {
            state.uid = action.payload; // Update uid with the generated value
        },
        deleteProfileField: (state, action) => {
            const { index, field } = action.payload;
            if (field) {
                // If field name is specified (e.g., "email" or "phone")
                delete state.profile[field];
            } else if (index !== undefined) {
                // Handle by index for dynamic profile fields if needed
                const profileKeys = Object.keys(state.profile);
                delete state.profile[profileKeys[index]];
            }
        },
        deleteCoverLetterField: (state, action) => {
            const field = action.payload;
            if (field in state) {
                delete state[field]; // Remove the specified field from the Redux state
            }
        },

        toggleFieldVisibilityCoverLetter: (state, action) => {
            const { field } = action.payload;

            // Prevent toggling the 'name' field
            if (field === "name") {
                return; // Exit without making changes
            }

            // Ensure the field exists before toggling
            if (state.visibility.hasOwnProperty(field)) {
                state.visibility[field] = !state.visibility[field]; // Toggle visibility
            } else {
                state.visibility[field] = false; // Default to hidden if it doesn't exist
            }
        },

    },

});

export const { setCoverLetter, toggleFieldVisibilityCoverLetter, setupCoverLetter, updateCoverLetterExtension, updateCLTemplateId, deleteProfileField, deleteCoverLetterField, removeBodySection, addBodySection, updateBodyDescription, resetCoverLetter, updateCoverLetterUid, resetDesignDefaults, updateCoverLetter, updateFontFamily, updateTemplateId, updateResumeRef, updateFontSize, updateMargin, updateColor, updateLineHeight } = coverLetterSlice.actions;
export default coverLetterSlice.reducer;
