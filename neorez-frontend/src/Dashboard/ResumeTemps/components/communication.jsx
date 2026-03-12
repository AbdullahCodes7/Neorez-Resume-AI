import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import { updateCommunication } from "../../../redux/resumeSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import PopoverToolbar from "./popover";
import { Popover } from "antd";
const Communication = ({ bodyTextStyle, headingStyle, style, color }) => {
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
  const communication = resume.sections[1];
  const dispatch = useDispatch();
  // Quill Formats
  const formats = ["bold", "italic", "underline", "list", "bullet", "link"];
  // Track the currently active editor
  const [activeEditor, setActiveEditor] = useState("");
  // Handle editor click
  const handleEditorClick = (editorType) => {
    setActiveEditor(editorType);
  };

  // console.log("communication=============", communication);

  const handleCommunicationChange = (index, field, value, isHeader = false) => {
    // console.log(isHeader);
    // if (isHeader) {
    //   // Update the section header (h2)
    //   dispatch(
    //     updateCommunication({
    //       index,
    //       data: { header: value },
    //     })
    //   );
    // } else {
    //   // Update item data (e.g., description)
    //   dispatch(
    //     updateCommunication({
    //       index,
    //       data: { [field]: value },
    //     })
    //   );
    // }
  };

  return (
    <>
      <div className={`resume-communication ${style?.style}`}>
        {/* Communication Section */}
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
              value={communication.header || "Communication"}
              onChange={(e) =>
                handleCommunicationChange(null, null, e.target.value, true)
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
                //   communication.header ||
                "Communication"
              }
            </h2>
          )}
        </div>
        <div className="seperateHeading"></div>
        <Popover content={content} trigger="click">
          <div className="borderClick px-1 py-2">
            {communication?.items?.map((item, index) => (
              <div key={index} className="sectionWithLine">
                <div className="line"></div>

                {/* {console.log(item)} */}
                <div onClick={() => handleEditorClick("communication")}>
                  {activeEditor === "communication" ? (
                    <div className="relative">
                      <ReactQuill
                        value={item?.description}
                        onChange={(value) =>
                          handleCommunicationChange(index, "description", value)
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
                      className={`communication-content ${style?.style}`}
                      dangerouslySetInnerHTML={{
                        __html: item?.description
                          ? item?.description
                          : "Strong written and verbal communication skills, including the ability to provide constructive feedback and collaborate effectively with writers, editors, and other stakeholders.",
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
export default Communication;
