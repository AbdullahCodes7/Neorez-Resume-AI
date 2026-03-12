import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { saveCoverLetterData } from "../../../redux/actions/SaveCoverLEtter";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "antd";
import PopoverToolbar from "../../ResumeTemps/components/popover";
import { toast } from "react-toastify";

const LetterBody = ({
  headingStyle,
  bodyTextStyle,
  style,
  color,
  fontFamily,
  data,
}) => {
  // console.log("data body =================================", data);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(null);
  const [popoverVisible, setPopoverVisible] = useState(false); // Track popover visibility
  const quillRefs = useRef([]); // Array of refs for each ReactQuill instance
  const [activeEditor, setActiveEditor] = useState("");
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

  const letterContentFromRedux = useSelector((state) =>
    Array.isArray(state.coverLetter.body) ? state.coverLetter.body : []
  );

  const [body, setContent] = useState(data?.body || letterContentFromRedux);

  // Update body state only when letterContentFromRedux changes
  useEffect(() => {
    if (
      Array.isArray(letterContentFromRedux) &&
      body !== letterContentFromRedux
    ) {
      setContent(data?.body || letterContentFromRedux);
    }
  }, [letterContentFromRedux]);

  const handleEditorClick = (editorType, index) => {
    setActiveIndex(index);
    setActiveEditor(editorType);
    setPopoverVisible(true); // Open the popover when clicking an editor

    // Focus the corresponding ReactQuill editor
    // setTimeout(() => {
    //   if (quillRefs.current[index]) {
    //     quillRefs.current[index].focus();
    //   }
    // }, 0);
  };
  // Strips starting and ending <p> tags
  const stripHTML = (html) => html.replace(/^<p>|<\/p>$/g, "").trim();

  const handleBlurSave = (index) => {
    const cleanValue = stripHTML(body[index]?.description || "");
    const cleanPrevValue = stripHTML(
      letterContentFromRedux[index]?.description || ""
    );

    // console.log("🚀 Cleaned New Value:", cleanValue);
    // console.log("🎯 Cleaned Previous Value (Redux):", cleanPrevValue);

    if (cleanValue !== cleanPrevValue) {
      // console.log("✅ Content has changed, updating Redux...");
      saveCoverLetterData("body", body, dispatch);
    } else {
      console.log("⚠️ No change detected, skipping Redux update.");
    }

    setPopoverVisible(false);
    setActiveIndex(null);
    // saveCoverLetterData("body", body, dispatch);
    // setPopoverVisible(false); // Close popover after saving
    // setActiveIndex(null);
  };

  const handleChangeContent = (value, index) => {
    const wordCount = value.trim().split(/\s+/).length;
    if (wordCount > 400) {
      toast.error("Word limit exceeded! Only 400 words are allowed.", {
        position: "top-right",
        autoClose: 3000,
      });

      const truncatedValue = value.trim().split(/\s+/).slice(0, 400).join(" ");
      value = truncatedValue;
    }

    const updatedBody = [...body];
    updatedBody[index] = { ...updatedBody[index], description: value };
    setContent(updatedBody);
  };

  const handleAddNewSection = () => {
    const newSection = {
      description:
        "I am writing to apply to the Spring 2016 public relations internship...",
    };
    const updatedBody = [...body, newSection];
    setContent(updatedBody);
    saveCoverLetterData("body", updatedBody, dispatch);
  };

  const handleDeleteSection = (index) => {
    const updatedBody = body.filter((_, i) => i !== index);
    setContent(updatedBody);
    saveCoverLetterData("body", updatedBody, dispatch);
    setPopoverVisible(false);
    setActiveIndex(null);
  };

  const isBodyEmpty =
    !Array.isArray(body) ||
    body.length === 0 ||
    body.every((item) => !item?.description?.trim());

  return (
    <div className={`cv-letter ${style?.style}`}>
      {isBodyEmpty ? (
        <div className="flex justify-center my-4">
          <button
            onClick={handleAddNewSection}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Add New Section
          </button>
        </div>
      ) : (
        body.map((item, index) => (
          <div key={index} style={{ position: "relative" }}>
            {/* ReactQuill Editor */}
            <div className="absolute top-0 right-20">
              <Popover
                content={
                  <PopoverToolbar
                    activeIndex={activeIndex}
                    activeEditor={activeEditor}
                    onAddSection={handleAddNewSection}
                    handleDelete={() => handleDeleteSection(index)}
                  />
                }
                visible={popoverVisible && activeIndex === index}
                placement="top"
                trigger="click"
              >
                <div /> {/* Anchor for the popover */}
              </Popover>
            </div>

            <ReactQuill
              // ref={(el) => (quillRefs.current[index] = el)}
              value={item.description}
              modules={modules}
              formats={formats}
              onChange={(value) => handleChangeContent(value, index)}
              onBlur={() => handleBlurSave(index)}
              placeholder="Enter Letter here..."
              theme="bubble"
              onFocus={() => handleEditorClick("body", index)} // Trigger focus and popover
              className={`coverLetter-Details popup-text-alignment coverLettertext-${fontFamily} coverLettertext-${bodyTextStyle?.fontSize}`}
            />

            {/* Popover */}
          </div>
        ))
      )}
    </div>
  );
};

export default LetterBody;
