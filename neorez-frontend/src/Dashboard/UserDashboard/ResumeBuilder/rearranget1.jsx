import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { rearrangeSections2, removeSection } from "../../../redux/resumeSlice2";
import { Popover } from "antd";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

// Helper function to capitalize the first letter of each word
const capitalizeFirstLetter = (string) => {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1);
};

const RearrangeT1 = ({ setActiveTab }) => {
  const dispatch = useDispatch();
  const sections = useSelector((state) => state.resume.sections);

  // Handle drag and drop
  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return; // If there is no destination, return early.

    const sourceIndex = source.index;
    const destinationIndex = destination.index;
    const sourceColumn = sections[sourceIndex]?.column;
    const destinationColumn = destination.droppableId;

    // console.log("sourceIndex", sourceIndex);
    // console.log("destinationIndex", destinationIndex);
    // console.log("sourceColumn", sourceColumn);
    // console.log("destinationColumn", destinationColumn);

    // Make sure that the profile section is not draggable and cannot be dropped anywhere
    const isSourceProfile = sections[sourceIndex]?.type === "profile";
    // Check if the destination is the profile section (to prevent dropping on it)
    const isDestinationProfile =
      sections[destinationIndex]?.type === "profile" &&
      sections[destinationIndex]?.column === destinationColumn;

    if (isSourceProfile) {
      toast.warn("Profile section is not draggable.");
      return;
    }

    // console.log("isSourceProfile", isSourceProfile);
    // console.log("sections[destinationIndex]", sections[destinationIndex]);
    // console.log("isDestinationProfile", isDestinationProfile);

    // Prevent dropping on top of the profile section
    if (isDestinationProfile) {
      toast.warn("Cannot drop section on top of the profile section.");
      return;
    }

    // Handle case when right column is nearly empty
    if (sourceColumn === "right" && destinationColumn === "left") {
      const rightColumnSections = sections.filter(
        (section) => section.column === "right" && section.type !== "profile"
      );

      // If the right column only has one item (other than profile), show a warning
      if (rightColumnSections.length === 1) {
        toast.warn("Cannot move all items from the right column to the left.");
        return;
      }
    }

    // Proceed with the rearranging if the conditions are met
    dispatch(
      rearrangeSections2({
        sourceIndex,
        destinationIndex,
        destinationColumn,
      })
    );
  };

  const handleDelete = (header) => {
    dispatch(removeSection(header));
  };

  const contentDelete = (
    <div>
      <p className="darkGray para-ex-small font-OpenSan font-bold px-3 py-2">
        Remove
      </p>
    </div>
  );

  const filteredSections = sections.filter(
    (section) => section && section.header
  );

  // Render organized left and right sections dynamically
  return (
    <div className="pt-4 px-3 pb-4 h-fit w-full m-auto 2xl:px-10 xl:px-4 xl:pb-40">
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
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="flex w-full">
          {["left", "right"].map((columnId) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`w-1/2 ${columnId === "left" ? "pr-2" : "pl-2"}`}
                >
                  {filteredSections
                    .filter((section) => section.column === columnId)
                    .sort((a, b) => {
                      // Always render the profile section first
                      if (a.type === "profile") return -1;
                      if (b.type === "profile") return 1;
                      return 0; // Maintain other order
                    })
                    .map((section, index) => {
                      const isFirstRightSection =
                        columnId === "right" &&
                        index === 0 &&
                        section.column === "right"; // Check if it's the first section in the right column

                      return (
                        <Draggable
                          key={section.header}
                          draggableId={section.header}
                          index={sections.indexOf(section)}
                          isDragDisabled={section.type === "profile"} // Disable dragging of profile section
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`flex justify-between items-center primaryOpacity h-[50px] 2xl:px-4 px-2 rounded-lg ${
                                section.type === "profile"
                                  ? "bg-gray-200 cursor-not-allowed"
                                  : "hover:bg-[#2A9DF466] transition duration-300"
                              } mb-2`}
                            >
                              <div className="flex items-center">
                                <p className="para-small font-OpenSan font-normal black">
                                  {capitalizeFirstLetter(section.header)}
                                </p>
                              </div>
                              {/* Hide delete button for the first section on the right side */}
                              {!isFirstRightSection &&
                                section.type !== "profile" && (
                                  <Popover content={contentDelete}>
                                    {/* <Icon
                                      icon="material-symbols:delete"
                                      className="cursor-pointer ml-1 w-6 h-6"
                                    /> */}

                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="30px"
                                      height="30px"
                                      viewBox="0 0 24 24"
                                      style={{
                                        color: "red",
                                      }}
                                      onClick={() =>
                                        handleDelete(section.header)
                                      }
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                                      />
                                    </svg>
                                  </Popover>
                                )}
                            </div>
                          )}
                        </Draggable>
                      );
                    })}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default RearrangeT1;
