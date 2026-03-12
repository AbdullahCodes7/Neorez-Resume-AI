import { Modal } from "antd";
import React, { useState } from "react";
import Button from "../../../components/shared/button";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Summary from "./AddSectionsComponents/summary";
import CustomTitle from "./AddSectionsComponents/customTitle";
import TrainingCourse from "./AddSectionsComponents/trainingCourse";
import Projects from "./AddSectionsComponents/projects";
import Strength from "./AddSectionsComponents/strength";
import Volunteer from "./AddSectionsComponents/volunteer";
import Expertise from "./AddSectionsComponents/expertise";
import Passion from "./AddSectionsComponents/passion";
import FindMe from "./AddSectionsComponents/findMe";
import Certification from "./AddSectionsComponents/certification";
import Awards from "./AddSectionsComponents/awards";
import References from "./AddSectionsComponents/references";
import Philosophy from "./AddSectionsComponents/philosophy";
import Publications from "./AddSectionsComponents/publication";
import AdditionalExperience from "./AddSectionsComponents/additionalExperience";
import Experience from "./AddSectionsComponents/experience";
import AdditionalPublications from "./AddSectionsComponents/additionalPublication";
import Education from "./AddSectionsComponents/education";
import KeyAchievement from "./AddSectionsComponents/acievement";
import Skills from "./AddSectionsComponents/skill";
import AdditionalSkills from "./AddSectionsComponents/AdditionalSkills";
import Languages from "./AddSectionsComponents/languages";
import Hobbies from "./AddSectionsComponents/hobbies";
// import Languages from "../../ResumeTemps/components/languages";
import { Icon } from "@iconify/react/dist/iconify.js";
import { addSection } from "../../../redux/resumeSlice2";
import { useSectionsContext } from "../../../App";

const AddSection = ({ isSectionModalOpen, setIsSectionModalOpen }) => {
  // const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const resume = useSelector((state) => state.resume);
  const dispatch = useDispatch(); // Add this to use Redux
  const { sectionsState, setSectionsState } = useSectionsContext();
  const [toggled, setToggled] = useState(false);

  // console.log("sectionsState", sectionsState);

  const handleSectionModal = () => {
    setIsSectionModalOpen(!isSectionModalOpen);
  };

  // const handleAddSection = (section) => {
  //   // console.log("section", section);

  //   dispatch(addCustomSection(section)); // Dispatch the action to add the section
  //   setIsSectionModalOpen(false);
  // };
  // console.log(resume);

  const handleToggle = () => {
    setToggled(!toggled);
    // console.log(toggled);
  };

  // This function will be called when you want to add a section
  const handleAddSection = (sectionType) => {
    const newSection = {
      column: "right",
      header: sectionType.header,
      type: sectionType.type,
      items: sectionType.items || [],
    };

    // Dispatch action to add the section to Redux
    dispatch(addSection({ newSection }));
    // Also update the context state with the new section
    // setSectionsState((prevSections) => [...prevSections, newSection]);
    // Update only the 'sections' array inside the state

    // setSectionsState((prevState) => ({
    //   ...prevState, // Keep the other properties intact
    //   sections: [...prevState.sections, newSection], // Update the 'sections' array
    // }));

    setSectionsState((prevState) => {
      // Ensure `sectionsState.sections` is an array before trying to spread it
      if (!Array.isArray(prevState.sections)) {
        console.error(
          "prevState.sections is not an array:",
          prevState.sections
        );
        return prevState; // Return unchanged state if it's not an array
      }

      return {
        ...prevState, // Keep other properties intact
        sections: [...prevState.sections, newSection], // Update the sections array
      };
    });

    // dispatch(updateSection());
    // Close the modal after adding
    setIsSectionModalOpen(false);
  };

  // Helper function to check if a section type is already in the resume
  const isSectionInResume = (type) => {
    return resume?.sections?.some((section) => section?.type === type);
  };

  // console.log("isSectionInResume section", resume?.sections); // Check if the sections are properly populated

  // Check if any section has been added to display "Added Sections" header conditionally
  const hasAddedSections = resume?.sections?.some((section) => {
    // console.log("section.type", section.type);
    if (section && section.type) {
      [
        "summary",
        "customTitle",
        "trainingCourses",
        "projects",
        "strengths",
        "languages",
        "hobbies",
      ].includes(section.type);
      return true;
    }
    return false;
  });

  // console.log("hasAddedSections", hasAddedSections);

  const isModel = true;

  return (
    <>
      <div>
        {/* Add section modal */}
        <Modal
          open={isSectionModalOpen}
          onCancel={handleSectionModal}
          footer={null}
          centered
          width="100%"
        >
          <div className=" py-4">
            <p className="text-center para-large font-OpenSan font-semibold darkGray mb-[34px]">
              Add new <span className="primary">section</span>
            </p>
            {/* {isModel ? ( */}
            <div className="flex flex-wrap justify-center gap-4 items-center">
              {!isSectionInResume("summary") && (
                <Summary
                  handleAddSection={handleAddSection}
                  isModel={isModel}
                />
              )}
              {!isSectionInResume("customTitle") && (
                <CustomTitle
                  handleAddSection={handleAddSection}
                  isModel={isModel}
                />
              )}
              {/* {!isSectionInResume("trainingCourses") && (
                <TrainingCourse
                  handleAddSection={handleAddSection}
                  isModel={isModel}
                />
              )} */}
              {!isSectionInResume("projects") && (
                <Projects
                  handleAddSection={handleAddSection}
                  isModel={isModel}
                />
              )}
              {/* {!isSectionInResume("strengths") && (
                <Strength
                  handleAddSection={handleAddSection}
                  isModel={isModel}
                />
              )} */}
              {!isSectionInResume("languages") && (
                <Languages
                  handleAddSection={handleAddSection}
                  isModel={isModel}
                />
              )}
              {!isSectionInResume("hobbies") && (
                <Hobbies
                  handleAddSection={handleAddSection}
                  isModel={isModel}
                />
              )}
              {/* 
              <Volunteer handleAddSection={handleAddSection} />
              <Expertise handleAddSection={handleAddSection} />
              <Passion handleAddSection={handleAddSection} />
              <FindMe handleAddSection={handleAddSection} />
              <Certification handleAddSection={handleAddSection} />
              <Awards handleAddSection={handleAddSection} />
              <References handleAddSection={handleAddSection} />
              <Philosophy handleAddSection={handleAddSection} />
              <Publications handleAddSection={handleAddSection} />
              <AdditionalExperience handleAddSection={handleAddSection} />
              <AdditionalSkills handleAddSection={handleAddSection} />
              <AdditionalPublications handleAddSection={handleAddSection} />
              <Experience handleAddSection={handleAddSection} />
              <Education handleAddSection={handleAddSection} />
              <KeyAchievement handleAddSection={handleAddSection} />
              <Skills handleAddSection={handleAddSection} />
              <Languages handleAddSection={handleAddSection} /> */}
            </div>

            {/* Already Added Sections */}
            {hasAddedSections && (
              <div>
                {toggled ? (
                  <div
                    className="flex justify-center items-center cursor-pointer mt-4 mb-4"
                    onClick={handleToggle}
                  >
                    <h4
                      className="text-center font-semibold mt-2 mb-2"
                      style={{ color: "#32A1F4" }}
                    >
                      Hide Added Sections
                    </h4>
                    <Icon
                      icon="iconamoon:arrow-down-2"
                      width="1.2rem"
                      height="1.2rem"
                    />
                  </div>
                ) : (
                  <div
                    className="flex justify-center items-center cursor-pointer"
                    onClick={handleToggle}
                  >
                    <h4
                      className="text-center font-semibold mt-4 mb-4 "
                      style={{ color: "#32A1F4" }}
                    >
                      Show Added Sections
                    </h4>
                    <Icon
                      icon="iconamoon:arrow-down-2"
                      width="1.2rem"
                      height="1.2rem"
                      onClick={handleToggle}
                    />
                  </div>
                )}

                {toggled && (
                  <div className="flex flex-wrap justify-center gap-4 items-center">
                    {isSectionInResume("summary") && (
                      <Summary isModel={isModel} />
                    )}
                    {isSectionInResume("customTitle") && (
                      <CustomTitle isModel={isModel} />
                    )}
                    {/* {isSectionInResume("trainingCourses") && (
                      <TrainingCourse isModel={isModel} />
                    )} */}
                    {isSectionInResume("projects") && (
                      <Projects isModel={isModel} />
                    )}
                    {!isSectionInResume("languages") && (
                      <Languages isModel={isModel} />
                    )}
                    {!isSectionInResume("hobbies") && (
                      <Hobbies isModel={isModel} />
                    )}
                    {/* {isSectionInResume("strengths") && (
                      <Strength isModel={isModel} />
                    )} */}
                  </div>
                )}
              </div>
            )}
            {/* ) : null} */}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AddSection;
