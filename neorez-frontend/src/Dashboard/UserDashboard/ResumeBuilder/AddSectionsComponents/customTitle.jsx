import React, { useEffect, useState, useRef } from "react";
import Button from "../../../../components/shared/button";
import DatePickerComponent from "../../../ResumeTemps/components/datePicker";
import { useDispatch, useSelector } from "react-redux";
import { updateSection } from "../../../../redux/resumeSlice2";
import ReactQuill from "react-quill";
import { Popover } from "antd";
import PopoverToolbar from "../../../ResumeTemps/components/popover";
import DeletePopover from "../../../ResumeTemps/components/deletePopover";

const CustomTitle = ({
  handleAddSection,
  fontFamily,
  color,
  bodyTextStyle,
  headingStyle,
  isModel,
  style,
}) => {
  const [headingValue, setHeadingValue] = useState("Custom Title");
  const [subHeadingValue, setSubHeadingValue] = useState("Heading");
  const [customContent, setCustomContent] = useState("");
  const [activeEditor, setActiveEditor] = useState(null);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverVisible1, setPopoverVisible1] = useState(false);

  const quillRef = useRef(null);

  const dispatch = useDispatch();
  const resume = useSelector((state) => state?.resume);
  const customTitleData = resume.sections.find(
    (section) => section?.type === "customTitle"
  );

  useEffect(() => {
    if (customTitleData) {
      setCustomContent(customTitleData?.items[0]?.description || "");
    }
  }, [customTitleData]);

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleContentBlur = () => {
    const previousHeader = customTitleData?.header || "";
    const previousSubHeading = customTitleData?.subHeading || "";
    const previousContent = customTitleData?.items[0]?.description || "";

    const currentHeader = headingValue;
    const currentSubHeading = subHeadingValue;
    const currentContent = customContent;

    // Normalize: Strip HTML and trim spaces
    const previousHeaderPlainText = stripHtml(previousHeader).trim();
    const currentHeaderPlainText = stripHtml(currentHeader).trim();

    const previousSubHeadingPlainText = stripHtml(previousSubHeading).trim();
    const currentSubHeadingPlainText = stripHtml(currentSubHeading).trim();

    const previousContentPlainText = stripHtml(previousContent).trim();
    const currentContentPlainText = stripHtml(currentContent).trim();

    // Only update Redux if any text has actually changed
    if (
      previousHeaderPlainText !== currentHeaderPlainText ||
      previousSubHeadingPlainText !== currentSubHeadingPlainText ||
      previousContentPlainText !== currentContentPlainText
    ) {
      dispatch(
        updateSection({
          type: "customTitle",
          data: {
            header: currentHeader,
            items: [{ description: currentContent }],
            subHeading: currentSubHeading,
          },
        })
      );
    }

    setActiveEditor(null);
    setPopoverVisible(false); // Close popover on blur
  };

  const handleEditorClick = (editorType) => {
    setActiveEditor(editorType);
    setPopoverVisible(true); // Open the popover when editor is clicked
  };

  const handlePopoverVisibilityChange = (visible) => {
    if (!visible) {
      setPopoverVisible(false); // Close popover when it loses focus
    }
  };

  const handleClick = () => {
    const sectionData = {
      header: headingValue,
      type: "customTitle",
      items: [
        {
          description: customContent || "This is the custom content",
        },
      ],
      subHeading: subHeadingValue,
    };
    handleAddSection(sectionData); // Passing data to the parent component
  };

  const textColor =
    customTitleData?.column === "left" &&
    ["resumeTemp4", "resumeTemp5"].includes(style)
      ? color || "white"
      : style?.color || color;

  return (
    <>
      {isModel ? (
        <div
          onClick={handleClick}
          className="flex flex-col gap-2 w-[359px] min-h-[174px]  addSection"
        >
          <div className="relative group overflow-hidden rounded-md">
            <div className="sectionBox opacity-1 px-[10px] py-5 flex flex-col gap-1">
              <p className="font-OpenSan darkBlack para-text font-semibold">
                Custom Title
              </p>
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <p className="font-OpenSan  para-text text-center font-semibold darkBlue">
                      Heading
                    </p>
                    <div className="flex items-center gap-1">
                      <DatePickerComponent />
                    </div>
                  </div>
                  <div className="blank flex items-start gap-2">
                    <p className="font-OpenSan mediumGray para-ex-small">
                      Lorem ipsum dolor sit amet consectetur. Quis facilisi
                      justo integer malesuada.
                    </p>
                  </div>
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
          <p className="font-OpenSan para-small text-center font-semibold darkBlue">
            Custom Title
          </p>
        </div>
      ) : (
        <>
          {/* Popover */}
          <Popover
            content={
              <PopoverToolbar
                activeEditor={activeEditor}
                activeIndex={0}
                setActiveEditor={setActiveEditor}
              />
            }
            trigger="click"
            open={popoverVisible}
            onOpenChange={handlePopoverVisibilityChange}
            placement="top"
          />

          <Popover
            trigger="click"
            className="absolute left-1/2 -translate-x-1/2 w-fit"
            visible={popoverVisible1}
            onVisibleChange={(visible) => setPopoverVisible1(visible)}
            content={
              <DeletePopover
                activeEditor="customTitle"
                // activeIndex={activeIndex} // Pass active index
                // setActiveIndex={setActiveIndex} // Reset active index after deletion
              />
            }
          ></Popover>

          <div className="sectionBox opacity-1  flex flex-col gap-1">
            {/* Heading */}
            <input
              type="text"
              value={headingValue}
              onChange={(e) => setHeadingValue(e.target.value)}
              onBlur={handleContentBlur}
              className="font-OpenSan darkBlack para-text font-semibold bg-transparent"
              placeholder="Enter heading"
              style={{
                ...headingStyle,
                fontFamily,
                color: ["resumeTemp4", "resumeTemp5"].some((temp) =>
                  style?.includes(temp)
                )
                  ? textColor
                  : color,
              }}
              onClick={() => setPopoverVisible1(true)}
            />

            {/* Sub-heading */}
            <input
              type="text"
              value={subHeadingValue}
              onChange={(e) => setSubHeadingValue(e.target.value)}
              onBlur={handleContentBlur}
              className="font-OpenSan para-text font-semibold darkBlue bg-transparent"
              placeholder="Enter sub-heading"
              style={{ ...bodyTextStyle, fontFamily }}
            />

            {/* ReactQuill for Custom Content */}
            <ReactQuill
              // ref={quillRef}
              value={customContent}
              onChange={setCustomContent}
              onFocus={() => handleEditorClick("customTitle")} // Open Popover on focus
              onBlur={handleContentBlur}
              theme="bubble"
              modules={{
                toolbar: [["bold", "italic", "underline"]],
              }}
              placeholder="Enter custom content here..."
              className={` text-${fontFamily} cvBody-details text-${bodyTextStyle?.fontSize}`}
              style={{ ...bodyTextStyle, fontFamily }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default CustomTitle;
