import AiWriteButton from "../../UserDashboard/aiWriteButton";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import add from "../../../assets/icons/dashboard/add.svg";
import { useDispatch } from "react-redux";

import {
  addItemToSection,
  deleteItemFromProfile,
  deleteItemFromProjects,
  deleteItemFromSection,
  undoLastChange,
} from "../../../redux/resumeSlice2";
import {
  addBodySection,
  deleteProfileField,
  removeBodySection,
} from "../../../redux/coverLetterSlice";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import { useSectionsContext } from "../../../App";
import UndoButton from "./undo";
import UserProfileSettingsWithModal from "./setting";

const PopoverToolbar = ({
  activeEditor,
  activeIndex,
  onDelete,
  onAddSection,
  handleDelete,
  setActiveIndex,
}) => {
  // console.log("activeEditor INDEX", activeIndex);
  // console.log("editorName ", editorName);
  // console.log("activeEditor popover", activeEditor);

  // if (activeEditor === "undefined") {
  //   return;
  // }
  // if (activeIndex === "undefined") {
  //   return;
  // }
  const dispatch = useDispatch();
  const [isUndoModalOpen, setIsUndoModalOpen] = useState(false);
  const { sectionsState, setSectionsState } = useSectionsContext(); // Get context state
  // if (!activeEditor || activeIndex === undefined) return;
  // console.log("sectionsState", sectionsState);
  // Handlers for adding new items to a section

  // Handle deleting fields by index and section
  // const handleDeleteField = (activeIndex, activeEditor) => {
  //   console.log("trigeerred deleteField");
  //   console.log("activeIndex, activeEditor", activeIndex, activeEditor);

  //   // if (activeIndex !== undefined && activeIndex !== null) {
  //   if (activeEditor === "profile") {
  //     // Special handling for profile deletion (if you want to delete the entire profile)
  //     dispatch(deleteItemFromProfile({ index: activeIndex }));
  //   } else if (
  //     ["email", "phone", "linkedIn", "location"].includes(activeEditor)
  //   ) {
  //     // For individual contact fields like email, phone, LinkedIn, etc.
  //     dispatch(deleteProfileField({ field: activeEditor }));
  //   } else if (activeEditor === "body") {
  //     dispatch(removeBodySection(activeIndex));

  //     // else if (activeEditor === "date") {
  //     //   dispatch(removeBodySection(activeIndex));
  //     // } else if (activeEditor === "company") {
  //     //   dispatch(removeBodySection(activeIndex));
  //     // } else if (activeEditor === "address") {
  //     //   dispatch(removeBodySection(activeIndex));
  //   } else if (activeEditor === "workExperience") {
  //     dispatch(
  //       deleteItemFromSection({ type: "workExperience", index: activeIndex })
  //     );
  //   } else if (activeEditor === "trainingCourses") {
  //     dispatch(
  //       deleteItemFromSection({ type: "trainingCourses", index: activeIndex })
  //     );
  //   } else if (activeEditor === "projects") {
  //     dispatch(deleteItemFromSection({ type: "projects", index: activeIndex }));
  //   } else if (activeEditor === "skills") {
  //     dispatch(deleteItemFromSection({ type: "skills", index: activeIndex }));
  //   } else if (activeEditor === "about") {
  //     dispatch(deleteItemFromSection({ type: "about", index: activeIndex }));
  //   } else if (activeEditor === "certificates") {
  //     dispatch(
  //       deleteItemFromSection({ type: "certificates", index: activeIndex })
  //     );
  //   } else if (activeEditor === "languages") {
  //     dispatch(
  //       deleteItemFromSection({ type: "languages", index: activeIndex })
  //     );
  //   } else {
  //     dispatch(
  //       deleteItemFromSection({
  //         type: activeEditor,
  //         index: activeIndex || 0,
  //       })
  //     );
  //   }
  //   // setActiveIndex(null);
  //   // }
  // };

  const handleDeleteField = () => {
    // console.log("Deleting field:", { activeIndex, activeEditor });

    switch (activeEditor) {
      case "profile":
        // Special handling for profile deletion
        dispatch(deleteItemFromProfile({ index: activeIndex }));
        break;

      case "email":
      case "phone":
      case "linkedIn":
      case "location":
        // Deleting individual contact fields
        dispatch(deleteProfileField({ field: activeEditor }));
        break;

      case "body":
        dispatch(removeBodySection(activeIndex));
        break;

      case "workExperience":
        dispatch(
          deleteItemFromSection({ type: "workExperience", index: activeIndex })
        );
        break;

      case "trainingCourses":
        dispatch(
          deleteItemFromSection({ type: "trainingCourses", index: activeIndex })
        );
        break;

      case "projects":
        dispatch(
          deleteItemFromSection({ type: "projects", index: activeIndex })
        );
        break;

      case "skills":
        dispatch(deleteItemFromSection({ type: "skills", index: activeIndex }));
        break;

      case "about":
        dispatch(deleteItemFromSection({ type: "about", index: activeIndex }));
        break;

      case "certificates":
        dispatch(
          deleteItemFromSection({ type: "certificates", index: activeIndex })
        );
        break;

      case "languages":
        dispatch(
          deleteItemFromSection({ type: "languages", index: activeIndex })
        );
        break;

      default:
        // Generic case for other editor types
        dispatch(
          deleteItemFromSection({
            type: activeEditor,
            index: activeIndex || 0,
          })
        );
        break;
    }

    // Optionally reset activeIndex after deletion
    setActiveIndex(null);
  };

  const handleAddAbout = () => {
    dispatch(
      addItemToSection({
        type: "about",
        item: {
          description:
            "What's the one thing that makes you the best candidate for this job",
        },
      })
    );
  };

  const handleAddJobExperience = () => {
    dispatch(
      addItemToSection({
        type: "workExperience",
        item: {
          jobTitle: "Job Title",
          company: "Company Name",
          duration: "",
          description: "",
        },
      })
    );
  };

  const handleAddEducation = () => {
    dispatch(
      addItemToSection({
        type: "education",
        item: {
          degree: "",
          institution: "",
          reference: "",
          year: "",
        },
      })
    );
  };
  const handleAddSkill = () => {
    dispatch(
      addItemToSection({
        type: "skills",
        item: {
          name: "",
          level: "",
        },
      })
    );
  };

  const handleAddLanguage = () => {
    dispatch(
      addItemToSection({
        type: "languages",
        item: {
          name: "",
          proficiency: "",
        },
      })
    );
  };

  const handleAddHobbies = () => {
    dispatch(
      addItemToSection({
        type: "hobbies",
        item: {
          name: "",
        },
      })
    );
  };

  // Add certifications section items
  const handleAddCertification = () => {
    dispatch(
      addItemToSection({
        type: "certificates",
        item: {
          title: "Certified Project Manager",
          date: "March 2020",
          description: "Completed PMP certification from PMI.",
        },
      })
    );
  };
  const handleAddProjects = () => {
    dispatch(
      addItemToSection({
        type: "projects",
        item: {
          projectName: "New Project",
          description: "<ul><li>New project description</li></ul>",
        },
      })
    );
  };

  const handleAddReference = () => {
    dispatch(
      addItemToSection({
        type: "references",
        item: {
          name: "john doe",
          detail: "details",
          contactInfo: "123456789",
          email: "example@gmail.com",
        },
      })
    );
  };

  const handleAddCoverLetterBody = () => {
    // dispatch(addBodySection());
    if (onAddSection) {
      onAddSection(); // Call the add section function passed as a prop
    }
  };

  const strategy = {
    education: handleAddEducation,
    skills: handleAddSkill,
    workExperience: handleAddJobExperience,
    about: handleAddAbout,
    hobbies: handleAddHobbies,
    languages: handleAddLanguage,
    references: handleAddReference,
    certificates: handleAddCertification,
    projects: handleAddProjects,
    body: handleAddCoverLetterBody,
  };

  // Add new item handler for skills
  const handleAddNewField = () => {
    if (activeEditor === "skills") {
      handleAddSkill(); // Calls the function to add a new skill
    } else {
      const action = strategy[activeEditor];
      if (action) {
        action();
      }
    }
  };

  const undoPointer = useSelector((state) => state.resume.undoPointer);
  const sections = useSelector((state) => state.resume.sections);

  const handleUndo = () => {
    // console.log("first undoPointer");
    setIsUndoModalOpen(false);
    dispatch(undoLastChange());
    // dispatch(undoLastChange({ sectionType: activeEditor, index: activeIndex }));
  };

  //add teh sectiosn to context

  // Function to update context after adding an item
  const updateContextWithNewItem = (sectionType, newItem) => {
    // console.log("sectionType", sectionType);
    // console.log("newItem", newItem);

    const updatedSections = [...sectionsState.sections]; // Copy the current sections from context
    const targetSection = updatedSections.find(
      (section) => section.type === sectionType
    );

    if (targetSection) {
      // Add the new item to the respective section
      targetSection?.items?.push(newItem);

      // Update the context state with the new item added
      setSectionsState({ sections: updatedSections });
    }
  };

  // Function to handle adding new fields based on the active editor type
  const handleAddNewContextField = () => {
    let newItem;
    switch (activeEditor) {
      case "skills":
        newItem = { name: "", level: "" };
        break;
      case "workExperience":
        newItem = {
          jobTitle: "job Title",
          company: "Company Name",
          duration: "",
          description: "add details about the job experience",
        };
        break;
      case "education":
        newItem = { degree: "", institution: "", reference: "", year: "" };
        break;
      case "languages":
        newItem = { name: "", proficiency: "" };
        break;
      case "hobbies":
        newItem = { name: "" };
        break;
      case "certificates":
        newItem = {
          title: "New Certification",
          date: "",
          description: "Describe the certification or course",
        };
        break;
      case "references":
        newItem = {
          name: "New Reference",
          detail: "Reference Details",
          contactInfo: "123456789",
          email: "example@example.com",
        };
        break;
      default:
        return; // Do nothing if the editor type is not recognized
    }

    // Dispatch the Redux action to add the item
    // dispatch(
    //   addItemToSection({
    //     type: activeEditor,
    //     item: newItem,
    //   })
    // );

    // Now update the context with the new item
    updateContextWithNewItem(activeEditor, newItem);
  };

  return (
    <>
      {/* Undo Confirmation Modal */}
      <Modal
        title="Confirm Undo"
        visible={isUndoModalOpen}
        onOk={handleUndo} // Call handleUndo when the user confirms
        onCancel={() => setIsUndoModalOpen(false)} // Close the modal on cancel
        okText="Yes, Undo"
        cancelText="Cancel"
      >
        <p>Are you sure you want to undo the changes?</p>
      </Modal>
      {activeEditor !== "footer" && (
        <div
          className="flex justify-center  items-center p-2 "
          style={{
            gap:
              activeEditor !== "footer" &&
              [
                "strengths",
                "summary",
                "projects",
                "customTitle",
                "trainingCourses",
                // "education",
              ].includes(activeEditor)
                ? "10px"
                : "10px",
          }}
        >
          {[
            "strengths",
            "summary",
            "customTitle",
            "trainingCourses",
            "date",
            "company",
            "address",
            "footer",
            "letterTo",
            "body",
            "name",
            "links",
            "phone",
            "location",
            "email",
            "designation",
            // "links",
            // "location",
            // "phone",
            // "email",
            // "education",
            // "education",
          ].includes(activeEditor) ? null : (
            <>
              <div
                className="cursor-pointer flex justify-center items-center gap-1 font-bold"
                onClick={() => {
                  handleAddNewField();
                  handleAddNewContextField();
                }}
              >
                <Icon icon="ic:round-add" width="30px" height="30px" />
                Add New
              </div>
              <div className="h-6 w-[0.7px] bg-[#C9C9C9]"></div>
            </>
          )}
          {[
            "strengths",
            "summary",
            "projects",
            "customTitle",
            "trainingCourses",
            "date",
            "company",
            "address",
            "about",
            "education",
            "workExperience",
            "hobbies",
            "certificates",
            "references",
            "languages",
            "skills",
            // "footer",
            // "letterTo",
            "body",
          ].includes(activeEditor) && (
            //  && activeEditor !== "footer"
            <div
              className=" cursor-pointer  "
              onClick={() => {
                handleDeleteField();
                if (handleDelete && activeIndex !== undefined) {
                  handleDelete(activeIndex); // Call delete handler on click
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-7 11q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17M7 6v13z"
                />
              </svg>
            </div>
          )}
          {[
            "about",
            "skills",
            "workExperience",
            "project",
            "body",
            "strengths",
            "summary",
            "projects",
            "customTitle",
            "trainingCourses",
            "education",
            // "education",
          ].includes(activeEditor) && activeEditor != "footer" ? (
            <div className="h-6 w-[0.7px] bg-[#C9C9C9]"></div>
          ) : null}
          {/* //undo */}
          {[
            "about",
            "workExperience",
            "summary",
            "education",
            "skills",
            "customTitle",
            "projects",
          ].includes(activeEditor) ? (
            <>
              <div>
                {/* <Icon
                icon="ic:twotone-undo"
                width="30px"
                height="30px"
                // style={{
                //   color: "black",
                //   opacity: hasUserModifications && undoPointer > 0 ? 1 : 0.5, // Dim the icon when disabled
                //   cursor:
                //     hasUserModifications && undoPointer > 0
                //       ? "pointer"
                //       : "not-allowed", // Show 'not-allowed' cursor when disabled
                // }}
                className="cursor-pointer"
                onClick={
                  // hasUserModifications && undoPointer > 0 ?
                  handleUndo
                  // : null
                } // Disable onClick when conditions aren't met
              /> */}
                <UndoButton
                  activeEditor={activeEditor}
                  activeIndex={activeIndex}
                />
              </div>
              <div className="h-6 w-[0.7px] bg-[#C9C9C9]"></div>
            </>
          ) : (
            ""
          )}
          <div>
            {[
              "about",
              // "education",
              "workExperience",
              "project",
              "body",
              "strengths",
              "summary",
              "projects",
              "customTitle",
              "trainingCourses",
              "skills",
              // "education",
            ].includes(activeEditor) ? (
              <AiWriteButton
                activeEditor={activeEditor}
                activeIndex={activeIndex}
              />
            ) : null}
          </div>
          {![
            "about",
            "education",
            "workExperience",
            "project",
            "body",
            "strengths",
            "summary",
            "projects",
            "customTitle",
            "trainingCourses",
            "skills",
            "certificates",
            "languages",
            "hobbies",
            "address",
            "company",
            "date",
          ].includes(activeEditor) ? (
            <UserProfileSettingsWithModal />
          ) : null}
        </div>
      )}
    </>
  );
};

export default PopoverToolbar;

// onClick={
//   () => {
//     console.log(
//       "activeEditor, activeIndex:::::",
//       activeEditor,
//       activeIndex
//     );
//     handleDeleteField(activeIndex, activeEditor);

//     // () => {
//     // if (handleDelete && activeIndex !== undefined) {
//     //   handleDelete(activeIndex); // Call delete handler on click
//     // }
//     // if (activeIndex !== undefined && activeIndex !== null) {
//     // handleDeleteField(activeIndex, activeEditor);
//   }
//   // }
// }
