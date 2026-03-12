import React, { useEffect, useRef, useState } from "react";
import Button from "../../../../components/shared/button";
import Calender from "../../../../assets/icons/dashboard/Calendar.svg";
import DatePickerComponent from "../../../ResumeTemps/components/datePicker";
import { updateSection } from "../../../../redux/resumeSlice2";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import { Popover } from "antd";
import PopoverToolbar from "../../../ResumeTemps/components/popover";
import DeletePopover from "../../../ResumeTemps/components/deletePopover";

const Projects = ({
  handleAddSection,
  fontFamily,
  color,
  bodyTextStyle,
  headingStyle,
  isModel,
  style,
  section,
}) => {
  const resume = useSelector((state) => state?.resume);
  const projectData =
    section || resume.sections.find((section) => section?.type === "projects");

  const [activeIndex, setActiveIndex] = useState(null); // Track active item index
  const [projects, setProjects] = useState([]); // Local state to manage projects
  const [popoverVisible, setPopoverVisible] = useState(null);
  const [popoverVisible1, setPopoverVisible1] = useState(false);
  const [headerValue, setHeaderValue] = useState("Projects");
  const dispatch = useDispatch();
  const quillRefs = useRef([]); // Refs for ReactQuill editors

  // Synchronize local state with Redux data only when projectData.items changes
  useEffect(() => {
    if (projectData?.items?.length) {
      setProjects([...projectData.items]);
    }
  }, [projectData?.items]);
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
      ],
    },
  };
  const handleContentBlur = () => {
    // Dispatch only when local state changes are finalized
    dispatch(
      updateSection({
        type: "projects",
        data: {
          header: headerValue,
          items: projects,
        },
      })
    );
    setPopoverVisible(null); // Close popover on blur
    setPopoverVisible1(false);
  };

  const handleEditorClick = (index) => {
    setActiveIndex(index);
    setPopoverVisible(index); // Open popover for the current editor
  };

  const handleProjectChange = (index, field, value) => {
    // Update local state directly without triggering unnecessary renders
    setProjects((prev) => {
      const updatedProjects = [...prev];
      updatedProjects[index] = { ...updatedProjects[index], [field]: value };
      return updatedProjects;
    });
  };

  // Handling the editable header input change
  const handleHeaderChange = (e) => {
    setHeaderValue(e.target.value);
  };

  const handleAddProject = () => {
    const newProject = {
      projectName: "New Project",
      description: "<ul><li>New project description</li></ul>",
    };
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects); // Update local state

    // Dispatch the new project to Redux
    handleAddSection({
      header: "Projects",
      type: "projects",
      items: updatedProjects,
    });
  };

  const textColor =
    projectData?.column === "left" &&
    ["resumeTemp4", "resumeTemp5"].includes(style)
      ? "white"
      : style?.color || color;

  // console.log("projectData", projectData);

  return (
    <>
      {isModel ? (
        <div
          onClick={handleAddProject}
          className="flex flex-col gap-2 w-[359px] min-h-[174px] addSection"
        >
          <div className="relative group overflow-hidden rounded-md">
            <div className="sectionBox opacity-1 px-[10px] py-5 flex flex-col gap-1">
              <p className="font-OpenSan darkBlack para-text font-semibold">
                Projects
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col items-start gap-1">
                  <p className="font-OpenSan para-text text-center font-semibold darkBlue">
                    Tesla Model S for Kids
                  </p>
                  <div className="flex items-center gap-1 hidden">
                    <img src={Calender} alt="Calender Icon" />
                  </div>
                </div>
                <div className="blank">
                  <li className="font-OpenSan mediumGray para-ex-small list-disc">
                    Lorem ipsum dolor sit amet consectetur. Quis facilisi justo
                    integer malesuada.
                  </li>
                </div>
                <div className="blank">
                  <li className="font-OpenSan mediumGray para-ex-small list-disc">
                    Lorem ipsum dolor sit amet consectetur. Quis facilisi justo
                    integer malesuada.
                  </li>
                </div>
              </div>
              <Button
                className="absolute w-[60%] btn-primary opacity-0 group-hover:opacity-100 group-hover:block 
                left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out"
                text="Add section"
                minHeight={41}
              />
            </div>
          </div>
          <p className="font-OpenSan para-small text-center font-semibold darkBlue">
            Projects
          </p>
        </div>
      ) : (
        <div className="sectionBox opacity-1 px-[10px] flex flex-col gap-1">
          <Popover
            trigger="click"
            className="absolute left-1/2 -translate-x-1/2 w-fit"
            visible={popoverVisible1}
            onVisibleChange={(visible) => setPopoverVisible1(visible)}
            content={
              <DeletePopover
                activeEditor="projects"
                // activeIndex={activeIndex} // Pass active index
                // setActiveIndex={setActiveIndex} // Reset active index after deletion
              />
            }
          ></Popover>

          {/* <p
            className="font-OpenSan darkBlack para-text font-semibold"
            style={{
              ...headingStyle,
              fontFamily,
              // color: ["resumeTemp4", "resumeTemp5"].some((temp) =>
              //   style?.includes(temp)
              // )
              //   ? textColor
              //   : color,
              color: color || textColor,
            }}
          >
            Projects
          </p> */}
          {/* Editable Header Input */}
          <input
            type="text"
            value={headerValue} // Controlled input
            onChange={handleHeaderChange} // Update state on change
            onBlur={() => handleContentBlur} // Save when it loses focus
            placeholder="Enter section header"
            style={{
              ...headingStyle,
              fontFamily,
              color: color || textColor,
            }}
            className="w-full cursor-pointer bg-transparent"
            onClick={() => setPopoverVisible1(true)}
          />
          {projects?.map((project, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Popover
                content={
                  <PopoverToolbar
                    activeEditor="projects"
                    activeIndex={activeIndex}
                  />
                }
                trigger="click"
                open={popoverVisible === index}
                onOpenChange={(visible) => !visible && setPopoverVisible(null)}
                placement="top"
              />

              <div className="flex items-start gap-1">
                <ReactQuill
                  value={project?.projectName || "Project Name"}
                  onChange={(value) =>
                    handleProjectChange(index, "projectName", value)
                  }
                  onFocus={() => handleEditorClick(index)}
                  onBlur={handleContentBlur}
                  theme="bubble"
                  placeholder="Enter project title"
                  className={`text-${fontFamily} cvBody-details popup-text-alignment text-${bodyTextStyle?.fontSize} text-color-${textColor} `}
                  modules={{
                    toolbar: [["bold", "italic", "underline"]],
                  }}
                />
              </div>

              <div className="project_description">
                <ReactQuill
                  value={project?.description}
                  onChange={(value) =>
                    handleProjectChange(index, "description", value)
                  }
                  modules={modules}
                  // style={{ ...bodyTextStyle, fontFamily: fontFamily }}
                  onFocus={() => handleEditorClick(index)}
                  onBlur={handleContentBlur}
                  className={`proj_description popup-text-alignment text-${fontFamily} cvBody-details project text-${bodyTextStyle?.fontSize} text-color-${textColor}`}
                  theme="bubble"
                  placeholder="Enter project details here..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Projects;
