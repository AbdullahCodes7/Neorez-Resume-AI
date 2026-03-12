import React, { useEffect, useRef, useState } from "react";
import Profile from "../components/profileSection";
import About from "../components/about";
import WorkExperience from "../components/workExperience";
import Contact from "../components/contact";
import Education from "../components/education";
import Certification from "../components/certifications";
import Skill from "../components/skill";
import SkillProgress from "../components/skillProgress";
import LanguagesProgress from "../components/languages2";
import ProfileImage from "../components/profileImage";
import CustomSections from "../components/customSections";
import TrainingCourses from "../../UserDashboard/ResumeBuilder/AddSectionsComponents/trainingCourse";
import CustomTitle from "../../UserDashboard/ResumeBuilder/AddSectionsComponents/customTitle";
import Projects from "../../UserDashboard/ResumeBuilder/AddSectionsComponents/projects";
import Strength from "../../UserDashboard/ResumeBuilder/AddSectionsComponents/strength";
import Summary from "../../UserDashboard/ResumeBuilder/AddSectionsComponents/summary";
import Interest from "../components/interest";

import { useSelector } from "react-redux";
import Languages from "../components/languages";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateAllSections,
  updateColor,
  updateFontFamily,
  updateFontSize,
  updateLineHeight,
  updateMargin,
  updateSection,
  updateTemplateId,
  updateUid,
} from "../../../redux/resumeSlice2";
import { fetchResumeData } from "../../../redux/actions/fetchResume";
import { useDispatch } from "react-redux";
import { useSectionsContext } from "../../../App";

const ResumeTemp1 = ({ style, data, resumeRef, fromTemplatePage }) => {
  const uidParams = useParams();
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);
  const [activeSection, setActiveSection] = useState({
    side: "",
    index: null,
  });
  const wrapperRef = useRef(null);
  const [selectedSection, setSelectedSection] = useState(null);
  // console.log("resume", resume);

  const sections = data?.sections ? data?.sections : resume?.sections;
  // console.log("sections sections", sections);
  const { setSectionsState } = useSectionsContext();

  const navigate = useNavigate();
  const uid = useSelector((state) => state.resume.uid);
  const userInfo = useSelector((state) => state.userData);
  const design = data?.design || useSelector((state) => state.resume.design);
  const { fontSize, color, margin, lineHeight, fontFamily } = design || {};

  useEffect(() => {
    const currentUid = uid || uidParams.uid;
    if (fromTemplatePage === true) {
      // console.log("first");

      navigate(location.pathname, { replace: true, state: {} }); // Reset `location.state` to avoid persisting
    } else if (currentUid) {
      // console.log("2nd first");

      dispatch(fetchResumeData(currentUid));
    } else if (userInfo) {
      // Initialize resume data from userInfo if no uid is provided
      dispatch(
        updateSection({
          type: "profile",
          data: {
            // name: `${userInfo?.firstName} ${userInfo?.lastName}`,
            name: userInfo?.name,
            contactNumber: userInfo?.contactNumber,
            email: userInfo?.email,
            address: userInfo?.address,
            jobTitle: userInfo?.desiredJobTitle,
            links: userInfo?.links || [],
          },
        })
      );
      // Populate education section
      dispatch(
        updateSection({
          type: "education",
          data: {
            items: userInfo.education.map((edu) => ({
              degree: edu.degree,
              institution: edu.institution,
              reference: edu.reference,
              startDate: edu.startDate,
              endDate: edu.endDate,
            })),
          },
        })
      );
      // Populate skills section
      dispatch(
        updateSection({
          type: "skills",
          data: {
            items: userInfo.skills.map((skill) => ({
              name: skill.name,
              level: skill.level,
            })),
          },
        })
      );
    }
  }, [uid, userInfo]);

  const headingStyle = {
    fontSize: `${fontSize * 1.5}px`,
    // marginBottom: `${margin}px`,
    lineHeight: lineHeight,
  };

  const bodyTextStyle = {
    fontSize: `${fontSize}px`,
    // marginBottom: `${margin * 0.5}px`,
    lineHeight: lineHeight,
  };

  const handleSectionClick = (index, side) => {
    setActiveSection({
      index,
      side,
    });
    // console.log(index, side);
  };
  // Define a mapping of section types to components
  const componentMapping = {
    // profile: Profile,
    education: Education,
    skills: Skill,
    skillProgress: SkillProgress,
    certificates: Certification,
    languages: ["resumeTemp2", "resumeTemp3", "resumeTemp1"].includes(style)
      ? LanguagesProgress
      : Languages,
    about: About,
    profile: Contact,
    workExperience: WorkExperience,
    customSections: CustomSections,
    summary: Summary,
    customTitle: CustomTitle,
    trainingCourses: TrainingCourses,
    projects: Projects,
    strengths: Strength,
    hobbies: Interest,
  };

  // Render components based on the column and type
  const renderColumn = (columnSections) => {
    return columnSections.map((section, index) => {
      const SectionComponent = componentMapping[section?.type];
      // console.log("SectionComponent", SectionComponent);
      if (SectionComponent) {
        return (
          <React.Fragment key={index}>
            <div
              onFocus={() => handleSectionClick(index, section?.column)}
              style={{
                backgroundColor:
                  activeSection.index === index &&
                  activeSection.side === section?.column
                    ? "#fff"
                    : "transparent",
                padding: "10px",
                borderRadius: "5px",
                transition: "background-color 0.3s ease",
                cursor: "pointer",
              }}
            >
              <SectionComponent
                sections={sections}
                headingStyle={headingStyle}
                bodyTextStyle={bodyTextStyle}
                color={color}
                section={section}
                fontFamily={fontFamily}
                userInfo={userInfo}
                resumeRef={resumeRef}
                style={style}
              />
            </div>

            <div className="sepeerateSection"></div>
          </React.Fragment>
        );
      }
      return null;
    });
  };

  // Separate left and right sections based on the column assignment
  const leftColumnSections = sections?.filter(
    (section) => section?.column === "left"
  );

  // console.log("leftColumnSections", leftColumnSections);

  const rightColumnSections = sections?.filter(
    (section) => section?.column === "right"
  );

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setActiveSection({
        index: null,
        side: "",
      });
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const renderProfileColumn = (columnSections) => {
    return columnSections.map((section, index) => {
      section.type === "profile" && setSelectedSection(section);
    });
  };
  useEffect(() => {
    renderProfileColumn(leftColumnSections);
    // console.log("selectedSection", selectedSection);
  }, [leftColumnSections]);
  return (
    <section className="resume-container" ref={resumeRef} id="printableResume">
      <div
        className={`resumeWrap1 ${
          activeSection.index !== null ? "!bg-[#DCDBE0]" : ""
        } ${style}`}
      >
        <div ref={wrapperRef}>
          <div className="profile-content">
            <div
              className=" profile-content cursor-pointer"
              onFocus={() => handleSectionClick(sections?.length, "left")}
              style={{
                backgroundColor:
                  activeSection.index === sections?.length &&
                  activeSection.side === "left"
                    ? "#fff"
                    : "transparent",
                padding: "10px",
                borderRadius: "5px",
                transition: "background-color 0.3s ease",
                cursor: "pointer",
              }}
            >
              <Profile
                headingStyle={headingStyle}
                bodyTextStyle={bodyTextStyle}
                color={color}
                fontFamily={fontFamily}
                userInfo={userInfo}
                resumeRef={resumeRef}
                style={style}
                section={selectedSection}
              />
              <ProfileImage
                headingStyle={headingStyle}
                bodyTextStyle={bodyTextStyle}
                color={color}
                fontFamily={fontFamily}
                userInfo={userInfo}
                resumeRef={resumeRef}
                style={style}
                section={selectedSection}
              />
            </div>
          </div>
          <div className="seperateStart"></div>
          <div className="flex">
            <div className="leftContent" ref={wrapperRef}>
              {renderColumn(leftColumnSections)}
            </div>
            <div className="rightContent" ref={wrapperRef}>
              <div className="sepeerateSectionProfile"></div>
              {renderColumn(rightColumnSections)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeTemp1;
