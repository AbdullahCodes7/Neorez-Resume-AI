import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import bin from "../../../assets/icons/dashboard/dustbin.svg";
import adjust from "../../../assets/icons/dashboard/adjust.svg";
import { rearrangeSections, removeSection } from "../../../redux/resumeSlice2";
import { Icon } from "@iconify/react/dist/iconify.js";

// Expected sections for comparison
const expectedSections = [
  "profile",
  "about",
  "education",
  "customSections",
  "skills",
  "workExperience",
  "languages",
  "certificates",
  "hobbies",
  "summary",
  "customTitle",
  "trainingCourses",
  "projects",
  "strengths",
];

// Helper function to check for missing sections
const checkMissingSections = (sections) => {
  const existingSectionTypes = sections.map((section) => section.type);
  return expectedSections.filter(
    (type) => !existingSectionTypes.includes(type)
  );
};

// Helper function to check if a section has content
const hasContent = (section) => {
  if (section.type === "profile") {
    return (
      section?.name ||
      section?.jobTitle ||
      section?.contactNumber ||
      section?.email
    );
  }
  if (section.type === "summary") {
    return true; // Always show the summary section
  }
  if (section.type === "hobbies") {
    // Special handling for hobbies section
    return section.items && Array.isArray(section.items)
      ? section.items.some((item) => item?.name?.trim())
      : false;
  }
  if (section.items && Array.isArray(section.items)) {
    return section.items.some((item) =>
      Object?.values(item)?.some((value) => value?.trim())
    );
  }
  return true; // Default to true to include empty sections
};

// Helper function to capitalize the first letter of each word
const capitalizeFirstLetter = (string) => {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1);
};

const Rearrange = ({ setActiveTab }) => {
  const dispatch = useDispatch();

  // Fetching sections from Redux store
  const sections = useSelector((state) => state.resume.sections);

  console.log("sections", sections);

  const filteredSections = sections.filter(Boolean);

  // Check for missing sections
  const missingSections = checkMissingSections(sections);
  // console.log("Missing Sections:", missingSections);

  // Filter out non-draggable sections (like "Profile")
  const draggableSections = filteredSections
    .filter((section) => section.type !== "profile")
    .map((section, index) => ({
      ...section,
      uniqueId: `${section.type}-${index}`,
    }));

  // Drag and drop logic based on index
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return; // No change in position

    // Map the draggable index back to the actual index in the `sections` array
    const actualSourceIndex = sections.findIndex(
      (section) => section.header === draggableSections[sourceIndex].header
    );
    const actualDestinationIndex = sections.findIndex(
      (section) => section.header === draggableSections[destinationIndex].header
    );

    // Dispatch the rearrange action to update the section order in Redux
    dispatch(
      rearrangeSections({
        sourceIndex: actualSourceIndex,
        destinationIndex: actualDestinationIndex,
      })
    );
  };

  // Handle section deletion
  const handleDelete = (header) => {
    dispatch(removeSection(header)); // Dispatch remove action based on header
  };

  const contentDelete = (
    <div>
      <p className="darkGray para-ex-small font-OpenSan font-bold px-3 py-2">
        Remove
      </p>
    </div>
  );

  return (
    <div className="pt-4 px-3 pb-4  w-full m-auto xl:px-10 xl:pb-40 left-Area h-fit">
      <div className="flex justify-end items-center cursor-pointer mt-2">
        <Icon
          icon="radix-icons:cross-2"
          width="20px"
          height="20px"
          className="text-black hover:text-blue-500"
          onClick={() => setActiveTab(null)}
        />
      </div>
      <p className="text-center para-large font-OpenSan font-semibold darkGray mb-[34px]">
        Adjust your sections by <span className="primary">dragging</span>
      </p>

      {/* Non-draggable profile section (handled separately) */}
      {filteredSections.find((section) => section.type === "profile") && (
        <div className="flex justify-between items-center bg-[#F2F2F2] h-[50px] px-4 rounded-lg mb-4">
          <p className="para-small font-OpenSan font-normal black">Profile</p>
          <Popover content={contentDelete}>
            {/* <img src={bin} alt="dustbin icon" className="cursor-pointer" /> */}
          </Popover>
        </div>
      )}

      {/* Draggable sections */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable-sections">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col gap-4 mt-4"
            >
              {draggableSections
                .filter((section) => hasContent(section))
                .map((section, index) => (
                  <Draggable
                    key={section.uniqueId} // Use a unique ID for each draggable item
                    draggableId={section.uniqueId}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex justify-between items-center primaryOpacity hover:bg-[#2A9DF466] transition duration-150 h-[50px] px-4 rounded-lg"
                      >
                        <div className="flex items-center">
                          <img
                            src={adjust}
                            alt="adjust icon"
                            className="mr-2 cursor-pointer adjust-icon"
                          />
                          <p className="para-small font-OpenSan font-normal black">
                            {capitalizeFirstLetter(section.header)}
                          </p>
                        </div>
                        <Popover content={contentDelete}>
                          <img
                            src={bin}
                            alt="dustbin icon"
                            className="cursor-pointer"
                            onClick={() => handleDelete(section.header)}
                          />
                        </Popover>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Rearrange;
