import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useDispatch, useSelector } from "react-redux";
import { updateSection } from "../../../redux/resumeSlice2";
import PopoverToolbar from "./popover";
import { Popover } from "antd";
import DeletePopover from "../components/deletePopover";
const Interest = ({
  bodyTextStyle,
  headingStyle,
  style,
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
  const [headerValue, setHeaderValue] = useState("Hobbies");

  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);
  const Interest =
    section || resume.sections.find((section) => section.type === "hobbies");

  const [activeIndex, setActiveIndex] = useState(null);
  const [popoverVisible1, setPopoverVisible1] = useState(false);

  const [popoverVisible, setPopoverVisible] = useState(false);
  const [tempHeader, setTempHeader] = useState(Interest?.header || "");
  const [tempItems, setTempItems] = useState(Interest?.items || []);
  const quillRefs = useRef([]);

  // Update local state only when Redux data changes
  useEffect(() => {
    if (Interest) {
      if (
        JSON.stringify(tempItems) !== JSON.stringify(Interest.items) ||
        tempHeader !== Interest.header
      ) {
        setTempItems([...Interest.items]);
        setTempHeader(Interest.header);
      }
    }
  }, [Interest]);

  const handleEditorClick = (index) => {
    setActiveIndex(index);
    setPopoverVisible(true);
  };

  const handleOnChange = (index, value) => {
    setTempItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, name: value } : item
      )
    );
  };

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  // const handleBlur = (index, field, value) => {
  //   if (field === "header") {
  //     if (tempHeader !== Interest?.header) {
  //       dispatch(
  //         updateSection({
  //           type: "hobbies",
  //           data: { header: value },
  //         })
  //       );
  //     }
  //   } else if (field === "name") {
  //     if (tempItems[index]?.name !== Interest?.items[index]?.name) {
  //       dispatch(
  //         updateSection({
  //           type: "hobbies",
  //           index,
  //           data: { [field]: value },
  //         })
  //       );
  //     }
  //   }
  //   setPopoverVisible(false);
  //   setActiveIndex(null);
  // };

  const handleBlur = (index, field, value) => {
    if (field === "header") {
      const previousHeader = Interest?.header || "";
      const currentHeader = value.trim();

      // Normalize: Strip HTML and trim spaces
      const previousPlainText = stripHtml(previousHeader).trim();
      const currentPlainText = stripHtml(currentHeader).trim();

      // Only update Redux if the header text has actually changed
      if (previousPlainText !== currentPlainText) {
        dispatch(
          updateSection({
            type: "hobbies",
            data: { header: currentHeader },
          })
        );
      }
    } else if (field === "name") {
      const previousName = Interest?.items?.[index]?.name || "";
      const currentName = value.trim();

      // Normalize: Strip HTML and trim spaces
      const previousPlainText = stripHtml(previousName).trim();
      const currentPlainText = stripHtml(currentName).trim();

      // Only update Redux if the interest name has actually changed
      if (previousPlainText !== currentPlainText) {
        dispatch(
          updateSection({
            type: "hobbies",
            index,
            data: { [field]: currentName },
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

  // const handleHeaderBlur = () => {
  //   // Dispatch header changes to Redux
  //   dispatch(
  //     updateSection({
  //       type: "languages",
  //       data: { header: headerValue }, // Save header to Redux
  //     })
  //   );
  // };

  const textColor =
    Interest?.column === "right" ? color || "#003953" : style?.color || color;

  return (
    <div className={`resume-interest ${style?.style}`}>
      <div className={`sections-title ${style?.style}`}>
        <Popover
          trigger="click"
          className="absolute left-1/2 -translate-x-1/2 w-fit"
          visible={popoverVisible1}
          onVisibleChange={(visible) => setPopoverVisible1(visible)}
          content={
            <DeletePopover
              activeEditor="hobbies"
              // activeIndex={activeIndex} // Pass active index
              // setActiveIndex={setActiveIndex} // Reset active index after deletion
            />
          }
        ></Popover>

        <Icon
          icon="fa-solid:apple-alt"
          width="20px"
          height="20px"
          style={{ color: style?.includes("resumeTemp4") ? textColor : color }}
        />
        <input
          className="w-full cursor-pointer"
          type="text"
          value={headerValue}
          onChange={handleHeaderChange}
          onBlur={() => handleBlur(0, "header", headerValue)}
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
          }}
        />
      </div>
      <div className="seperateHeading"></div>
      <div className="flex flex-wrap gap-2 px-1 py-2">
        {tempItems?.map((intrst, index) => (
          <div key={index} className="relative">
            <Popover
              content={
                <PopoverToolbar
                  activeEditor="hobbies"
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
            <ReactQuill
              value={tempItems[index]?.name || "Reading"}
              modules={modules}
              formats={formats}
              theme="bubble"
              placeholder="Write your interest here..."
              onChange={(value) => handleOnChange(index, value)}
              onFocus={() => handleEditorClick(index)}
              onBlur={() => handleBlur(index, "name", tempItems[index]?.name)}
              className={`text-${fontFamily} cvBody-details text-${bodyTextStyle?.fontSize}`}
              style={{ ...bodyTextStyle, fontFamily }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interest;
