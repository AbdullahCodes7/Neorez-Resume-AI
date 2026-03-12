import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateHobbies } from "../../../redux/resumeSlice"; // Ensure this action exists in your slice
import interets1 from "../../../assets/images/templates/resume/interest1.webp";
import interets2 from "../../../assets/images/templates/resume/interest2.webp";
import interets3 from "../../../assets/images/templates/resume/interest3.webp";
import interets4 from "../../../assets/images/templates/resume/interest4.webp";

const InterestImages = ({ bodyTextStyle, headingStyle, style, color }) => {
  // Quill modules
  const modules = {
    toolbar: {
      container: [["bold", "italic", "underline"]],
    },
  };

  const formats = ["bold", "italic", "underline"];

  // Accessing Redux State
  const resume = useSelector((state) => state.resume);
  const Interest = resume.sections[8]; // Assuming section 6 is for hobbies
  const dispatch = useDispatch();

  // Track the currently active editor (either for header or specific interests)
  const [activeEditor, setActiveEditor] = useState(null);

  // Handle editor click
  const handleEditorClick = (id) => {
    setActiveEditor(id); // Set the editor active for either header or a specific interest id
  };

  // Handle changes to header or individual interests
  const handleChange = (id, field, value, isHeader = false) => {
    if (isHeader) {
      // Update the header
      dispatch(updateHobbies({ index: null, data: { header: value } }));
    } else {
      // Update interest items
      dispatch(updateHobbies({ index: id, data: { [field]: value } }));
    }
    setActiveEditor(null); // Close the editor after updating
  };

  return (
    <div className={`resume-interest ${style?.style}`}>
      {/* Header Section */}
      <div className={`sections-title ${style?.style}`}>
        <Icon icon="fa-solid:apple-alt" width="20px" height="20px" />
        <div onClick={() => handleEditorClick("header")}>
          {activeEditor === "header" ? (
            <input
              style={headingStyle}
              type="text"
              value={Interest?.header}
              onChange={(e) => handleChange(null, null, e.target.value, true)} // true indicates it's for the header
              onBlur={() => setActiveEditor(null)}
              placeholder="Enter section header here..."
              className="header-input"
            />
          ) : (
            <h2
              style={headingStyle}
              onClick={() => handleEditorClick("header")}
            >
              {Interest?.header}
            </h2>
          )}
        </div>
      </div>
      <div className="seperateHeading mt-1"></div>

      {/* Interest Items Section */}
      <div className="flex  items-center gap-1 borderClick px-1 py-2">
        <img
          src={interets1}
          alt="ineterst"
          className="w-[25%] h-[25%] object-cover"
        />
        <img
          src={interets2}
          alt="ineterst"
          className="w-[25%] h-[25%] object-cover"
        />
        <img
          src={interets3}
          alt="ineterst"
          className="w-[25%] h-[25%] object-cover"
        />
        <img
          src={interets4}
          alt="ineterst"
          className="w-[25%] h-[25%] object-cover"
        />
      </div>
    </div>
  );
};

export default InterestImages;
