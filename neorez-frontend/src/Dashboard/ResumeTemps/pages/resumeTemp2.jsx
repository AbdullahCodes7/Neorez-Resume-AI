import React, { useEffect, useRef, useState } from "react";
import Profile from "../components/profileSection";
import About from "../components/about";
import Contact from "../components/contact";
import Education from "../components/education";
import Certification from "../components/certifications";
import WorkExperience from "../components/workExperience";
import Skill from "../components/skill";
import Communication from "../components/communication";
import Leadership from "../components/leadership";
import Language from "../components/languages";
import References from "../components/reference";
import CustomSections from "../components/customSections";
import { useSelector } from "react-redux";
import Interest from "../components/interest";
import Summary from "../../UserDashboard/ResumeBuilder/AddSectionsComponents/summary";
import CustomTitle from "../../UserDashboard/ResumeBuilder/AddSectionsComponents/customTitle";
import Projects from "../../UserDashboard/ResumeBuilder/AddSectionsComponents/projects";
import TrainigCourses from "../../UserDashboard/ResumeBuilder/AddSectionsComponents/trainingCourse";
import Strength from "../../UserDashboard/ResumeBuilder/AddSectionsComponents/strength";
import { fetchResumeData } from "../../../redux/actions/fetchResume";
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
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ResumeTemp2 = ({
  style,
  resumeRef,
  data,
  fromTemplatePage,
  previewCv,
}) => {
  const [activeSection, setActiveSection] = useState(null);
  const isResumeTemplate18 = style === "resumeTemplate18";
  const resume = useSelector((state) => state.resume);
  // console.log("data", data);
  const sections = data?.sections ? data?.sections : resume?.sections;
  const uidParams = useParams();
  console.log("resume temp 2", resume);
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userData);
  const uid = useSelector((state) => state.resume.uid);
  const wrapperRef = useRef(null);

  const dispatch = useDispatch();

  // console.log("previewCv", previewCv, data.uid);
  useEffect(() => {
    const currentUid = uid || uidParams.uid;
    if (previewCv) {
      dispatch(fetchResumeData(data?.uid));
    } else if (fromTemplatePage == true) {
      // console.log("first");

      navigate(location.pathname, { replace: true, state: {} }); // Reset `location.state` to avoid persisting
    } else if (currentUid) {
      // console.log("2nd first");

      dispatch(fetchResumeData(currentUid));
    } else if (userInfo) {
      // Map userInfo fields to the resume 'profile' section
      dispatch(
        updateSection({
          type: "profile",
          data: {
            name: userInfo?.name,
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
      // dispatch(
      //   updateSection({
      //     type: "skills",
      //     data: {
      //       items: userInfo.skills.map((skill) => ({
      //         name: skill.name,
      //         level: skill.level,
      //       })),
      //     },
      //   })
      // );
    }
  }, [userInfo]);

  const design = data?.design || useSelector((state) => state.resume.design);
  const { fontSize, color, margin, lineHeight, fontFamily } = design || {};

  // console.log("color color color", color);
  // console.log("margin", margin);

  const headingStyle = {
    fontSize: `${fontSize * 1.5}px`,
    color: color,
    // marginBottom: `${margin}px`,
    lineHeight: `${lineHeight}`,
  };

  const bodyTextStyle = {
    fontSize: `${fontSize}px`,
    // marginBottom: `${margin * 0.5}px`,
    lineHeight: `${lineHeight}`,
  };
  // const marginStyle = {
  //   margin: `${margin}px`,
  // };
  function hexToRgb(hex) {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, "");

    // Parse r, g, b values
    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);

    // Return in "r,g,b" format
    return `${r},${g},${b}`;
  }

  // console.log("sections", sections);
  // console.log("Current style:", style);

  const handleSectionClick = (index) => {
    setActiveSection(index);
    // console.log(index);
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setActiveSection(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <section className="resume-container" ref={resumeRef} id="printableResume">
      <div
        className={`resumeWrap1 ${
          activeSection !== null ? "!bg-[#DCDBE0]" : ""
        } ${style}`}
      >
        <div ref={wrapperRef} className="sectionsColumn">
          {sections?.map((section, index) => (
            <div
              key={index}
              onClick={() => handleSectionClick(index)}
              style={{
                backgroundColor:
                  activeSection === index ? "#fff" : "transparent",
                padding: "10px",
                borderRadius: "5px",
                transition: "background-color 0.3s ease",
                cursor: "pointer",
              }}
            >
              {/* {console.log("Sections: " + section.type)} */}
              {/* Profile, About, and Contact (header sections) */}
              {section?.type === "profile" && (
                <div
                  className="headerWrap"
                  style={{
                    backgroundColor: color
                      ? style === "resumeTemplate7"
                        ? `rgba(${hexToRgb(color)}, 0.5)`
                        : ""
                      : "",
                    // opacity: 0.9,
                  }}
                >
                  {/* {console.log("section =======================first", section)} */}
                  <Profile
                    section={section}
                    style={style}
                    headingStyle={headingStyle}
                    bodyTextStyle={bodyTextStyle}
                    color={color}
                    fontFamily={fontFamily}
                  />
                  {isResumeTemplate18 && (
                    <About
                      section={section}
                      style={style}
                      headingStyle={headingStyle}
                      bodyTextStyle={bodyTextStyle}
                      color={color}
                      fontFamily={fontFamily}
                    />
                  )}
                  <Contact
                    section={section}
                    style={style}
                    headingStyle={headingStyle}
                    bodyTextStyle={bodyTextStyle}
                    color={color}
                    fontFamily={fontFamily}
                  />
                </div>
              )}
              {section?.type === "about" && !isResumeTemplate18 && (
                <About
                  section={section}
                  style={style}
                  headingStyle={headingStyle}
                  bodyTextStyle={bodyTextStyle}
                  color={color}
                  fontFamily={fontFamily}
                />
              )}
              {/* Education Section */}
              {section?.type === "education" && (
                <Education
                  section={section}
                  style={style}
                  headingStyle={headingStyle}
                  bodyTextStyle={bodyTextStyle}
                  color={color}
                  fontFamily={fontFamily}
                />
              )}
              {/* Custom Sections */}
              {section?.type === "customSections" &&
                section?.items?.length > 0 && (
                  <CustomSections
                    section={section}
                    style={style}
                    headingStyle={headingStyle}
                    bodyTextStyle={bodyTextStyle}
                    color={color}
                    fontFamily={fontFamily}
                  />
                )}

              {/* Skills Section */}
              {section?.type === "skills" && (
                <Skill
                  section={section}
                  style={style}
                  headingStyle={headingStyle}
                  bodyTextStyle={bodyTextStyle}
                  color={color}
                  fontFamily={fontFamily}
                />
              )}

              {/* Certificates Section */}
              {section?.type === "certificates" && (
                <Certification
                  section={section}
                  style={style}
                  headingStyle={headingStyle}
                  bodyTextStyle={bodyTextStyle}
                  color={color}
                  fontFamily={fontFamily}
                />
              )}

              {/* Work Experience Section */}
              {section?.type === "workExperience" && (
                <WorkExperience
                  section={section}
                  style={style}
                  headingStyle={headingStyle}
                  bodyTextStyle={bodyTextStyle}
                  color={color}
                  fontFamily={fontFamily}
                />
              )}

              {/* Communication Section */}
              {/* {section.type === "communication" && <Communication />} */}
              {/* Leadership Section */}
              {/* {section.type === "leadership" && <Leadership />} */}
              {/* Language Section */}

              {section?.type === "languages" && (
                <Language
                  section={section}
                  style={style}
                  headingStyle={headingStyle}
                  bodyTextStyle={bodyTextStyle}
                  color={color}
                  fontFamily={fontFamily}
                />
              )}
              {section?.type === "hobbies" && (
                <Interest
                  section={section}
                  style={style}
                  headingStyle={headingStyle}
                  bodyTextStyle={bodyTextStyle}
                  color={color}
                  fontFamily={fontFamily}
                />
              )}
              {/* {console.log("section.type", section.type === "references")} */}
              {/* References Section */}
              {section?.type === "references" && (
                <References
                  section={section}
                  style={style}
                  headingStyle={headingStyle}
                  bodyTextStyle={bodyTextStyle}
                  color={color}
                  fontFamily={fontFamily}
                />
              )}
              {/* Render separator between sections only if it's not the last section */}
              {/* {renderSeparator(index, sections.length)}
               */}
              {section?.items && section?.items?.length != 0 && (
                <div className="seperate-horizantal"></div>
              )}
              {section?.type === "summary" && (
                <>
                  {/* <div className={`resumeLine `}></div> */}

                  <Summary
                    section={section}
                    style={style}
                    headingStyle={headingStyle}
                    bodyTextStyle={bodyTextStyle}
                    color={color}
                    fontFamily={fontFamily}
                  />
                </>
              )}
              {section?.type === "customTitle" && (
                <>
                  {/* <div className={`resumeLine `}></div> */}

                  <CustomTitle
                    section={section}
                    style={style}
                    headingStyle={headingStyle}
                    bodyTextStyle={bodyTextStyle}
                    color={color}
                    fontFamily={fontFamily}
                  />
                </>
              )}
              {section?.type === "trainingCourses" && (
                <>
                  <TrainigCourses
                    style={style}
                    headingStyle={headingStyle}
                    bodyTextStyle={bodyTextStyle}
                    color={color}
                    section={section}
                    fontFamily={fontFamily}
                  />
                </>
              )}
              {section?.type === "projects" && (
                <>
                  <Projects
                    style={style}
                    headingStyle={headingStyle}
                    bodyTextStyle={bodyTextStyle}
                    color={color}
                    section={section}
                    fontFamily={fontFamily}
                  />
                </>
              )}
              {section?.type === "strengths" && (
                <>
                  <Strength
                    style={style}
                    headingStyle={headingStyle}
                    bodyTextStyle={bodyTextStyle}
                    color={color}
                    section={section}
                    fontFamily={fontFamily}
                  />
                </>
              )}
              {/* {count++} */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResumeTemp2;

// import React, { useEffect, useRef, useState, useCallback } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { fetchResumeData } from "../../../redux/actions/fetchResume";
// import { updateSection } from "../../../redux/resumeSlice2";

// import Profile from "../components/profileSection";
// import About from "../components/about";
// import Contact from "../components/contact";
// import Education from "../components/education";
// import Certification from "../components/certifications";
// import WorkExperience from "../components/workExperience";
// import Skill from "../components/skill";
// import Language from "../components/languages";
// import References from "../components/reference";
// import CustomSections from "../components/customSections";
// import Interest from "../components/interest";
// import Summary from "../../UserDashboard/ResumeBuilder/AddSectionsComponents/summary";
// import CustomTitle from "../../UserDashboard/ResumeBuilder/AddSectionsComponents/customTitle";
// import Projects from "../../UserDashboard/ResumeBuilder/AddSectionsComponents/projects";
// import TrainigCourses from "../../UserDashboard/ResumeBuilder/AddSectionsComponents/trainingCourse";
// import Strength from "../../UserDashboard/ResumeBuilder/AddSectionsComponents/strength";

// const PAGE_HEIGHT = 1100;

// const ResumeTemp2 = ({
//   style,
//   resumeRef,
//   data,
//   fromTemplatePage,
//   previewCv,
// }) => {
//   const sections = (
//     data?.sections || useSelector((state) => state.resume.sections)
//   ).filter((section) => section && typeof section === "object");
//   const isResumeTemplate18 = style === "resumeTemplate18";
//   const design = data?.design || useSelector((state) => state.resume.design);
//   const { fontSize, color, lineHeight, fontFamily } = design || {};
//   const uid = useSelector((state) => state.resume.uid);
//   const userInfo = useSelector((state) => state.userData);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const uidParams = useParams();
//   const wrapperRef = useRef(null);
//   const sectionRefs = useRef([]);
//   const [pages, setPages] = useState([]);
//   const [refsReady, setRefsReady] = useState(false);
//   const [activeSection, setActiveSection] = useState(null);

//   // Fetch Resume Data
//   useEffect(() => {
//     const currentUid = uid || uidParams.uid;
//     if (previewCv) {
//       dispatch(fetchResumeData(data?.uid));
//     } else if (fromTemplatePage) {
//       navigate(location.pathname, { replace: true, state: {} });
//     } else if (currentUid) {
//       dispatch(fetchResumeData(currentUid));
//     } else if (userInfo) {
//       dispatch(
//         updateSection({
//           type: "profile",
//           data: {
//             name: userInfo?.name,
//             contactNumber: userInfo?.contactNumber,
//             email: userInfo?.email,
//             address: userInfo?.address,
//             jobTitle: userInfo?.desiredJobTitle,
//             links: userInfo?.links || [],
//           },
//         })
//       );
//       dispatch(
//         updateSection({
//           type: "education",
//           data: {
//             items: userInfo.education.map((edu) => ({
//               degree: edu.degree,
//               institution: edu.institution,
//               reference: edu.reference,
//               startDate: edu.startDate,
//               endDate: edu.endDate,
//             })),
//           },
//         })
//       );
//     }
//   }, [userInfo]);

//   // Set Section Refs
//   const setSectionRef = useCallback((el, index) => {
//     if (el) {
//       sectionRefs.current[index] = el;
//     }
//   }, []);

//   useEffect(() => {
//     if (
//       sectionRefs.current.filter((ref) => ref !== undefined).length ===
//       sections.length
//     ) {
//       setRefsReady(true);
//     }
//   }, [sections, sectionRefs.current.length]);

//   // **Pagination Function - Moves Overflow Content to the Next Page**
//   const splitContentIntoPages = (sections, sectionRefs) => {
//     let newPages = [[]];
//     let currentPageHeight = 0;
//     let currentPageIndex = 0;
//     // let seenSections = new Set();

//     let maxPageHeight = PAGE_HEIGHT; // Default page height

//     sections.forEach((section, index) => {
//       const sectionElement = sectionRefs.current[index];
//       if (!sectionElement) return;

//       const sectionHeight = sectionElement.offsetHeight;

//       if (currentPageHeight + sectionHeight > maxPageHeight) {
//         if (sectionHeight > PAGE_HEIGHT) {
//           // If section itself is bigger than PAGE_HEIGHT, allow it to break
//           maxPageHeight = sectionHeight + 50;
//         } else {
//           // If section does not fit, move it to the next page
//           newPages.push([]);
//           currentPageIndex++;
//           currentPageHeight = 0;
//           maxPageHeight = PAGE_HEIGHT; // Reset max page height
//         }
//       }

//       newPages[currentPageIndex].push(section);
//       currentPageHeight += sectionHeight;
//     });

//     return newPages;
//   };

//   // Apply Pagination Logic
//   useEffect(() => {
//     if (!sections || sections.length === 0) return;
//     setTimeout(() => {
//       const newPages = splitContentIntoPages(sections, sectionRefs);
//       if (JSON.stringify(pages) !== JSON.stringify(newPages)) {
//         setPages(newPages);
//       }
//     }, 1000);
//   }, [sections]);

//   const handleSectionClick = (index) => {
//     setActiveSection(index);
//   };

//   const headingStyle = {
//     fontSize: `${fontSize * 1.5}px`,
//     color: color,
//     lineHeight: `${lineHeight}`,
//   };

//   const bodyTextStyle = {
//     fontSize: `${fontSize}px`,
//     lineHeight: `${lineHeight}`,
//   };

//   const handleClickOutside = (event) => {
//     if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//       setActiveSection(null);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("click", handleClickOutside);

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   return (
//     <section className="resume-container" ref={resumeRef} id="printableResume">
//       <div className="sectionsColumn hidden">
//         {sections.map((section, index) => (
//           <div
//             key={index}
//             ref={(el) => setSectionRef(el, index)}
//             className="resume-section"
//           >
//             {section.type === "profile" && <Profile section={section} />}
//             {section.type === "about" && <About section={section} />}
//             {section.type === "contact" && <Contact section={section} />}
//             {section.type === "education" && <Education section={section} />}
//             {section.type === "skills" && <Skill section={section} />}
//             {section.type === "projects" && <Projects section={section} />}
//           </div>
//         ))}
//       </div>

//       {/* **Render Paginated Content Dynamically** */}
//       {refsReady && (
//         <div>
//           <div
//             className={`resumeWrap1 ${
//               activeSection !== null ? "!bg-[#DCDBE0]" : ""
//             } ${style}`}
//           >
//             <div ref={wrapperRef} className="sectionsColumn">
//               {pages.map((page, pageIndex) => (
//                 <div key={pageIndex} className="resume-page">
//                   {/* <h4>Page {pageIndex + 1}</h4>{" "} */}
//                   {/* ✅ Debugging Page Numbers */}
//                   <div className="sectionsColumn">
//                     {page.map((section, index) => (
//                       <div
//                         className="resume-section"
//                         key={index}
//                         ref={(el) => (sectionRefs.current[index] = el)}
//                         onClick={() => handleSectionClick(index)}
//                         style={{
//                           backgroundColor:
//                             activeSection === index ? "#fff" : "transparent",
//                           padding: "10px",
//                           borderRadius: "5px",
//                           transition: "background-color 0.3s ease",
//                           cursor: "pointer",
//                         }}
//                       >
//                         {section?.type === "profile" && (
//                           <div
//                             className="headerWrap"
//                             style={{
//                               backgroundColor: color
//                                 ? style === "resumeTemplate7"
//                                   ? `rgba(${hexToRgb(color)}, 0.5)`
//                                   : ""
//                                 : "",
//                               // opacity: 0.9,
//                             }}
//                           >
//                             <Profile
//                               section={section}
//                               style={style}
//                               headingStyle={headingStyle}
//                               bodyTextStyle={bodyTextStyle}
//                               color={color}
//                               fontFamily={fontFamily}
//                             />
//                             {isResumeTemplate18 && (
//                               <About
//                                 section={section}
//                                 style={style}
//                                 headingStyle={headingStyle}
//                                 bodyTextStyle={bodyTextStyle}
//                                 color={color}
//                                 fontFamily={fontFamily}
//                               />
//                             )}
//                             <Contact
//                               section={section}
//                               style={style}
//                               headingStyle={headingStyle}
//                               bodyTextStyle={bodyTextStyle}
//                               color={color}
//                               fontFamily={fontFamily}
//                             />
//                           </div>
//                         )}
//                         {section?.type === "about" && !isResumeTemplate18 && (
//                           <About
//                             section={section}
//                             style={style}
//                             headingStyle={headingStyle}
//                             bodyTextStyle={bodyTextStyle}
//                             color={color}
//                             fontFamily={fontFamily}
//                           />
//                         )}
//                         {/* Education Section */}
//                         {section?.type === "education" && (
//                           <Education
//                             section={section}
//                             style={style}
//                             headingStyle={headingStyle}
//                             bodyTextStyle={bodyTextStyle}
//                             color={color}
//                             fontFamily={fontFamily}
//                           />
//                         )}
//                         {/* Custom Sections */}
//                         {section?.type === "customSections" &&
//                           section?.items?.length > 0 && (
//                             <CustomSections
//                               section={section}
//                               style={style}
//                               headingStyle={headingStyle}
//                               bodyTextStyle={bodyTextStyle}
//                               color={color}
//                               fontFamily={fontFamily}
//                             />
//                           )}

//                         {/* Skills Section */}
//                         {section?.type === "skills" && (
//                           <Skill
//                             section={section}
//                             style={style}
//                             headingStyle={headingStyle}
//                             bodyTextStyle={bodyTextStyle}
//                             color={color}
//                             fontFamily={fontFamily}
//                           />
//                         )}

//                         {/* Certificates Section */}
//                         {section?.type === "certificates" && (
//                           <Certification
//                             section={section}
//                             style={style}
//                             headingStyle={headingStyle}
//                             bodyTextStyle={bodyTextStyle}
//                             color={color}
//                             fontFamily={fontFamily}
//                           />
//                         )}

//                         {/* Work Experience Section */}
//                         {section?.type === "workExperience" && (
//                           <WorkExperience
//                             section={section}
//                             style={style}
//                             headingStyle={headingStyle}
//                             bodyTextStyle={bodyTextStyle}
//                             color={color}
//                             fontFamily={fontFamily}
//                           />
//                         )}

//                         {/* Communication Section */}
//                         {/* {section.type === "communication" && <Communication />} */}
//                         {/* Leadership Section */}
//                         {/* {section.type === "leadership" && <Leadership />} */}
//                         {/* Language Section */}

//                         {section?.type === "languages" && (
//                           <Language
//                             section={section}
//                             style={style}
//                             headingStyle={headingStyle}
//                             bodyTextStyle={bodyTextStyle}
//                             color={color}
//                             fontFamily={fontFamily}
//                           />
//                         )}
//                         {section?.type === "hobbies" && (
//                           <Interest
//                             section={section}
//                             style={style}
//                             headingStyle={headingStyle}
//                             bodyTextStyle={bodyTextStyle}
//                             color={color}
//                             fontFamily={fontFamily}
//                           />
//                         )}
//                         {/* {console.log("section.type", section.type === "references")} */}
//                         {/* References Section */}
//                         {section?.type === "references" && (
//                           <References
//                             section={section}
//                             style={style}
//                             headingStyle={headingStyle}
//                             bodyTextStyle={bodyTextStyle}
//                             color={color}
//                             fontFamily={fontFamily}
//                           />
//                         )}
//                         {/* Render separator between sections only if it's not the last section */}
//                         {/* {renderSeparator(index, sections.length)}
//                          */}
//                         {section?.items && section?.items?.length != 0 && (
//                           <div className="seperate-horizantal"></div>
//                         )}
//                         {section?.type === "summary" && (
//                           <>
//                             {/* <div className={`resumeLine `}></div> */}

//                             <Summary
//                               section={section}
//                               style={style}
//                               headingStyle={headingStyle}
//                               bodyTextStyle={bodyTextStyle}
//                               color={color}
//                               fontFamily={fontFamily}
//                             />
//                           </>
//                         )}
//                         {section?.type === "customTitle" && (
//                           <>
//                             {/* <div className={`resumeLine `}></div> */}

//                             <CustomTitle
//                               section={section}
//                               style={style}
//                               headingStyle={headingStyle}
//                               bodyTextStyle={bodyTextStyle}
//                               color={color}
//                               fontFamily={fontFamily}
//                             />
//                           </>
//                         )}
//                         {section?.type === "trainingCourses" && (
//                           <>
//                             <TrainigCourses
//                               style={style}
//                               headingStyle={headingStyle}
//                               bodyTextStyle={bodyTextStyle}
//                               color={color}
//                               section={section}
//                               fontFamily={fontFamily}
//                             />
//                           </>
//                         )}
//                         {section?.type === "projects" && (
//                           <>
//                             <Projects
//                               style={style}
//                               headingStyle={headingStyle}
//                               bodyTextStyle={bodyTextStyle}
//                               color={color}
//                               section={section}
//                               fontFamily={fontFamily}
//                             />
//                           </>
//                         )}
//                         {section?.type === "strengths" && (
//                           <>
//                             <Strength
//                               style={style}
//                               headingStyle={headingStyle}
//                               bodyTextStyle={bodyTextStyle}
//                               color={color}
//                               section={section}
//                               fontFamily={fontFamily}
//                             />
//                           </>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                   <div className="page-break"></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default ResumeTemp2;

// ====================================================================================================================
// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { fetchResumeData } from "../../../redux/actions/fetchResume";
// import { updateSection } from "../../../redux/resumeSlice2";

// // Import all components
// import Profile from "../components/profileSection";
// import About from "../components/about";
// import Contact from "../components/contact";
// import Education from "../components/education";
// import Certification from "../components/certifications";
// import WorkExperience from "../components/workExperience";
// import Skill from "../components/skill";
// import Language from "../components/languages";
// import References from "../components/reference";
// import CustomSections from "../components/customSections";
// import Interest from "../components/interest";
// import Summary from "../../UserDashboard/ResumeBuilder/AddSectionsComponents/summary";
// import CustomTitle from "../../UserDashboard/ResumeBuilder/AddSectionsComponents/customTitle";
// import Projects from "../../UserDashboard/ResumeBuilder/AddSectionsComponents/projects";
// import TrainigCourses from "../../UserDashboard/ResumeBuilder/AddSectionsComponents/trainingCourse";
// import Strength from "../../UserDashboard/ResumeBuilder/AddSectionsComponents/strength";

// const PAGE_HEIGHT = 1100; // Define page height dynamically

// const ResumeTemp2 = ({
//   style,
//   resumeRef,
//   data,
//   fromTemplatePage,
//   previewCv,
// }) => {
//   const sections = (
//     data?.sections || useSelector((state) => state.resume.sections)
//   ).filter((section) => section && typeof section === "object");

//   const design = data?.design || useSelector((state) => state.resume.design);
//   const { fontSize, color, lineHeight, fontFamily } = design || {};
//   const uid = useSelector((state) => state.resume.uid);
//   const userInfo = useSelector((state) => state.userData);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const uidParams = useParams();
//   const wrapperRef = useRef(null);
//   const sectionRefs = useRef([]);
//   const [pages, setPages] = useState([]);
//   const [refsReady, setRefsReady] = useState(false);
//   const [activeSection, setActiveSection] = useState(null);
//   const isResumeTemplate18 = style === "resumeTemplate18";
//   // Fetch Resume Data
//   useEffect(() => {
//     const currentUid = uid || uidParams.uid;
//     if (previewCv) {
//       dispatch(fetchResumeData(data?.uid));
//     } else if (fromTemplatePage) {
//       navigate(location.pathname, { replace: true, state: {} });
//     } else if (currentUid) {
//       dispatch(fetchResumeData(currentUid));
//     } else if (userInfo) {
//       dispatch(
//         updateSection({
//           type: "profile",
//           data: {
//             name: userInfo?.name,
//             contactNumber: userInfo?.contactNumber,
//             email: userInfo?.email,
//             address: userInfo?.address,
//             jobTitle: userInfo?.desiredJobTitle,
//             links: userInfo?.links || [],
//           },
//         })
//       );
//       dispatch(
//         updateSection({
//           type: "education",
//           data: {
//             items: userInfo.education.map((edu) => ({
//               degree: edu.degree,
//               institution: edu.institution,
//               reference: edu.reference,
//               startDate: edu.startDate,
//               endDate: edu.endDate,
//             })),
//           },
//         })
//       );
//     }
//   }, [userInfo]);

//   // Set Section Refs
//   const setSectionRef = useCallback((el, index) => {
//     if (el) {
//       sectionRefs.current[index] = el;
//     }
//   }, []);

//   useEffect(() => {
//     if (
//       sectionRefs.current.filter((ref) => ref !== undefined).length ===
//       sections.length
//     ) {
//       setRefsReady(true);
//     }
//   }, [sections]);

//   // Pagination Function - Moves Overflow Content to the Next Page
//   const splitContentIntoPages = (sections, sectionRefs) => {
//     let newPages = [[]];
//     let currentPageHeight = 0;
//     let currentPageIndex = 0;
//     let maxPageHeight = PAGE_HEIGHT;

//     sections.forEach((section, index) => {
//       const sectionElement = sectionRefs.current[index];
//       if (!sectionElement) return;

//       const sectionHeight = sectionElement.offsetHeight;

//       // If adding this section would overflow the page height, move it to the next page
//       if (currentPageHeight + sectionHeight > maxPageHeight) {
//         newPages.push([]); // Create a new page
//         currentPageIndex++; // Increment page index
//         currentPageHeight = 0; // Reset the page height counter
//       }

//       // Add the current section to the current page
//       newPages[currentPageIndex].push(section);
//       currentPageHeight += sectionHeight;
//     });

//     return newPages;
//   };

//   // Apply Pagination Logic
//   useEffect(() => {
//     if (!sections || sections.length === 0) return;
//     setTimeout(() => {
//       const newPages = splitContentIntoPages(sections, sectionRefs);
//       if (JSON.stringify(pages) !== JSON.stringify(newPages)) {
//         setPages(newPages); // Set the pages for dynamic rendering
//       }
//     }, 1000); // Timeout to allow DOM to settle
//   }, [sections]);

//   const handleSectionClick = (index) => {
//     setActiveSection(index);
//   };

//   const headingStyle = {
//     fontSize: `${fontSize * 1.5}px`,
//     color: color,
//     lineHeight: `${lineHeight}`,
//   };

//   const bodyTextStyle = {
//     fontSize: `${fontSize}px`,
//     lineHeight: `${lineHeight}`,
//   };

//   const handleClickOutside = (event) => {
//     if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//       setActiveSection(null);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("click", handleClickOutside);

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   return (
//     <section className="resume-container" ref={resumeRef} id="printableResume">
//       <div className="sectionsColumn hidden">
//         {sections.map((section, index) => (
//           <div
//             key={index}
//             ref={(el) => setSectionRef(el, index)}
//             className="resume-section"
//           >
//             {section.type === "profile" && <Profile section={section} />}
//             {section.type === "about" && <About section={section} />}
//             {section.type === "contact" && <Contact section={section} />}
//             {section.type === "education" && <Education section={section} />}
//             {section.type === "skills" && <Skill section={section} />}
//             {section.type === "projects" && <Projects section={section} />}
//           </div>
//         ))}
//       </div>

//       {/* **Render Paginated Content Dynamically** */}
//       {refsReady && (
//         <div>
//           <div
//             className={`resumeWrap1 ${
//               activeSection !== null ? "!bg-[#DCDBE0]" : ""
//             } ${style}`}
//           >
//             <div ref={wrapperRef} className="sectionsColumn">
//               {pages.map((page, pageIndex) => (
//                 <div key={pageIndex} className="resume-page">
//                   {/* Render sections for each page */}
//                   <div className="sectionsColumn">
//                     {page.map((section, index) => (
//                       <div
//                         className="resume-section"
//                         key={index}
//                         ref={(el) => (sectionRefs.current[index] = el)}
//                         onClick={() => handleSectionClick(index)}
//                         style={{
//                           backgroundColor:
//                             activeSection === index ? "#fff" : "transparent",
//                           padding: "10px",
//                           borderRadius: "5px",
//                           transition: "background-color 0.3s ease",
//                           cursor: "pointer",
//                         }}
//                       >
//                         {section?.type === "profile" && (
//                           <div
//                             className="headerWrap"
//                             style={{
//                               backgroundColor: color
//                                 ? style === "resumeTemplate7"
//                                   ? `rgba(${hexToRgb(color)}, 0.5)`
//                                   : ""
//                                 : "",
//                               // opacity: 0.9,
//                             }}
//                           >
//                             <Profile
//                               section={section}
//                               style={style}
//                               headingStyle={headingStyle}
//                               bodyTextStyle={bodyTextStyle}
//                               color={color}
//                               fontFamily={fontFamily}
//                             />
//                             {isResumeTemplate18 && (
//                               <About
//                                 section={section}
//                                 style={style}
//                                 headingStyle={headingStyle}
//                                 bodyTextStyle={bodyTextStyle}
//                                 color={color}
//                                 fontFamily={fontFamily}
//                               />
//                             )}
//                             <Contact
//                               section={section}
//                               style={style}
//                               headingStyle={headingStyle}
//                               bodyTextStyle={bodyTextStyle}
//                               color={color}
//                               fontFamily={fontFamily}
//                             />
//                           </div>
//                         )}
//                         {section?.type === "about" && !isResumeTemplate18 && (
//                           <About
//                             section={section}
//                             style={style}
//                             headingStyle={headingStyle}
//                             bodyTextStyle={bodyTextStyle}
//                             color={color}
//                             fontFamily={fontFamily}
//                           />
//                         )}
//                         {/* Education Section */}
//                         {section?.type === "education" && (
//                           <Education
//                             section={section}
//                             style={style}
//                             headingStyle={headingStyle}
//                             bodyTextStyle={bodyTextStyle}
//                             color={color}
//                             fontFamily={fontFamily}
//                           />
//                         )}
//                         {/* Custom Sections */}
//                         {section?.type === "customSections" &&
//                           section?.items?.length > 0 && (
//                             <CustomSections
//                               section={section}
//                               style={style}
//                               headingStyle={headingStyle}
//                               bodyTextStyle={bodyTextStyle}
//                               color={color}
//                               fontFamily={fontFamily}
//                             />
//                           )}

//                         {/* Skills Section */}
//                         {section?.type === "skills" && (
//                           <Skill
//                             section={section}
//                             style={style}
//                             headingStyle={headingStyle}
//                             bodyTextStyle={bodyTextStyle}
//                             color={color}
//                             fontFamily={fontFamily}
//                           />
//                         )}

//                         {/* Certificates Section */}
//                         {section?.type === "certificates" && (
//                           <Certification
//                             section={section}
//                             style={style}
//                             headingStyle={headingStyle}
//                             bodyTextStyle={bodyTextStyle}
//                             color={color}
//                             fontFamily={fontFamily}
//                           />
//                         )}

//                         {/* Work Experience Section */}
//                         {section?.type === "workExperience" && (
//                           <WorkExperience
//                             section={section}
//                             style={style}
//                             headingStyle={headingStyle}
//                             bodyTextStyle={bodyTextStyle}
//                             color={color}
//                             fontFamily={fontFamily}
//                           />
//                         )}

//                         {/* Communication Section */}
//                         {/* {section.type === "communication" && <Communication />} */}
//                         {/* Leadership Section */}
//                         {/* {section.type === "leadership" && <Leadership />} */}
//                         {/* Language Section */}

//                         {section?.type === "languages" && (
//                           <Language
//                             section={section}
//                             style={style}
//                             headingStyle={headingStyle}
//                             bodyTextStyle={bodyTextStyle}
//                             color={color}
//                             fontFamily={fontFamily}
//                           />
//                         )}
//                         {section?.type === "hobbies" && (
//                           <Interest
//                             section={section}
//                             style={style}
//                             headingStyle={headingStyle}
//                             bodyTextStyle={bodyTextStyle}
//                             color={color}
//                             fontFamily={fontFamily}
//                           />
//                         )}
//                         {/* {console.log("section.type", section.type === "references")} */}
//                         {/* References Section */}
//                         {section?.type === "references" && (
//                           <References
//                             section={section}
//                             style={style}
//                             headingStyle={headingStyle}
//                             bodyTextStyle={bodyTextStyle}
//                             color={color}
//                             fontFamily={fontFamily}
//                           />
//                         )}
//                         {/* Render separator between sections only if it's not the last section */}
//                         {/* {renderSeparator(index, sections.length)}
//                          */}
//                         {section?.items && section?.items?.length != 0 && (
//                           <div className="seperate-horizantal"></div>
//                         )}
//                         {section?.type === "summary" && (
//                           <>
//                             {/* <div className={`resumeLine `}></div> */}

//                             <Summary
//                               section={section}
//                               style={style}
//                               headingStyle={headingStyle}
//                               bodyTextStyle={bodyTextStyle}
//                               color={color}
//                               fontFamily={fontFamily}
//                             />
//                           </>
//                         )}
//                         {section?.type === "customTitle" && (
//                           <>
//                             {/* <div className={`resumeLine `}></div> */}

//                             <CustomTitle
//                               section={section}
//                               style={style}
//                               headingStyle={headingStyle}
//                               bodyTextStyle={bodyTextStyle}
//                               color={color}
//                               fontFamily={fontFamily}
//                             />
//                           </>
//                         )}
//                         {section?.type === "trainingCourses" && (
//                           <>
//                             <TrainigCourses
//                               style={style}
//                               headingStyle={headingStyle}
//                               bodyTextStyle={bodyTextStyle}
//                               color={color}
//                               section={section}
//                               fontFamily={fontFamily}
//                             />
//                           </>
//                         )}
//                         {section?.type === "projects" && (
//                           <>
//                             <Projects
//                               style={style}
//                               headingStyle={headingStyle}
//                               bodyTextStyle={bodyTextStyle}
//                               color={color}
//                               section={section}
//                               fontFamily={fontFamily}
//                             />
//                           </>
//                         )}
//                         {section?.type === "strengths" && (
//                           <>
//                             <Strength
//                               style={style}
//                               headingStyle={headingStyle}
//                               bodyTextStyle={bodyTextStyle}
//                               color={color}
//                               section={section}
//                               fontFamily={fontFamily}
//                             />
//                           </>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                   <div className="page-break"></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default ResumeTemp2;
