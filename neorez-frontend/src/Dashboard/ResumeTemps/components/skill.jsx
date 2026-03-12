import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useDispatch, useSelector } from "react-redux";
import { updateSection } from "../../../redux/resumeSlice2";
import { Popover } from "antd";
import PopoverToolbar from "./popover";
import DeletePopover from "./deletePopover";

const Skill = ({
  style,
  bodyTextStyle,
  fontFamily,
  headingStyle,
  color,
  section,
}) => {
  // Defensive check: if section is undefined or does not have items, return null
  if (!section || typeof section !== "object" || !Array.isArray(section.items)) {
    return null;
  }

  // Quill modules for formatting
  const modules = {
    toolbar: {
      container: [["bold", "italic", "underline"]],
    },
  };

  const formats = ["bold", "italic", "underline"];
  const [headerValue, setHeaderValue] = useState("");

  const resume = useSelector((state) => state.resume || []);
  const skills =
    section.items ||
    resume?.sections?.find((section) => section?.type === "skills")?.items ||
    [];

  // console.log("section skills ==============", section);

  // console.log("Redux Skills:", skills);

  const dispatch = useDispatch();

  // State for local management of skill items
  const [localFields, setLocalFields] = useState([]);
  const [activeEditor, setActiveEditor] = useState(null); // Tracks active editor
  const [activeIndex, setActiveIndex] = useState(null);
  const quillRefs = useRef([]); // To store refs for ReactQuill editors
  const [popoverVisible, setPopoverVisible] = useState(false);

  useEffect(() => {
    // Update localFields only if the data has changed
    const updatedFields = skills?.map((item) => ({ ...item }));
    if (JSON.stringify(updatedFields) !== JSON.stringify(localFields)) {
      setLocalFields(updatedFields);
    }
    // Set headerValue initially based on Redux data
    const sectionHeader =
      resume?.sections?.find((section) => section?.type === "skills")?.header ||
      "Skills";
    setHeaderValue(sectionHeader);
  }, [skills]);

  const handleEditorClick = (index) => {
    setActiveEditor("skills");
    setActiveIndex(index);

    // Focus the ReactQuill editor after setting active states
    setTimeout(() => {
      if (quillRefs.current[index]) {
        quillRefs.current[index].focus();
      }
    }, 50);
  };

  const handleChange = (index, field, value) => {
    setLocalFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index] = { ...updatedFields[index], [field]: value || "" };
      return updatedFields;
    });
  };

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleBlur = (index, field) => {
    // Dispatch updates to Redux only if the value has changed
    // if (skills[index] && skills[index][field] !== localFields[index][field]) {
    //   dispatch(
    //     updateSection({
    //       type: "skills",
    //       index,
    //       data: { [field]: localFields[index][field] || "" },
    //     })
    //   );
    // }
    // setActiveEditor(null);
    // setActiveIndex(null);

    if (localFields[index] && localFields[index][field] !== undefined) {
      const previousValue = skills[index]?.[field] || "";
      const currentValue = localFields[index][field];

      // Normalize: Strip HTML and trim spaces
      const previousPlainText = stripHtml(previousValue).trim();
      const currentPlainText = stripHtml(currentValue).trim();

      // console.log(`Previous (${field}):`, previousPlainText);
      // console.log(`Current (${field}):`, currentPlainText);

      // Update Redux only if the actual content has changed
      if (currentPlainText !== previousPlainText) {
        dispatch(
          updateSection({
            type: "skills",
            index,
            data: { [field]: currentValue },
          })
        );
      }
    }
    setActiveEditor(null);
    setActiveIndex(null);
  };

  const handleHeaderChange = (e) => {
    setHeaderValue(e.target.value);
  };

  const handleHeaderBlur = () => {
    if (headerValue !== skills?.header) {
      dispatch(
        updateSection({
          type: "skills",
          data: { header: headerValue },
        })
      );
    }
    setActiveEditor(null);
  };

  const skillStyle = resume?.sections?.find(
    (section) => section?.type === "skills"
  );

  const textColor =
    skillStyle?.column === "right" ? color || "#003953" : style?.color || color;

  if (!skills?.length) {
    return null;
  }

  return (
    <div
      className={`resume-section resume-section-break resume-skills ${style?.style}`}
    >
      {/* Section title */}
      <div className={`sections-title ${style?.style}`}>
        <Popover
          trigger="click"
          className="absolute left-1/2 -translate-x-1/2 w-fit"
          visible={popoverVisible}
          onVisibleChange={(visible) => setPopoverVisible(visible)}
          content={
            <DeletePopover
              activeEditor="skills"
              // activeIndex={activeIndex} // Pass active index
              // setActiveIndex={setActiveIndex} // Reset active index after deletion
            />
          }
        ></Popover>

        <Icon
          icon="carbon:skill-level-basic"
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
          className="w-full"
          type="text"
          value={headerValue}
          onChange={handleHeaderChange}
          // onChange={(e) => setHeaderValue(e.target.value)}
          onBlur={handleHeaderBlur}
          // onClick={setPopoverVisible(true)}
          placeholder="Enter section header here..."
          onClick={() => setPopoverVisible(true)}
          // autoFocus
          style={{
            ...headingStyle,
            fontFamily: fontFamily,
            // color: ["resumeTemp4", "resumeTemp5"].some((temp) =>
            //   style?.includes(temp)
            // )
            //   ? textColor
            //   : color,
            color: color || textColor,
            cursor: "pointer",
          }}
        />

        {/* <h2
          style={{
            ...headingStyle,
            fontFamily: fontFamily,
            color: ["resumeTemp4", "resumeTemp5"].some((temp) =>
              style?.includes(temp)
            )
              ? textColor
              : color,
          }}
        >
          Skills
        </h2> */}
      </div>

      <div className="seperateHeading"></div>

      {/* Skills Items */}
      <div className="px-1 py-2 sectionWithLine">
        <div className="line"></div>
        <div>
          {localFields?.map((skill, index) => (
            <div key={index} className="relative">
              <Popover
                placement="top"
                content={
                  <PopoverToolbar
                    activeEditor={activeEditor}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                  />
                }
                trigger="click"
                open={activeEditor === "skills" && activeIndex === index} // Controlled by activeEditor and activeIndex
                onOpenChange={(open) => {
                  if (!open) {
                    setActiveEditor(null);
                    setActiveIndex(null);
                  }
                }}
              />
              <div
                className="popover-trigger"
                onClick={() => handleEditorClick(index)}
                style={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <ReactQuill
                  // ref={(el) => (quillRefs.current[index] = el)} // Store refs for ReactQuill editors
                  value={skill?.name || "Skills"}
                  onChange={(value) => handleChange(index, "name", value)}
                  onFocus={() => handleEditorClick(index)} // Activate Popover and editor on focus
                  onBlur={() => handleBlur(index, "name")} // Hide Popover and update Redux on blur
                  modules={modules}
                  formats={formats}
                  theme="bubble"
                  placeholder="Enter your skill here..."
                  className={` text-${fontFamily} cvBody-details text-${bodyTextStyle?.fontSize}`}
                  style={{
                    ...bodyTextStyle,
                    fontFamily: fontFamily,
                    color: textColor,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skill;
