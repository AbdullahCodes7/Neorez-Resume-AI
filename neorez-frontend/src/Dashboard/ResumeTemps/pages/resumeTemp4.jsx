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

const ResumeTemp4 = ({ style }) => {
  const isResumeTemplate19 = style === "resumeTemplate19";
  const isResumeTemplate17 = style === "resumeTemplate17";

  return (
    <>
      <div className={`resumeWrap1 ${style}`}>
        {isResumeTemplate19 ? (
          <div>
            <div className="sectionsColumn">
              <div className="leftColumn">
                <ProfileImage />
                <Contact />
                <SkillProgress />
                <Certification />
              </div>
              <div className="rightColumn">
                <div className="header">
                  <Profile />
                </div>
                <Education />
                <WorkExperience />
              </div>
            </div>
            <div>
              <References />
            </div>
          </div>
        ) : (
          <div className="sectionsColumn">
            <div className="leftColumn">
              <ProfileImage />
              <About />
              <div className="seperate-horizantal"></div>
              <Contact />
              <div className="seperate-horizantal"></div>
              <Communication />
              <div className="seperate-horizantal"></div>
              <Leadership />
              <div className="seperate-horizantal"></div>
              <Certification />
            </div>
            <div className="section-seperate"></div>
            <div className="rightColumn">
              <Profile />
              <Education />
              <div className="seperate-horizantal"></div>
              <WorkExperience />
              <div className="seperate-horizantal"></div>
              <SkillProgress />
              <References />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ResumeTemp4;
