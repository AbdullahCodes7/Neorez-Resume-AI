// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import dp from "../../../assets/icons/dashboard/dp.png";
// import "react-quill/dist/quill.bubble.css";
// import AiWriteButton from "../aiWriteButton";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import add from "../../../assets/icons/dashboard/add.svg";

// const CustomToolbar = () => (
//   <div className="flex justify-center items-center absolute w-48 left-24 top-1 gap-2">
//     <div className=" h-6 w-[0.7px] bg-[#C9C9C9]"></div>
//     <div>
//       <img src={add} alt="add icon" className="cursor-pointer" />
//     </div>
//     <div className="h-6 w-[0.7px] bg-[#C9C9C9]"></div>

//     <div>
//       <Icon
//         icon="material-symbols:delete-outline"
//         width="30px"
//         height="30px"
//         style={{ color: "black" }}
//         className="cursor-pointer"
//       />
//     </div>
//     <div className="h-6 w-[0.7px] bg-[#C9C9C9]"></div>

//     <div>
//       <AiWriteButton />
//     </div>
//     {/*

//      */}
//   </div>
// );

// // Quill modules
// const modules = {
//   toolbar: {
//     container: [["bold", "italic", "underline"]],
//     handlers: {
//       "ai-write": () => {
//         console.log("AI Write button clicked!");
//       },
//     },
//   },
// };

// const ResumeTemplate1 = () => {
//   // Track the currently active editor
//   const [activeEditor, setActiveEditor] = useState(null);

//   // Quill Formats
//   const formats = ["bold", "italic", "underline", "list", "bullet", "link"];

//   // Quill modules
//   // const modules = {
//   //   toolbar: [["bold", "italic", "underline"]],
//   // };

//   // Name
//   const [name, setName] = useState("Kate Bishop");

//   // Designation
//   const [designation, setDesignation] = useState("Product Designer");

//   // Summary
//   const [summary, setSummary] = useState(
//     "Over 5 years of professional experience conducting UX research and designing interactive end-to-end user flows. I enjoy working in close collaboration with teams across technology, business, and design."
//   );

//   // Work Experience
//   const [workExperiences, setWorkExperiences] = useState([
//     {
//       id: 1,
//       title: "Product Designer",
//       company: "Fintef, Oct 2019 - Present",
//       description:
//         "Designing end-to-end experience for financial products on mobile & web platforms. Working closely with managers, marketing specialists and developers.",
//     },
//     {
//       id: 2,
//       title: "UX Designer",
//       company: "Resume Worded, Sep 2017 – Sep 2019",
//       description:
//         "Revamped website flows and navigation menus, reducing the frequency of misdirected customer service queries by 30%. Conducted user testing with 10+ participants using UserTesting.com; designed against findings which reduced bounce rate for primary user flow by 30%.",
//     },
//     {
//       id: 3,
//       title: "Associate UX Designer",
//       company: "  Growshi, Dec 2016 – Aug 2017",
//       description:
//         "Redesigned company’s homepage and lead generation forms using existing design system; reduced bounce rates by 40% and increased leads by 15%. Designed online customer support center comprising of a self-service knowledge base and interactive chat bot. Coached 15 summer interns.",
//       isEditing: false,
//     },
//   ]);
//   //education
//   const [education, setEducation] = useState([
//     {
//       id: 1,
//       degree: "Bachelor of Arts in Design",
//       school: "University of Design - Graduated 2020",
//     },
//     {
//       id: 2,
//       degree: "Master of Science in User Experience Design",
//       school: "Design Academy - Graduated 2022",
//     },
//     {
//       id: 3,
//       degree: "Design Leadership Masterclass",
//       school: "Design Lab Inc., Mar 2020",
//       isEditing: false,
//     },
//     {
//       id: 4,
//       degree: "UX: Interaction Design",
//       school: "Trydesignlab.com, Dec 2017",
//       isEditing: false,
//     },
//     {
//       id: 5,
//       degree: "UX Design Specialization",
//       school: "Udacity.com, online course by Google, Aug 2016",
//       isEditing: false,
//     },
//     {
//       id: 6,
//       degree: "Branding fundamentals",
//       school: "Design Lab Inc., Nov 2014",
//       isEditing: false,
//     },
//   ]);

//   // Skills
//   const [skills, setSkills] = useState(
//     "Business Analysis, UX Research, User Testing and Validation, Customer Journey Mapping, Information Architecture, Low- and High- Fidelity Wireframing, Prototyping, Interaction Design, Visual Design, Defining Product Specifications, Design System Development, Design Sprints, A/B Testing."
//   );

//   // LinkedIn, Email, Phone
//   const [linkedIn, setLinkedIn] = useState("linkedin.com/in/kate-bishop");
//   const [email, setEmail] = useState("kate.bishop@katedesign.com");
//   const [phone, setPhone] = useState("+46 98-765 43 21");

//   // Function to handle clicking on an editor
//   const handleEditorClick = (editorType) => {
//     setActiveEditor(editorType);
//   };

//   return (
//     <div className="w-[593px] resumeTemplate bg-white">
//       <div className="border flex flex-col gap-4">
//         <div className="flex gap-7 p-7 lightBlueBg">
//           <div className="flex flex-col gap-5">
//             {/* Name */}
//             <div className="flex gap-3">
//               <img
//                 src={dp}
//                 alt="dp"
//                 className="w-14 h-14 rounded-[50%] object-cover"
//               />

//               <div>
//                 <div onClick={() => handleEditorClick("name")}>
//                   {activeEditor === "name" ? (
//                     <div className="relative ">
//                       <CustomToolbar />
//                       <ReactQuill
//                         value={name}
//                         onChange={setName}
//                         modules={modules}
//                         formats={formats}
//                         placeholder="Write your Name here..."
//                       />
//                     </div>
//                   ) : (
//                     <div
//                       className=" font-bold font-poppin text-nowrap text-[26px]"
//                       dangerouslySetInnerHTML={{ __html: name }}
//                     ></div>
//                   )}
//                 </div>
//                 {/* Designation */}
//                 <div onClick={() => handleEditorClick("designation")}>
//                   {activeEditor === "designation" ? (
//                     <div className="relative ">
//                       <CustomToolbar />
//                       <ReactQuill
//                         value={designation}
//                         onChange={setDesignation}
//                         modules={modules}
//                         formats={formats}
//                         placeholder="Write your designation here..."
//                       />
//                     </div>
//                   ) : (
//                     <div
//                       className=" font-normal font-poppin blue text-nowrap para-small"
//                       dangerouslySetInnerHTML={{ __html: designation }}
//                     ></div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Summary */}
//             <div onClick={() => handleEditorClick("summary")}>
//               {activeEditor === "summary" ? (
//                 <div className="relative  ">
//                   <CustomToolbar />
//                   <ReactQuill
//                     value={summary}
//                     onChange={setSummary}
//                     modules={modules}
//                     formats={formats}
//                     placeholder="Write your professional summary here..."
//                   />

//                 </div>
//               ) : (
//                 <div
//                   className="font-poppin para-ex-small"
//                   dangerouslySetInnerHTML={{ __html: summary }}
//                 ></div>
//               )}
//             </div>
//           </div>
//           <div>
//             {/* Email */}
//             <div onClick={() => handleEditorClick("email")}>
//               <h4 className="font-poppin para-ex-small font-semibold blue">Email</h4>
//               {activeEditor === "email" ? (
//                 <div className="relative ">
//                   <CustomToolbar />
//                   <ReactQuill
//                     value={email}
//                     onChange={setEmail}
//                     modules={modules}
//                     formats={formats}
//                   />
//                 </div>
//               ) : (
//                 <div
//                   className="para-ex-small font-semibold text-nowrap underline font-poppin mb-4"
//                   dangerouslySetInnerHTML={{ __html: email }}
//                 ></div>
//               )}
//             </div>

//             {/* LinkedIn */}
//             <div onClick={() => handleEditorClick("linkedIn")}>
//               <h4 className="font-poppin para-ex-small font-semibold blue">LinkedIn</h4>
//               {activeEditor === "linkedIn" ? (
//                 <div className="relative  ">
//                   <CustomToolbar />

//                   <ReactQuill
//                     value={linkedIn}
//                     onChange={setLinkedIn}
//                     modules={modules}
//                     formats={formats}
//                   />
//                 </div>
//               ) : (
//                 <div
//                   className="para-ex-small font-semibold text-nowrap underline font-poppin mb-4"
//                   dangerouslySetInnerHTML={{ __html: linkedIn }}
//                 ></div>
//               )}
//             </div>

//             {/* Phone */}
//             <div onClick={() => handleEditorClick("phone")}>
//               <h4 className="font-poppin para-ex-small font-semibold blue">Phone</h4>
//               {activeEditor === "phone" ? (
//                 <div className="relative  ">
//                   <CustomToolbar />
//                   <ReactQuill
//                     value={phone}
//                     onChange={setPhone}
//                     modules={modules}
//                     formats={formats}
//                   />
//                 </div>
//               ) : (
//                 <div
//                   className="para-ex-small font-semibold text-nowrap underline font-poppin"
//                   dangerouslySetInnerHTML={{ __html: phone }}
//                 ></div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-2">
//           <div className="p-5">
//             {/* WORK EXPERIENCE */}
//             <div>
//               <div>
//                 <h2 className="para-small font-semibold blue font-poppin text-nowrap">
//                   Work Experience
//                 </h2>
//               </div>
//               <div className="flex flex-col gap-6">
//                 {workExperiences.map((experience) => (
//                   <div key={experience.id} className="mb-6">
//                     {/* Title */}
//                     <div
//                       onClick={() =>
//                         handleEditorClick(`title-${experience.id}`)
//                       }
//                     >
//                       {activeEditor === `title-${experience.id}` ? (
//                         <div className="relative ">
//                           <CustomToolbar />
//                           <ReactQuill
//                             value={experience.title}
//                             onChange={(value) =>
//                               setWorkExperiences((prevExperiences) =>
//                                 prevExperiences.map((exp) =>
//                                   exp.id === experience.id
//                                     ? { ...exp, title: value }
//                                     : exp
//                                 )
//                               )
//                             }
//                             modules={modules}
//                             formats={formats}
//                             placeholder="Enter title here..."
//                           />
//                         </div>
//                       ) : (
//                         <div
//                           className="para-small font-bold font-poppin text-nowrap"
//                           dangerouslySetInnerHTML={{ __html: experience.title }}
//                         ></div>
//                       )}
//                     </div>

//                     {/* Company */}
//                     <div
//                       onClick={() =>
//                         handleEditorClick(`company-${experience.id}`)
//                       }
//                     >
//                       {activeEditor === `company-${experience.id}` ? (
//                         <div className="relative  ">
//                           <CustomToolbar />
//                           <ReactQuill
//                             value={experience.company}
//                             onChange={(value) =>
//                               setWorkExperiences((prevExperiences) =>
//                                 prevExperiences.map((exp) =>
//                                   exp.id === experience.id
//                                     ? { ...exp, company: value }
//                                     : exp
//                                 )
//                               )
//                             }
//                             modules={modules}
//                             formats={formats}
//                             placeholder="Enter company name and dates here..."
//                           />
//                         </div>
//                       ) : (
//                         <div
//                           className=" grayShade7  para-ex-small font-normal font-parata text-nowrap"
//                           dangerouslySetInnerHTML={{
//                             __html: experience.company,
//                           }}
//                         ></div>
//                       )}
//                     </div>

//                     {/* Description */}
//                     <div
//                       onClick={() =>
//                         handleEditorClick(`description-${experience.id}`)
//                       }
//                     >
//                       {activeEditor === `description-${experience.id}` ? (
//                         <div className="relative ">
//                           <CustomToolbar />
//                           <ReactQuill
//                             value={experience.description}
//                             onChange={(value) =>
//                               setWorkExperiences((prevExperiences) =>
//                                 prevExperiences.map((exp) =>
//                                   exp.id === experience.id
//                                     ? { ...exp, description: value }
//                                     : exp
//                                 )
//                               )
//                             }
//                             modules={modules}
//                             formats={formats}
//                             placeholder="Enter description here..."
//                           />
//                         </div>
//                       ) : (
//                         <div
//                           className="para-ex-small font-normal font-poppin"
//                           dangerouslySetInnerHTML={{
//                             __html: experience.description,
//                           }}
//                         ></div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Education & Learning */}
//           <div className="p-5">
//             {/* Education */}
//             <div>
//               <h4 className="para-small font-semibold blue font-poppin text-nowrap">
//                 Education & Learning
//               </h4>
//               {education.map((edu) => (
//                 <div key={edu.id}>
//                   {activeEditor === `degree-${edu.id}` ? (
//                     <div className="relative ">
//                       <CustomToolbar />

//                       <ReactQuill
//                         value={edu.degree}
//                         onChange={(value) =>
//                           setEducation((prev) =>
//                             prev.map((e) =>
//                               e.id === edu.id ? { ...e, degree: value } : e
//                             )
//                           )
//                         }
//                         modules={modules}
//                         formats={formats}
//                         placeholder="Enter degree here..."
//                       />
//                     </div>
//                   ) : (
//                     <div
//                       className=" para-small font-semibold font-poppin"
//                       onClick={() => handleEditorClick(`degree-${edu.id}`)}
//                       dangerouslySetInnerHTML={{ __html: edu.degree }}
//                     ></div>
//                   )}

//                   {activeEditor === `school-${edu.id}` ? (
//                     <div className="relative ">
//                       <CustomToolbar />
//                       <ReactQuill
//                         value={edu.school}
//                         onChange={(value) =>
//                           setEducation((prev) =>
//                             prev.map((e) =>
//                               e.id === edu.id ? { ...e, school: value } : e
//                             )
//                           )
//                         }
//                         modules={modules}
//                         formats={formats}
//                         placeholder="Enter school name and dates here..."
//                       />
//                     </div>
//                   ) : (
//                     <div
//                       className="grayShade7 para-ex-small font-normal font-parata mb-5"
//                       onClick={() => handleEditorClick(`school-${edu.id}`)}
//                       dangerouslySetInnerHTML={{ __html: edu.school }}
//                     ></div>
//                   )}
//                 </div>
//               ))}
//             </div>
//             {/* Skills */}
//             <div onClick={() => handleEditorClick("skills")}>
//               <h4 className="para-small font-semibold blue font-poppin text-nowrap">
//                 Skills
//               </h4>
//               {activeEditor === "skills" ? (
//                 <div className="relative ">
//                   <CustomToolbar />
//                   <ReactQuill
//                     value={skills}
//                     onChange={setSkills}
//                     modules={modules}
//                     formats={formats}
//                     placeholder="Enter your skills here..."
//                   />
//                 </div>
//               ) : (
//                 <div
//                   className="para-ex-small font-poppin"
//                   dangerouslySetInnerHTML={{ __html: skills }}
//                 ></div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResumeTemplate1;


