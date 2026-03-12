import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateSkill } from "../../../redux/resumeSlice";
import { Popover, Progress } from "antd";
import PopoverToolbar from "./popover";
const SkillProgress = ({ style, bodyTextStyle, headingStyle, color }) => {
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

  // Quill Formats
  const formats = ["bold", "italic", "underline", "list", "bullet", "link"];
  //
  const resume = useSelector((state) => state.resume);
  const skills = resume.sections[4];
  const dispatch = useDispatch();

  // console.log(skills);
  // Track the currently active editor
  const [activeEditor, setActiveEditor] = useState("");
  // Handle editor click
  const handleEditorClick = (editorType) => {
    setActiveEditor(editorType);
  };

  const handleSkillChange = (index, field, value) => {
    dispatch(updateSkill({ index, data: { [field]: value } }));
  };

  // console.log("Skills", skills);
  return (
    <>
      <div className={`resume-skills-progress ${style?.style}`}>
        <div className={`sections-title ${style?.style}`}>
          <Icon
            icon="carbon:skill-level-basic"
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
          <h2 style={headingStyle}>Skills</h2>
        </div>
        <div className="seperateHeading"></div>
        <Popover content={content} trigger="click">
          <div className=" borderClick px-1 py-2">
            {skills?.items?.map((skill, index) => (
              <div className="skill-wrap">
                <div key={index} onClick={() => handleEditorClick(index)}>
                  {activeEditor === index ? (
                    <div className="relative">
                      <ReactQuill
                        value={skill.name}
                        onChange={(value) =>
                          handleSkillChange(index, "name", value)
                        }
                        modules={modules}
                        formats={formats}
                        theme="bubble"
                        placeholder="Enter your skills here..."
                      />
                    </div>
                  ) : (
                    <div
                      className={`skill-content ${style?.style}`}
                      style={bodyTextStyle}
                      dangerouslySetInnerHTML={{
                        __html: skill.name ? skill.name : `Skills `,
                      }}
                    ></div>
                  )}
                </div>
                <div>
                  <div className="progressbar-skill">
                    <Progress percent={35} />
                  </div>
                  <div className="flex dashed-skill">
                    <div className="font-bold black text-[30px]">-</div>
                    <div className="font-bold black text-[30px]">-</div>
                    <div className="font-bold black text-[30px]">-</div>
                    <div className="font-bold black text-[30px]">-</div>
                    <div className="font-bold black text-[30px]">-</div>
                    <div className="font-bold text-[#707070] text-[30px]">
                      -
                    </div>
                    <div className="font-bold text-[#707070] text-[30px]">
                      -
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Popover>
      </div>
    </>
  );
};

export default SkillProgress;
