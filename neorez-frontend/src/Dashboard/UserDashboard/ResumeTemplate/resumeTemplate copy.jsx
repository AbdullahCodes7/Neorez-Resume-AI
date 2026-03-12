// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import dp from "../../../assets/icons/dashboard/dp.png";
// import "react-quill/dist/quill.bubble.css";
// import AiWriteButton from "../aiWriteButton";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import add from "../../../assets/icons/dashboard/add.svg";
// import { useDispatch } from "react-redux";
// import {
//   addAbout,
//   addEducation,
//   addHobbies,
//   addJobExperience,
//   addLanguage,
//   addReference,
//   addSkill,
//   deleteAbout,
//   deleteEducation,
//   deleteHobbies,
//   deleteJobExperience,
//   deleteLanguage,
//   deleteReference,
//   deleteSkill,
//   reorderItemsInSection,
//   reorderSection,
//   updateAbout,
//   // updateCustomField,
//   updateEducation,
//   updateHobbies,
//   updateJobExperience,
//   updateLanguage,
//   updateProfile,
//   updateReference,
//   updateSkill,
// } from "../../../redux/resumeSlice";
// import { useSelector } from "react-redux";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// const CustomToolbar = ({
//   activeEditor,
//   handleAddNewField,
//   handleDeleteField,
// }) => (
//   <div className="flex justify-center items-center absolute right-4 top-1 gap-2">
//     <div className=" h-6 w-[0.7px] bg-[#C9C9C9]"></div>
//     <div onClick={handleAddNewField}>
//       <img src={add} alt="add icon" className="cursor-pointer" />
//     </div>
//     <div className="h-6 w-[0.7px] bg-[#C9C9C9]"></div>
//     <div onClick={handleDeleteField}>
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
//   const dispatch = useDispatch();
//   const resume = useSelector((state) => state.resume);
//   console.log(resume);
//   const { fontSize, color, margin, lineHeight, fontFamily } = useSelector(
//     (state) => state.resume.design
//   );
//   // console.log(fontSize, color, margin);
//   // Track the currently active editor
//   const [activeEditor, setActiveEditor] = useState(null);
//   const [profileImage, setProfileImage] = useState("");
//   // Quill Formats
//   const formats = ["bold", "italic", "underline", "list", "bullet", "link"];

//   // Function to handle clicking on an editor
//   const handleEditorClick = (editorType) => {
//     setActiveEditor(editorType);
//     // setActiveEditor(editorType == activeEditor ? null : editorType);

//     //   // console.log(index);
//     //   setClickedIndex(index === clickedIndex ? null : index);
//   };

//   //Redux Code

//   const handleProfileLinkChange = (index, value) => {
//     const updatedLinks = [...resume.profile.links];
//     updatedLinks[index] = value;
//     handleProfileChange("links", updatedLinks);
//   };

//   const handleProfileChange = (field, value) => {
//     dispatch(updateProfile({ [field]: value }));
//   };
//   const handleAboutChange = (index, field, value) => {
//     console.log(index);
//     console.log(field);
//     console.log(value);

//     dispatch(updateAbout({ index, data: { [field]: value } }));
//   };

//   const handleEducationChange = (index, field, value) => {
//     console.log(index, field, value);

//     dispatch(updateEducation({ index, data: { [field]: value } }));
//   };

//   const handleJobExperienceChange = (index, field, value) => {
//     // console.log(index, field, value);

//     dispatch(updateJobExperience({ index, data: { [field]: value } }));
//   };

//   const handleSkillChange = (index, field, value) => {
//     dispatch(updateSkill({ index, data: { [field]: value } }));
//   };

//   const handleLanguageChange = (index, field, value) => {
//     dispatch(updateLanguage({ index, data: { [field]: value } }));
//   };
//   const handleHobbiesChange = (index, field, value) => {
//     dispatch(updateHobbies({ index, data: { [field]: value } }));
//   };

//   const handleReferenceChange = (index, field, value) => {
//     dispatch(updateReference({ index, data: { [field]: value } }));
//   };

//   // const handleCustomFieldChange = (index, field, value) => {
//   //   dispatch(updateCustomField({ index, data: { [field]: value } }));
//   // };
//   // const handleDeleteField = (index, field, value) => {
//   //   dispatch(updateCustomField({ index, data: { [field]: value } }));
//   // };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       const base64Image = reader.result;
//       console.log(base64Image);

//       setProfileImage(base64Image); // Base64 string
//       dispatch(updateProfile({ profileImage: base64Image })); // Correctly dispatching the updated profileImage
//     };

//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   // {Add new fields on each section}

//   const handleAddEducation = () => {
//     dispatch(
//       addEducation({
//         degree: "",
//         institution: "",
//         reference: "",
//         year: "",
//       })
//     );
//   };
//   const handleAddAbout = () => {
//     dispatch(
//       addAbout({
//         description:
//           "What's the one thing that makes you the best candidate for this job",
//       })
//     );
//   };

//   const handleAddJobExperience = () => {
//     dispatch(
//       addJobExperience({
//         jobTitle: "title",
//         company: "Company Name",
//         duration: "",
//         description: [
//           "Which of you achievements match the job you're applying to?",
//         ],
//       })
//     );
//   };

//   const handleAddSkill = () => {
//     dispatch(
//       addSkill({
//         name: "",
//         level: "",
//       })
//     );
//   };

//   const handleAddLanguage = () => {
//     dispatch(
//       addLanguage({
//         name: "",
//         proficiency: "",
//       })
//     );
//   };

//   const handleAddHobbies = () => {
//     dispatch(
//       addHobbies({
//         name: "",
//       })
//     );
//   };

//   const handleAddReference = () => {
//     dispatch(
//       addReference({
//         name: "",
//         detail: "",
//         contactInfo: "",
//         email: "",
//       })
//     );
//   };

//   // remove extra fields
//   const handleDeleteAbout = (itemIndex) => {
//     console.log(itemIndex);

//     dispatch(deleteAbout(itemIndex));
//   };

//   const handleDeleteEducation = (index) => {
//     dispatch(deleteEducation(index));
//   };

//   const handleDeleteReference = (index) => {
//     dispatch(deleteReference(index));
//   };

//   const handleDeleteHobbies = (index) => {
//     dispatch(deleteHobbies(index));
//   };

//   const handleDeleteLanguage = (index) => {
//     dispatch(deleteLanguage(index));
//   };

//   const handleDeleteSkill = (index) => {
//     dispatch(deleteSkill(index));
//   };

//   const handleDeleteJobExperience = (index) => {
//     dispatch(deleteJobExperience(index));
//   };

//   // const dummyExperiences = [
//   //   {
//   //     id: "dummy-1",
//   //     jobTitle: "Product Designer",
//   //     company: "Fintech, Oct 2019 - Present",
//   //     description:
//   //       "Designing end-to-end experience for financial products on mobile & web platforms. Working closely with managers, marketing specialists and developers.",
//   //   },
//   //   {
//   //     id: "dummy-2",
//   //     jobTitle: "UX/UI Designer",
//   //     company: "TechCorp, Jan 2018 - Sep 2019",
//   //     description:
//   //       "Responsible for user experience and user interface design across multiple platforms. Collaborated with cross-functional teams to deliver intuitive digital products.",
//   //   },
//   // ];

//   const dummyEducation = [
//     {
//       id: 1,
//       degree: "Bachelor of Arts in Design",
//       institution: "University of Design - Graduated 2020",
//     },
//     {
//       id: 2,
//       degree: "Master of Science in User Experience Design",
//       institution: "Design Academy - Graduated 2022",
//     },
//     {
//       id: 3,
//       degree: "Design Leadership Masterclass",
//       institution: "Design Lab Inc., Mar 2020",
//     },
//     {
//       id: 4,
//       degree: "UX: Interaction Design",
//       institution: "Trydesignlab.com, Dec 2017",
//     },
//   ];
//   const educationToShow =
//     resume.education.length > 0 &&
//     resume.education.some((edu) => edu.degree || edu.institution)
//       ? resume.education
//       : dummyEducation;

//   //design for template headings

//   const headingStyle = {
//     fontSize: `${fontSize * 1.5}px`, // Larger size for main heading (e.g., h2)
//     color: color,
//     marginBottom: `${margin}px`,
//     lineHeight: `${lineHeight}`,
//   };

//   const subHeadingStyle = {
//     fontSize: `${fontSize * 1.5}px`,
//     color: color,
//     marginBottom: `${margin * 0.75}px`,
//     lineHeight: `${lineHeight}`,
//   };

//   const bodyTextStyle = {
//     fontSize: `${fontSize}px`, // Normal font size for body text
//     // color: color,
//     marginBottom: `${margin * 0.5}px`,
//     lineHeight: `${lineHeight}`,
//   };

//   //Added and deleted the extra fields or p tags

//   // const [clickedIndex, setClickedIndex] = useState(null);

//   const strategy = {
//     education: handleAddEducation,
//     reference: handleAddReference,
//     hobbies: handleAddHobbies,
//     language: handleAddLanguage,
//     skill: handleAddSkill,
//     experience: handleAddJobExperience,
//     about: handleAddAbout,
//   };
//   const DeleteStrategy = {
//     education: (index) => handleDeleteEducation(index),
//     reference: (index) => handleDeleteReference(index),
//     hobbies: (index) => handleDeleteHobbies(index),
//     language: (index) => handleDeleteLanguage(index),
//     skill: (index) => handleDeleteSkill(index),
//     experience: (index) => handleDeleteJobExperience(index),
//     about: (index) => handleDeleteAbout(index),
//   };

//   // const handleClick = (index) => {
//   //   // console.log(index);
//   //   setClickedIndex(index === clickedIndex ? null : index);
//   // };

//   const handleAddNewField = () => {
//     // console.log(clickedIndex);

//     const action = strategy[activeEditor];
//     if (action) {
//       action();
//     }
//   };

//   const handleDeleteField = () => {
//     const deleteAction = DeleteStrategy[activeEditor];
//     if (deleteAction) {
//       // For example, if we're deleting education, you might need an index
//       // Pass an index if needed
//       deleteAction(0); // For now, let's assume index 0
//     }
//   };

//   // drag and drop work
//   const handleOnDragEnd = (result) => {
//     const { source, destination, type } = result;

//     if (!destination) return; // Exit if dropped outside the list

//     // Handle section reordering
//     if (type === "section") {
//       dispatch(
//         reorderSection({
//           sourceIndex: source.index,
//           destinationIndex: destination.index,
//         })
//       );
//     }
//     // Handle reordering of items within a section
//     else {
//       const sectionIndex = parseInt(type); // Type represents the section index for items
//       dispatch(
//         reorderItemsInSection({
//           sectionIndex: sectionIndex,
//           sourceIndex: source.index,
//           destinationIndex: destination.index,
//         })
//       );
//     }
//   };

//   console.log("resume=========", resume);

//   const sectionIds = {
//     workExperience: "workExperience",
//     education: "education",
//     skills: "skills",
//     // Add more section IDs as needed
//   };
//   return (
//     <div className="w-[730px] resumeTemplate bg-white">
//       <div
//         className="border flex flex-col gap-4"
//         style={{ padding: `${margin}px` }}
//       >
//         {/* Profile Section */}
//         <div className="flex gap-5 p-7 lightBlueBg">
//           <div className="flex flex-col gap-5">
//             {/* Name */}
//             <div className="flex gap-3">
//               <input
//                 type="file"
//                 id="profileImageInput"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="hidden  "
//               />
//               {profileImage ? (
//                 <img
//                   src={profileImage}
//                   alt="profile image "
//                   className="w-14 h-14 rounded-[50%] object-cover"
//                 />
//               ) : (
//                 <img
//                   src={dp}
//                   alt="profile image"
//                   className="w-14 h-14 rounded-[50%] object-cover"
//                   onClick={() =>
//                     document.getElementById("profileImageInput").click()
//                   }
//                 />
//               )}
//               {/* <img
//                 src={dp}
//                 alt="dp"
//                 className="w-14 h-14 rounded-[50%] object-cover"
//               /> */}
//               <div>
//                 <div onClick={() => handleEditorClick("name")}>
//                   {activeEditor === "name" ? (
//                     <div className="relative w-[289px]">
//                       <CustomToolbar />
//                       <ReactQuill
//                         value={resume.profile.name || "Kate Bishop"}
//                         onChange={(value) => handleProfileChange("name", value)}
//                         modules={modules}
//                         formats={formats}
//                         placeholder="Write your Name here..."
//                       />
//                     </div>
//                   ) : (
//                     <div
//                       className=" font-semibold font-OpenSan text-nowrap text-[36px]"
//                       // style={{ fontSize: `${fontSize}px`, color: color }}
//                       dangerouslySetInnerHTML={{
//                         __html: resume.profile.name
//                           ? resume.profile.name
//                           : name,
//                       }}
//                     ></div>
//                   )}
//                 </div>
//                 {/* Designation */}
//                 <div onClick={() => handleEditorClick("designation")}>
//                   {activeEditor === "designation" ? (
//                     <div className="relative w-[289px]">
//                       <CustomToolbar />
//                       <ReactQuill
//                         value={resume.profile.jobTitle || "Product Designer"}
//                         onChange={(value) =>
//                           handleProfileChange("jobTitle", value)
//                         }
//                         modules={modules}
//                         formats={formats}
//                         placeholder="Write your designation here..."
//                       />
//                     </div>
//                   ) : (
//                     <div
//                       className=" font-normal font-OpenSan blue text-nowrap text-[36px]"
//                       style={{ color: color }}
//                       dangerouslySetInnerHTML={{
//                         __html: resume.profile.jobTitle
//                           ? resume.profile.jobTitle
//                           : "Product Designer",
//                       }}
//                     ></div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Summary */}
//             <div onClick={() => handleEditorClick("summary")}>
//               {resume?.about?.map((about, index) => (
//                 <>
//                   {activeEditor === "summary" ? (
//                     <div className="relative w-[289px] ">
//                       <CustomToolbar
//                         activeEditor={activeEditor}
//                         handleAddNewField={handleAddNewField}
//                         handleDeleteField={handleDeleteField}
//                       />
//                       <ReactQuill
//                         value={
//                           resume.about[index]?.description ||
//                           "Over 5 years of professional experience conducting UX research and designing interactive end-to-end user flows. I enjoy working in close collaboration with teams across technology, business, and design."
//                         }
//                         onChange={(value) => {
//                           handleAboutChange(index, "description", value);
//                         }}
//                         modules={modules}
//                         formats={formats}
//                         placeholder="Write your professional summary here..."
//                       />
//                     </div>
//                   ) : (
//                     <div
//                       className="ql-editor"
//                       dangerouslySetInnerHTML={{
//                         __html: resume.about[index]?.description
//                           ? resume.about[index]?.description
//                           : "Over 5 years of professional experience conducting UX research and designing interactive end-to-end user flows. I enjoy working in close collaboration with teams across technology, business, and design.",
//                       }}
//                     ></div>
//                   )}
//                 </>
//               ))}
//             </div>
//           </div>
//           <div>
//             {/* Email */}
//             <div onClick={() => handleEditorClick("email")}>
//               <h4
//                 className="font-OpenSan font-semibold blue"
//                 style={{ color: color }}
//               >
//                 Email
//               </h4>
//               {activeEditor === "email" ? (
//                 <div className="relative w-[289px]">
//                   <CustomToolbar />
//                   <ReactQuill
//                     value={resume.profile.email || "kate.bishop@katedesign.com"}
//                     onChange={(value) => handleProfileChange("email", value)}
//                     modules={modules}
//                     formats={formats}
//                     placeholder="Enter your email here..."
//                   />
//                 </div>
//               ) : (
//                 <div
//                   className="ql-editor  font-small font-semibold text-nowrap underline font-OpenSan"
//                   dangerouslySetInnerHTML={{
//                     __html: resume.profile.email
//                       ? resume.profile.email
//                       : "kate.bishop@katedesign.com",
//                   }}
//                 ></div>
//               )}
//             </div>

//             {/* LinkedIn */}
//             <div onClick={() => handleEditorClick("linkedIn")}>
//               <h4
//                 className="font-OpenSan font-semibold blue"
//                 style={{ color: color }}
//               >
//                 LinkedIn
//               </h4>
//               {activeEditor === "linkedIn" ? (
//                 <div className="relative  w-[289px]">
//                   <CustomToolbar />

//                   {resume.profile.links?.map((link, index) => (
//                     <ReactQuill
//                       key={index}
//                       value={link || `linkedin.com/in/example-${index}`}
//                       onChange={(value) =>
//                         handleProfileLinkChange(index, value)
//                       }
//                       modules={modules}
//                       formats={formats}
//                       placeholder={`Enter LinkedIn profile ${
//                         index + 1
//                       } here...`}
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="ql-editor  font-small font-semibold text-nowrap underline font-OpenSan">
//                   {resume.profile.links?.map((link, index) => (
//                     <div key={index}>
//                       <span
//                         dangerouslySetInnerHTML={{
//                           __html: link || `linkedin.com/in/example-${index}`,
//                         }}
//                       ></span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Phone */}
//             <div onClick={() => handleEditorClick("phone")}>
//               <h4
//                 className="font-OpenSan font-semibold blue"
//                 style={{ color: color }}
//               >
//                 Phone
//               </h4>
//               {activeEditor === "phone" ? (
//                 <div className="relative  w-[289px]">
//                   <CustomToolbar />
//                   <ReactQuill
//                     value={resume?.profile?.phone || "+46 98-765 43 21"}
//                     onChange={(value) => handleProfileChange("phone", value)}
//                     modules={modules}
//                     formats={formats}
//                     placeholder="Enter your phone number here..."
//                   />
//                 </div>
//               ) : (
//                 <div
//                   className="ql-editor font-small font-semibold text-nowrap underline font-OpenSan"
//                   dangerouslySetInnerHTML={{
//                     __html: resume?.profile?.phone
//                       ? resume?.profile?.phone
//                       : "+46 98-765 43 21",
//                   }}
//                 ></div>
//               )}
//             </div>
//           </div>
//         </div>

//         <DragDropContext onDragEnd={handleOnDragEnd}>
//           <Droppable droppableId="sections" type="section">
//             {(provided) => (
//               <div {...provided.droppableProps} ref={provided.innerRef}>
//                 {resume.sections.map((section, sectionIndex) => (
//                   <>
//                     {console.log(section)}
//                     <div className="grid grid-cols-2">
//                       {/* {section.type === "workExperience" && ( */}
//                       <Draggable draggableId="workExperience" index={0}>
//                         {(provided, snapshot) => (
//                           <div
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             className={`p-5 ${
//                               snapshot.isDragging ? "dragging" : ""
//                             }`}
//                             style={{
//                               ...provided.draggableProps.style,
//                               opacity: snapshot.isDragging ? 0.5 : 1,
//                             }}
//                           >
//                             <div className="">
//                               {/* WORK EXPERIENCE */}
//                               <div>
//                                 <div>
//                                   <h2
//                                     className="para-large font-semibold blue font-OpenSan text-nowrap"
//                                     style={headingStyle}
//                                   >
//                                     Work Experience
//                                   </h2>
//                                 </div>
//                                 <Droppable
//                                   droppableId="workExperience"
//                                   type="workExperience"
//                                 >
//                                   {(provided) => (
//                                     <div
//                                       {...provided.droppableProps}
//                                       ref={provided.innerRef}
//                                       style={{ minHeight: "100px" }}
//                                     >
//                                       <div className="flex flex-col gap-6">
//                                         {
//                                           // resume.jobExperiences.length > 0
//                                           // ? // resume.jobExperiences.some(
//                                           //   (experience) =>
//                                           //     experience.jobTitle ||
//                                           //     experience.company ||
//                                           //     experience.description
//                                           // )
//                                           // <Droppable droppableId="workExperience">
//                                           //   {(provided) => (
//                                           //     <div
//                                           //       {...provided.droppableProps}
//                                           //       ref={provided.innerRef}
//                                           //     >
//                                           resume.jobExperiences.map(
//                                             (experience, index) => (
//                                               <Draggable
//                                                 key={
//                                                   experience.id ||
//                                                   `jobExperience-${index}`
//                                                 }
//                                                 draggableId={
//                                                   experience.id ||
//                                                   `jobExperience-${index}`
//                                                 }
//                                                 index={index}
//                                               >
//                                                 {(provided, snapshot) => (
//                                                   <div
//                                                     ref={provided.innerRef}
//                                                     {...provided.draggableProps}
//                                                     {...provided.dragHandleProps}
//                                                     className={`mb-4 ${
//                                                       snapshot.isDragging
//                                                         ? "dragging"
//                                                         : ""
//                                                     }`}
//                                                     style={{
//                                                       ...provided.draggableProps
//                                                         .style,
//                                                       opacity:
//                                                         snapshot.isDragging
//                                                           ? 0.5
//                                                           : 1,
//                                                     }}
//                                                   >
//                                                     <div
//                                                       key={experience.id}
//                                                       className="mb-6"
//                                                     >
//                                                       {/* Title */}
//                                                       <div
//                                                         onClick={() =>
//                                                           handleEditorClick(
//                                                             `title-${experience.id}`
//                                                           )
//                                                         }
//                                                       >
//                                                         {activeEditor ===
//                                                         `title-${experience.id}` ? (
//                                                           <div className="relative w-[289px]">
//                                                             <CustomToolbar />
//                                                             <ReactQuill
//                                                               value={
//                                                                 experience.jobTitle ||
//                                                                 "Product Designer"
//                                                               }
//                                                               onChange={(
//                                                                 value
//                                                               ) =>
//                                                                 handleJobExperienceChange(
//                                                                   index,
//                                                                   "jobTitle",
//                                                                   value
//                                                                 )
//                                                               }
//                                                               modules={modules}
//                                                               formats={formats}
//                                                               placeholder="Enter title here..."
//                                                             />
//                                                           </div>
//                                                         ) : (
//                                                           <div
//                                                             className="ql-editor para-small font-bold font-OpenSan text-nowrap"
//                                                             style={
//                                                               bodyTextStyle
//                                                             }
//                                                             dangerouslySetInnerHTML={{
//                                                               __html:
//                                                                 experience.jobTitle ||
//                                                                 "Product Designer",
//                                                             }}
//                                                           ></div>
//                                                         )}
//                                                       </div>

//                                                       {/* Company */}
//                                                       <div
//                                                         onClick={() =>
//                                                           handleEditorClick(
//                                                             `company-${experience.id}`
//                                                           )
//                                                         }
//                                                       >
//                                                         {activeEditor ===
//                                                         `company-${experience.id}` ? (
//                                                           <div className="relative w-[289px]">
//                                                             <CustomToolbar />
//                                                             <ReactQuill
//                                                               value={
//                                                                 experience.company ||
//                                                                 "Fintech, Oct 2019 - Present"
//                                                               }
//                                                               onChange={(
//                                                                 value
//                                                               ) =>
//                                                                 handleJobExperienceChange(
//                                                                   index,
//                                                                   "company",
//                                                                   value
//                                                                 )
//                                                               }
//                                                               modules={modules}
//                                                               formats={formats}
//                                                               placeholder="Enter company name and dates here..."
//                                                             />
//                                                           </div>
//                                                         ) : (
//                                                           <div
//                                                             className="ql-editor grayShade7 italic para-small font-semibold font-OpenSan text-nowrap"
//                                                             style={
//                                                               bodyTextStyle
//                                                             }
//                                                             dangerouslySetInnerHTML={{
//                                                               __html:
//                                                                 experience.company ||
//                                                                 "Fintech, Oct 2019 - Present",
//                                                             }}
//                                                           ></div>
//                                                         )}
//                                                       </div>

//                                                       {/* Description */}
//                                                       <div
//                                                         onClick={() =>
//                                                           handleEditorClick(
//                                                             `description-${experience.id}`
//                                                           )
//                                                         }
//                                                       >
//                                                         {activeEditor ===
//                                                         `description-${experience.id}` ? (
//                                                           <div className="relative w-[289px]">
//                                                             <CustomToolbar />
//                                                             <ReactQuill
//                                                               value={
//                                                                 experience.description ||
//                                                                 "Designing end-to-end experience for financial products on mobile & web platforms. Working closely with managers, marketing specialists and developers."
//                                                               }
//                                                               onChange={(
//                                                                 value
//                                                               ) =>
//                                                                 handleJobExperienceChange(
//                                                                   index,
//                                                                   "description",
//                                                                   value
//                                                                 )
//                                                               }
//                                                               modules={modules}
//                                                               formats={formats}
//                                                               placeholder="Enter description here..."
//                                                             />
//                                                           </div>
//                                                         ) : (
//                                                           <div
//                                                             className="ql-editor para-small font-normal font-OpenSan"
//                                                             style={
//                                                               bodyTextStyle
//                                                             }
//                                                             dangerouslySetInnerHTML={{
//                                                               __html:
//                                                                 experience.description ||
//                                                                 "Designing end-to-end experience for financial products on mobile & web platforms. Working closely with managers, marketing specialists and developers.",
//                                                             }}
//                                                           ></div>
//                                                         )}
//                                                       </div>
//                                                     </div>
//                                                   </div>
//                                                 )}
//                                               </Draggable>
//                                             )
//                                           )
//                                         }
//                                         {provided.placeholder}
//                                       </div>
//                                     </div>
//                                   )}
//                                 </Droppable>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </Draggable>
//                       {/* )} */}
//                       {/* Education & Learning */}

//                       {/* </Droppable> */}
//                       <div className="">
//                         {/* Education */}
//                         <Draggable draggableId={sectionIds.education} index={1}>
//                           {(provided, snapshot) => (
//                             <div
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                               className={`p-5 ${
//                                 snapshot.isDragging ? "dragging" : ""
//                               }`}
//                               style={{
//                                 ...provided.draggableProps.style,
//                                 opacity: snapshot.isDragging ? 0.5 : 1,
//                               }}
//                             >
//                               <div>
//                                 <h4
//                                   className="para-large font-semibold blue font-OpenSan text-nowrap"
//                                   style={headingStyle}
//                                   {...provided.dragHandleProps}
//                                 >
//                                   Education
//                                 </h4>
//                               </div>
//                               <Droppable droppableId="education">
//                                 {(provided) => (
//                                   <div
//                                     {...provided.droppableProps}
//                                     ref={provided.innerRef}
//                                   >
//                                     {educationToShow.map((edu, index) => (
//                                       <Draggable
//                                         key={
//                                           edu.id
//                                             ? edu.id.toString()
//                                             : `education-${index}`
//                                         }
//                                         draggableId={
//                                           edu.id
//                                             ? edu.id.toString()
//                                             : `education-${index}`
//                                         }
//                                         index={index}
//                                       >
//                                         {(provided, snapshot) => (
//                                           <div
//                                             ref={provided.innerRef}
//                                             {...provided.draggableProps}
//                                             {...provided.dragHandleProps}
//                                             className={`mb-4 ${
//                                               snapshot.isDragging
//                                                 ? "dragging"
//                                                 : ""
//                                             }`}
//                                             style={{
//                                               ...provided.draggableProps.style,
//                                               opacity: snapshot.isDragging
//                                                 ? 0.5
//                                                 : 1,
//                                             }}
//                                           >
//                                             <div>
//                                               {activeEditor ===
//                                               `degree-${edu.id}` ? (
//                                                 <div className="relative w-[289px]">
//                                                   <CustomToolbar />
//                                                   <ReactQuill
//                                                     value={edu.degree}
//                                                     onChange={(value) =>
//                                                       handleEducationChange(
//                                                         index,
//                                                         "degree",
//                                                         value
//                                                       )
//                                                     }
//                                                     modules={modules}
//                                                     formats={formats}
//                                                     placeholder="Enter degree here..."
//                                                   />
//                                                 </div>
//                                               ) : (
//                                                 <div
//                                                   className="ql-editor para-small font-bold font-OpenSan"
//                                                   style={bodyTextStyle}
//                                                   onClick={() =>
//                                                     handleEditorClick(
//                                                       `degree-${edu.id}`
//                                                     )
//                                                   }
//                                                   dangerouslySetInnerHTML={{
//                                                     __html:
//                                                       edu.degree ||
//                                                       "Bachelor of Arts in Design",
//                                                   }}
//                                                 ></div>
//                                               )}

//                                               {activeEditor ===
//                                               `school-${edu.id}` ? (
//                                                 <div className="relative w-[289px]">
//                                                   <CustomToolbar />
//                                                   <ReactQuill
//                                                     value={edu.institution}
//                                                     onChange={(value) =>
//                                                       handleEducationChange(
//                                                         index,
//                                                         "institution",
//                                                         value
//                                                       )
//                                                     }
//                                                     modules={modules}
//                                                     formats={formats}
//                                                     placeholder="Enter school name and dates here..."
//                                                   />
//                                                 </div>
//                                               ) : (
//                                                 <div
//                                                   className="ql-editor grayShade7 para-small font-semibold font-Lato italic text-nowrap"
//                                                   style={bodyTextStyle}
//                                                   onClick={() =>
//                                                     handleEditorClick(
//                                                       `school-${edu.id}`
//                                                     )
//                                                   }
//                                                   dangerouslySetInnerHTML={{
//                                                     __html:
//                                                       edu.institution ||
//                                                       "University of Design - Graduated 2020",
//                                                   }}
//                                                 ></div>
//                                               )}
//                                             </div>
//                                           </div>
//                                         )}
//                                       </Draggable>
//                                     ))}
//                                     {provided.placeholder}
//                                   </div>
//                                 )}

//                                 {/* {provided.placeholder} */}
//                               </Droppable>
//                             </div>
//                           )}
//                         </Draggable>

//                         {/* Skills */}
//                         <Draggable draggableId={sectionIds.skills} index={1}>
//                           {(provided, snapshot) => (
//                             <div
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                               className="p-5"
//                               style={{
//                                 ...provided.draggableProps.style,
//                                 opacity: snapshot.isDragging ? 0.5 : 1,
//                               }}
//                             >
//                               {/* Skills Section Heading */}
//                               <div className="">
//                                 <h4
//                                   className="para-large font-semibold blue font-OpenSan text-nowrap"
//                                   style={headingStyle}
//                                   {...provided.dragHandleProps} // This enables dragging the whole section by the heading
//                                 >
//                                   Skills
//                                 </h4>

//                                 {/* Droppable for reordering individual skills */}
//                                 <Droppable droppableId="skills" type="skills">
//                                   {(provided) => (
//                                     <div
//                                       {...provided.droppableProps}
//                                       ref={provided.innerRef}
//                                     >
//                                       {resume.skills.map((skill, index) => (
//                                         <Draggable
//                                           key={
//                                             skill.id
//                                               ? skill.id.toString()
//                                               : `skill-${index}`
//                                           }
//                                           draggableId={
//                                             skill.id
//                                               ? skill.id.toString()
//                                               : `skill-${index}`
//                                           }
//                                           index={index}
//                                         >
//                                           {(provided, snapshot) => (
//                                             <div
//                                               ref={provided.innerRef}
//                                               {...provided.draggableProps}
//                                               {...provided.dragHandleProps}
//                                               className="relative w-[289px] mb-4"
//                                               style={{
//                                                 ...provided.draggableProps
//                                                   .style,
//                                                 opacity: snapshot.isDragging
//                                                   ? 0.5
//                                                   : 1,
//                                               }}
//                                             >
//                                               {/* Skill content */}
//                                               {activeEditor === "skills" ? (
//                                                 <div>
//                                                   <CustomToolbar />
//                                                   <ReactQuill
//                                                     value={skill.name}
//                                                     onChange={(value) =>
//                                                       handleSkillChange(
//                                                         index,
//                                                         "name",
//                                                         value
//                                                       )
//                                                     }
//                                                     modules={modules}
//                                                     formats={formats}
//                                                     placeholder="Enter your skills here..."
//                                                   />
//                                                 </div>
//                                               ) : (
//                                                 <div
//                                                   className="ql-editor"
//                                                   style={bodyTextStyle}
//                                                   dangerouslySetInnerHTML={{
//                                                     __html: skill.name
//                                                       ? skill.name
//                                                       : "Business Analysis, UX Research, User Testing and Validation, Customer Journey Mapping, Information Architecture, Low- and High- Fidelity Wireframing, Prototyping, Interaction Design, Visual Design, Defining Product Specifications, Design System Development, Design Sprints, A/B Testing.",
//                                                   }}
//                                                 ></div>
//                                               )}
//                                             </div>
//                                           )}
//                                         </Draggable>
//                                       ))}
//                                       {provided.placeholder}
//                                     </div>
//                                   )}
//                                 </Droppable>
//                               </div>
//                             </div>
//                           )}
//                         </Draggable>

//                         {/* {console.log(resume.customSections)} */}
//                         {/* Custom SEctions */}
//                         {resume?.customSections?.length > 0 && (
//                           <div>
//                             {resume?.customSections?.map((section, index) => (
//                               <div key={index} className="p-5">
//                                 <h4
//                                   className="para-large font-semibold blue font-OpenSan text-nowrap"
//                                   style={headingStyle}
//                                 >
//                                   {section.header}
//                                 </h4>

//                                 <div
//                                   onClick={() =>
//                                     handleEditorClick(section.header)
//                                   }
//                                 >
//                                   {activeEditor === section.header ? (
//                                     <div className="relative  w-[289px]">
//                                       <CustomToolbar />
//                                       <ReactQuill
//                                         value={section.content}
//                                         // onChange={(value) =>
//                                         //   // handleProfileChange("phone", value)
//                                         // }
//                                         modules={modules}
//                                         formats={formats}
//                                         // placeholder="Enter your phone number here..."
//                                       />
//                                     </div>
//                                   ) : (
//                                     <div
//                                       className="ql-editor font-small font-semibold text-nowrap font-OpenSan"
//                                       dangerouslySetInnerHTML={{
//                                         __html: section.content
//                                           ? section.content
//                                           : section.content,
//                                       }}
//                                     ></div>
//                                   )}
//                                 </div>

//                                 {/* <div className="ql-editor" style={bodyTextStyle}>
//                       <p>{section.content}</p>
//                     </div> */}
//                                 {/* <div className="ql-editor grayShade7 para-small font-semibold font-Lato italic text-nowrap">
//                       <p>{section.footer}</p>
//                     </div> */}
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </DragDropContext>
//       </div>
//     </div>
//   );
// };

// export default ResumeTemplate1;
