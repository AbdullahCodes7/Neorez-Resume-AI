import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomToolbar from "./customToolbar";
import { useDispatch, useSelector } from "react-redux";
import { updateCoverLetter } from "../../../redux/coverLetterSlice";
import { saveCoverLetterData } from "../../../redux/actions/SaveCoverLEtter";
import { Popover } from "antd";
import CoverLetterProfileSettingsPopover from "./coverLetterSetting";

const Profile = ({
  headingStyle,
  bodyTextStyle,
  style,
  color,
  fontFamily,
  data,
}) => {
  // console.log("data", data);
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline"],
        // [
        //   { align: "" },
        //   { align: "center" },
        //   { align: "right" },
        //   { align: "justify" },
        // ],
      ],
    },
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
    "align",
  ];
  const dispatch = useDispatch();
  const coverLetter = useSelector((state) => state.coverLetter);
  const [popoverVisible, setPopoverVisible] = useState(false);

  // console.log("coverLetter profile", coverLetter);
  // console.log("coverLetter.designation", coverLetter.designation);
  // Initialize state with Redux data
  const [name, setName] = useState(
    data?.name?.trim() ? data.name : coverLetter.name?.trim() || "Erin Jones"
  );

  const quillRefs = useRef({}); // Array of refs for each ReactQuill instance

  const [designation, setDesignation] = useState(
    data?.designation || coverLetter.designation || "UX Designer"
  );
  const [activeEditor, setActiveEditor] = useState(null);

  // Effect to update local state when Redux state changes
  // useEffect(() => {
  //   setName(coverLetter.name.trim() ? coverLetter.name : "Erin Jones");
  //   setDesignation(coverLetter.designation || "UX Designer");
  // }, [coverLetter]);

  useEffect(() => {
    setName(
      data?.name?.trim() ? data.name : coverLetter.name?.trim() || "Erin Jones"
    );
    setDesignation(
      data?.designation || coverLetter.designation || "UX Designer"
    );
  }, [coverLetter, data]);

  const handleEditorClick = (editorType) => {
    setActiveEditor(editorType);
    setPopoverVisible(true);
    // Focus the corresponding ReactQuill editor
    setTimeout(() => {
      if (quillRefs.current[editorType]) {
        quillRefs.current[editorType].focus();
      }
    }, 0); // Ensure ReactQuill is rendered before focusing
  };
  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };
  const saveData = (field, value) => {
    // Check if the new value differs from the current Redux state
    const currentValue = coverLetter[field] || "";
    const strippedCurrentValue = stripHtml(currentValue).trim();
    const strippedNewValue = stripHtml(value).trim();

    if (strippedCurrentValue !== strippedNewValue) {
      // Dispatch only if the new value differs from the current value
      dispatch(updateCoverLetter({ name: field, value: strippedNewValue }));
      saveCoverLetterData(field, strippedNewValue);
    }
  };

  return (
    <div className={`cv-profile ${style?.style}`}>
      {/* Name Section */}
      <Popover
        trigger="click"
        placement="left"
        open={popoverVisible}
        onOpenChange={(visible) => setPopoverVisible(visible)}
        // key={index}
        content={
          <CoverLetterProfileSettingsPopover
            activeEditor={activeEditor}
            // activeIndex={activeIndex}
          />
        }
      />

      {/* Name Section */}

      <div onClick={() => handleEditorClick("name")}>
        {activeEditor === "name" ? (
          <div className="relative">
            {/* <CustomToolbar /> */}
            <ReactQuill
              ref={(el) => (quillRefs.current["name"] = el)}
              value={name}
              modules={modules}
              formats={formats}
              theme="bubble"
              placeholder="Write your name here..."
              onBlur={() => {
                setActiveEditor(null);
                saveData("name", name); // Save on blur
              }}
              onChange={(value) => setName(value)}
            />
          </div>
        ) : (
          <div
            className={`name ${style?.style}`}
            style={
              style?.style
                ? {} // If `style?.style` exists, apply an empty style object
                : {
                    color: !["coverletter6"].includes(style) ? color : "", // Conditionally set color
                    ...headingStyle,
                    fontFamily,
                  }
            }
            dangerouslySetInnerHTML={{ __html: name || "Erin Jones" }}
          />
        )}
      </div>

      {/* Designation Section */}
      {coverLetter?.visibility?.designation && (
        <div onClick={() => handleEditorClick("designation")}>
          {activeEditor === "designation" ? (
            <div className="relative">
              {/* <CustomToolbar /> */}
              <ReactQuill
                ref={(el) => (quillRefs.current["designation"] = el)}
                value={designation}
                modules={modules}
                formats={formats}
                theme="bubble"
                placeholder="Write your designation here..."
                onBlur={() => {
                  setActiveEditor(null);
                  saveData("designation", designation); // Save on blur
                }}
                onChange={(value) => setDesignation(value)}
              />
            </div>
          ) : (
            <div
              style={{ ...bodyTextStyle, fontFamily }}
              className={`designation ${style?.style}`}
              dangerouslySetInnerHTML={{ __html: designation || "" }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
