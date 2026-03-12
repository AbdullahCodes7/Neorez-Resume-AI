import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Popover } from "antd";
import PopoverToolbar from "./popover";
import DatePickerComponent from "./datePicker";
import { updateSection } from "../../../redux/resumeSlice2";
import DeletePopover from "./deletePopover";

const Education = ({
  headingStyle,
  fontFamily,
  bodyTextStyle,
  style,
  userInfo,
  color,
  section,
}) => {
  const modules = {
    toolbar: {
      container: [["bold", "italic", "underline"]],
    },
  };
  const [activeEditor, setActiveEditor] = useState(null); // Tracks active editor for the header

  const formats = ["bold", "italic", "underline"];
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);
  const [popoverVisible, setPopoverVisible] = useState(false);

  const [localFields, setLocalFields] = useState({});
  const [activeIndex, setActiveIndex] = useState(null);
  const quillRefs = useRef([]);
  const [headerValue, setHeaderValue] = useState("");
  const educationData = section ||
    resume.sections.find((section) => section.type === "education") || {
      header: "",
      items: [],
    };

  useEffect(() => {
    if (educationData?.header) {
      setHeaderValue(educationData.header); // Initialize header value
    }

    if (educationData?.items?.length) {
      setLocalFields((prevFields) => {
        const newFields = educationData.items.reduce((acc, item, index) => {
          acc[index] = { ...item };
          return acc;
        }, {});
        if (JSON.stringify(prevFields) !== JSON.stringify(newFields)) {
          return newFields;
        }
        return prevFields;
      });
    }
  }, [educationData?.items]);

  const handleLocalChange = (index, field, value) => {
    setLocalFields((prevFields) => ({
      ...prevFields,
      [index]: {
        ...prevFields[index],
        [field]: value,
      },
    }));
  };
  const handleHeaderChange = (e) => {
    setHeaderValue(e.target.value);
  };

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleBlur = (index, field) => {
    // if (localFields[index] && localFields[index][field] !== undefined) {
    //   dispatch(
    //     updateSection({
    //       type: "education",
    //       index,
    //       data: {
    //         [field]: localFields[index][field],
    //       },
    //     })
    //   );
    // }
    // setActiveIndex(null);

    if (localFields[index] && localFields[index][field] !== undefined) {
      const previousValue = educationData?.items?.[index]?.[field] || "";
      const currentValue = localFields[index][field];

      // Normalize values by stripping HTML and trimming spaces
      const previousPlainText = stripHtml(previousValue).trim();
      const currentPlainText = stripHtml(currentValue).trim();

      // console.log(`Previous (${field}):`, previousPlainText);
      // console.log(`Current (${field}):`, currentPlainText);

      // Only update Redux if content has actually changed
      if (currentPlainText !== previousPlainText) {
        dispatch(
          updateSection({
            type: "education",
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
    if (headerValue !== educationData.header) {
      dispatch(
        updateSection({
          type: "education",
          data: { header: headerValue },
        })
      );
    }
    setActiveEditor(null); // Close editor after blur
  };

  // console.log("color", color);

  const textColor =
    educationData?.column === "right" ? "black" : style?.color || color;

  // console.log("textColor", textColor);

  if (!educationData?.items?.length) {
    return null;
  }

  return (
    <div
      className={`resume-section resume-section-break resume-education ${style?.style}`}
    >
      <div className={`sections-title ${style?.style}`}>
        <Popover
          trigger="click"
          className="absolute left-1/2 -translate-x-1/2 w-fit"
          visible={popoverVisible}
          onVisibleChange={(visible) => setPopoverVisible(visible)}
          content={
            <DeletePopover
              activeEditor="education"
              // activeIndex={activeIndex} // Pass active index
              // setActiveIndex={setActiveIndex} // Reset active index after deletion
            />
          }
        ></Popover>

        <Icon
          icon="zondicons:education"
          width="20px"
          height="20px"
          className="iconTitle"
          style={{ color }}
        />
        <Icon
          icon="pepicons-pop:line-x"
          width="22px"
          height="20px"
          className="iconLine"
          style={{ color }}
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
            {educationData?.header || "Education"}
          </h2>
        )} */}

        {/* <h2
          style={{
            ...headingStyle,
            fontFamily: fontFamily,
            // color: color || textColor.includes("black") ? "#003953" : "",

            color: color || textColor,
          }}
        >
          {educationData?.header || "Education"}
        </h2> */}
      </div>

      <div className="seperateHeading"></div>

      <div className="sectionWithLine py-2 px-1">
        <div className="line"></div>
        <div className="education-content">
          {educationData?.items?.map((item, index) => (
            <div
              key={item.id || index}
              className="education-item flex flex-col borderClick px-1 py-2"
              onClick={() => setActiveIndex(index)}
            >
              {/* Degree */}
              <Popover
                placement="topLeft"
                content={
                  activeIndex === index && (
                    <PopoverToolbar
                      activeEditor="education"
                      activeIndex={index}
                      setActiveIndex={setActiveIndex}
                    />
                  )
                }
                trigger="click"
                open={activeIndex === index}
                onOpenChange={(open) => setActiveIndex(open ? index : null)}
              />
              <div className="degree-wrap">
                <ReactQuill
                  value={
                    localFields[index]?.degree || "MBA in Business Management"
                  }
                  modules={modules}
                  formats={formats}
                  onChange={(value) =>
                    handleLocalChange(index, "degree", value)
                  }
                  onBlur={() => handleBlur(index, "degree")}
                  placeholder="Enter Degree here..."
                  theme="bubble"
                  className={`text-${fontFamily} cvBody-details text-${bodyTextStyle?.fontSize} text-color-${textColor}`}
                  style={{
                    ...bodyTextStyle,
                    fontFamily: fontFamily,
                    // color: textColor,
                  }}
                />
              </div>

              {/* Institution */}
              <div className="degree-date flex justify-between items-center">
                <div className="college-wrap w-full">
                  <ReactQuill
                    value={
                      localFields[index]?.institution ||
                      "Harvard Business School"
                    }
                    modules={modules}
                    formats={formats}
                    onChange={(value) =>
                      handleLocalChange(index, "institution", value)
                    }
                    onBlur={() => handleBlur(index, "institution")}
                    placeholder="Enter Institution here..."
                    theme="bubble"
                    className={`text-${fontFamily} cvBody-details text-${bodyTextStyle?.fontSize} text-color-${textColor}`}
                    style={{
                      ...bodyTextStyle,
                      fontFamily: fontFamily,
                      // color: textColor,
                    }}
                  />
                </div>
                <DatePickerComponent
                  sectionType="education"
                  sectionIndex={index}
                  onClick={(e) => e.stopPropagation()} // Prevent popover opening on date picker click
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
