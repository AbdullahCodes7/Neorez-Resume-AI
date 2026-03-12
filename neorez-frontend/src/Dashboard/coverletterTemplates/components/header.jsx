import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Popover } from "antd";
import { saveCoverLetterData } from "../../../redux/actions/SaveCoverLEtter";
import { deleteCoverLetterField } from "../../../redux/coverLetterSlice";
import PopoverToolbar from "../../ResumeTemps/components/popover";

const Header = ({
  headingStyle,
  bodyTextStyle,
  style,
  color,
  fontFamily,
  data,
}) => {
  const dispatch = useDispatch();
  const coverLetterData = data || useSelector((state) => state.coverLetter);
  const quillRefs = useRef({}); // Refs for each ReactQuill instance

  const [fields, setFields] = useState({
    date: data?.date || coverLetterData.date || "[Today’s Date]",
    company:
      data?.company || coverLetterData.company || "[Organization/Company Name]",
    address:
      data?.address ||
      coverLetterData.address ||
      "[Organization/Company Mailing Address]",
    letterTo: data?.letterTo || coverLetterData.letterTo || "Dear Ms. Morris,",
  });

  const [activeEditor, setActiveEditor] = useState(""); // Active editor for focus
  const [deletedFields, setDeletedFields] = useState(new Set()); // Track deleted fields

  const [activeIndex, setActiveIndex] = useState(new Set()); // Track deleted fields

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

  const formats = [
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
    "align",
  ];

  // Fetch data from Redux and set it in state
  useEffect(() => {
    if (coverLetterData) {
      setFields({
        date: data?.date || coverLetterData.date || "[Today’s Date]",
        company:
          data?.company ||
          coverLetterData.company ||
          "[Organization/Company Name]",
        address:
          data?.address ||
          coverLetterData.address ||
          "[Organization/Company Mailing Address]",
        letterTo:
          data?.letterTo || coverLetterData.letterTo || "Dear Ms. Morris,",
      });
    }
  }, [coverLetterData]);

  // Handle ReactQuill changes but avoid unnecessary re-renders
  const handleEditorChange = (field, value) => {
    setFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const handleEditorClick = (field) => {
    setActiveEditor(field); // Set active editor
  };

  // Save changes when editor loses focus
  const stripHTML = (html) => {
    return html.replace(/<\/?p>/g, "").trim(); // Remove <p> and </p> tags
  };

  const handleBlurSave = (field, value) => {
    const cleanValue = stripHTML(value);
    const cleanPrevValue = stripHTML(coverLetterData[field] || "");
    // console.log("cleanPrevValue", cleanPrevValue);

    // console.log(
    //   `Checking field: ${field}, Previous: ${cleanPrevValue}, New: ${cleanValue}`
    // );

    if (cleanValue !== cleanPrevValue) {
      // console.log("Value changed, updating Redux...");
      saveCoverLetterData(field, cleanValue, dispatch);
    } else {
      console.log("No change detected, skipping Redux update.");
    }
    setActiveEditor("");
  };

  const handleDeleteField = (field) => {
    // Remove field from local state and Redux
    setDeletedFields((prev) => new Set(prev).add(field)); // Mark field as deleted
    setFields((prevFields) => {
      const updatedFields = { ...prevFields };
      delete updatedFields[field]; // Completely remove field from state
      return updatedFields;
    }); // Remove the field from local state
    dispatch(deleteCoverLetterField(field)); // Remove from Redux store
  };

  return (
    <div className={`cv-header ${style?.style}`}>
      <div className="flex flex-col gap-3 w-full">
        {/* Single Popover for all fields except letterTo */}
        <Popover
          content={
            <PopoverToolbar
              activeEditor={activeEditor}
              activeIndex={0}
              setActiveIndex={setActiveIndex}
              handleDelete={() => handleDeleteField(activeEditor)}
            />
          }
          trigger="click"
          open={activeEditor !== "" && activeEditor !== "letterTo"}
          onOpenChange={(open) => {
            if (!open) {
              setActiveEditor(""); // Close Popover when it's not open
            }
          }}
        >
          {/* Fields (date, company, address) handled in one ReactQuill */}
          {["date", "company", "address"].map((field) => {
            if (deletedFields.has(field)) return null; // Skip rendering deleted fields

            return (
              <div key={field} onClick={() => handleEditorClick(field)}>
                <ReactQuill
                  // ref={(el) => (quillRefs.current[field] = el)} // Attach ref to each field
                  value={fields[field]}
                  modules={modules}
                  formats={formats}
                  theme="bubble"
                  placeholder={`Enter ${field} here...`}
                  onChange={(value) => handleEditorChange(field, value)}
                  onBlur={() => handleBlurSave(field, fields[field])}
                  className={`header-details ${style?.style} coverLetter-Details popup-text-alignment coverLettertext-${fontFamily} coverLettertext-${bodyTextStyle?.fontSize}`}
                  style={{
                    ...bodyTextStyle,
                    fontFamily,
                    border: activeEditor === field ? "1px solid blue" : "none", // Add border when active
                    transition: "border 0.3s",
                  }}
                />
              </div>
            );
          })}
        </Popover>

        {/* Letter To field handled separately */}
        {!deletedFields.has("letterTo") && (
          <div onClick={() => handleEditorClick("letterTo")}>
            <ReactQuill
              // ref={(el) => (quillRefs.current["letterTo"] = el)} // Attach ref for the letterTo field
              value={fields.letterTo}
              modules={modules}
              formats={formats}
              theme="bubble"
              placeholder="Enter Name here..."
              onChange={(value) => handleEditorChange("letterTo", value)}
              onBlur={() => handleBlurSave("letterTo", fields.letterTo)}
              className={`header-name ${style?.style} coverLetter-Details popup-text-alignment coverLettertext-${fontFamily} coverLettertext-${bodyTextStyle?.fontSize}`}
              style={{
                ...bodyTextStyle,
                color: color,
                fontFamily,
                border: activeEditor === "letterTo" ? "1px solid blue" : "none", // Add border when active
                transition: "border 0.3s",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
