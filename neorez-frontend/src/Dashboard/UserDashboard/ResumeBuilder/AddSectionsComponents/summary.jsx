import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "antd";
import PopoverToolbar from "../../../ResumeTemps/components/popover";
import { updateSection } from "../../../../redux/resumeSlice2";
import Button from "../../../../components/shared/button";
import DeletePopover from "../../../ResumeTemps/components/deletePopover";

const Summary = ({
  section,
  handleAddSection,
  bodyTextStyle,
  headingStyle,
  color,
  isModel,
  fontFamily,
  style,
}) => {
  const [summaryValue, setSummaryValue] = useState(""); // Tracks Quill content locally
  const dispatch = useDispatch();
  const [headerValue, setHeaderValue] = useState("Summary");
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverVisible1, setPopoverVisible1] = useState(false);

  const [activeEditor, setActiveEditor] = useState(null); // Track the active editor
  const quillRef = useRef(null); // ReactQuill editor ref
  const popoverContainerRef = useRef(null); // Ref for popover positioning

  const resume = useSelector((state) => state?.resume);
  const summarySection =
    section || resume.sections.find((sec) => sec.type === "summary");

  const formats = ["bold", "italic", "underline", "list", "bullet", "link"];
  const modules = {
    toolbar: {
      container: [["bold", "italic", "underline"]], // Add other tools as needed
    },
  };

  useEffect(() => {
    if (section && section?.items) {
      setSummaryValue(section?.items[0]?.description); // Set the summary from Redux
      setHeaderValue(section?.header || "Summary");
    }
  }, [section]);

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleSummaryBlur = () => {
    // if (section) {
    //   dispatch(
    //     updateSection({
    //       type: "summary",
    //       data: {
    //         header: headerValue,
    //         items: [{ description: summaryValue }],
    //       },
    //     })
    //   );
    // }
    // setPopoverVisible(false); // Close popover on blur
    // setActiveEditor(null);

    if (section) {
      const previousValue = section?.items[0]?.description || "";
      const currentValue = summaryValue;

      // Normalize: Strip HTML and trim spaces
      const previousPlainText = stripHtml(previousValue).trim();
      const currentPlainText = stripHtml(currentValue).trim();

      // console.log(`Previous Summary:`, previousPlainText);
      // console.log(`Current Summary:`, currentPlainText);

      // Update Redux only if the actual content has changed
      if (currentPlainText !== previousPlainText) {
        dispatch(
          updateSection({
            type: "summary",
            data: {
              header: headerValue,
              items: [{ description: summaryValue }],
            },
          })
        );
      }
    }
    setPopoverVisible(false); // Close popover on blur
    setActiveEditor(null);
  };

  const handleEditorClick = () => {
    setPopoverVisible(true); // Open the Popover
    setActiveEditor("summary");
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
    summarySection?.column === "left"
      ? color || "white"
      : style?.color || color;

  return (
    <>
      {!isModel ? (
        <>
          {/* Section Header */}
          {/* {activeEditor === "header" ? ( */}
          {/* <input
            type="text"
            value={headerValue}
            onChange={(e) => setHeaderValue(e.target.value)}
            onBlur={handleSummaryBlur}
            className="font-OpenSan darkBlack para-text font-semibold"
            placeholder="Enter section header"
            style={{ ...headingStyle, color: color, fontFamily }}
          /> */}
          <Popover
            trigger="click"
            className="absolute left-1/2 -translate-x-1/2 w-fit"
            visible={popoverVisible1}
            onVisibleChange={(visible) => setPopoverVisible1(visible)}
            content={
              <DeletePopover
                activeEditor="summary"
                // activeIndex={activeIndex} // Pass active index
                // setActiveIndex={setActiveIndex} // Reset active index after deletion
              />
            }
          ></Popover>
          <input
            className="w-full cursor-pointer bg-transparent"
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
            }}
          />

          {/* ) : (
            <p
              onClick={() => setActiveEditor("header")}
              className="font-OpenSan darkBlack para-text font-semibold"
              style={{
                ...headingStyle,
                color: ["resumeTemp4", "resumeTemp5"].some((temp) =>
                  style?.includes(temp)
                )
                  ? textColor
                  : color,
                fontFamily,
              }}
            >
              {headerValue || "Summary"}
            </p>
          )} */}

          {/* Popover */}

          <Popover
            // placement="topLeft"
            content={
              <PopoverToolbar
                activeEditor="summary"
                activeIndex={0}
                setActiveEditor={setActiveEditor}
              />
            }
            open={popoverVisible}
            onOpenChange={(visible) => setPopoverVisible(visible)}
            trigger="click"
            getPopupContainer={() => popoverContainerRef.current} // Attach Popover to the Quill container
            placement="top"
          />
          {/* ReactQuill Editor */}
          <div
            ref={popoverContainerRef}
            style={{ position: "relative" }}
            onClick={handleEditorClick}
          >
            <ReactQuill
              ref={quillRef}
              value={summaryValue || "Add summary here..."}
              onChange={setSummaryValue}
              onBlur={handleSummaryBlur}
              theme="bubble"
              placeholder="Write your summary here..."
              formats={formats}
              modules={modules}
              className={` text-${fontFamily} cvBody-details text-${bodyTextStyle?.fontSize}`}
              style={{
                ...bodyTextStyle,
                fontFamily,
              }}
            />
          </div>
        </>
      ) : (
        <>
          <div
            onClick={() =>
              handleAddSection({
                header: "Summary",
                type: "summary",
                items: [
                  { description: summaryValue || "Write your summary here" },
                ],
              })
            }
            className="flex flex-col gap-2 w-[359px] min-h-[174px] addSection"
          >
            <div className="relative group overflow-hidden rounded-md">
              <div className="sectionBox opacity-1 px-[10px] py-5 flex flex-col gap-1">
                <p className="font-OpenSan darkBlack para-text font-semibold">
                  {section?.header || "Summary"}
                </p>
                <div className="blank">
                  <p className="font-OpenSan mediumGray para-ex-small">
                    Lorem ipsum dolor sit amet consectetur. Quis facilisi justo
                    integer malesuada. Augue quis mauris vitae amet adipiscing
                    semper suspendisse velit.
                  </p>
                </div>

                <Button
                  className="absolute w-[60%] btn-primary opacity-0 group-hover:opacity-100 group-hover:block 
                  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out"
                  text="Add section"
                  minHeight={41}
                />
              </div>
            </div>
            <p className="font-OpenSan para-small text-center font-semibold darkBlue">
              Summary
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Summary;
