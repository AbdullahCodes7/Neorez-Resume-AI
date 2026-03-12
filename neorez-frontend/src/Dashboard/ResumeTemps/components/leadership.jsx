import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import { updateleadership } from "../../../redux/resumeSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import PopoverToolbar from "./popover";
import { Popover } from "antd";
const Leadership = ({ bodyTextStyle, headingStyle, style, color }) => {
  // Quill modules
  const modules = {
    toolbar: {
      container: [["bold", "italic", "underline"]],
    },
  };
  const content = (
    <div>
      <PopoverToolbar />
    </div>
  );
  const resume = useSelector((state) => state.resume);
  const leadership = resume.sections[1];
  const dispatch = useDispatch();
  // Quill Formats
  const formats = ["bold", "italic", "underline", "list", "bullet", "link"];
  // Track the currently active editor
  const [activeEditor, setActiveEditor] = useState("");
  // Handle editor click
  const handleEditorClick = (editorType) => {
    setActiveEditor(editorType);
  };

  // console.log("leadership=============", leadership);

  const handleLeadershipChange = (index, field, value, isHeader = false) => {
    // console.log(isHeader);
    // if (isHeader) {
    //   // Update the section header (h2)
    //   dispatch(
    //     updateleadership({
    //       index,
    //       data: { header: value },
    //     })
    //   );
    // } else {
    //   // Update item data (e.g., description)
    //   dispatch(
    //     updateleadership({
    //       index,
    //       data: { [field]: value },
    //     })
    //   );
    // }
  };

  return (
    <>
      <div className={`resume-leadership ${style?.style}`}>
        {/* leadership Section */}
        <div className={`sections-title ${style?.style}`}>
          <Icon
            icon="pepicons-pop:line-x"
            width="22px"
            height="20px"
            className="iconLine"
          />
          {activeEditor === "section-header" ? (
            <input
              type="text"
              value={leadership.header || "leadership"}
              onChange={(e) =>
                handleLeadershipChange(null, null, e.target.value, true)
              } // true indicates it's for the header
              onBlur={() => setActiveEditor(null)}
              placeholder="Enter section header here..."
            />
          ) : (
            <h2
              style={headingStyle}
              onClick={() => handleEditorClick("section-header")}
            >
              {
                //   leadership.header ||
                "Leadership"
              }
            </h2>
          )}
        </div>
        <div className="seperateHeading"></div>
        <Popover content={content} trigger="click">
          <div className="borderClick px-1 py-2">
            {leadership?.items?.map((item, index) => (
              <div className="sectionWithLine">
                <div className="line"></div>

                {/* {console.log(item)} */}
                <div onClick={() => handleEditorClick("leadership")}>
                  {activeEditor === "leadership" ? (
                    <div className="relative">
                      <ReactQuill
                        value={item?.description}
                        onChange={(value) =>
                          handleLeadershipChange(index, "description", value)
                        }
                        modules={modules}
                        formats={formats}
                        theme="bubble"
                        placeholder="Write your introduction here..."
                        onBlur={() => setActiveEditor(null)}
                      />
                    </div>
                  ) : (
                    <div
                      style={bodyTextStyle}
                      className={`leadership-content ${style?.style}`}
                      dangerouslySetInnerHTML={{
                        __html: item.description
                          ? item.description
                          : "Ability to manage multiple projects simultaneously and meet tight deadlines, while maintaining the highest standards of quality.",
                      }}
                    ></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Popover>
      </div>
    </>
  );
};
export default Leadership;
