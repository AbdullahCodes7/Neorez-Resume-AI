import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import PopoverToolbar from "./popover";
import { Popover } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateSection } from "../../../redux/resumeSlice2";
import DeletePopover from "../components/deletePopover";
const Languages = ({
  style,
  bodyTextStyle,
  headingStyle,
  color,
  fontFamily,
  section,
}) => {
  const modules = {
    toolbar: {
      container: [["bold", "italic", "underline"]],
    },
  };

  const formats = ["bold", "italic", "underline"];
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);
  const [headerValue, setHeaderValue] = useState("");

  const languageSection =
    section || resume.sections.find((section) => section.type === "languages");

  const [activeIndex, setActiveIndex] = useState(null);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverVisible1, setPopoverVisible1] = useState(false);
  const [localLanguages, setLocalLanguages] = useState(
    JSON.parse(JSON.stringify(languageSection?.items || []))
  );
  const quillRefs = useRef([]);

  // Update `localLanguages` only when Redux `languageSection.items` changes
  useEffect(() => {
    if (
      JSON.stringify(localLanguages) !==
      JSON.stringify(languageSection?.items || [])
    ) {
      setLocalLanguages(
        JSON.parse(JSON.stringify(languageSection?.items || []))
      );
    }
    setHeaderValue(languageSection?.header || "Languages");
  }, [languageSection?.items]);

  const handleEditorClick = (index) => {
    setActiveIndex(index);
    setPopoverVisible(true);

    setTimeout(() => {
      if (quillRefs.current[index] && quillRefs.current[index].focus) {
        quillRefs.current[index].focus();
      }
    }, 50);
  };

  const handleLanguageChange = (index, field, value) => {
    setLocalLanguages((prevLanguages) => {
      const updatedLanguages = [...prevLanguages];
      updatedLanguages[index] = {
        ...updatedLanguages[index],
        [field]: value,
      };
      return updatedLanguages;
    });
  };

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleBlur = (index, field) => {
    // Dispatch changes to Redux only if the value has changed
    // if (
    //   localLanguages[index] &&
    //   languageSection?.items[index]?.[field] !== localLanguages[index]?.[field]
    // ) {
    //   dispatch(
    //     updateSection({
    //       type: "languages",
    //       index,
    //       data: { [field]: localLanguages[index][field] || "" },
    //     })
    //   );
    // }
    // setPopoverVisible(false);
    // setActiveIndex(null);

    if (localLanguages[index]) {
      const previousValue = languageSection?.items[index]?.[field] || "";
      const currentValue = localLanguages[index]?.[field] || "";

      // Normalize: Strip HTML and trim spaces
      const previousPlainText = stripHtml(previousValue).trim();
      const currentPlainText = stripHtml(currentValue).trim();

      // console.log(`Previous (${field}):`, previousPlainText);
      // console.log(`Current (${field}):`, currentPlainText);

      // Update Redux only if the actual content has changed
      if (currentPlainText !== previousPlainText) {
        dispatch(
          updateSection({
            type: "languages",
            index,
            data: { [field]: currentValue },
          })
        );
      }
    }

    setPopoverVisible(false);
    setActiveIndex(null);
  };

  const handleHeaderChange = (e) => {
    setHeaderValue(e.target.value); // Update header value as user types
  };

  const handleHeaderBlur = () => {
    // Dispatch header changes to Redux
    dispatch(
      updateSection({
        type: "languages",
        data: { header: headerValue }, // Save header to Redux
      })
    );
  };

  const textColor =
    languageSection?.column === "right" ? "black" : style?.color || color;

  return (
    <div className={`resume-language ${style?.style}`}>
      <div className={`sections-title ${style?.style}`}>
        <Popover
          trigger="click"
          className="absolute left-1/2 -translate-x-1/2 w-fit"
          visible={popoverVisible1}
          onVisibleChange={(visible) => setPopoverVisible1(visible)}
          content={
            <DeletePopover
              activeEditor="languages"
              // activeIndex={activeIndex} // Pass active index
              // setActiveIndex={setActiveIndex} // Reset active index after deletion
            />
          }
        ></Popover>

        <Icon
          icon="ic:round-language"
          width="20px"
          height="20px"
          className="iconTitle"
        />
        <Icon
          icon="pepicons-pop:line-x"
          width="22px"
          height="20px"
          className="iconLine"
        />
        {/* <h2
          className={`cvBody-details text-color-${textColor}`}
          style={{
            ...headingStyle,
            // color: ["resumeTemp4", "resumeTemp5"].some((temp) =>
            //   style?.includes(temp)
            // )
            //   ? textColor
            //   : color,
            color: color || textColor,
            fontFamily,
          }}
        >
          Language
        </h2> */}

        <input
          className="w-full"
          type="text"
          value={headerValue}
          onChange={handleHeaderChange}
          onBlur={handleHeaderBlur}
          // onClick={setPopoverVisible(true)}
          placeholder="Enter section header here..."
          onClick={() => setPopoverVisible1(true)}
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
      </div>
      <div className="seperateHeading"></div>
      <div className="language-content borderClick px-1 py-2">
        {localLanguages?.map((lang, index) => (
          <div key={index} className="relative">
            <Popover
              content={
                <PopoverToolbar
                  activeEditor="languages"
                  activeIndex={index}
                  setActiveIndex={setActiveIndex}
                />
              }
              trigger="click"
              open={popoverVisible && activeIndex === index}
              onOpenChange={(visible) => {
                if (!visible) {
                  setPopoverVisible(false);
                  setActiveIndex(null);
                }
              }}
              placement="top"
            />
            <div className="grid grid-cols-2 gap-4">
              <ReactQuill
                ref={(el) => (quillRefs.current[index] = el)}
                value={localLanguages[index]?.name || "English"}
                modules={modules}
                formats={formats}
                theme="bubble"
                placeholder="Write languages..."
                onChange={(value) => handleLanguageChange(index, "name", value)}
                onFocus={() => handleEditorClick(index)}
                onBlur={() => handleBlur(index, "name")}
                className={` text-${fontFamily} cvBody-details text-${bodyTextStyle?.fontSize} text-color-${textColor}`}
                style={{ ...bodyTextStyle, fontFamily }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Languages;
