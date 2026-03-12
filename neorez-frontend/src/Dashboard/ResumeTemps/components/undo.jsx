import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { useSectionsContext } from "../../../App"; // Access context API
import { undoLastChange } from "../../../redux/resumeSlice2"; // Redux action
import { useSelector } from "react-redux";
import { Modal } from "antd";

const UndoButton = ({ activeEditor, activeIndex }) => {
  const { sectionsState } = useSectionsContext(); // Get boilerplate data from context
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);

  //   console.log("resume:", resume);
  // console.log("sectionsState: undo", sectionsState);

  // Add a flag to prevent rapid multiple undo clicks
  const [isUndoing, setIsUndoing] = useState(false);
  const [isUndoModalOpen, setIsUndoModalOpen] = useState(false);

  const handleUndo = () => {
    // Prevent multiple clicks in rapid succession
    if (isUndoing) return;

    // Set flag to true to block further undo actions
    setIsUndoing(true);

    // console.log("Starting undo...");

    // Check if activeEditor and activeIndex are valid
    if (!activeEditor || activeIndex === undefined) {
      //   console.error("Active editor or index is not defined");
      setIsUndoing(false); // Reset flag
      return;
    }

    // Get the boilerplate section data from context (this is where the original/expected values are)
    const boilerplateSection = sectionsState?.sections?.find(
      (sec) => sec.type === activeEditor
    );

    // Get the active section data (from Redux state)
    const activeSection = resume?.sections?.find(
      (sec) => sec.type === activeEditor
    );

    // console.log("boilerplateSection", boilerplateSection);
    // console.log("activeSection", activeSection);

    // Check that both the sections exist
    if (boilerplateSection && activeSection) {
      //   console.log("Found sections to undo:", {
      //     boilerplateSection,
      //     activeSection,
      //   });

      // Ensure both sections have items and that the item at activeIndex exists
      if (
        boilerplateSection.items &&
        activeSection.items &&
        activeSection.items[activeIndex]
      ) {
        const boilerplateItem = boilerplateSection.items[activeIndex];
        const activeItem = activeSection.items[activeIndex];

        // console.log("Boilerplate Item:", boilerplateItem);
        // console.log("Active Item before undo:", activeItem);

        // Create a new item with the updated description from the boilerplate
        // const updatedActiveItem = {
        //   ...activeItem,
        //   description: boilerplateItem.description,
        // };

        const updatedActiveItem = { ...boilerplateItem };
        // Dispatch the undo action to Redux
        dispatch(
          undoLastChange({
            type: activeEditor,
            index: activeIndex,
            // data: { description: updatedActiveItem.description },
            data: updatedActiveItem,
          })
        );

        // console.log("Undo action dispatched to Redux.");

        // Reset flag to allow further actions
        setIsUndoing(false);
        setIsUndoModalOpen(false); // Close the modal after the undo is performed
      } else {
        console.error(
          `Item at index ${activeIndex} does not exist in section ${activeEditor}`
        );
        setIsUndoing(false); // Reset flag in case of error
      }
    } else {
      console.error(
        `Boilerplate section ${activeEditor} or active section not found`
      );
      setIsUndoing(false); // Reset flag in case of error
      setIsUndoModalOpen(false); // Close the modal after the undo is performed
    }
  };

  // Function to open the undo confirmation modal

  // const handleUndo = () => {
  //   if (!activeEditor || activeIndex === undefined) {
  //     console.error("Active editor or index is not defined");
  //     return;
  //   }

  //   const boilerplateSection = sectionsState?.sections?.find(
  //     (sec) => sec.type === activeEditor
  //   );

  //   console.log("boilerplateSection", boilerplateSection);

  //   const activeSection = resume?.sections?.find(
  //     (sec) => sec.type === activeEditor
  //   );

  //   console.log("activeSection", activeSection);

  //   if (boilerplateSection && activeSection) {
  //     const boilerplateItem = boilerplateSection.items[activeIndex];
  //     if (boilerplateItem) {
  //       dispatch(
  //         undoLastChange({
  //           type: activeEditor,
  //           index: activeIndex,
  //           data: { ...boilerplateItem },
  //         })
  //       );
  //       setIsUndoModalOpen(false); // Close the modal
  //     } else {
  //       setIsUndoModalOpen(false); // Close the modal
  //       //undo karwana ha skill section ko us ma issue aa rha hn
  //       console.error(
  //         `Item at index ${activeIndex} does not exist in section ${activeEditor}`
  //       );
  //     }
  //   } else {
  //     setIsUndoModalOpen(false); // Close the modal
  //     console.error(
  //       `Boilerplate section ${activeEditor} or active section not found`
  //     );
  //   }
  // };

  const openUndoModal = () => {
    setIsUndoModalOpen(true);
  };

  // Safely compare the items of both sections, ensuring they are defined

  // Compare the actual items of both sections based on the activeEditor type
  const isUndoDisabled = () => {
    const boilerplateSection = sectionsState?.sections?.find(
      (sec) => sec.type === activeEditor
    );
    const activeSection = resume?.sections?.find(
      (sec) => sec.type === activeEditor
    );

    // console.log("boilerplateSection", boilerplateSection);
    // console.log("activeSection", activeSection);

    if (!boilerplateSection || !activeSection) {
      // console.log("first");
      return true; // If no section found, disable the undo button
    }

    // Function to remove <p> tags from description and normalize other values if needed
    const normalizeDescription = (description) => {
      // console.log("description", description);
      if (typeof description !== "string") {
        // If description is not a string, return it as-is or convert it to an empty string
        return description || "";
      }
      return description
        .replace(/<\/?p>/g, "") // Remove <p> and </p> tags
        .replace(/<\/?(ul|li)>/g, "") // Remove <ul>, </ul>, <li>, and </li> tags
        .trim();
    };

    // Recursive function to deeply compare two objects or arrays
    const deepCompare = (obj1, obj2) => {
      // if (obj1 === obj2) return true; // If they are the same reference or both are null/undefined
      // console.log("obj", obj1, obj2);

      if (
        typeof obj1 !== "object" ||
        typeof obj2 !== "object" ||
        obj1 === null ||
        obj2 === null
      ) {
        return obj1 === obj2; // Direct comparison for primitive values
      }

      // Compare the keys (properties)
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
      // console.log("test", keys1, keys2);

      if (keys1.length !== keys2.length) return false; // If the number of properties is different, return false

      // Compare each property recursively
      for (let key of keys1) {
        if (!keys2.includes(key)) return false; // If a property in obj1 is missing in obj2, return false

        // If the property is a description, normalize it
        if (key === "description") {
          // console.log(
          //   "normalizeDescription(obj1[key]) !== normalizeDescription(obj2[key]",
          //   normalizeDescription(obj1[key]) !== normalizeDescription(obj2[key])
          // );
          if (
            normalizeDescription(obj1[key]) !== normalizeDescription(obj2[key])
          ) {
            return false; // Compare descriptions after normalizing
          }
          // } else {
          //   console.log("sdffffffffffffffffffffffff");
          //   // Otherwise, perform a deep comparison of the property values
          //   if (!deepCompare(obj1[key], obj2[key])) {
          //     return false; // If any property is different, return false
          //   }
          // }
        }
      }
      return true; // If all properties match
    };

    // Compare all sections
    if (boilerplateSection.items.length !== activeSection.items.length) {
      return false; // If the number of items is different, return false
    }

    for (let i = 0; i < boilerplateSection.items.length; i++) {
      // Deeply compare each item in the items array
      if (!deepCompare(boilerplateSection.items[i], activeSection.items[i])) {
        return false; // If any item is different, return false
      }
    }
    // console.log("last return");
    return true; // If all items match, return true
  };

  const isUndoDisabledValue = isUndoDisabled();
  // console.log("isUndoDisabled", isUndoDisabledValue);
  return (
    <>
      <button
        className={`flex items-center cursor-pointer bg-inherit text-black p-0 shadow-none ${
          isUndoDisabledValue ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        // onClick={() => {
        //   console.log("Undo button clicked");
        //   handleUndo();
        // }}
        onClick={!isUndoDisabledValue ? openUndoModal : undefined}
        disabled={isUndoDisabledValue}
        // style={{
        //   pointerEvents: isUndoDisabledValue ? "none" : "auto", // Disable the button when undo is not allowed
        //   cursor: isUndoDisabledValue ? "not-allowed" : "pointer", // Change the cursor when disabled
        // }}
      >
        {/* <Icon
          icon="ic:twotone-undo"
          width="30px"
          height="30px"
          // onClick={openUndoModal}
          style={{
            opacity: isUndoDisabledValue ? 0.5 : 1, // Make icon semi-transparent when disabled,
          }}
        /> */}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
          style={{
            opacity: isUndoDisabledValue ? 0.5 : 1, // Make icon semi-transparent when disabled,
          }}
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 9v5h5m11 2c-.497-4.5-3.367-8-8-8c-2.73 0-5.929 2.268-7.294 5.5"
          />
        </svg>
      </button>

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
    </>
  );
};

export default UndoButton;
