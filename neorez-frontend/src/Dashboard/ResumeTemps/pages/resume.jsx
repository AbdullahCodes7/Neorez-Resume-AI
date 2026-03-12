import React, { useEffect } from "react";
import Profile from "../components/profileSection";
import About from "../components/about";
import WorkExperience from "../components/workExperience";
import Contact from "../components/contact";
import Education from "../components/education";
import Certification from "../components/certifications";
import Skill from "../components/skill";
import Interest from "../components/interest";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Languages from "../components/languages";
import CustomSections from "../components/customSections";
import Summary from "../../UserDashboard/ResumeBuilder/AddSectionsComponents/summary";
import CustomTitle from "../../UserDashboard/ResumeBuilder/AddSectionsComponents/customTitle";
import TrainigCourses from "../../UserDashboard/ResumeBuilder/AddSectionsComponents/trainingCourse";
import Projects from "../../UserDashboard/ResumeBuilder/AddSectionsComponents/projects";
import Strength from "../../UserDashboard/ResumeBuilder/AddSectionsComponents/strength";
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
import { useNavigate, useParams } from "react-router-dom";
// import CustomSections from "../components/customSections";

const ResumeTemps = ({ style, resumeRef, data, fromTemplatePage }) => {
  const uidParams = useParams();
  // console.log(id);
  // console.log("data resume", data);

  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);
  const navigate = useNavigate();
  const sections = data?.sections ? data?.sections : resume?.sections;
  const uid = useSelector((state) => state.resume.uid);
  const userInfo = useSelector((state) => state.userData);
  // console.log("user =============", user);

  // useEffect(() => {
  //   if (uidParams.uid) {
  //     dispatch(updateUid(uidParams.uid));
  //   }
  // }, []);
  useEffect(() => {
    if (fromTemplatePage == true) {
      navigate(location.pathname, { replace: true, state: {} }); // Reset `location.state` to avoid persisting
    } else if (uid) {
      dispatch(fetchResumeData(uid));
    } else if (userInfo) {
      // Map userInfo fields to the resume 'profile' section
      dispatch(
        updateSection({
          type: "profile",
          data: {
            name: `${userInfo?.firstName} ${userInfo?.lastName}`,
            contactNumber: userInfo?.contactNumber,
            email: userInfo?.email,
            address: userInfo?.address,
            jobTitle: userInfo?.desiredJobTitle,
            links: userInfo?.links || [],
          },
        })
      );

      // Map education info to the 'education' section in resume
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

      // Map skills to the 'skills' section in resume
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
  }, [userInfo, uid]);

  // const resumeRef = useSelector((state) => state.resume.resumeRef);
  // console.log("resumeRef", resumeRef);
  // console.log("userInfo", userInfo);
  // console.log("resume", resume);
  const design = data?.design || useSelector((state) => state.resume.design);
  const { fontSize, color, margin, lineHeight, fontFamily } = design || {};

  const headingStyle = {
    fontSize: `${fontSize * 1.5}px`,
    // color: color,
    // marginBottom: `${margin}px`,
    lineHeight: `${lineHeight}`,
    // fontFamily: `${fontFamily}`,
  };

  const bodyTextStyle = {
    fontSize: `${fontSize}px`,
    // marginBottom: `${margin * 0.5}px`,
    lineHeight: `${lineHeight}`,
    // fontFamily: `${fontFamily}`,
  };

  // Left column section
  const leftSections = ["profile", "about", "workExperience"];

  // Right column sections
  const rightSections = [
    "profile",
    "education",
    "certificates",
    "skills",
    "hobbies",
    "customSections",
  ];

  return (
    <section ref={resumeRef} id="printableResume">
      <div className={`flex gap-8 px-7 py-7 resumeWrap ${style}`}>
        <div className="left flex flex-col gap-8">
          <Profile
            // sections={sections}
            headingStyle={headingStyle}
            bodyTextStyle={bodyTextStyle}
            color={color}
            userInfo={userInfo}
            fontFamily={fontFamily}
          />
          <About
            // sections={sections}
            headingStyle={headingStyle}
            bodyTextStyle={bodyTextStyle}
            color={color}
            userInfo={userInfo}
            fontFamily={fontFamily}
          />
          <WorkExperience
            headingStyle={headingStyle}
            bodyTextStyle={bodyTextStyle}
            color={color}
            userInfo={userInfo}
            fontFamily={fontFamily}
          />
        </div>
        <div className={`sectionSeperate`}></div>
        {/* <div className="right flex flex-col gap-8"> */}
        <div className="right">
          {sections?.map(
            (section, index) => (
              // rightSections.includes(section.type) ? (
              <>
                {section.type === "profile" && (
                  <Contact
                    headingStyle={headingStyle}
                    bodyTextStyle={bodyTextStyle}
                    color={color}
                    userInfo={userInfo}
                    fontFamily={fontFamily}
                  />
                )}
                {/* <div className={`resumeLine `}></div> */}
                {section.type === "education" && (
                  <Education
                    headingStyle={headingStyle}
                    bodyTextStyle={bodyTextStyle}
                    color={color}
                    userInfo={userInfo}
                    fontFamily={fontFamily}
                  />
                )}
                {/* <div className={`resumeLine `}></div> */}
                {section.type === "certificates" && (
                  <Certification
                    headingStyle={headingStyle}
                    bodyTextStyle={bodyTextStyle}
                    color={color}
                    fontFamily={fontFamily}
                  />
                )}
                {/* <div className={`resumeLine `}></div> */}
                {section.type === "skills" && (
                  <Skill
                    headingStyle={headingStyle}
                    bodyTextStyle={bodyTextStyle}
                    color={color}
                    userInfo={userInfo}
                    fontFamily={fontFamily}
                  />
                )}
                {/* <div className={`resumeLine `}></div> */}
                {section.type === "hobbies" && (
                  <Interest
                    headingStyle={headingStyle}
                    bodyTextStyle={bodyTextStyle}
                    color={color}
                    fontFamily={fontFamily}
                  />
                )}

                {section.type === "customSections" && (
                  <>
                    {/* <div className={`resumeLine `}></div> */}

                    <CustomSections
                      headingStyle={headingStyle}
                      bodyTextStyle={bodyTextStyle}
                      color={color}
                      section={section}
                      fontFamily={fontFamily}
                    />
                  </>
                )}
                {section.type === "summary" && (
                  <>
                    {/* <div className={`resumeLine `}></div> */}

                    <Summary
                      headingStyle={headingStyle}
                      bodyTextStyle={bodyTextStyle}
                      color={color}
                      section={section}
                      fontFamily={fontFamily}
                    />
                  </>
                )}
                {section.type === "customTitle" && (
                  <>
                    {/* <div className={`resumeLine `}></div> */}

                    <CustomTitle
                      headingStyle={headingStyle}
                      bodyTextStyle={bodyTextStyle}
                      color={color}
                      section={section}
                      fontFamily={fontFamily}
                    />
                  </>
                )}
                {section.type === "trainingCourses" && (
                  <>
                    <TrainigCourses
                      headingStyle={headingStyle}
                      bodyTextStyle={bodyTextStyle}
                      color={color}
                      section={section}
                      fontFamily={fontFamily}
                    />
                  </>
                )}
                {section.type === "projects" && (
                  <>
                    <Projects
                      headingStyle={headingStyle}
                      bodyTextStyle={bodyTextStyle}
                      color={color}
                      section={section}
                      fontFamily={fontFamily}
                    />
                  </>
                )}
                {section.type === "strengths" && (
                  <>
                    <Strength
                      headingStyle={headingStyle}
                      bodyTextStyle={bodyTextStyle}
                      color={color}
                      section={section}
                      fontFamily={fontFamily}
                    />
                  </>
                )}
              </>
            )
            // ) : null
          )}
        </div>
      </div>
    </section>
  );
};

export default ResumeTemps;
