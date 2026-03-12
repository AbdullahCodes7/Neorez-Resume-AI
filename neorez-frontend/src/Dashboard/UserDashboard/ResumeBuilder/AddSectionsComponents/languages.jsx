import React, { useEffect, useRef, useState } from "react";
import Button from "../../../../components/shared/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { updateSection } from "../../../../redux/resumeSlice2";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Popover } from "antd";
import PopoverToolbar from "../../../ResumeTemps/components/popover";
import ReactQuill from "react-quill";

const Languages = ({
  style,
  bodyTextStyle,
  headingStyle,
  color,
  fontFamily,
  handleAddSection,
  isModel,
}) => {
  const progresArray = [
    {
      id: 1,
      icon: (
        <Icon icon="mdi:circle" width="8px" height="8px" className="darkBlue" />
      ),
    },
    {
      id: 2,
      icon: (
        <Icon icon="mdi:circle" width="8px" height="8px" className="darkBlue" />
      ),
    },
    {
      id: 3,
      icon: (
        <Icon icon="mdi:circle" width="8px" height="8px" className="darkBlue" />
      ),
    },
    {
      id: 4,
      icon: (
        <Icon icon="mdi:circle" width="8px" height="8px" className="darkBlue" />
      ),
    },
    {
      id: 5,
      icon: (
        <Icon
          icon="mdi:circle"
          width="8px"
          height="8px"
          className="darkBlue opacity-20"
        />
      ),
    },
    {
      id: 6,
      icon: (
        <Icon
          icon="mdi:circle"
          width="8px"
          height="8px"
          className="darkBlue opacity-20"
        />
      ),
    },
    {
      id: 7,
      icon: (
        <Icon
          icon="mdi:circle"
          width="8px"
          height="8px"
          className="darkBlue opacity-20"
        />
      ),
    },
  ];

  const modules = {
    toolbar: { container: [["bold", "italic", "underline"]] },
  };

  const formats = ["bold", "italic", "underline"];
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);

  const languageSection = resume.sections.find(
    (section) => section.type === "languages"
  );

  const [activeEditor, setActiveEditor] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [localLanguages, setLocalLanguages] = useState(
    languageSection?.items.length > 0
      ? languageSection?.items
      : [{ name: "English", proficiency: "Native" }]
  );
  const quillRefs = useRef([]); // To store refs for ReactQuill editors

  // Sync local state with Redux state on mount or when Redux state changes
  useEffect(() => {
    setLocalLanguages(
      languageSection?.items || [{ name: "English", proficiency: "Native" }]
    );
  }, [languageSection?.items]);

  const handleEditorClick = (index) => {
    setActiveEditor("languages");
    setActiveIndex(index);

    // Focus the ReactQuill editor after Popover opens
    setTimeout(() => {
      if (quillRefs.current[index] && quillRefs.current[index].focus) {
        quillRefs.current[index].focus();
      }
    }, 50); // Slight delay to ensure Popover is fully opened
  };

  const handleLanguageChange = (index, field, value) => {
    const updatedLanguages = [...localLanguages];
    updatedLanguages[index] = { ...updatedLanguages[index], [field]: value };
    setLocalLanguages(updatedLanguages); // Update local state immediately
  };

  const handleBlur = (index, field) => {
    dispatch(
      updateSection({
        type: "languages",
        index,
        data: { [field]: localLanguages[index][field] || "" },
      })
    );
    setActiveEditor(null);
    setActiveIndex(null);
  };

  const handleAddLanguage = () => {
    const newLanguage = { name: "", proficiency: "Intermediate" };
    setLocalLanguages([...localLanguages, newLanguage]); // Add a new language entry
  };

  const handleClick = () => {
    const sectionData = {
      column: "left",
      header: "Languages",
      type: "languages",
      items: localLanguages,
    };
    handleAddSection(sectionData); // Pass data to the parent component
  };

  return (
    <>
      {!isModel ? (
        <>
          <div className="flex flex-col gap-2 w-[359px] addSection">
            <div className="relative group overflow-hidden rounded-md">
              <div className="sectionBox opacity-1 px-[10px] py-5 flex flex-col gap-1">
                <p className="font-OpenSan darkBlack para-text font-semibold">
                  Languages
                </p>
                <div className="flex justify-between gap-5 items-start">
                  <div className="blank flex flex-col items-start gap-2">
                    {localLanguages?.map((lang, index) => (
                      <Popover
                        key={index}
                        content={
                          <PopoverToolbar
                            activeEditor="languages"
                            activeIndex={index}
                          />
                        }
                        trigger="click"
                        open={
                          activeEditor === "languages" && activeIndex === index
                        }
                      >
                        <div onClick={() => handleEditorClick(index)}>
                          {activeEditor === "languages" &&
                          activeIndex === index ? (
                            <div className="relative">
                              <ReactQuill
                                ref={(el) => (quillRefs.current[index] = el)}
                                value={localLanguages[index]?.name || ""}
                                modules={modules}
                                formats={formats}
                                theme="bubble"
                                placeholder="Write languages..."
                                onChange={(value) =>
                                  handleLanguageChange(index, "name", value)
                                }
                                onBlur={() => handleBlur(index, "name")}
                              />
                            </div>
                          ) : (
                            <div
                              className={`language-name ${style?.style}`}
                              style={{ ...bodyTextStyle, fontFamily }}
                              dangerouslySetInnerHTML={{
                                __html:
                                  localLanguages[index]?.name || "English",
                              }}
                            />
                          )}
                          <div
                            className={`language-seperate ${style?.style}`}
                          ></div>
                        </div>
                      </Popover>
                    ))}
                  </div>
                </div>
                <Button
                  className="absolute w-[60%] btn-primary opacity-0 group-hover:opacity-100 group-hover:block 
                    left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out"
                  text="Add Language"
                  minHeight={41}
                  onClick={handleAddLanguage} // Add new language
                />
                <Button
                  className="absolute w-[60%] btn-primary opacity-0 group-hover:opacity-100 group-hover:block 
                    left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out"
                  text="Add section"
                  minHeight={41}
                  onClick={handleClick} // Trigger section addition
                />
              </div>
            </div>
            <p className="font-OpenSan para-small text-center font-semibold darkBlue">
              Languages
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2 w-[359px] addSection">
            <div className="relative group overflow-hidden rounded-md">
              <div className="sectionBox opacity-1 px-[10px] py-5 flex flex-col gap-1">
                <p className="font-OpenSan darkBlack para-text font-semibold">
                  Languages
                </p>
                <div className="flex  justify-between gap-5 items-start">
                  <div className="blank flex flex-col items-start gap-2">
                    <p className="font-OpenSan  para-text text-center font-semibold darkBlue">
                      English
                    </p>
                    <div className="flex items-center gap-3">
                      {progresArray.map((item) => (
                        <div key={item.id}>{item.icon}</div>
                      ))}
                    </div>
                  </div>

                  <div className="blank flex flex-col items-start gap-2">
                    <p className="font-OpenSan  para-text text-center font-semibold darkBlue">
                      Spanish
                    </p>
                    <div className="flex items-center gap-3">
                      {progresArray.map((item) => (
                        <div key={item.id}>{item.icon}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <Button
                  className="absolute w-[60%] btn-primary opacity-0 group-hover:opacity-100 group-hover:block 
            left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out"
                  text="Add section"
                  minHeight={41}
                  onClick={handleClick} // Trigger section addition
                  // onClick={() => handleAddSection(add)}
                />
              </div>
            </div>
            <p className="font-OpenSan  para-small text-center font-semibold darkBlue">
              Languages
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Languages;
