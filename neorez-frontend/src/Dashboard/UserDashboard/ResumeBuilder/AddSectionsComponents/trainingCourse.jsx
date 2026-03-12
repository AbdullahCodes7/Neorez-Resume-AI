import React, { useEffect, useRef, useState } from "react";
import Button from "../../../../components/shared/button";
import { useDispatch } from "react-redux";
import { updateSection } from "../../../../redux/resumeSlice2";
import ReactQuill from "react-quill";
import { Popover } from "antd";
import PopoverToolbar from "../../../ResumeTemps/components/popover";
import { useSelector } from "react-redux";

const TrainingCourse = ({
  handleAddSection,
  fontFamily,
  color,
  bodyTextStyle,
  headingStyle,
  isModel,
}) => {
  const [headerValue, setHeaderValue] = useState("Training/Courses");

  // State for each course title and description
  const [creativeWritingTitle, setCreativeWritingTitle] =
    useState("Creative Writing");
  const [creativeWritingContent, setCreativeWritingContent] = useState("");

  const [activeEditor, setActiveEditor] = useState(null); // Track active editor
  const [activeIndex, setActiveIndex] = useState(null); // Track index
  const quillRef = useRef(null); // Ref for ReactQuill

  const dispatch = useDispatch();

  // Retrieve dynamic data from Redux
  const resume = useSelector((state) => state?.resume);
  const trainingCoursesData = resume.sections.find(
    (section) => section?.type === "trainingCourses"
  );

  // Sync Redux data on component mount or when data changes
  useEffect(() => {
    if (trainingCoursesData?.items?.length) {
      setCreativeWritingContent(trainingCoursesData?.items[0]?.content || "");
    }
  }, [trainingCoursesData]);

  // Dispatch changes to Redux on blur
  const handleContentBlur = () => {
    dispatch(
      updateSection({
        type: "trainingCourses",
        data: {
          header: headerValue,
          items: [
            { title: creativeWritingTitle, content: creativeWritingContent },
          ],
        },
      })
    );
    setActiveEditor(null);
    setActiveIndex(null); // Close editor on blur
  };

  // Focus ReactQuill and open Popover on a single click
  const handleEditorClick = (editorType, index) => {
    setActiveEditor(editorType);
    setActiveIndex(index);

    setTimeout(() => {
      if (quillRef.current && quillRef.current.focus) {
        quillRef.current.focus();
      }
    }, 50); // Delay to ensure Popover is fully opened
  };

  const handleClick = () => {
    const sectionData = {
      header: headerValue,
      type: "trainingCourses",
      items: [{ title: creativeWritingTitle, content: creativeWritingContent }],
    };
    handleAddSection(sectionData); // Pass data to the parent component
  };

  return (
    <>
      {isModel ? (
        <div
          onClick={handleClick}
          className="flex flex-col gap-2 w-[359px] min-h-[174px] addSection"
        >
          <div className="relative group overflow-hidden rounded-md">
            <div className="sectionBox opacity-1 px-[10px] py-5 flex flex-col gap-1">
              <p className="font-OpenSan darkBlack para-text font-semibold">
                Training/Courses
              </p>
              <div className="flex justify-between gap-5 items-start">
                <div className="blank flex flex-col items-start gap-1">
                  <p className="font-OpenSan para-text text-center font-semibold darkBlue">
                    Creative Writing
                  </p>
                  <p className="font-OpenSan mediumGray para-ex-small">
                    Lorem ipsum dolor sit amet consectetur. Quis facilisi justo
                    integer malesuada.
                  </p>
                </div>

                <div className="blank flex flex-col items-start">
                  <p className="font-OpenSan para-text text-center font-semibold darkBlue">
                    Intro to Photoshop
                  </p>
                  <p className="font-OpenSan mediumGray para-ex-small">
                    Lorem ipsum dolor sit amet consectetur. Quis facilisi justo
                    integer malesuada.
                  </p>
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
            Training Courses
          </p>
        </div>
      ) : (
        <Popover
          content={
            <PopoverToolbar
              activeEditor="trainingCourses"
              activeIndex={0}
              setActiveIndex={setActiveIndex}
            />
          }
          trigger="click"
          open={activeEditor !== null && activeIndex === 0}
        >
          <div className="sectionBox opacity-1 px-[10px] py-5 flex flex-col gap-1">
            {/* Editable Input for the Header */}
            {activeEditor === "header" && activeIndex === 0 ? (
              <input
                type="text"
                value={headerValue}
                onChange={(e) => setHeaderValue(e.target.value)}
                onBlur={handleContentBlur}
                className="font-OpenSan darkBlack para-text font-semibold"
                placeholder="Enter header"
              />
            ) : (
              <p
                onClick={() => handleEditorClick("header", 0)}
                className="font-OpenSan darkBlack para-text font-semibold"
                style={{ ...headingStyle, fontFamily, color: color }}
              >
                {headerValue || "Training/Courses"}
              </p>
            )}

            <div className="flex justify-between gap-5 items-start">
              <div className="blank flex flex-col items-start gap-1">
                {/* Editable Input for the Course Title */}
                {activeEditor === "creativeWritingTitle" &&
                activeIndex === 0 ? (
                  <input
                    type="text"
                    value={creativeWritingTitle}
                    onChange={(e) => setCreativeWritingTitle(e.target.value)}
                    onBlur={handleContentBlur}
                    className="font-OpenSan para-text font-semibold darkBlue"
                    placeholder="Enter course title"
                  />
                ) : (
                  <p
                    onClick={() => handleEditorClick("creativeWritingTitle", 0)}
                    className="font-OpenSan para-text font-semibold darkBlue"
                    style={{ ...bodyTextStyle, fontFamily }}
                  >
                    {creativeWritingTitle || "Creative Writing"}
                  </p>
                )}
                <div className="w-full">
                  {activeEditor === "creativeWritingContent" &&
                  activeIndex === 0 ? (
                    <ReactQuill
                      ref={quillRef}
                      value={creativeWritingContent}
                      onChange={setCreativeWritingContent}
                      onBlur={handleContentBlur}
                      theme="bubble"
                      placeholder="Enter course details here..."
                    />
                  ) : (
                    <div
                      onClick={() =>
                        handleEditorClick("creativeWritingContent", 0)
                      }
                      style={{ ...bodyTextStyle, fontFamily }}
                      dangerouslySetInnerHTML={{
                        __html:
                          creativeWritingContent ||
                          "Course details will be displayed here.",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Popover>
      )}
    </>
  );
};

export default TrainingCourse;
