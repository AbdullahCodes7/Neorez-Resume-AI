import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: '',
    sections: [
        {
            header: 'profile',
            type: 'profile',
            profileImage: "",
            name: "",
            contactNumber: "",
            email: "",
            address: "",
            jobTitle: "",
            links: [""],
        },
        {
            header: "about",
            type: 'about',
            items: [{
                description: ""
            }]
        },
        {
            column: "left",
            header: "Education",
            type: 'education',
            items: [
                {
                    degree: "MBA in Business Management",
                    institution: "Harvard Business School",
                    reference: "Dr. John Doe",
                    startDate: "September 2012",
                    endDate: "June 2014"
                },
                {
                    degree: "Bachelor of Business Administration",
                    institution: "New York University",
                    reference: "Prof. Jane Smith",
                    startDate: "September 2008",
                    endDate: "June 2012"
                },
            ],
        },
        {
            header: "Work Experience",
            type: 'workExperience',
            items: [
                {
                    jobTitle: "",
                    company: "",
                    duration: "",
                    description: ""
                },
            ],
        },
        {
            header: "skills",
            type: 'skills',
            items: [
                {
                    name: "",
                    level: "Advanced",
                },
            ],
        },
        {
            header: "languages",
            type: 'languages',
            items: [
                {
                    name: "",
                    proficiency: "",
                },
            ],
        },

        {
            header: 'references',
            type: 'references',
            items: [
                {
                    name: "",
                    detail: "",
                    contactInfo: "",
                    email: ""
                },
            ],
        },
        {
            header: 'certifications',
            type: 'certificates',
            items: [
                {
                    title: "",
                    date: "",
                    description: "",

                },
            ],
        },
        {

            header: 'Interest',
            type: 'hobbies',
            items: [
                {
                    name: "Gaming",
                },
            ],
        },
        {
            header: 'Custom Section',
            type: 'customSections',
            items: [],
        },
    ],
    design: {
        lineHeight: 1.4,
        fontSize: 14, // Default font size
        margin: 5,    // Default margin
        color: "",    // Default text color
        fontFamily: "", // Default font family
    },
};



const resumeSlice = createSlice({
    name: 'resume',
    initialState,
    reducers: {
        // Profile updates
        updateProfile(state, action) {
            // console.log("action.payload")
            // console.log("action.payload", action.payload)
            state.sections[0] = { ...state.sections[0], ...action.payload };
        },

        // About section actions
        addAbout(state, action) {
            // console.log(action.payload)
            state.sections[1].items.push(action.payload);
        },

        updateAbout(state, action) {
            const { index, data } = action.payload;
            // console.log(action.payload)
            // If header is being updated, update it directly
            if (data.header) {
                state.sections[1].header = data.header;
            }

            // Update individual items, like description
            if (index !== null && index >= 0 && index < state.sections[1].items.length) {
                state.sections[1].items[index] = {
                    ...state.sections[1].items[index],
                    ...data,
                };
            }
        },

        setAboutSummary(state, action) {
            const { summary } = action.payload;

            state.sections[1].items[0].description = summary;
        },

        // deleteAbout(state, action) {
        //     const indexToDelete = action.payload;
        //     console.log(action.payload)

        //     state.sections[1].items = state.sections[1].items.filter((_, index) => index !== indexToDelete);
        // },

        deleteAbout(state, action) {
            const index = action.payload;
            // console.log("index Slice", index)
            if (index >= 0 && index < state.sections[1].items.length) {
                state.sections[1].items.splice(index, 1); // Remove item by index
            }
        },

        // Education section actions
        addEducation(state, action) {
            state.sections[2].items.push(action.payload);
        },
        updateEducation(state, action) {
            const { index, data } = action.payload;

            if (data.header) {
                state.sections[2].header = data.header;
            }

            if (index !== null && index >= 0 && index < state.sections[2].items.length) {
                state.sections[2].items[index] = { ...state.sections[2].items[index], ...data };
            }
        },
        deleteEducation(state, action) {
            const indexToDelete = action.payload;
            state.sections[2].items = state.sections[2].items.filter((_, index) => index !== indexToDelete);
        },

        // Job Experience section actions
        addJobExperience(state, action) {
            // console.log("action.payload experience", action.payload)

            state.sections[3].items.push(action.payload);
        },
        // updateJobExperience(state, action) {
        //     const { index, data } = action.payload;
        //     // console.log(action.payload)
        //     // If header is being updated, update it directly
        //     if (data.header) {
        //         state.sections[3].header = data.header;
        //     }

        //     // Update individual items, like description
        //     if (index !== null && index >= 0 && index < state.sections[3].items.length) {
        //         state.sections[3].items[index] = {
        //             ...state.sections[3].items[index],
        //             ...data,
        //         };
        //     }
        // },

        updateJobExperience(state, action) {
            const { index, data } = action.payload;
            // console.log("action.payload experience", action.payload)

            // If index exists within bounds, update the entry
            if (index !== null && index >= 0 && index < state.sections[3].items.length) {
                state.sections[3].items[index] = {
                    ...state.sections[3].items[index],
                    ...data,
                };
            } else {
                // If index is out of bounds, push a new entry (add)
                state.sections[3].items.push(data);
            }
        },

        deleteJobExperience(state, action) {
            const indexToDelete = action.payload;
            state.sections[3].items = state.sections[3].items.filter((_, index) => index !== indexToDelete);
        },

        // Skills section actions
        addSkill(state, action) {
            // console.log(action.payload)
            state.sections[4].items.push(action.payload);
        },
        updateSkill(state, action) {
            const { index, data } = action.payload;
            if (index >= 0 && index < state.sections[4].items.length) {
                state.sections[4].items[index] = { ...state.sections[4].items[index], ...data };
            }
        },
        updateSkillpdf(state, action) {
            // Update the entire skills section with new data
            state.sections[4].items = action.payload.data.items || [];
        },

        deleteSkill(state, action) {
            const indexToDelete = action.payload;
            state.sections[4].items = state.sections[4].items.filter((_, index) => index !== indexToDelete);
        },

        // Languages section actions
        addLanguage(state, action) {
            state.sections[5].items.push(action.payload);
        },
        updateLanguage(state, action) {
            const { index, data } = action.payload;
            if (index >= 0 && index < state.sections[5].items.length) {
                state.sections[5].items[index] = { ...state.sections[5].items[index], ...data };
            }
        },
        deleteLanguage(state, action) {
            const indexToDelete = action.payload;
            state.sections[5].items = state.sections[5].items.filter((_, index) => index !== indexToDelete);
        },

        // Hobbies section actions
        addHobbies(state, action) {
            state.sections[8].items.push(action.payload);
        },
        updateHobbies(state, action) {
            const { index, data } = action.payload;

            if (data.header) {
                state.sections[8].header = data.header;
            }

            // Update individual items, like description
            if (index !== null && index >= 0 && index < state.sections[8].items.length) {
                state.sections[8].items[index] = {
                    ...state.sections[8].items[index],
                    ...data,
                };
            }
            // state.sections[8].items[index] = { ...state.sections[6].items[index], ...data };
        },


        deleteHobbies(state, action) {
            const indexToDelete = action.payload;
            state.sections[8].items = state.sections[8].items.filter((_, index) => index !== indexToDelete);
        },

        // References section actions
        addReference(state, action) {
            state.sections[6].items.push(action.payload);
        },
        updateReference(state, action) {
            const { index, data } = action.payload;
            if (index >= 0 && index < state.sections[6].items.length) {
                state.sections[6].items[index] = { ...state.sections[6].items[index], ...data };
            }
        },
        deleteReference(state, action) {
            const indexToDelete = action.payload;
            state.sections[6].items = state.sections[6].items.filter((_, index) => index !== indexToDelete);
        },
        addCertificates(state, action) {
            state.sections[7] = { ...state.sections[7], ...action.payload }
        },
        updateCertificates(state, action) {
            const { index, data } = action.payload;
            if (data.header) {
                state.sections[7].header = data.header
            }
            if (index !== null && index >= 0 && index < state.sections[7].items.length) {
                state.sections[7].items[index] = { ...state.sections[7].items[index], ...data }
            }
        },

        // Custom section actions
        addCustomSection(state, action) {
            const { sectionType, initialItems } = action.payload;
            const existingSection = state.sections.find(section => section.type === sectionType);

            if (existingSection) {
                // If the section already exists, update its items
                existingSection.items = [...existingSection.items, ...initialItems];
            } else {
                // If it doesn't exist, create a new custom section
                const newCustomSection = {
                    type: sectionType,
                    header: sectionType?.charAt(0)?.toUpperCase() + sectionType?.slice(1),
                    items: initialItems || [],
                };
                state.sections.push(newCustomSection);
            }
        },


        updateCustomSection(state, action) {
            const { sectionType, data } = action.payload;
            const sectionIndex = state.sections.findIndex(
                (section) => section.type === sectionType
            );

            // console.log("Reducer Input Data:", data);
            // console.log("Reducer Section Type:", sectionType);

            if (sectionIndex !== -1) {
                state.sections[sectionIndex] = {
                    ...state.sections[sectionIndex], // Keep the existing section data
                    ...data, // Overwrite with new data (header, items, etc.)
                };
            } else {
                console.error("Section not found:", sectionType);
            }
        },


        deleteCustomSection(state, action) {
            const indexToDelete = action.payload;

            if (indexToDelete >= 0 && indexToDelete < state.sections.length) {
                // Remove the custom section at the specified index
                state.sections = state.sections.filter((_, index) => index !== indexToDelete);
            }
        },
        reorderCustomSection(state, action) {
            const { sourceIndex, destinationIndex } = action.payload;

            if (
                sourceIndex >= 0 && sourceIndex < state.sections.length &&
                destinationIndex >= 0 && destinationIndex < state.sections.length
            ) {
                const [movedSection] = state.sections.splice(sourceIndex, 1);
                state.sections.splice(destinationIndex, 0, movedSection);
            }
        },

        // Design updates
        updateFontSize(state, action) {
            state.design.fontSize = action.payload;
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

        // Reordering sections
        reorderSection(state, action) {
            const { sourceIndex, destinationIndex } = action.payload;
            const [removed] = state.sections.splice(sourceIndex, 1);
            state.sections.splice(destinationIndex, 0, removed);
        },

        // Reordering items within a section
        reorderItemsInSection(state, action) {
            const { sectionIndex, sourceIndex, destinationIndex } = action.payload;
            const section = state.sections[sectionIndex];
            const [removed] = section.items.splice(sourceIndex, 1);
            section.items.splice(destinationIndex, 0, removed);
        },
    },
});

export const {
    updateProfile,
    addAbout,
    updateAbout,
    setAboutSummary,
    deleteAbout,
    addEducation,
    updateEducation,
    deleteEducation,
    addJobExperience,
    updateJobExperience,
    deleteJobExperience,
    addSkill,
    updateSkill,
    updateSkillpdf,
    deleteSkill,
    addLanguage,
    updateLanguage,
    deleteLanguage,
    addHobbies,
    updateHobbies,
    deleteHobbies,
    addReference,
    updateReference,
    deleteReference,
    addCertificates,
    updateCertificates,
    addCustomSection,
    updateCustomSection,
    deleteCustomSection,
    reorderCustomSection,
    updateFontSize,
    updateMargin,
    updateColor,
    updateLineHeight,
    reorderSection,
    reorderItemsInSection,
} = resumeSlice.actions;

export default resumeSlice.reducer;





// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     userId: '',
//     sections: [
//         {
//             header: 'profile',
//             type: 'profile',
//             profileImage: "",
//             name: "",
//             contactNumber: "",
//             email: "",
//             address: "",
//             jobTitle: "",
//             links: [""],
//         },
//         {
//             header: "about",
//             type: 'about',
//             items: [{
//                 description: ""
//             }]
//         },
//         {
//             header: "Education",
//             type: 'education',
//             items: [
//                 {
//                     degree: "",
//                     institution: "",
//                     reference: "",
//                     year: "",
//                 },
//             ],
//         },
//         {
//             header: "Work Experience",
//             type: 'workExperience',
//             items: [
//                 {
//                     jobTitle: "",
//                     company: "",
//                     duration: "",
//                     description: ""
//                 },
//             ],
//         },
//         {
//             header: "skills",
//             type: 'skills',
//             items: [
//                 {
//                     name: "",
//                     level: "Advanced",
//                 },
//             ],
//         },
//         {
//             header: "languages",
//             type: 'languages',
//             items: [
//                 {
//                     name: "",
//                     proficiency: "",
//                 },
//             ],
//         },
//         {
//             header: 'references',
//             type: 'references',
//             items: [
//                 {
//                     name: "",
//                     detail: "",
//                     contactInfo: "",
//                     email: ""
//                 },
//             ],
//         },
//         {
//             header: 'certifications',
//             type: 'certificates',
//             items: [
//                 {
//                     title: "",
//                     date: "",
//                     description: "",
//                 },
//             ],
//         },
//         {
//             header: 'Interest',
//             type: 'hobbies',
//             items: [
//                 {
//                     name: "Gaming",
//                 },
//             ],
//         },
//         {
//             header: 'Custom Section',
//             type: 'customSections',
//             items: [],
//         },
//     ],
//     design: {
//         lineHeight: 1.4,
//         fontSize: 14, // Default font size
//         margin: 5,    // Default margin
//         color: "",    // Default text color
//         fontFamily: "", // Default font family
//     },
// };

// // Helper function to get the section by type
// const findSectionByType = (state, type) => {
//     return state.sections.find(section => section.type === type);
// };

// // Another helper to find index by type
// const findSectionIndexByType = (state, type) => {
//     return state.sections.findIndex(section => section.type === type);
// };

// const resumeSlice = createSlice({
//     name: 'resume',
//     initialState,
//     reducers: {
//         // Profile updates
//         updateProfile(state, action) {
//             const profileSection = findSectionByType(state, 'profile');
//             if (profileSection) {
//                 Object.assign(profileSection, action.payload);
//             }
//         },

//         // About section actions
//         addAbout(state, action) {
//             const aboutSection = findSectionByType(state, 'about');
//             if (aboutSection) {
//                 aboutSection.items.push(action.payload);
//             }
//         },

//         updateAbout(state, action) {
//             const aboutSection = findSectionByType(state, 'about');
//             const { index, data } = action.payload;

//             if (aboutSection) {
//                 if (data.header) {
//                     aboutSection.header = data.header;
//                 }
//                 if (index !== null && index >= 0 && index < aboutSection.items.length) {
//                     aboutSection.items[index] = {
//                         ...aboutSection.items[index],
//                         ...data,
//                     };
//                 }
//             }
//         },

//         setAboutSummary(state, action) {
//             const aboutSection = findSectionByType(state, 'about');
//             const { summary } = action.payload;
//             if (aboutSection) {
//                 aboutSection.items[0].description = summary;
//             }
//         },

//         deleteAbout(state, action) {
//             const aboutSection = findSectionByType(state, 'about');
//             const index = action.payload;
//             if (aboutSection && index >= 0 && index < aboutSection.items.length) {
//                 aboutSection.items.splice(index, 1);
//             }
//         },

//         // Education section actions
//         addEducation(state, action) {
//             const educationSection = findSectionByType(state, 'education');
//             if (educationSection) {
//                 educationSection.items.push(action.payload);
//             }
//         },

//         updateEducation(state, action) {
//             const educationSection = findSectionByType(state, 'education');
//             const { index, data } = action.payload;

//             if (educationSection) {
//                 if (data.header) {
//                     educationSection.header = data.header;
//                 }
//                 if (index !== null && index >= 0 && index < educationSection.items.length) {
//                     educationSection.items[index] = { ...educationSection.items[index], ...data };
//                 }
//             }
//         },

//         deleteEducation(state, action) {
//             const educationSection = findSectionByType(state, 'education');
//             const indexToDelete = action.payload;
//             if (educationSection) {
//                 educationSection.items = educationSection.items.filter((_, index) => index !== indexToDelete);
//             }
//         },

//         // Job Experience section actions
//         addJobExperience(state, action) {
//             const jobSection = findSectionByType(state, 'workExperience');
//             if (jobSection) {
//                 jobSection.items.push(action.payload);
//             }
//         },

//         updateJobExperience(state, action) {
//             const jobSection = findSectionByType(state, 'workExperience');
//             const { index, data } = action.payload;

//             if (jobSection) {
//                 if (index !== null && index >= 0 && index < jobSection.items.length) {
//                     jobSection.items[index] = {
//                         ...jobSection.items[index],
//                         ...data,
//                     };
//                 } else {
//                     jobSection.items.push(data);
//                 }
//             }
//         },

//         deleteJobExperience(state, action) {
//             const jobSection = findSectionByType(state, 'workExperience');
//             const indexToDelete = action.payload;
//             if (jobSection) {
//                 jobSection.items = jobSection.items.filter((_, index) => index !== indexToDelete);
//             }
//         },

//         // Skills section actions
//         addSkill(state, action) {
//             const skillsSection = findSectionByType(state, 'skills');
//             if (skillsSection) {
//                 skillsSection.items.push(action.payload);
//             }
//         },

//         updateSkill(state, action) {
//             const skillsSection = findSectionByType(state, 'skills');
//             const { index, data } = action.payload;
//             if (skillsSection && index >= 0 && index < skillsSection.items.length) {
//                 skillsSection.items[index] = { ...skillsSection.items[index], ...data };
//             }
//         },

//         updateSkillpdf(state, action) {
//             const skillsSection = findSectionByType(state, 'skills');
//             if (skillsSection) {
//                 skillsSection.items = action.payload.data.items || [];
//             }
//         },

//         deleteSkill(state, action) {
//             const skillsSection = findSectionByType(state, 'skills');
//             const indexToDelete = action.payload;
//             if (skillsSection) {
//                 skillsSection.items = skillsSection.items.filter((_, index) => index !== indexToDelete);
//             }
//         },

//         // Languages section actions
//         addLanguage(state, action) {
//             const languageSection = findSectionByType(state, 'languages');
//             if (languageSection) {
//                 languageSection.items.push(action.payload);
//             }
//         },

//         updateLanguage(state, action) {
//             const languageSection = findSectionByType(state, 'languages');
//             const { index, data } = action.payload;
//             if (languageSection && index >= 0 && index < languageSection.items.length) {
//                 languageSection.items[index] = { ...languageSection.items[index], ...data };
//             }
//         },

//         deleteLanguage(state, action) {
//             const languageSection = findSectionByType(state, 'languages');
//             const indexToDelete = action.payload;
//             if (languageSection) {
//                 languageSection.items = languageSection.items.filter((_, index) => index !== indexToDelete);
//             }
//         },

//         // Hobbies section actions
//         addHobbies(state, action) {
//             const hobbiesSection = findSectionByType(state, 'hobbies');
//             if (hobbiesSection) {
//                 hobbiesSection.items.push(action.payload);
//             }
//         },

//         updateHobbies(state, action) {
//             const hobbiesSection = findSectionByType(state, 'hobbies');
//             const { index, data } = action.payload;

//             if (hobbiesSection) {
//                 if (data.header) {
//                     hobbiesSection.header = data.header;
//                 }
//                 if (index !== null && index >= 0 && index < hobbiesSection.items.length) {
//                     hobbiesSection.items[index] = {
//                         ...hobbiesSection.items[index],
//                         ...data,
//                     };
//                 }
//             }
//         },

//         deleteHobbies(state, action) {
//             const hobbiesSection = findSectionByType(state, 'hobbies');
//             const indexToDelete = action.payload;
//             if (hobbiesSection) {
//                 hobbiesSection.items = hobbiesSection.items.filter((_, index) => index !== indexToDelete);
//             }
//         },

//         // References section actions
//         addReference(state, action) {
//             const referenceSection = findSectionByType(state, 'references');
//             if (referenceSection) {
//                 referenceSection.items.push(action.payload);
//             }
//         },

//         updateReference(state, action) {
//             const referenceSection = findSectionByType(state, 'references');
//             const { index, data } = action.payload;
//             if (referenceSection && index >= 0 && index < referenceSection.items.length) {
//                 referenceSection.items[index] = { ...referenceSection.items[index], ...data };
//             }
//         },

//         deleteReference(state, action) {
//             const referenceSection = findSectionByType(state, 'references');
//             const indexToDelete = action.payload;
//             if (referenceSection) {
//                 referenceSection.items = referenceSection.items.filter((_, index) => index !== indexToDelete);
//             }
//         },

//         // Certificates section actions
//         addCertificates(state, action) {
//             const certificatesSection = findSectionByType(state, 'certificates');
//             if (certificatesSection) {
//                 Object.assign(certificatesSection, action.payload);
//             }
//         },

//         updateCertificates(state, action) {
//             const certificatesSection = findSectionByType(state, 'certificates');
//             const { index, data } = action.payload;

//             if (certificatesSection) {
//                 if (data.header) {
//                     certificatesSection.header = data.header;
//                 }
//                 if (index !== null && index >= 0 && index < certificatesSection.items.length) {
//                     certificatesSection.items[index] = { ...certificatesSection.items[index], ...data };
//                 }
//             }
//         },

//         // Custom section actions
//         addCustomSection(state, action) {
//             const { sectionType, initialItems } = action.payload;
//             let existingSection = findSectionByType(state, sectionType);

//             if (existingSection) {
//                 existingSection.items = [...existingSection.items, ...initialItems];
//             } else {
//                 const newCustomSection = {
//                     type: sectionType,
//                     header: sectionType.charAt(0).toUpperCase() + sectionType.slice(1),
//                     items: initialItems || [],
//                 };
//                 state.sections.push(newCustomSection);
//             }
//         },

//         updateCustomSection(state, action) {
//             const { sectionType, data } = action.payload;
//             const sectionIndex = findSectionIndexByType(state, sectionType);

//             if (sectionIndex !== -1) {
//                 state.sections[sectionIndex] = {
//                     ...state.sections[sectionIndex],
//                     ...data,
//                 };
//             }
//         },

//         deleteCustomSection(state, action) {
//             const indexToDelete = action.payload;
//             if (indexToDelete >= 0 && indexToDelete < state.sections.length) {
//                 state.sections = state.sections.filter((_, index) => index !== indexToDelete);
//             }
//         },

//         reorderCustomSection(state, action) {
//             const { sourceIndex, destinationIndex } = action.payload;

//             if (
//                 sourceIndex >= 0 && sourceIndex < state.sections.length &&
//                 destinationIndex >= 0 && destinationIndex < state.sections.length
//             ) {
//                 const [movedSection] = state.sections.splice(sourceIndex, 1);
//                 state.sections.splice(destinationIndex, 0, movedSection);
//             }
//         },

//         // Design updates
//         updateFontSize(state, action) {
//             state.design.fontSize = action.payload;
//         },

//         updateMargin(state, action) {
//             state.design.margin = action.payload;
//         },

//         updateColor(state, action) {
//             state.design.color = action.payload;
//         },

//         updateLineHeight(state, action) {
//             state.design.lineHeight = action.payload;
//         },

//         // Reordering sections
//         reorderSection(state, action) {
//             const { sourceIndex, destinationIndex } = action.payload;
//             const [removed] = state.sections.splice(sourceIndex, 1);
//             state.sections.splice(destinationIndex, 0, removed);
//         },

//         // Reordering items within a section
//         reorderItemsInSection(state, action) {
//             const { sectionIndex, sourceIndex, destinationIndex } = action.payload;
//             const section = state.sections[sectionIndex];
//             const [removed] = section.items.splice(sourceIndex, 1);
//             section.items.splice(destinationIndex, 0, removed);
//         },
//     },
// });

// export const {
//     updateProfile,
//     addAbout,
//     updateAbout,
//     setAboutSummary,
//     deleteAbout,
//     addEducation,
//     updateEducation,
//     deleteEducation,
//     addJobExperience,
//     updateJobExperience,
//     deleteJobExperience,
//     addSkill,
//     updateSkill,
//     updateSkillpdf,
//     deleteSkill,
//     addLanguage,
//     updateLanguage,
//     deleteLanguage,
//     addHobbies,
//     updateHobbies,
//     deleteHobbies,
//     addReference,
//     updateReference,
//     deleteReference,
//     addCertificates,
//     updateCertificates,
//     addCustomSection,
//     updateCustomSection,
//     deleteCustomSection,
//     reorderCustomSection,
//     updateFontSize,
//     updateMargin,
//     updateColor,
//     updateLineHeight,
//     reorderSection,
//     reorderItemsInSection,
// } = resumeSlice.actions;

// export default resumeSlice.reducer;

