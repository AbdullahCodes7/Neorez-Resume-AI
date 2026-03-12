import React, { useEffect, useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Popover } from "antd";
import PopoverToolbar from "./popover";
import DatePickerComponent from "./datePicker";
import { updateSection } from "../../../redux/resumeSlice2";
import DeletePopover from "./deletePopover";
const WorkExperience = ({
  bodyTextStyle,
  fontFamily,
  headingStyle,
  style,
  color,
  section,
}) => {
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
      ],
    },
  };

  const formats = ["bold", "italic", "underline", "list"];
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [localFields, setLocalFields] = useState({});
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeEditor, setActiveEditor] = useState(null); // Tracks active editor for the header
  const [headerValue, setHeaderValue] = useState(""); // Tracks the heading text value
  const quillRefs = useRef([]);

  const workExperience = section ||
    resume.sections.find((section) => section.type === "workExperience") || {
      header: "",
      items: [],
    };

  useEffect(() => {
    if (workExperience?.items?.length) {
      setLocalFields(
        workExperience.items.reduce((acc, item, index) => {
          acc[index] = { ...item };
          return acc;
        }, {})
      );
    }
    setHeaderValue(workExperience?.header || "Experience");
  }, [workExperience?.items, workExperience?.header]);

  const handleLocalChange = (index, field, value) => {
    setLocalFields((prevFields) => ({
      ...prevFields,
      [index]: {
        ...prevFields[index],
        [field]: value,
      },
    }));
  };

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleBlur = (index, field) => {
    // if (localFields[index] && localFields[index][field] !== undefined) {
    //   dispatch(
    //     updateSection({
    //       type: "workExperience",
    //       index,
    //       data: {
    //         [field]: localFields[index][field],
    //       },
    //     })
    //   );
    // }
    // setActiveIndex(null);

    if (localFields[index] && localFields[index][field] !== undefined) {
      const previousValue = workExperience?.items?.[index]?.[field] || "";
      const currentValue = localFields[index][field];

      // Normalize values: Strip HTML and trim spaces
      const previousPlainText = stripHtml(previousValue).trim();
      const currentPlainText = stripHtml(currentValue).trim();

      // console.log(`Previous (${field}):`, previousPlainText);
      // console.log(`Current (${field}):`, currentPlainText);

      // Update Redux only if text content has changed
      if (currentPlainText !== previousPlainText) {
        dispatch(
          updateSection({
            type: "workExperience",
            index,
            data: {
              [field]: currentValue,
            },
          })
        );
      }
    }
    setActiveIndex(null);
  };

  const handleHeaderBlur = () => {
    dispatch(
      updateSection({
        type: "workExperience",
        data: {
          header: headerValue,
        },
      })
    );
    setActiveEditor(null); // Exit editing mode
  };

  const textColor =
    workExperience?.column === "left" &&
    ["resumeTemp4", "resumeTemp5"].includes(style)
      ? "white"
      : style?.color || color;

  if (!workExperience?.items?.length) {
    return null;
  }

  return (
    <div className={`resume-work ${style?.style}`}>
      {/* <div className={`sections-title ${style?.style}`}>
    
        <Icon
          icon="pepicons-pop:line-x"
          width="22px"
          height="20px"
          className="iconLine"
        />
        <Icon
          icon="material-symbols-light:work"
          width="20px"
          height="20px"
          className="iconTitle"
          style={{ color: color }}
        />
        {activeEditor === "section-header" ? (
          <input
            type="text"
            value={headerValue}
            onChange={(e) => setHeaderValue(e.target.value)}
            onBlur={handleHeaderBlur}
            placeholder="Enter section header here..."
            style={{
              ...headingStyle,
              fontFamily: fontFamily,
              color: color || textColor,
              border: "none",
              outline: "none",
              fontSize: headingStyle?.fontSize || "20px",
              backgroundColor: "transparent",
              padding: "5px 0",
            }}
            autoFocus // Automatically focus when editing starts
          />
        ) : (
          <h2
            style={{
              ...headingStyle,
              fontFamily: fontFamily,
              color: color || textColor,
              cursor: "pointer",
            }}
            onClick={() => setActiveEditor("section-header")}
          >
            {headerValue}
          </h2>
        )}
      </div> */}

      <div className={`sections-title ${style?.style} relative`}>
        {/* Popover for Header */}
        <Popover
          trigger="click"
          className="absolute left-1/2 -translate-x-1/2 w-fit"
          visible={popoverVisible}
          onVisibleChange={(visible) => setPopoverVisible(visible)}
          content={
            <DeletePopover
              activeEditor="workExperience"
              // activeIndex={activeIndex} // Pass active index
              // setActiveIndex={setActiveIndex} // Reset active index after deletion
            />
          }
        ></Popover>
        <Icon
          icon="pepicons-pop:line-x"
          width="22px"
          height="20px"
          className="iconLine"
        />
        <Icon
          icon="material-symbols-light:work"
          width="20px"
          height="20px"
          className="iconTitle"
          style={{ color: color }}
        />
        {/* {activeEditor === "section-header" ? ( */}

        <input
          type="text"
          value={headerValue}
          onChange={(e) => setHeaderValue(e.target.value)}
          onBlur={() => {
            handleHeaderBlur();
            // setPopoverVisible(false);
          }}
          placeholder="Enter section header here..."
          style={{
            ...headingStyle,
            fontFamily: fontFamily,
            color: color || textColor,

            // fontSize: headingStyle?.fontSize || "20px",
          }}
          className="w-full cursor-pointer"
          onClick={() => setPopoverVisible(true)}

          // autoFocus
        />
        {/* ) : (
          
          <h2
            style={{
              ...headingStyle,
              fontFamily: fontFamily,
              color: color || textColor,
              cursor: "pointer",
            }}
            className="w-full"
            onClick={() => {
              setActiveEditor("section-header");
              setPopoverVisible(true);
              // setActiveEditor("workExperience");
            }}
          >
            {headerValue}
          </h2>
        )} */}
        {/* </Popover> */}
      </div>

      <div className="seperateHeading"></div>

      <div className="sectionWithLine">
        <div className="line"></div>
        <div>
          {workExperience?.items?.map((experience, index) => (
            <React.Fragment key={experience.id || index}>
              <Popover
                placement="topLeft"
                content={
                  activeIndex === index && (
                    <PopoverToolbar
                      activeEditor="workExperience"
                      activeIndex={index}
                      setActiveIndex={setActiveIndex}
                    />
                  )
                }
                trigger="click"
                open={activeIndex === index}
                onOpenChange={(open) => setActiveIndex(open ? index : null)}
              ></Popover>

              <div
                className={`flex flex-col borderClick px-1 py-2 experience-item`}
                onClick={() => {
                  setActiveIndex(index);
                  setActiveEditor("workExperience");
                }} // Ensure Popover opens on click
              >
                {/* Job Title Editor */}
                <div className={`job-wrap job ${style?.style}`}>
                  <div className={`job ${style?.style}`}>
                    <ReactQuill
                      value={localFields[index]?.jobTitle || "Job Title"}
                      modules={modules}
                      formats={formats}
                      onChange={(value) =>
                        handleLocalChange(index, "jobTitle", value)
                      }
                      onBlur={() => handleBlur(index, "jobTitle")}
                      placeholder="Enter Job Title here..."
                      theme="bubble"
                      className={`text-${fontFamily} popup-text-alignment cvBody-details text-${bodyTextStyle?.fontSize} text-color-${textColor}`}
                      style={{
                        fontFamily: fontFamily,
                        ...bodyTextStyle,
                      }}
                    />
                  </div>
                </div>
                {/* Company Editor */}
                <div className="flex justify-between items-center">
                  <div className="company-wrap w-full">
                    <ReactQuill
                      value={localFields[index]?.company || "Company Name"}
                      modules={modules}
                      formats={formats}
                      onChange={(value) =>
                        handleLocalChange(index, "company", value)
                      }
                      onBlur={() => handleBlur(index, "company")}
                      placeholder="Enter Company Name here..."
                      theme="bubble"
                      className={`text-${fontFamily} popup-text-alignment cvBody-details text-${bodyTextStyle?.fontSize} text-color-${textColor}`}
                      style={{
                        ...bodyTextStyle,
                        fontFamily: fontFamily,
                      }}
                    />
                  </div>
                  <div>
                    <DatePickerComponent
                      sectionType="workExperience"
                      sectionIndex={index}
                    />
                  </div>
                </div>
                {/* Description Editor */}
                <div className="description-wrap mt-2">
                  <ReactQuill
                    value={
                      localFields[index]?.description ||
                      "Add details about the job experience"
                    }
                    modules={modules}
                    formats={formats}
                    onChange={(value) =>
                      handleLocalChange(index, "description", value)
                    }
                    onBlur={() => handleBlur(index, "description")}
                    placeholder="Describe your achievements and responsibilities"
                    theme="bubble"
                    className={`description ${style?.style} popup-text-alignment text-${fontFamily} text-color-${textColor} cvBody-details text-${bodyTextStyle?.fontSize}`}
                    style={{
                      ...bodyTextStyle,
                      fontFamily: fontFamily,
                    }}
                  />
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
