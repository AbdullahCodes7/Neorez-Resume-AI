import { Modal, Popover } from "antd";
import React, { useState } from "react";
import bin from "../../../assets/icons/dashboard/dustbin.svg";
import adjust from "../../../assets/icons/dashboard/adjust.svg";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const RearrangeCoverLetter = () => {
  const [sections, setSections] = useState([
    { id: "1", content: "Personal" },
    { id: "2", content: "Summary" },
    { id: "3", content: "Skills" },
    { id: "4", content: "Education" },
    { id: "5", content: "Languages" },
    { id: "6", content: "Certifications" },
    { id: "7", content: "Experience" },
  ]);

  // Drag and drop
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedSections = Array.from(sections);
    const [movedSection] = reorderedSections.splice(result.source.index, 1);
    reorderedSections.splice(result.destination.index, 0, movedSection);

    setSections(reorderedSections);
  };

  // Deletion
  const handleDelete = (id) => {
    const updatedSections = sections.filter((section) => section.id !== id);
    setSections(updatedSections);
  };
  const contentDelete = (
    <div>
      <p className="darkGray para-ex-small font-OpenSan font-bold px-3 py-2">
        Remove
      </p>
    </div>
  );

  return (
    <>
      {/* Rearrange section modal */}

      <div className="pt-4 px-3 xl:px-10  h-full xl:h-[95vh] pb-4 xl:pb-40 left-Area">
        <p className="text-center para-large font-OpenSan font-semibold darkGray mb-[34px]">
          Adjust your sections by <span className="primary">dragging</span>
        </p>

        <div className="flex justify-between items-center bg-[#F2F2F2] h-[50px] px-4 rounded-lg">
          <img src={adjust} alt="adjust icon" />
          <p className=" para-small font-Inter font-normal black ">Header</p>
          <Popover content={contentDelete}>
            <img src={bin} alt="dustbin icon" className="cursor-pointer" />
          </Popover>
        </div>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="sections">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex flex-col gap-4 mt-4"
              >
                {sections.map(({ id, content }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="flex justify-between items-center primaryOpacity hover:bg-[#2A9DF466]  transition duration-300 h-[50px] px-4 rounded-lg"
                        style={provided.draggableProps.style}
                      >
                        <img
                          src={adjust}
                          alt="adjust icon"
                          {...provided.dragHandleProps}
                        />
                        <p className="para-small font-Inter font-normal black">
                          {content}
                        </p>
                        <Popover content={contentDelete}>
                          <img
                            src={bin}
                            alt="dustbin icon"
                            className="cursor-pointer"
                            onClick={() => handleDelete(id)}
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
    </>
  );
};

export default RearrangeCoverLetter;
