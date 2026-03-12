import React, { useEffect, useState, useRef } from "react";
import Button from "../../../../components/shared/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles for React Quill
import { useDispatch } from "react-redux";
import { updateSection } from "../../../../redux/resumeSlice2";
import { Popover } from "antd";
import PopoverToolbar from "../../../ResumeTemps/components/popover";
import { useSelector } from "react-redux";

const Strength = ({
  handleAddSection,
  isModel,
  fontFamily,
  color,
  bodyTextStyle,
  headingStyle,
}) => {
  const resume = useSelector((state) => state?.resume);
  const strengthsData = resume.sections.find(
    (section) => section?.type === "strengths"
  );

  const [sectionTitle, setSectionTitle] = useState("Strengths"); // State for section title
  const [itemTitle, setItemTitle] = useState("Go Greater"); // State for item title
  const [editorContent, setEditorContent] = useState(
    strengthsData?.items[0]?.description || ""
  ); // State for the content of the strengths description
  const [activeEditor, setActiveEditor] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const dispatch = useDispatch();
  const quillRefs = useRef([]); // Store refs for ReactQuill instances

  // Sync Redux updates when the component mounts or when Redux data changes
  useEffect(() => {
    setEditorContent(strengthsData?.items[0]?.description);
  }, [strengthsData]);

  const modules = {
    toolbar: {
      container: [["bold", "italic", "underline"]],
    },
  };

  const formats = ["bold", "italic", "underline", "list", "bullet", "link"];

  // Handle Redux updates on blur
  const handleContentBlur = () => {
    dispatch(
      updateSection({
        type: "strengths",
        data: {
          header: sectionTitle, // Title (Strengths)
          items: [
            {
              title: itemTitle, // Item title (Go Greater)
              description: editorContent, // Description content
            },
          ],
        },
      })
    );
    setActiveEditor(null);
    setActiveIndex(null);
  };

  // Add Section handler
  const handleClick = () => {
    const sectionData = {
      header: sectionTitle,
      type: "strengths",
      items: [{ title: itemTitle, description: editorContent }],
    };

    // Handle adding section (pass to parent if needed)
    handleAddSection(sectionData);

    // Dispatch action to update Redux store
    dispatch(updateSection(sectionData));
  };

  // Handle editor click and focus on Quill editor
  const handleEditorClick = (editorType, index) => {
    setActiveEditor(editorType);
    setActiveIndex(index);

    // Focus the ReactQuill editor
    setTimeout(() => {
      if (quillRefs.current[index] && quillRefs.current[index].focus) {
        quillRefs.current[index].focus();
      }
    }, 50); // Delay to ensure Popover is fully opened
  };

  return (
    <>
      {isModel ? (
        <div
          onClick={handleClick}
          className="flex flex-col gap-2 w-[359px] min-h-[174px] addSection"
        >
          <div className="relative group overflow-hidden rounded-md">
            <div className="sectionBox opacity-1 px-[10px] py-5 flex flex-col gap-1 ">
              <p className="font-OpenSan darkBlack para-text font-semibold">
                Strengths
              </p>
              <div className="flex justify-between gap-5 items-start">
                <div className="blank flex flex-col items-start gap-1">
                  <div className="flex items-center gap-1">
                    <Icon
                      icon="ph:chart-line-up"
                      width="18px"
                      height="18px"
                      className="primary"
                    />
                    <p className="font-OpenSan  para-text text-center font-semibold darkBlue">
                      Go Greater
                    </p>
                  </div>
                  <p className="font-OpenSan mediumGray para-ex-small">
                    Lorem ipsum dolor sit amet consectetur. Quis facilisi justo
                    integer malesuada.
                  </p>
                </div>
              </div>
              <Button
                className="absolute w-[60%] btn-primary opacity-0 group-hover:opacity-100 group-hover:block 
            left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out"
                text="Add section"
                minHeight={41}
              />
            </div>
          </div>
        </div>
      ) : (
        <Popover
          content={
            <PopoverToolbar
              activeEditor="strengths"
              activeIndex={0}
              setActiveIndex={setActiveIndex}
            />
          }
          trigger="click"
          open={activeEditor !== null && activeIndex === 0}
        >
          <div className="sectionBox opacity-1 px-[10px] py-5 flex flex-col gap-1">
            {/* Editable Section Title */}
            {activeEditor === "sectionTitle" && activeIndex === 0 ? (
              <input
                type="text"
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                onBlur={handleContentBlur}
                className="font-OpenSan darkBlack para-text font-semibold"
                placeholder="Enter Section Title"
                style={{ ...headingStyle, fontFamily, color }}
              />
            ) : (
              <div
                onClick={() => handleEditorClick("sectionTitle", 0)}
                style={{ ...headingStyle, color: color, fontFamily }}
                className="font-OpenSan darkBlack para-text font-semibold"
                dangerouslySetInnerHTML={{
                  __html: sectionTitle || "Strengths",
                }}
              />
            )}

            <div className="flex justify-between gap-5 items-start">
              <div className="blank flex flex-col items-start gap-1 w-full">
                <div className="flex items-center gap-1">
                  <Icon
                    icon="ph:chart-line-up"
                    width="18px"
                    height="18px"
                    className="primary"
                  />

                  {/* Editable Item Title */}
                  {activeEditor === "itemTitle" && activeIndex === 0 ? (
                    <ReactQuill
                      ref={(el) => (quillRefs.current[0] = el)} // Attach ref for ReactQuill
                      value={itemTitle}
                      onChange={setItemTitle}
                      onBlur={handleContentBlur}
                      className="font-OpenSan para-text text-center font-semibold darkBlue"
                      theme="bubble"
                      placeholder="Enter Item Title"
                      modules={modules}
                      formats={formats}
                    />
                  ) : (
                    <div
                      onClick={() => handleEditorClick("itemTitle", 0)}
                      style={{ ...bodyTextStyle, fontFamily }}
                      className="font-OpenSan para-text text-center font-semibold darkBlue"
                      dangerouslySetInnerHTML={{
                        __html: itemTitle || "Go Greater",
                      }}
                    ></div>
                  )}
                </div>

                {/* Editable Description */}
                {activeEditor === "editorContent" && activeIndex === 0 ? (
                  <ReactQuill
                    ref={(el) => (quillRefs.current[0] = el)} // Attach ref for ReactQuill
                    value={editorContent}
                    onChange={setEditorContent}
                    onBlur={handleContentBlur}
                    placeholder="Enter your strengths description..."
                    className="w-full"
                    theme="bubble"
                    modules={modules}
                    formats={formats}
                  />
                ) : (
                  <div
                    onClick={() => handleEditorClick("editorContent", 0)}
                    style={{ ...bodyTextStyle, fontFamily }}
                    dangerouslySetInnerHTML={{
                      __html:
                        editorContent ||
                        "Lorem ipsum dolor sit amet consectetur. Quis facilisi justo integer malesuada.",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </Popover>
      )}
    </>
  );
};

export default Strength;
