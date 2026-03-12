import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCustomSection } from "../../../redux/resumeSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import ReactQuill from "react-quill";
import { Popover } from "antd";
import "react-quill/dist/quill.bubble.css";
import PopoverToolbar from "./popover";
import DatePickerComponent from "./datePicker";
import { updateSection } from "../../../redux/resumeSlice2";

const CustomSections = ({
  section,
  headingStyle,
  bodyTextStyle,
  style,
  color,
  fontFamily,
}) => {
  const dispatch = useDispatch();

  // State management
  const [header, setHeader] = useState(section?.header || "Projects");
  const [localItems, setLocalItems] = useState(section?.items || []);
  const [activeEditor, setActiveEditor] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const quillRefs = useRef([]); // Store refs for ReactQuill instances

  // Quill modules and formats
  const modules = {
    toolbar: {
      container: [["bold", "italic", "underline"]],
    },
  };
  const formats = ["bold", "italic", "underline", "list", "bullet", "link"];

  // Handle input changes locally
  const handleInputChange = (itemIndex, field, value) => {
    const updatedItems = [...localItems];
    updatedItems[itemIndex] = { ...updatedItems[itemIndex], [field]: value };
    setLocalItems(updatedItems); // Update local state
  };

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  // Dispatch changes to Redux on blur
  const handleBlur = (itemIndex, field) => {
    // const updatedData = {
    //   items: localItems.map((item) => ({
    //     projectName: item.projectName || "",
    //     endDate: item.endDate || "",
    //     startDate: item.startDate || "",
    //     description: item.description || "",
    //   })),
    // };

    // dispatch(
    //   updateSection({
    //     type: section.type,
    //     index: itemIndex,
    //     data: updatedData, // Dynamically update either the header or items
    //   })
    // );
    // setActiveEditor(null);
    // setActiveIndex(null);

    const previousValue = section?.items?.[itemIndex]?.[field] || "";
    const currentValue = localItems?.[itemIndex]?.[field] || "";

    // Normalize: Strip HTML and trim spaces
    const previousPlainText = stripHtml(previousValue).trim();
    const currentPlainText = stripHtml(currentValue).trim();

    // console.log(`Previous (${field}):`, previousPlainText);
    // console.log(`Current (${field}):`, currentPlainText);

    // Update Redux only if the actual content has changed
    if (currentPlainText !== previousPlainText) {
      const updatedData = {
        items: localItems.map((item) => ({
          projectName: item.projectName || "",
          endDate: item.endDate || "",
          startDate: item.startDate || "",
          description: item.description || "",
        })),
      };

      dispatch(
        updateSection({
          type: section.type,
          index: itemIndex,
          data: updatedData, // Dynamically update either the header or items
        })
      );
    }

    setActiveEditor(null);
    setActiveIndex(null);
  };

  // Handle editor click and focus ReactQuill
  const handleEditorClick = (index, field) => {
    setActiveEditor(field);
    setActiveIndex(index);

    setTimeout(() => {
      if (quillRefs.current[index] && quillRefs.current[index].focus) {
        quillRefs.current[index].focus();
      }
    }, 50); // Delay to ensure Popover is fully opened
  };

  return (
    <div
      className={`resume-section resume-section-break resume-project ${style?.style}`}
    >
      {/* Section Header */}
      {section?.items?.length > 0 && (
        <div className={`sections-title ${style?.style}`}>
          <Icon
            icon="pepicons-pop:line-x"
            width="22px"
            height="20px"
            className="iconLine"
          />
          <Icon
            icon="eos-icons:project-outlined"
            width="20px"
            height="20px"
            className="iconTitle"
            style={{ color: color }}
          />
          <div onClick={() => handleEditorClick(null, "header")}>
            {activeEditor === "header" ? (
              <div className="relative">
                <ReactQuill
                  value={header}
                  onChange={setHeader}
                  modules={modules}
                  formats={formats}
                  theme="bubble"
                  placeholder="Edit section header..."
                  onBlur={() => handleBlur("header")} // Dispatch changes on blur
                />
              </div>
            ) : (
              <h2
                style={{ ...headingStyle, fontFamily, color: color }}
                dangerouslySetInnerHTML={{ __html: header }}
              ></h2>
            )}
          </div>
        </div>
      )}

      {/* Items in the Section */}
      {localItems.map((item, itemIndex) => (
        <Popover
          key={itemIndex}
          content={
            <PopoverToolbar
              activeEditor={activeEditor}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          }
          trigger="click"
          open={activeEditor !== null && activeIndex === itemIndex} // Synchronize Popover with editor state
        >
          <div key={itemIndex} className="project-content px-1 py-2">
            {/* Project Name */}
            <div
              onClick={() => handleEditorClick(itemIndex, "projectName")}
              className="projectName-wrap"
            >
              {activeEditor === "projectName" && activeIndex === itemIndex ? (
                <div className="relative">
                  <ReactQuill
                    ref={(el) => (quillRefs.current[itemIndex] = el)} // Attach ref for ReactQuill
                    value={item.projectName || ""}
                    onChange={(value) =>
                      handleInputChange(itemIndex, "projectName", value)
                    }
                    onBlur={() => handleBlur(itemIndex, "projectName")}
                    modules={modules}
                    formats={formats}
                    theme="bubble"
                    placeholder="Write Project Name here..."
                  />
                </div>
              ) : (
                <div
                  className="projectName"
                  style={{ ...bodyTextStyle, fontFamily, color: color }}
                  dangerouslySetInnerHTML={{
                    __html: item.projectName ? item.projectName : "",
                  }}
                ></div>
              )}
            </div>

            {/* DatePicker */}
            <div>
              <DatePickerComponent />
            </div>

            {/* Project Description */}
            <div
              onClick={() => handleEditorClick(itemIndex, "description")}
              className="projectDescription-wrap"
            >
              {activeEditor === "description" && activeIndex === itemIndex ? (
                <div className="relative">
                  <ReactQuill
                    ref={(el) => (quillRefs.current[itemIndex] = el)} // Attach ref for ReactQuill
                    value={item.description || ""}
                    onChange={(value) =>
                      handleInputChange(itemIndex, "description", value)
                    }
                    onBlur={() => handleBlur(itemIndex, "description")}
                    modules={modules}
                    formats={formats}
                    theme="bubble"
                    placeholder="Write Project Description here..."
                  />
                </div>
              ) : (
                <div
                  style={{ ...bodyTextStyle, fontFamily }}
                  className={`projectDescription ${style?.style}`}
                  dangerouslySetInnerHTML={{
                    __html: item.description ? item.description : "",
                  }}
                ></div>
              )}
            </div>
          </div>
        </Popover>
      ))}
    </div>
  );
};

export default CustomSections;
