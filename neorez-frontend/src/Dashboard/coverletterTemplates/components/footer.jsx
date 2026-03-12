import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomToolbar from "./customToolbar";
import { useDispatch, useSelector } from "react-redux";
import { saveCoverLetterData } from "../../../redux/actions/SaveCoverLEtter";
import { Popover } from "antd";
import PopoverToolbar from "../../ResumeTemps/components/popover";

const FooterCV = ({
  headingStyle,
  bodyTextStyle,
  style,
  color,
  fontFamily,
  data,
}) => {
  const dispatch = useDispatch();

  // Quill modules
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline"],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
      ],
    },
  };

  // Quill Formats
  const formats = [
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
    "align",
  ];

  // Get footer data from Redux

  const coverLetter = data || useSelector((state) => state.coverLetter);
  const quillRefs = useRef({}); // Array of refs for each ReactQuill instance
  // Local states for regards and person
  const [regards, setRegards] = useState(coverLetter.regards || "Sincerely,");
  const [name, setName] = useState(
    coverLetter.name.trim() ? coverLetter.name : "Jessica Jones"
  );

  // // Update local state when Redux data changes
  // useEffect(() => {
  //   setRegards(reduxRegards);
  //   setName(reduxPerson);
  // }, [reduxRegards, reduxPerson]);

  // Effect to update local state when Redux state changes
  useEffect(() => {
    setName(coverLetter.name.trim() ? coverLetter.name : "Erin Jones");
    setRegards(coverLetter.regards || "UX Designer");
  }, [coverLetter]);

  // Track the currently active editor
  const [activeEditor, setActiveEditor] = useState("");

  // Handle editor click
  const handleEditorClick = (editorType) => {
    setActiveEditor(editorType);

    // Focus the corresponding ReactQuill editor
    setTimeout(() => {
      if (quillRefs.current[editorType]) {
        quillRefs.current[editorType].focus();
      }
    }, 0); // Ensure ReactQuill is rendered before focusing
  };

  // Strips starting and ending <p> tags
  const stripHTML = (html) => html.replace(/^<p>|<\/p>$/g, "").trim();

  // Handle save on blur
  const handleBlurSave = (field, value) => {
    const cleanValue = stripHTML(value); // Remove extra <p> tags
    const prevValue = stripHTML(coverLetter[field] || ""); // Get previous Redux value

    // console.log(`📝 Checking field: ${field}`);
    // console.log("🔹 Previous:", prevValue);
    // console.log("🔸 New:", cleanValue);

    if (cleanValue !== prevValue) {
      // console.log("✅ Value changed, updating Redux...");
      saveCoverLetterData(field, cleanValue, dispatch);
    } else {
      console.log("⚠️ No change detected, skipping Redux update.");
    }
    // saveCoverLetterData(field, value, dispatch); // Save the updated data to Redux
    setActiveEditor(null); // Close the editor after saving
  };

  return (
    <div className={`cv-footer ${style?.style}`}>
      <Popover
        // key={index}
        content={<PopoverToolbar activeEditor="footer" activeIndex={0} />}
        trigger="click"
      >
        <div className="">
          {/* Sincerely */}
          <div onClick={() => handleEditorClick("regards")}>
            {activeEditor === "regards" ? (
              <div className="relative">
                {/* <CustomToolbar /> */}
                <ReactQuill
                  ref={(el) => (quillRefs.current["regards"] = el)}
                  value={regards || "Sincerely,"}
                  modules={modules}
                  formats={formats}
                  onChange={setRegards} // Update local state
                  onBlur={() => handleBlurSave("regards", regards)}
                  theme="bubble"
                  placeholder="Enter Regards here..."
                  className="popup-text-alignment"
                />
              </div>
            ) : (
              <div
                style={{ ...bodyTextStyle, fontFamily }}
                className={`footer-details popup-text-alignment ${style?.style}`}
                dangerouslySetInnerHTML={{
                  __html: regards ? regards : "Sincerely,",
                }}
              ></div>
            )}
          </div>
          {/* Your Name */}
          <div onClick={() => handleEditorClick("person")}>
            {activeEditor === "person" ? (
              <div className="relative">
                {/* <CustomToolbar /> */}
                <ReactQuill
                  ref={(el) => (quillRefs.current["person"] = el)}
                  value={name}
                  modules={modules}
                  formats={formats}
                  onChange={setName} // Update local state
                  onBlur={() => handleBlurSave("name", name)}
                  theme="bubble"
                  placeholder="Enter name here..."
                  className="popup-text-alignment"
                />
              </div>
            ) : (
              <div
                style={{ ...bodyTextStyle, fontFamily }}
                className={`footer-details popup-text-alignment ${style?.style}`}
                dangerouslySetInnerHTML={{
                  __html: name ? name : "Jessica Jones",
                }}
              ></div>
            )}
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default FooterCV;
