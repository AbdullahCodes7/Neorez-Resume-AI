import React from "react";
import Profile from "../components/profileSection";
import About from "../components/about";
import Contact from "../components/contact";
import Education from "../components/education";
import Certification from "../components/certifications";
import WorkExperience from "../components/workExperience";
import Skill from "../components/skill";
import ActivitiesProjects from "../components/activities";
import Communication from "../components/communication";
import Leadership from "../components/leadership";
import References from "../components/reference";
import ProfileImage from "../components/profileImage";
import SkillProgress from "../components/skillProgress";

const ResumeTemp5 = ({ style }) => {
  return (
    <>
      <div className={`resumeWrap1 ${style}`}>
        <div className="headerWrap">
          <Profile />
          <Contact />
        </div>
        <div className="sectionsColumn">
          <div className="leftColumn">
            <Education />
            <WorkExperience />
          </div>
          <div className="section-seperate"></div>
          <div className="rightColumn">
            <About />
            <Certification />
            <SkillProgress />
          </div>
        </div>
        <div>
          <References />
        </div>
      </div>
    </>
  );
};

export default ResumeTemp5;
