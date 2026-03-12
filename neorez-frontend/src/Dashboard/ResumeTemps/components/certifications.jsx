import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useDispatch, useSelector } from "react-redux";
import PopoverToolbar from "./popover";
import { Popover } from "antd";
import {
  deleteItemFromSection,
  updateSection,
} from "../../../redux/resumeSlice2";

import DeletePopover from "../components/deletePopover";

const Certification = ({
  bodyTextStyle,
  fontFamily,
  headingStyle,
  style,
  color,
  section,
}) => {
  const modules = {
    toolbar: {
      container: [["bold", "italic", "underline"]],
    },
  };

  const formats = ["bold", "italic", "underline"];

  const resume = useSelector((state) => state.resume);
  const dispatch = useDispatch();
  const certificationsSection =
    section ||
    resume.sections.find((section) => section.type === "certificates");
  // Local state to manage data and UI
  const [certifications, setCertifications] = useState([]);
  const [activeEditor, setActiveEditor] = useState(null);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [localFields, setLocalFields] = useState([]); // Array for scoped states
  const [deletedFields, setDeletedFields] = useState(new Set()); // Track deleted items
  const [headerValue, setHeaderValue] = useState("Certifications");
  useEffect(() => {
    // Fetch certifications data from Redux
    const certificationsSection = resume.sections.find(
      (section) => section.type === "certificates"
    );
    if (certificationsSection && certificationsSection.items) {
      setCertifications(certificationsSection.items);
      setLocalFields(certificationsSection.items.map(() => ({}))); // Initialize localFields
      setDeletedFields(new Set());
      setHeaderValue(certificationsSection.header || "Certifications");
    }
  }, [resume]);

  const handleEditorClick = (field, index, currentData) => {
    setActiveEditor(`${field}-${index}`);
    setActiveIndex(index);

    // Ensure localFields for the index is initialized
    setLocalFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index] = {
        ...updatedFields[index],
        [field]: currentData[field] || "",
      };
      return updatedFields;
    });
  };

  const handleChange = (field, value, index) => {
    setLocalFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index] = {
        ...updatedFields[index],
        [field]: value,
      };
      return updatedFields;
    });
  };

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleBlur = (index, field) => {
    // dispatch(
    //   updateSection({
    //     type: "certificates",
    //     index,
    //     data: { [field]: localFields[index][field] },
    //   })
    // );

    // setActiveEditor(null);
    // setActiveIndex(null);

    const previousValue = certifications[index]?.[field] || "";
    const currentValue = localFields[index]?.[field] || "";

    // Normalize: Strip HTML and trim spaces
    const previousPlainText = stripHtml(previousValue).trim();
    const currentPlainText = stripHtml(currentValue).trim();

    // console.log(`Previous (${field}):`, previousPlainText);
    // console.log(`Current (${field}):`, currentPlainText);

    // Update Redux only if the actual content has changed
    if (currentPlainText !== previousPlainText) {
      dispatch(
        updateSection({
          type: "certificates",
          index,
          data: { [field]: currentValue },
        })
      );
    }

    setActiveEditor(null);
    setActiveIndex(null);
  };

  const handleHeaderChange = (e) => {
    setHeaderValue(e.target.value); // Update header value as user types
  };

  const handleHeaderBlur = () => {
    dispatch(
      updateSection({
        type: "certificates",
        data: { header: headerValue }, // Save header to Redux
      })
    );
  };

  const handleDelete = (index, type) => {
    // Dispatch the Redux action to delete the item
    dispatch(deleteItemFromSection({ type, index }));

    // Optionally update local state if needed
    setCertifications((prev) => prev.filter((_, i) => i !== index));
    setActiveEditor(null); // Reset active editor
    setActiveIndex(null); // Reset active index
  };

  if (!certifications || certifications.length === 0) {
    return null; // Do not render the section if there is no data
  }

  const textColor =
    certificationsSection?.column === "left" &&
    ["resumeTemp4", "resumeTemp5"].includes(style)
      ? "white"
      : style?.color || color;

  // const textColor = style?.color || color || "inherit";

  return (
    <div className={`resume-certification ${style?.style}`}>
      <div className={`sections-title certification-class ${style?.style}`}>
        <Popover
          trigger="click"
          className="absolute left-1/2 -translate-x-1/2 w-fit"
          visible={popoverVisible}
          onVisibleChange={(visible) => setPopoverVisible(visible)}
          content={
            <DeletePopover
              activeEditor="certificates"
              // activeIndex={activeIndex} // Pass active index
              // setActiveIndex={setActiveIndex} // Reset active index after deletion
            />
          }
        ></Popover>

        <Icon
          icon="iconamoon:certificate-badge-fill"
          width="20px"
          height="20px"
          className="iconTitle"
          style={{ color: color }}
        />
        <Icon
          icon="pepicons-pop:line-x"
          width="22px"
          height="20px"
          className="iconLine"
          style={{ color: color }}
        />
        <input
          type="text"
          value={headerValue}
          onChange={handleHeaderChange}
          onBlur={() => handleHeaderBlur}
          placeholder="Enter section header"
          style={{
            ...headingStyle,
            fontFamily: fontFamily,
            color: color || textColor,
            cursor: "pointer",
            width: "100%",
          }}
          className="w-full cursor-pointer"
          onClick={() => setPopoverVisible(true)}
          // autoFocus
        />
      </div>
      <div className="seperateHeading"></div>

      <div className="sectionWithLine px-1 py-2 flex flex-col certifi-content">
        <div className="line"></div>
        <div className="flex flex-col gap-2">
          {certifications.map((certification, index) => {
            if (deletedFields.has(index)) return null; // Skip deleted items

            return (
              <div key={index} className="relative">
                <Popover
                  placement="top"
                  content={
                    <PopoverToolbar
                      activeEditor="certificates"
                      activeIndex={activeIndex}
                      setActiveIndex={setActiveIndex}
                      // handleDelete={handleDelete} // Pass handleDelete to PopoverToolbar
                    />
                  }
                  trigger="click"
                  open={
                    activeEditor === `title-${index}` ||
                    activeEditor === `description-${index}`
                  }
                  onOpenChange={(open) => {
                    if (!open) {
                      setActiveEditor(null);
                      setActiveIndex(null);
                    }
                  }}
                >
                  <div className="popover-container">
                    {/* Title */}
                    <div
                      className="title-wrap"
                      onClick={() =>
                        handleEditorClick("title", index, certification)
                      }
                    >
                      <ReactQuill
                        value={
                          localFields[index]?.title || certification.title || ""
                        }
                        modules={modules}
                        formats={formats}
                        theme="bubble"
                        placeholder="Enter title here..."
                        onChange={(value) =>
                          handleChange("title", value, index)
                        }
                        onBlur={() => handleBlur(index, "title")}
                        className={` text-${fontFamily} cvBody-details text-${bodyTextStyle?.fontSize} text-color-${textColor}`}
                        style={{
                          ...bodyTextStyle,
                          fontFamily: fontFamily,
                          color: color,
                          zIndex: activeEditor === `title-${index}` ? 1000 : 1,
                        }}
                      />
                    </div>

                    {/* Description */}
                    <div
                      className="description-wrap"
                      onClick={() =>
                        handleEditorClick("description", index, certification)
                      }
                    >
                      <ReactQuill
                        value={
                          localFields[index]?.description ||
                          certification.description ||
                          ""
                        }
                        modules={modules}
                        formats={formats}
                        theme="bubble"
                        placeholder="Enter description here..."
                        onChange={(value) =>
                          handleChange("description", value, index)
                        }
                        onBlur={() => handleBlur(index, "description")}
                        className={` text-${fontFamily} cvBody-details text-${bodyTextStyle?.fontSize}`}
                        style={{
                          ...bodyTextStyle,
                          fontFamily: fontFamily,
                          zIndex:
                            activeEditor === `description-${index}` ? 1000 : 1,
                        }}
                      />
                    </div>
                  </div>
                </Popover>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Certification;
