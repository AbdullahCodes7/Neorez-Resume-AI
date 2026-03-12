import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import PopoverToolbar from "./popover";
import { Popover } from "antd";
import { updateSection } from "../../../redux/resumeSlice2";
import DeletePopover from "./deletePopover";

const About = ({
  bodyTextStyle,
  headingStyle,
  fontFamily,
  style,
  color,
  section,
}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [headerValue, setHeaderValue] = useState("");
  const [editorValues, setEditorValues] = useState([]); // Local state for each editor's value
  const quillRefs = useRef([]);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const resume = useSelector((state) => state.resume);
  const dispatch = useDispatch();
  const [activeEditor, setActiveEditor] = useState("");
  // Retrieve "about" section data

  // console.log("section", section);

  const about =
    section || resume.sections.find((section) => section?.type === "about");

  // console.log("first about", about);

  const modules = {
    toolbar: {
      container: [["bold", "italic", "underline"]],
    },
  };
  const formats = ["bold", "italic", "underline", "list", "bullet", "link"];

  // Initialize header and item values
  useEffect(() => {
    if (about) {
      setHeaderValue(about.header || "");
      setEditorValues(about.items?.map((item) => item.description || "") || []);
    }
  }, [about]);

  // Handle blur for section header
  const handleHeaderBlur = () => {
    dispatch(
      updateSection({
        type: "about",
        index: null,
        data: { header: headerValue },
      })
    );
  };

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  // Handle blur for ReactQuill editor
  const handleAboutBlur = (index) => {
    const previousValue = about?.items?.[index]?.description || "";
    const currentValue = editorValues[index];

    // Normalize values by stripping HTML and trimming spaces
    const previousPlainText = stripHtml(previousValue).trim();
    const currentPlainText = stripHtml(currentValue).trim();

    // console.log("previousPlainText:", previousPlainText);
    // console.log("currentPlainText:", currentPlainText);

    // Only update Redux if the plain text content has changed
    if (currentPlainText !== previousPlainText) {
      dispatch(
        updateSection({
          type: "about",
          index,
          data: { description: currentValue },
        })
      );
    }
    // setActiveEditor(null); // Close editor
  };

  // Handle local changes to the Quill editor
  const handleAboutChangeLocal = (index, value) => {
    const updatedEditorValues = [...editorValues];
    updatedEditorValues[index] = value;
    setEditorValues(updatedEditorValues);
  };

  const textColor =
    about?.column === "left" && ["resumeTemp4", "resumeTemp5"].includes(style)
      ? "white"
      : style?.color || color;

  return (
    <>
      {about && about.items?.length > 0 && (
        <div className={` resume-about ${style?.style}`}>
          {/* About Me Section Header */}
          <div className={`sections-title ${style?.style} relative`}>
            <Popover
              className="absolute left-1/2 -translate-x-1/2 w-fit"
              placement="top"
              trigger="click"
              visible={popoverVisible}
              onVisibleChange={(visible) => setPopoverVisible(visible)}
              content={
                <DeletePopover
                  activeEditor="about"
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
            {/* {activeEditor === "section-header" ? ( */}
            <input
              className="w-full"
              type="text"
              value={headerValue}
              onChange={(e) => setHeaderValue(e.target.value)}
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
            {/* ) : (
              <h2
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
                className="w-full"
                onClick={() => {
                  setActiveEditor("section-header");
                  setPopoverVisible(true);
                  // setActiveEditor("workExperience");
                }}
              >
                {about?.header || "About Me"}
              </h2>
            )} */}
          </div>
          <div className="seperateHeading"></div>
          {/* About Content */}
          <div className="sectionWithLine">
            <div className="line"></div>
            <div>
              {about.items.map((item, index) => (
                <>
                  <Popover
                    key={index}
                    content={
                      <PopoverToolbar
                        activeEditor={activeEditor}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                      />
                    }
                    trigger="click"
                    open={activeIndex === index}
                    onOpenChange={(open) => setActiveIndex(open ? index : null)}
                  />
                  <div
                    className="px-1 py-2 borderClick"
                    onClick={() => {
                      setActiveEditor("about");
                      setActiveIndex(index);
                      // setTimeout(() => {
                      //   if (quillRefs.current[index]) {
                      //     quillRefs.current[index].focus();
                      //   }
                      // }, 0);
                    }}
                  >
                    <ReactQuill
                      // ref={(el) => (quillRefs.current[index] = el)}
                      value={editorValues[index]}
                      onChange={(value) => handleAboutChangeLocal(index, value)}
                      onBlur={() => handleAboutBlur(index)}
                      modules={modules}
                      formats={formats}
                      theme="bubble"
                      className={`h-auto text-${fontFamily} cvBody-details text-${bodyTextStyle?.fontSize} text-color-${textColor}`}
                      placeholder="Write your introduction here..."
                      style={{
                        ...bodyTextStyle,
                        fontFamily: fontFamily,
                        border:
                          activeEditor === index ? "1px solid blue" : "none", // Add border when active
                        transition: "border 0.3s",
                      }}
                    />
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
