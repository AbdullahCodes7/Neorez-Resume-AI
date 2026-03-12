import { Icon } from "@iconify/react/dist/iconify.js";
import { Popover, Progress } from "antd";
import { useRef, useState, useEffect, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import PopoverToolbar from "./popover";
import { useDispatch, useSelector } from "react-redux";
import { updateSection } from "../../../redux/resumeSlice2";

const LanguagesProgress = ({
  style,
  bodyTextStyle,
  headingStyle,
  color,
  fontFamily,
}) => {
  const modules = {
    toolbar: {
      container: [["bold", "italic", "underline"]],
    },
  };

  const formats = ["bold", "italic", "underline"];
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);

  const languageSection = resume.sections.find(
    (section) => section.type === "languages"
  ) || { items: [] };

  const [localLanguages, setLocalLanguages] = useState(languageSection.items);
  const [activeIndex, setActiveIndex] = useState(null);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const quillRefs = useRef([]);

  useEffect(() => {
    setLocalLanguages(languageSection.items);
  }, [languageSection.items]);

  const handleEditorClick = (index) => {
    setActiveIndex(index);
    setPopoverVisible(true);

    setTimeout(() => {
      if (quillRefs.current[index] && quillRefs.current[index].focus) {
        quillRefs.current[index].focus();
      }
    }, 50);
  };

  const handleLanguageChange = (index, field, value) => {
    const updatedLanguages = [...localLanguages];
    updatedLanguages[index] = { ...updatedLanguages[index], [field]: value };
    setLocalLanguages(updatedLanguages);
  };

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleBlur = (index, field) => {
    // dispatch(
    //   updateSection({
    //     type: "languages",
    //     index,
    //     data: { [field]: localLanguages[index][field] || "" },
    //   })
    // );
    // setPopoverVisible(false);
    // setActiveIndex(null);

    if (localLanguages[index]) {
      const previousValue = languageSection?.items[index]?.[field] || "";
      const currentValue = localLanguages[index]?.[field] || "";

      // Normalize: Strip HTML and trim spaces
      const previousPlainText = stripHtml(previousValue).trim();
      const currentPlainText = stripHtml(currentValue).trim();

      // console.log(`Previous (${field}):`, previousPlainText);
      // console.log(`Current (${field}):`, currentPlainText);

      // Update Redux only if the actual content has changed
      if (currentPlainText !== previousPlainText) {
        dispatch(
          updateSection({
            type: "languages",
            index,
            data: { items: localLanguages },
          })
        );
      }
    }

    setPopoverVisible(false);
    setActiveIndex(null);
  };

  const handleProgressClick = (e, index) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const progressWidth = rect.width;
    const newProficiency = Math.round((clickPosition / progressWidth) * 100);

    const updatedLanguages = [...localLanguages];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      proficiency: newProficiency,
    };
    setLocalLanguages(updatedLanguages);
    dispatch(
      updateSection({
        type: "languages",
        index,
        data: { proficiency: newProficiency },
      })
    );
  };

  return (
    <div className={`resume-language2 ${style?.style}`}>
      <div className={`sections-title ${style?.style}`}>
        <Icon
          icon="ic:round-language"
          width="20px"
          height="20px"
          className="iconTitle"
        />
        <Icon
          icon="pepicons-pop:line-x"
          width="22px"
          height="20px"
          className="iconLine"
        />
        <h2 style={{ ...headingStyle, color: color, fontFamily }}>Language</h2>
      </div>
      <div className="flex flex-col gap-1 borderClick px-1 py-2">
        {localLanguages.map((lang, index) => (
          <div key={index} className="relative">
            <Popover
              content={
                <PopoverToolbar
                  activeEditor="languages"
                  activeIndex={index}
                  setActiveIndex={setActiveIndex}
                />
              }
              trigger="click"
              open={popoverVisible && activeIndex === index}
              onOpenChange={(visible) => {
                if (!visible) {
                  setPopoverVisible(false);
                  setActiveIndex(null);
                }
              }}
              placement="top"
            />

            <div className="grid grid-cols-2 gap-4">
              <ReactQuill
                ref={(el) => (quillRefs.current[index] = el)}
                value={localLanguages[index]?.name || "English"}
                modules={modules}
                formats={formats}
                theme="bubble"
                placeholder="Write languages..."
                onChange={(value) => handleLanguageChange(index, "name", value)}
                onFocus={() => handleEditorClick(index)}
                onBlur={() => handleBlur(index, "name")}
                style={{ ...bodyTextStyle, fontFamily }}
                className={` text-${fontFamily} cvBody-details text-${bodyTextStyle?.fontSize}`}
              />

              <div
                onClick={(e) => handleProgressClick(e, index)}
                style={{ cursor: "pointer" }}
              >
                <Progress
                  showInfo={false}
                  percent={lang.proficiency || 70}
                  size="small"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguagesProgress;
