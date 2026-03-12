import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import PopoverToolbar from "./popover";
import { Popover } from "antd";
import DatePickerComponent from "./datePicker";

const ActivitiesProjects = (style) => {
  // Quill modules
  const modules = {
    toolbar: {
      container: [["bold", "italic", "underline"]],
    },
  };

  // Quill Formats
  const formats = ["bold", "italic", "underline"];
  const content = (
    <div>
      <PopoverToolbar />
    </div>
  );

  const [project, setProject] = useState([
    {
      id: 1,
      title: "Activity/Project Title",
      description: "Describe what you did and what your impact was",
    },
    {
      id: 2,
      title: "Activity/Project Title",
      description: "Describe what you did and what your impact was",
    },
  ]);

  // Track the currently active editor
  const [activeEditor, setActiveEditor] = useState(null);

  // Handle editor click
  const handleEditorClick = (id) => {
    setActiveEditor(id);
  };

  return (
    <div className={`resume-activities ${style?.style}`}>
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
        <h2>Projects & Extracurricular </h2>
      </div>
      <div className="seperateHeading"></div>
      <Popover content={content} trigger="click">
        <div className="project-content borderClick px-1 py-2">
          {project.map((prjct) => (
            <div key={prjct.id}>
              <div className="title-date">
                {/* Title */}
                <div
                  // key={prjct.id}
                  onClick={() => handleEditorClick(prjct.id)}
                  className="name-wrap"
                >
                  {activeEditor === prjct.id ? (
                    <div className="relative">
                      <ReactQuill
                        value={prjct.title}
                        modules={modules}
                        formats={formats}
                        theme="bubble"
                        placeholder="Write Project Name..."
                        onBlur={() => setActiveEditor(null)}
                      />
                    </div>
                  ) : (
                    <div
                      className={`project-name ${style?.style}`}
                      dangerouslySetInnerHTML={{ __html: prjct.title }}
                    ></div>
                  )}
                </div>
                {/* Date */}
                <div className="project-date">
                  <DatePickerComponent />
                </div>
              </div>
              {/* Description */}
              <div
                key={prjct.id}
                onClick={() => handleEditorClick(prjct.id)}
                className="description-wrap"
              >
                {activeEditor === prjct.id ? (
                  <div className="relative">
                    <ReactQuill
                      value={prjct.description}
                      modules={modules}
                      formats={formats}
                      theme="bubble"
                      placeholder="Write Project Detail..."
                      onBlur={() => setActiveEditor(null)}
                    />
                  </div>
                ) : (
                  <li
                    className={`project-description ${style?.style}`}
                    dangerouslySetInnerHTML={{ __html: prjct.description }}
                  ></li>
                )}
              </div>
            </div>
          ))}
        </div>
      </Popover>
    </div>
  );
};

export default ActivitiesProjects;
