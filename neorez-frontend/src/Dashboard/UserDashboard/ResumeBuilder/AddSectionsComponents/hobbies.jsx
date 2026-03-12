import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "antd";
import { updateSection } from "../../../../redux/resumeSlice2";
import PopoverToolbar from "../../../ResumeTemps/components/popover";
import Button from "../../../../components/shared/button";

const Interest = ({
  bodyTextStyle,
  headingStyle,
  style,
  color,
  fontFamily,
  handleAddSection,
  isModel,
}) => {
  const modules = {
    toolbar: {
      container: [["bold", "italic", "underline"]],
    },
  };

  const formats = ["bold", "italic", "underline"];

  const resume = useSelector((state) => state.resume);
  const Interest = resume.sections.find(
    (section) => section.type === "hobbies"
  );
  const dispatch = useDispatch();

  const [activeEditor, setActiveEditor] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [tempHeader, setTempHeader] = useState(Interest?.header || "Hobbies");
  const [tempItems, setTempItems] = useState(
    Interest?.items.length > 0
      ? Interest.items
      : [{ id: Date.now(), name: "Cycling" }]
  ); // Default to "Cycling" if no items
  const quillRefs = useRef([]); // Store refs for ReactQuill instances

  useEffect(() => {
    if (Interest) {
      setTempItems([...Interest.items]);
    }
  }, [Interest]); // Ensure that tempItems is updated when Interest changes

  const handleEditorClick = (editorType, index = null) => {
    setActiveEditor(editorType);
    setActiveIndex(index);

    // Focus the ReactQuill editor after Popover opens
    if (index !== null) {
      setTimeout(() => {
        if (quillRefs.current[index] && quillRefs.current[index].focus) {
          quillRefs.current[index].focus();
        }
      }, 50);
    }
  };

  const handleOnChange = (index, value) => {
    const updatedItems = tempItems.map((item, i) =>
      i === index ? { ...item, name: value } : item
    );
    setTempItems(updatedItems);
  };

  const handleBlur = (index, field, value) => {
    if (field === "header") {
      dispatch(
        updateSection({
          type: "hobbies",
          data: { header: value },
        })
      );
    } else {
      dispatch(
        updateSection({
          type: "hobbies",
          index,
          data: { [field]: value },
        })
      );
    }
    setActiveEditor(null);
    setActiveIndex(null);
  };

  const handleAddInterest = () => {
    const newInterest = { id: Date.now(), name: "" }; // Add a new interest with an empty name
    setTempItems([...tempItems, newInterest]); // Add to local state
  };

  const handleClick = () => {
    const sectionData = {
      column: "left",
      header: "Hobbies",
      type: "hobbies",
      items: tempItems,
    };
    handleAddSection(sectionData); // Pass data to the parent component
  };

  return (
    <>
      {!isModel ? (
        <>
          <div
            className={`flex flex-col gap-2 w-[359px] addSection ${style?.style}`}
          >
            {/* Section Box */}
            <div className="relative group overflow-hidden rounded-md">
              <div className="sectionBox opacity-1 px-[10px] py-5 flex flex-col gap-1">
                {/* Header Section */}
                <div className="flex justify-between items-start">
                  <p className="font-OpenSan darkBlack para-text font-semibold">
                    Hobbies
                  </p>
                  <div onClick={() => handleEditorClick("header")}>
                    {activeEditor === "header" ? (
                      <input
                        style={headingStyle}
                        type="text"
                        value={tempHeader}
                        onChange={(e) => setTempHeader(e.target.value)} // Only update local state
                        onBlur={() => handleBlur(null, "header", tempHeader)} // Dispatch change on blur
                        placeholder="Enter section header here..."
                        className="header-input"
                      />
                    ) : (
                      <h2
                        style={{ ...headingStyle, fontFamily, color: color }}
                        onClick={() => handleEditorClick("header")}
                      >
                        {Interest?.header || "Hobbies"}
                      </h2>
                    )}
                  </div>
                </div>
                {/* Separating line */}
                <div className="seperateHeading"></div>

                {/* Interest Items Section */}
                <div className="flex flex-col gap-2">
                  {tempItems.map((intrst, index) => (
                    <Popover
                      key={intrst.id}
                      content={
                        <PopoverToolbar
                          activeEditor="hobbies"
                          activeIndex={activeIndex}
                        />
                      }
                      trigger="click"
                      open={
                        activeEditor === "Interest" && activeIndex === index
                      }
                    >
                      <div onClick={() => handleEditorClick("Interest", index)}>
                        {activeEditor === "Interest" &&
                        activeIndex === index ? (
                          <div className="relative">
                            <ReactQuill
                              ref={(el) => (quillRefs.current[index] = el)} // Attach ref for ReactQuill
                              value={tempItems[index].name}
                              modules={modules}
                              formats={formats}
                              theme="bubble"
                              placeholder="Write your interest here..."
                              onChange={(value) => handleOnChange(index, value)}
                              onBlur={() =>
                                handleBlur(index, "name", tempItems[index].name)
                              }
                            />
                          </div>
                        ) : (
                          <div
                            className="interest-name"
                            style={{ ...bodyTextStyle, fontFamily }}
                            dangerouslySetInnerHTML={{
                              __html: intrst.name || "Cycling", // Default value
                            }}
                          ></div>
                        )}
                        <div
                          className={`interest-separate ${style?.style}`}
                        ></div>
                      </div>
                    </Popover>
                  ))}
                </div>

                {/* Add New Interest Button */}
                {/* <Button
                  className="absolute w-[60%] btn-primary opacity-0 group-hover:opacity-100 group-hover:block 
            left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out"
                  text="Add Interest"
                  minHeight={41}
                  onClick={handleAddInterest}
                /> */}
              </div>
            </div>

            {/* Small Text Below */}
            <p className="font-OpenSan para-small text-center font-semibold darkBlue">
              Interests
            </p>
          </div>
        </>
      ) : (
        <>
          <div
            className={`flex flex-col gap-2 w-[359px] addSection ${style?.style}`}
          >
            <div className="relative group overflow-hidden rounded-md">
              <div className="sectionBox opacity-1 px-[10px] py-5 flex flex-col gap-1">
                {/* Header Section */}
                <p className="font-OpenSan darkBlack para-text font-semibold">
                  Hobbies
                </p>

                {/* Interest Items */}
                <div className="flex justify-between gap-3 items-start">
                  <div className="blank flex flex-col items-start gap-2">
                    {/* Example Static Interest Item */}
                    <p className="font-OpenSan para-text text-center font-semibold darkBlue">
                      Cycling
                    </p>
                    {/* <div className="flex items-center gap-3">
                      {progresArray.map((item) => (
                        <div key={item.id}>{item.icon}</div>
                      ))}
                    </div> */}
                  </div>

                  <div className="blank flex flex-col items-start gap-2">
                    {/* Example Static Interest Item */}
                    <p className="font-OpenSan para-text text-center font-semibold darkBlue">
                      Reading
                    </p>
                    {/* <div className="flex items-center gap-3">
                      {progresArray.map((item) => (
                        <div key={item.id}>{item.icon}</div>
                      ))}
                    </div> */}
                  </div>
                  <div className="blank flex flex-col items-start gap-2">
                    {/* Example Static Interest Item */}
                    <p className="font-OpenSan para-text text-center font-semibold darkBlue">
                      Traveling
                    </p>
                    {/* <div className="flex items-center gap-3">
                      {progresArray.map((item) => (
                        <div key={item.id}>{item.icon}</div>
                      ))}
                    </div> */}
                  </div>
                </div>

                {/* Add Section Button */}
                <Button
                  className="absolute w-[60%] btn-primary opacity-0 group-hover:opacity-100 group-hover:block 
                  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out"
                  text="Add section"
                  minHeight={41}
                  onClick={handleClick}
                />
              </div>
            </div>

            {/* Small Text Below */}
            <p className="font-OpenSan para-small text-center font-semibold darkBlue">
              Interests
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Interest;
