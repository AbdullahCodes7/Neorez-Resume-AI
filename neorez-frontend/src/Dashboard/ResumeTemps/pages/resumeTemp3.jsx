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

const ResumeTemp3 = ({ style }) => {
  return (
    <>
      <div className={`resumeWrap1 ${style}`}>
        <div className="sectionsColumn">
          <div className="leftColumn">
            <ProfileImage />
            <Contact />
            <Certification />
            <SkillProgress />
            <References />
          </div>
          <div className="section-seperate"></div>
          <div className="rightColumn">
            <div className="headerWrap">
              <div className="profile-heading">
                <h2>Profile</h2>
              </div>
              <div className="profile-data">
                <Profile />
                <About />
              </div>
            </div>
            <div className="work-education-wrap">
              <div className="date-wrapper"></div>
              <div className="work-educ">
                <Education />
                <WorkExperience />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeTemp3;
