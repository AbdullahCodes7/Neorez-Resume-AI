import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import PopoverToolbar from "./popover";
import { Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateSection } from "../../../redux/resumeSlice2";

const References = ({ headingStyle, bodyTextStyle, style, color }) => {
  // Quill modules
  const modules = {
    toolbar: {
      container: [["bold", "italic", "underline"]],
    },
  };
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);

  // Get reference data from Redux store
  const references =
    resume.sections?.find((section) => section.type === "references")?.items ||
    [];

  // Quill Formats
  const formats = ["bold", "italic", "underline"];

  const [activeIndex, setActiveIndex] = useState(null);
  const [activeEditor, setActiveEditor] = useState(null);
  const [localData, setLocalData] = useState({}); // Store local changes

  // Handle editor click to activate the respective editor
  const handleEditorClick = (editorName, index, currentValue) => {
    setActiveEditor(editorName);
    setActiveIndex(index);
    setLocalData(currentValue); // Initialize with current value
  };

  // Handle field change and update local state
  const handleFieldChange = (field, value) => {
    setLocalData((prevData) => ({ ...prevData, [field]: value }));
  };

  // Handle blur event and dispatch the data to Redux store
  const handleBlur = (index, field) => {
    dispatch(
      updateSection({
        type: "references",
        index,
        data: { [field]: localData[field] },
      })
    );
    setActiveEditor(null); // Close editor
    setActiveIndex(null); // Reset active index
  };

  return (
    <div className={`resume-reference ${style?.style}`}>
      <div className={`sections-title ${style?.style}`}>
        <Icon
          icon="ic:round-language"
          width="20px"
          height="20px"
          className="iconTitle"
          style={{ color: color }}
        />
        <Icon
          icon="pepicons-pop:line-x"
          width="22px"
          height="20px"
          className="iconLine"
          style={{ color: color }}
        />
        <h2 style={{ color: color }}>References</h2>
      </div>
      <div className="seperateHeading"></div>
      <div className="reference-content borderClick px-1 py-2">
        {references.map((refer, index) => (
          <div key={refer.id} className="flex flex-col gap-1">
            {/* Popover wraps around the ReactQuill to display formatting options */}
            <Popover
              content={
                <PopoverToolbar
                  activeEditor="references"
                  activeIndex={activeIndex}
                />
              }
              trigger="click"
              visible={activeEditor === "references" && activeIndex === index} // Toggle visibility based on active editor
              onVisibleChange={(visible) => {
                if (!visible) {
                  setActiveEditor(null);
                  setActiveIndex(null);
                }
              }}
            >
              {/* Name */}
              <div
                className="flex items-center gap-2 referentName-wrap"
                onClick={() =>
                  handleEditorClick("name", index, { name: refer.name })
                }
              >
                {activeEditor === "name" && activeIndex === index ? (
                  <ReactQuill
                    value={localData.name || refer.name}
                    modules={modules}
                    formats={formats}
                    theme="bubble"
                    onChange={(value) => handleFieldChange("name", value)} // Only update local data
                    placeholder="Write Name here..."
                    onBlur={() => handleBlur(index, "name")} // Dispatch update on blur
                  />
                ) : (
                  <div
                    style={{
                      ...bodyTextStyle,
                      fontFamily: style?.fontFamily,
                    }}
                    className={`refernt-name ${style?.style}`}
                    dangerouslySetInnerHTML={{ __html: refer.name }}
                  ></div>
                )}
              </div>
            </Popover>

            {/* Institute */}
            <Popover
              content={
                <PopoverToolbar
                  activeEditor="references"
                  activeIndex={activeIndex}
                />
              }
              trigger="click"
              visible={activeEditor === "detail" && activeIndex === index}
              onVisibleChange={(visible) => {
                if (!visible) {
                  setActiveEditor(null);
                  setActiveIndex(null);
                }
              }}
            >
              <div
                className="flex items-center gap-2 referentInstitute-wrap"
                onClick={() =>
                  handleEditorClick("detail", index, {
                    detail: refer.detail,
                  })
                }
              >
                {activeEditor === "detail" && activeIndex === index ? (
                  <ReactQuill
                    value={localData.detail || refer.detail}
                    modules={modules}
                    formats={formats}
                    theme="bubble"
                    onChange={(value) => handleFieldChange("detail", value)} // Only update local data
                    placeholder="Write Institute here..."
                    onBlur={() => handleBlur(index, "detail")} // Dispatch update on blur
                  />
                ) : (
                  <div
                    style={{
                      ...bodyTextStyle,
                      fontFamily: style?.fontFamily,
                    }}
                    className={`refernt-institute ${style?.style}`}
                    dangerouslySetInnerHTML={{ __html: refer.detail }}
                  ></div>
                )}
              </div>
            </Popover>

            {/* Phone */}
            <Popover
              content={
                <PopoverToolbar
                  activeEditor="references"
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                />
              }
              trigger="click"
              visible={activeEditor === "contactInfo" && activeIndex === index}
              onVisibleChange={(visible) => {
                if (!visible) {
                  setActiveEditor(null);
                  setActiveIndex(null);
                }
              }}
            >
              <div
                className="flex items-center gap-2 referentPhone-wrap"
                onClick={() =>
                  handleEditorClick("contactInfo", index, {
                    contactInfo: refer.contactInfo,
                  })
                }
              >
                <h2 className="info-heading">Phone:</h2>
                {activeEditor === "contactInfo" && activeIndex === index ? (
                  <ReactQuill
                    value={localData.contactInfo || refer.contactInfo}
                    modules={modules}
                    formats={formats}
                    theme="bubble"
                    onChange={(value) =>
                      handleFieldChange("contactInfo", value)
                    } // Only update local data
                    placeholder="Write Phone Number here..."
                    onBlur={() => handleBlur(index, "contactInfo")} // Dispatch update on blur
                  />
                ) : (
                  <div
                    style={{
                      ...bodyTextStyle,
                      fontFamily: style?.fontFamily,
                    }}
                    className={`refernt-phone ${style?.style}`}
                    dangerouslySetInnerHTML={{
                      __html: refer.contactInfo || "1234567845",
                    }}
                  ></div>
                )}
              </div>
            </Popover>

            {/* Email */}
            <Popover
              content={
                <PopoverToolbar
                  activeEditor="references"
                  activeIndex={activeIndex}
                />
              }
              trigger="click"
              visible={activeEditor === "email" && activeIndex === index}
              onVisibleChange={(visible) => {
                if (!visible) {
                  setActiveEditor(null);
                  setActiveIndex(null);
                }
              }}
            >
              <div
                className="flex items-center gap-2 referentEmail-wrap"
                onClick={() =>
                  handleEditorClick("email", index, { email: refer.email })
                }
              >
                <h2 className="info-heading">Email:</h2>
                {activeEditor === "email" && activeIndex === index ? (
                  <ReactQuill
                    value={localData.email || refer.email}
                    modules={modules}
                    formats={formats}
                    theme="bubble"
                    onChange={(value) => handleFieldChange("email", value)} // Only update local data
                    placeholder="Write Email here..."
                    onBlur={() => handleBlur(index, "email")} // Dispatch update on blur
                  />
                ) : (
                  <div
                    style={{
                      ...bodyTextStyle,
                      fontFamily: style?.fontFamily,
                    }}
                    className={`refernt-email ${style?.style}`}
                    dangerouslySetInnerHTML={{ __html: refer.email }}
                  ></div>
                )}
              </div>
            </Popover>
          </div>
        ))}
      </div>
    </div>
  );
};

export default References;
