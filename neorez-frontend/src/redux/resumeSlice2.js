import { createSlice } from "@reduxjs/toolkit";
import { saveToUndoStack } from "./actions/helperFunctionUnDoStack";

// Helper function to get section by type
const findSectionByType = (state, type) => {
    return state.sections.find(section => section.type === type);
};

// Helper function to get index by type
const findSectionIndexByType = (state, type) => {
    return state.sections.findIndex(section => section.type === type);
};

// Initial state for the design properties
const initialDesignState = {
    lineHeight: 1.4,
    fontSize: 12, // Default font size
    margin: 5,    // Default margin
    color: "",    // Default text color
    fontFamily: "Poppins", // Default font family
};

const initialState = {
    uid: "",
    userId: '',
    templateId: '',
    resumeRef: null,
    sections: [
        {
            header: 'profile',
            type: 'profile',
            profileImage: "",
            name: "ISABEEL MERCADO",
            contactNumber: "+1234567890",
            email: "isabel.mercado@example.com",
            address: "123 Main St, New York, NY",
            jobTitle: "Business Manager",
            links: ["https://linkedin.com/in/isabelmercado"],
            column: "left",
            visibility: {
                // profileImage: false,
                // name: true,
                contactNumber: true,
                email: true,
                address: true,
                // jobTitle: true,
                links: false,
            },
        },
        {
            header: "about",
            type: 'about',
            items: [{
                description: "A highly skilled business manager with 10+ years of experience in managing cross-functional teams, developing strategies, and driving business growth.",
                isAIgenerated: false,
            }],
            column: "right"
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
                // {
                //     degree: "Bachelor of Business Administration",
                //     institution: "New York University",
                //     reference: "Prof. Jane Smith",
                //     startDate: "September 2008",
                //     endDate: "June 2012"
                // },
            ],
        },
        {
            column: "right",
            header: "Work Experience",
            type: "workExperience",
            items: [
                {
                    jobTitle: "Senior Business Manager",
                    company: "ABC Corp",
                    startDate: "July 2018",
                    endDate: "Present",
                    description: "Leading a team of 15 in overseeing day-to-day business operations, developing marketing strategies, and driving revenue growth.",
                    isAIgenerated: false,
                },
                {
                    jobTitle: "Business Analyst",
                    company: "XYZ Ltd",
                    startDate: "June 2014",
                    endDate: "June 2018",
                    description: "Analyzed business processes, developed improvement strategies, and provided detailed reports to stakeholders.",
                    isAIgenerated: false,
                },
            ],
        },
        {
            column: "left",
            header: "skills",
            type: 'skills',
            items: [
                {
                    name: "Project Management",
                    level: "Expert",
                },
                {
                    name: "Data Analysis",
                    level: "Advanced",
                },
                {
                    name: "Strategic Planning",
                    level: "Expert",
                },
            ],
        },
        // {
        //     column: "left",
        //     header: "languages",
        //     type: 'languages',
        //     items: [
        //         {
        //             name: "English",
        //             proficiency: "Native",
        //         },

        //     ],
        // },
        // {
        //     header: 'references',
        //     type: 'references',
        //     items: [
        //         {
        //             name: "John Doe",
        //             detail: "Former Manager at ABC Corp",
        //             contactInfo: "+1234567890",
        //             email: "john.doe@example.com"
        //         },

        //     ],
        // },
        {
            column: "right",
            header: 'certifications',
            type: 'certificates',
            items: [
                {
                    title: "Certified Project Manager",
                    date: "March 2020",
                    description: "Completed PMP certification from PMI.",
                    isAIgenerated: false,
                },

            ],
        },
        // {
        //     column: "right",
        //     header: 'Interest',
        //     type: 'hobbies',
        //     items: [
        //         {
        //             name: "Gaming",
        //         },
        //         {
        //             name: "Reading",
        //         },

        //     ],
        // },
        // {
        //     header: 'Custom Section',
        //     type: 'customSections',
        //     items: [],
        // },

    ],
    resumeName: "",
    extension: false,
    design: initialDesignState,
    undoStack: [],
    undoPointer: -1,
};

const resumeSlice = createSlice({
    name: 'resume',
    initialState,
    reducers: {
        // updateSection(state, action) {
        //     // console.log("Received action:", action);
        //     const { type, index, data } = action.payload;
        //     const section = state.sections.find((section) => section.type === type);

        //     if (section) {
        //         if (index !== undefined && index !== null) {
        //             console.log("Updating item at index", index);
        //             section.items[index] = { ...section.items[index], ...data };
        //         } else {
        //             console.log("Updating entire section");
        //             Object.assign(section, data);
        //         }
        //     }
        // },

        // updateSection(state, action) {
        //     const { type, index, data } = action.payload;
        //     const section = state.sections.find((section) => section.type === type);

        //     // Log the section type and data received
        //     console.log(`Updating section: ${type}`);
        //     console.log("Data received for update:", data);
        //     console.log("Index for update (if applicable):", index);

        //     if (section) {
        //         if (index !== undefined && index !== null) {
        //             // Ensure that the item exists at the given index
        //             if (section.items[index]) {
        //                 // Log the current state of the item before updating
        //                 console.log("Before update:", section.items[index]);

        //                 section.items[index] = { ...section.items[index], ...data };

        //                 // Log the updated state of the item
        //                 console.log("After update:", section.items[index]);
        //             } else {
        //                 console.error(`Item at index ${index} does not exist in section ${type}`);
        //             }
        //         } else {
        //             console.log("Updating entire section with new data");
        //             Object.assign(section, data);
        //         }
        //     } else {
        //         console.error(`Section ${type} not found`);
        //     }
        // },
        // updateSection(state, action) {
        //     const { type, index, data } = action.payload;
        //     const section = state.sections.find((section) => section.type === type);

        //     if (section) {
        //         // Update `isAIgenerated` to true to indicate this section has user modifications
        //         if (index !== undefined && index !== null) {
        //             if (section.items[index]) {
        //                 // Set isAIgenerated to true on user modification
        //                 section.items[index] = { ...section.items[index], ...data, isAIgenerated: true };
        //             } else {
        //                 console.error(`Item at index ${index} does not exist in section ${type}`);
        //             }
        //         } else {
        //             saveToUndoStack(state, type, null, section);
        //             Object.assign(section, { ...data, isAIgenerated: true }); // Set isAIgenerated to true for the entire section
        //         }

        //         // Save state to undo stack before making changes if it's a user modification
        //         // saveToUndoStack(state);
        //     } else {
        //         console.error(`Section ${type} not found`);
        //     }
        // },
        updateSection(state, action) {
            const { type, index, data } = action.payload;
            // console.log("type, index, data", type, index, data)

            const section = findSectionByType(state, type);
            // console.log("section redux", section)
            if (section) {
                // saveToUndoStack(state); // Save current state before making changes
                if (index !== undefined && index !== null) {
                    if (section.items[index]) {
                        // console.log(`Saving previous data for index ${index} in section ${type}`);
                        // saveToUndoStack(state, type, index, section.items[index]);
                        // console.log("section items", section.items[index])
                        section.items[index] = { ...section.items[index], ...data, isAIgenerated: true };
                    } else {
                        console.error(`Item at index ${index} does not exist in section ${type}`);
                    }
                } else {
                    // console.log(`Saving previous data for entire section: ${type}`);
                    // saveToUndoStack(state, type, null, section);

                    Object.assign(section, { ...data, isAIgenerated: true });
                }
                // saveToUndoStack(state);

                // saveToUndoStack(state);
            } else {
                console.error(`Section ${type} not found`);
            }
        },

        // updateSection(state, action) {
        //     const { type, index, data } = action.payload;
        //     const section = state.sections.find((section) => section.type === type);

        //     // Log the section type and data received
        //     // console.log(`Updating section: ${type}`);
        //     // console.log("Data received for update:", data);
        //     // console.log("Index for update (if applicable):", index);

        //     if (section) {
        //         if (index !== undefined && index !== null) {
        //             // Ensure that the item exists at the given index
        //             if (section.items[index]) {
        //                 // Log the current state of the item before updating
        //                 // console.log("Before update:", section.items[index]);

        //                 section.items[index] = { ...section.items[index], ...data };

        //                 // Log the updated state of the item
        //                 // console.log("After update:", section.items[index]);
        //             } else {
        //                 console.error(`Item at index ${index} does not exist in section ${type}`);
        //             }
        //         } else {
        //             // If no index is provided, update the entire section
        //             console.log("Updating entire section with new data");
        //             Object.assign(section, data);
        //         }
        //     } else {
        //         console.error(`Section ${type} not found`);
        //     }
        // },
        updateAllSections(state, action) {
            state.sections = action.payload.sections; // Make sure this handles the column correctly
        },

        // In your Redux reducer

        updateAllExtensionSections(state, action) {
            const { cv, extension } = action.payload;  // Destructure the payload to get cv and extension

            // console.log("cv in redux", cv)

            // Ensure the cv object has a sections property and is an array
            state.sections = Array.isArray(cv) ? cv : [cv];
            // state.sections = Array.isArray(cv.sections) ? cv.sections : [];

            // Update the extension field
            state.extension = extension;
        },



        // updateAllSections(state, action) {
        //     // Destructure the sections and extension from the action payload
        //     const { cv, extension } = action.payload;

        //     // Return the updated state with sections and extension updated
        //     return {
        //         ...state,
        //         sections: cv,  // Update sections directly
        //         extension: extension, // Update extension directly
        //     };
        // }
        // ,
        rearrangeSections: (state, action) => {
            const { sourceIndex, destinationIndex } = action.payload;

            // Create a shallow copy of the sections array
            const reorderedSections = [...state.sections];
            // console.log('Reordered Sections:', reorderedSections);

            // Remove the section from the source index
            const [movedSection] = reorderedSections.splice(sourceIndex, 1);

            // Insert the section at the destination index
            reorderedSections.splice(destinationIndex, 0, movedSection);

            // Update state with the reordered sections array
            state.sections = reorderedSections;
        },
        // Add a new section
        addSection: (state, action) => {
            const { newSection } = action.payload;
            // Push the new section to the sections array
            state.sections.push(newSection);
        },
        addItemToSection(state, action) {
            const { type, item } = action.payload;
            const section = findSectionByType(state, type);
            if (section) {
                section.items.push(item);
            }
        },
        removeSection: (state, action) => {
            const headerToRemove = action.payload;
            // Filter out the section with the given header
            state.sections = state.sections.filter(
                (section) => section.header !== headerToRemove
            );
        },

        deleteItemFromSection(state, action) {
            const { type, index } = action.payload;
            const section = findSectionByType(state, type);

            // console.log("Reducer delete triggered for section:", section);
            // console.log("Deleting item at index:", index);

            if (section && section.items) {
                if (index >= 0 && index < section.items.length) {
                    if (section.items.length === 1) {
                        state.sections = state.sections.filter((sec) => sec.type !== type);
                    } else {
                        section.items = section.items.filter((_, i) => i !== index);
                        state.sections = state.sections.map((sec) =>
                            sec.type === type ? { ...sec, items: section.items } : sec
                        );
                    }
                }
            }
        },

        // deleteItemFromSection(state, action) {
        //     const { type, index } = action.payload;
        //     const section = findSectionByType(state, type);

        //     if (section && section.items) {
        //         if (index >= 0 && index < section.items.length) {
        //             // Remove the item
        //             section.items = section.items.filter((_, i) => i !== index);
        //             state.sections = state.sections.map((sec) =>
        //                 sec.type === type ? { ...sec, items: section.items } : sec
        //             );
        //         }
        //     }
        // },


        deleteItemFromProjects(state, sectionType, index) {
            const section = findSectionByType(state, sectionType);
            // console.log("index in deleteItemFromSection", index)
            // console.log("action.payload in deleteItemFromSection", state)
            // console.log("section in deleteItemFromSection", section)
            if (section && section.items && index >= 0 && index < section.items.length) {
                // If section has items and the index is valid, remove the item at the index
                section.items.splice(index, 1);
            } else {
                console.error(`Invalid index or section type not found: ${sectionType}`);
            }
        },

        deleteItemFromProfile(state, action) {
            const { index } = action.payload;
            const profileSection = findSectionByType(state, "profile");

            if (profileSection && index >= 0 && index < profileSection.items.length) {
                profileSection.items.splice(index, 1); // Remove item from profile section
            }
        },

        updateResumeName(state, action) {
            // console.log("state rename resume", action.payload)
            state.resumeName = action.payload;
        },
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
        updateTemplateId(state, action) {
            state.templateId = action.payload;
        },
        updateResumeRef: (state, action) => {
            // console.log("action.payload ref", action.payload)
            state.resumeRef = action.payload;  // Add this action for resumeRef
        },
        // New reset action
        resetResumeState(state) {
            return initialState; // Reset to initial state
        },
        // Action to reset design settings to defaults
        resetDesignDefaults(state) {
            state.design = initialDesignState; // Reset to initial design state
        },
        updateUid(state, action) {
            state.uid = action.payload; // Update uid with the generated value
        },
        // rearrangeSections2: (state, action) => {
        //     const { sourceIndex, destinationIndex, destinationColumn } = action.payload;

        //     const sections = [...state.sections];
        //     const [movedSection] = sections.splice(sourceIndex, 1);

        //     // Update the column if it changes
        //     movedSection.column = destinationColumn;

        //     // Insert the section into its new position
        //     sections.splice(destinationIndex, 0, movedSection);

        //     state.sections = sections;
        // },




        rearrangeSections2: (state, action) => {
            const { sourceIndex, destinationIndex, destinationColumn } = action.payload;

            const sections = [...state.sections];

            // Remove the section being moved
            const [movedSection] = sections.splice(sourceIndex, 1);

            movedSection.column = destinationColumn;

            // Ensure profile section stays at the top of its column
            const profileSectionIndex = sections.findIndex(
                (section) => section.type === "profile" && section.column === destinationColumn
            );

            if (profileSectionIndex !== -1) {
                // Prevent the profile section from being moved
                if (destinationIndex === profileSectionIndex) {
                    return; // If it's already at the top, do nothing
                }

                // Ensure the profile section stays at the top of the column
                const destinationIndexAdjusted =
                    destinationIndex < profileSectionIndex ? profileSectionIndex + 1 : destinationIndex;

                sections.splice(destinationIndexAdjusted, 0, movedSection);
            } else {
                // If no profile in destination column, just insert the section normally
                sections.splice(destinationIndex, 0, movedSection);
            }

            // Ensure profile stays at the top of its column
            const profileSection = sections.find(
                (section) => section.type === "profile" && section.column === movedSection.column
            );

            if (profileSection) {
                const profileIndex = sections.indexOf(profileSection);
                sections.splice(profileIndex, 1);
                sections.unshift(profileSection); // Ensure profile is always at the top of the column
            }

            // Update the state with the new sections order
            state.sections = sections;
        },













        // ==========================


        // rearrangeSections2: (state, action) => {
        //     const { sourceIndex, destinationIndex, sourceColumn, destinationColumn } = action.payload;

        //     // Find the section being moved
        //     const sourceSections = state.sections.filter(section => section.column === sourceColumn);

        //     // Check if sourceSections is not empty and sourceIndex is valid
        //     if (!sourceSections.length || sourceIndex < 0 || sourceIndex >= sourceSections.length) {
        //         console.error("Invalid source index or no sections found in source column.");
        //         return; // Exit if invalid
        //     }

        //     const movedSection = sourceSections[sourceIndex];

        //     // Create a new array excluding the moved section
        //     const remainingSections = state.sections.filter(section => section.header !== movedSection.header);

        //     // Update the column of the moved section if changing columns
        //     const updatedSection = {
        //         ...movedSection,
        //         column: destinationColumn,
        //     };

        //     // Insert the moved section into the new position within the destination column
        //     const destinationSections = remainingSections.filter(section => section.column === destinationColumn);

        //     // Adjust the index to prevent out of bounds
        //     const validDestinationIndex = Math.min(destinationIndex, destinationSections.length);

        //     // Insert the moved section into the destination array
        //     destinationSections.splice(validDestinationIndex, 0, updatedSection);

        //     // Combine the updated sections back into the state
        //     state.sections = [
        //         ...remainingSections.filter(section => section.column !== destinationColumn),
        //         ...destinationSections,
        //     ];
        // },


        undoLastChange(state, action) {
            const { type, index, data } = action.payload;

            // console.log("Received payload in undo reducer:", action.payload);

            // Helper to find the section by type
            const findSectionByType = (state, type) =>
                state.sections.find((section) => section.type === type);

            const section = findSectionByType(state, type);

            if (!section) {
                console.error(`Section ${type} not found`);
                return state; // Return the unchanged state if no section is found
            }

            if (index !== undefined && index !== null) {
                // Ensure `section.items` exists and the item at `index` exists
                if (section.items && section.items[index]) {
                    // console.log(`Undoing entire item at index ${index} in section ${type}`);

                    // Immutable update: Create a new section and a new item array
                    const updatedItems = [...section.items];

                    // Replace the entire item at the given index with the new data (full object replacement)
                    updatedItems[index] = { ...data }; // Replace the item with the full object from the payload

                    // Return the updated state with the modified section
                    return {
                        ...state,
                        sections: state.sections.map((s) =>
                            s.type === type ? { ...s, items: updatedItems } : s
                        ),
                    };
                } else {
                    console.error(`Item at index ${index} does not exist in section ${type}`);
                }
            } else {
                console.error(`Index is required to update a specific item`);
            }

            return state; // Return the unchanged state if no updates occurred
        }

        ,

        // undoLastChange(state, action) {
        //     const { sectionType, index } = action.payload; // Accept sectionType and index
        //     const section = findSectionByType(state, sectionType);

        //     if (!section) {
        //         console.error(`Section ${sectionType} not found.`);
        //         return;
        //     }
        //     console.log("section", section);

        //     if (section.changeHistory && section.changeHistory.length > 0) {
        //         console.log("section.changeHistory", section.changeHistory);

        //         // Find the most recent change for a specific index or section
        //         const lastChangeIndex = section.changeHistory.findIndex(
        //             change => change.index === index || index === undefined || index === null
        //         );

        //         if (lastChangeIndex !== -1) {
        //             // Retrieve and remove the specific change from changeHistory
        //             const [lastChange] = section.changeHistory.splice(lastChangeIndex, 1);

        //             console.log("Undoing last change:", lastChange);

        //             if (index !== undefined && index !== null) {
        //                 // Revert only the updated fields for a specific item
        //                 if (section.items[index]) {
        //                     const updatedItem = { ...section.items[index] }; // Clone the current item
        //                     const revertedFields = { ...lastChange.previousData }; // Revert fields to previous data

        //                     // Merge reverted fields back into the item
        //                     Object.assign(updatedItem, revertedFields);
        //                     section.items[index] = updatedItem; // Update the item in the array

        //                     console.log(`Reverted fields in item at index ${index}:`, revertedFields);
        //                 } else {
        //                     console.error(`Item at index ${index} does not exist in section ${sectionType}`);
        //                 }
        //             } else {
        //                 // Revert general section updates (e.g., non-item-specific changes)
        //                 Object.assign(section, lastChange.previousData);

        //                 console.log(`Reverted fields in section ${sectionType}:`, lastChange.previousData);
        //             }
        //         } else {
        //             console.warn(`No changes to undo for index ${index} in section ${sectionType}`);
        //             console.log("Current changeHistory:", section.changeHistory);
        //         }
        //     } else {
        //         console.warn(`No changes to undo for section ${sectionType}`);
        //         console.log("Current changeHistory:", section ? section.changeHistory : null);
        //     }
        // }



        undoItemChange(state, action) {
            const { sectionType, index } = action.payload;
            const section = findSectionByType(state, sectionType);

            if (section && section.changeHistory && section.changeHistory.length > 0) {
                // Filter history to find changes related to the specific index
                const itemHistory = section.changeHistory.filter(change => change.index === index);

                if (itemHistory.length > 0) {
                    // Undo the most recent change for this index
                    const lastChange = itemHistory.pop();

                    // Revert the item to its previous state
                    section.items[index] = lastChange.previousData;

                    // Update the section's change history
                    section.changeHistory = section.changeHistory.filter(change => change !== lastChange);
                } else {
                    console.warn(`No changes to undo for item at index ${index} in section ${sectionType}`);
                }
            } else {
                console.warn(`No changes to undo for section ${sectionType}`);
            }
        },

        toggleFieldVisibility: (state, action) => {
            const { field } = action.payload;
            const profile = state.sections.find((section) => section.type === "profile");
            if (profile) {
                // Prevent toggling the 'name' field
                if (field === "name") {
                    return; // Exit without making changes
                }

                profile.visibility[field] = !profile.visibility[field];
            }
        },


        // New reducer to delete a section by its type
        deleteSectionByType: (state, action) => {
            const typeToDelete = action.payload; // The section type to delete

            // console.log("typeToDelete in redux ", typeToDelete)
            state.sections = state.sections.filter(
                (section) => section.type !== typeToDelete
            );
        },





    },
});

export const { updateSection, resetResumeState, toggleFieldVisibility, updateResumeName,
    addItemToSection, updateAllSections, deleteItemFromProjects,
    addSection, deleteSectionByType,
    removeSection,
    deleteItemFromProfile,
    rearrangeSections,
    deleteItemFromSection,
    updateFontSize,
    updateFontFamily,
    updateMargin,
    updateColor,
    updateLineHeight, rearrangeSections2,
    updateTemplateId, updateResumeRef, updateUid,
    resetDesignDefaults, undoLastChange, updateAllExtensionSections } = resumeSlice.actions;
export default resumeSlice.reducer;
