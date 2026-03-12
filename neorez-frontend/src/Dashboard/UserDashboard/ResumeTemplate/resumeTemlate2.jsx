import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dp from "../../../assets/icons/dashboard/dp.png";
import "react-quill/dist/quill.bubble.css";
import AiWriteButton from "../aiWriteButton";
import { Icon } from "@iconify/react/dist/iconify.js";
import add from "../../../assets/icons/dashboard/add.svg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateJobExperience } from "../../../redux/resumeSlice";

const CustomToolbar = () => (
  <div className="flex justify-center items-center absolute w-48 left-24 top-1 gap-2">
    <div className=" h-6 w-[0.7px] bg-[#C9C9C9]"></div>
    <div>
      <img src={add} alt="add icon" className="cursor-pointer" />
    </div>
    <div className="h-6 w-[0.7px] bg-[#C9C9C9]"></div>

    <div>
      <Icon
        icon="material-symbols:delete-outline"
        width="30px"
        height="30px"
        style={{ color: "black" }}
        className="cursor-pointer"
      />
    </div>
    <div className="h-6 w-[0.7px] bg-[#C9C9C9]"></div>

    <div>
      <AiWriteButton />
    </div>
    {/* 
   
     */}
  </div>
);

// Quill modules
const modules = {
  toolbar: {
    container: [["bold", "italic", "underline"]],
    handlers: {
      "ai-write": () => {
        console.log("AI Write button clicked!");
      },
    },
  },
};

const ResumeTemplate2 = () => {
  // Track the currently active editor
  const [activeEditor, setActiveEditor] = useState(null);

  // Quill Formats
  const formats = ["bold", "italic", "underline", "list", "bullet", "link"];

  // Name
  const [name, setName] = useState("Kate Bishop");

  // Designation
  const [designation, setDesignation] = useState("Product Designer");

  // Work Experience
  const [workExperiences, setWorkExperiences] = useState([
    {
      id: 1,
      title: "Product Designer",
      company: "Fintef, Oct 2019 - Present",
      description:
        "Designing end-to-end experience for financial products on mobile & web platforms. Working closely with managers, marketing specialists and developers.",
    },
    {
      id: 2,
      title: "UX Designer",
      company: "Resume Worded, Sep 2017 – Sep 2019",
      description:
        "Revamped website flows and navigation menus, reducing the frequency of misdirected customer service queries by 30%. Conducted user testing with 10+ participants using UserTesting.com; designed against findings which reduced bounce rate for primary user flow by 30%.",
    },
    {
      id: 3,
      title: "Associate UX Designer",
      company: "  Growshi, Dec 2016 – Aug 2017",
      description:
        "Redesigned company’s homepage and lead generation forms using existing design system; reduced bounce rates by 40% and increased leads by 15%. Designed online customer support center comprising of a self-service knowledge base and interactive chat bot. Coached 15 summer interns.",
    },
  ]);
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);
  // Track whether the work experience section is in edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [workExperienceContent, setWorkExperienceContent] = useState("");

  // Function to handle clicking to start editing the entire section
  const handleWorkExperienceClick = () => {
    if (!isEditing) {
      const content = workExperiences
        .map((experience) => {
          return `
          <div class="experience-item">
            <h3>${experience?.jobTitle || "Job Title"}</h3>
            <p><em>${experience?.company || "Company Name"}</em></p>
            <p>${
              experience?.description || "Description of job responsibilities"
            }</p>
          </div>
        `;
        })
        .join(""); // Join all experiences into one HTML string

      setWorkExperienceContent(content);
      setIsEditing(true); // Open the editor for the entire section
    }
  };

  // Handle changes in the ReactQuill editor
  const handleWorkExperienceChange = (value) => {
    setWorkExperienceContent(value);
  };

  // Function to save the edited content
  const handleSaveWorkExperience = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(workExperienceContent, "text/html");

    const experienceItems = Array.from(
      doc.getElementsByClassName("experience-item")
    );

    experienceItems.forEach((item, index) => {
      const jobTitle = item.querySelector("h3")?.textContent || "";
      const company = item.querySelector("p em")?.textContent || "";
      const description =
        item.querySelector("p:nth-of-type(2)")?.textContent || "";

      dispatch(
        updateJobExperience({
          index,
          data: {
            jobTitle,
            company,
            description,
          },
        })
      );
    });

    setIsEditing(false); // Close the editor after saving
  };
  //education
  const [education, setEducation] = useState([
    {
      id: 1,
      degree: "Bachelor of Arts in Design",
      school: "University of Design - Graduated 2020",
    },
    {
      id: 2,
      degree: "Master of Science in User Experience Design",
      school: "Design Academy - Graduated 2022",
    },
    {
      id: 3,
      degree: "Design Leadership Masterclass",
      school: "Design Lab Inc., Mar 2020",
      isEditing: false,
    },
    {
      id: 4,
      degree: "UX: Interaction Design",
      school: "Trydesignlab.com, Dec 2017",
      isEditing: false,
    },
    {
      id: 5,
      degree: "UX Design Specialization",
      school: "Udacity.com, online course by Google, Aug 2016",
      isEditing: false,
    },
    {
      id: 6,
      degree: "Branding fundamentals",
      school: "Design Lab Inc., Nov 2014",
      isEditing: false,
    },
  ]);

  // Skills
  const [skills, setSkills] = useState(
    "Business Analysis, UX Research, User Testing and Validation, Customer Journey Mapping, Information Architecture, Low- and High- Fidelity Wireframing, Prototyping, Interaction Design, Visual Design, Defining Product Specifications, Design System Development, Design Sprints, A/B Testing."
  );

  // LinkedIn, Email, Phone
  const [linkedIn, setLinkedIn] = useState("linkedin.com/in/kate-bishop");
  const [email, setEmail] = useState("kate.bishop@katedesign.com");
  const [phone, setPhone] = useState("+46 98-765 43 21");

  // Function to handle clicking on an editor
  const handleEditorClick = (editorType) => {
    setActiveEditor(editorType);
  };

  return (
    <div className="resumeTemplate bg-white">
      <div className="border flex flex-col gap-4">
        <div className="flex gap-5 p-7 bg-[#FBF2E480]">
          <div className="flex flex-col gap-5 w-2/3">
            {/* Name */}
            <div className="flex gap-3">
              <img
                src={dp}
                alt="dp"
                className="w-24 h-24 rounded-[50%] object-cover"
              />

              <div>
                {/* Designation */}
                <div onClick={() => handleEditorClick("designation")}>
                  {activeEditor === "designation" ? (
                    <div className="relative ">
                      <CustomToolbar />
                      <ReactQuill
                        value={designation}
                        onChange={setDesignation}
                        modules={modules}
                        formats={formats}
                        placeholder="Write your designation here..."
                      />
                    </div>
                  ) : (
                    <div
                      className=" font-normal font-parata text-[#CA6D18] text-nowrap para-small"
                      dangerouslySetInnerHTML={{ __html: designation }}
                    ></div>
                  )}
                </div>

                {/* Name */}
                <div onClick={() => handleEditorClick("name")}>
                  {activeEditor === "name" ? (
                    <div className="relative ">
                      <CustomToolbar />
                      <ReactQuill
                        value={name}
                        onChange={setName}
                        modules={modules}
                        formats={formats}
                        placeholder="Write your Name here..."
                      />
                    </div>
                  ) : (
                    <div
                      className=" font-normal font-parata  text-[35px]"
                      dangerouslySetInnerHTML={{ __html: name }}
                    ></div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Contacts */}
          <div className="flex flex-col gap-2">
            {/* Email */}
            <div
              onClick={() => handleEditorClick("email")}
              className="flex items-center gap-2"
            >
              <div className="bg-[#CA6D18] flex justify-center items-center w-5 h-5 rounded-[50%] ">
                <Icon
                  icon="material-symbols-light:mail-outline"
                  width="12px"
                  height="12px"
                  style={{ color: "#CA6D18", background: "white" }}
                />
              </div>
              {activeEditor === "email" ? (
                <div className="relative ">
                  <CustomToolbar />
                  <ReactQuill
                    value={email}
                    onChange={setEmail}
                    modules={modules}
                    formats={formats}
                    placeholder="Enter your email here..."
                  />
                </div>
              ) : (
                <div
                  className="para-ex-small font-medium text-nowrap underline font-parata"
                  dangerouslySetInnerHTML={{ __html: email }}
                ></div>
              )}
            </div>

            {/* LinkedIn */}
            <div
              onClick={() => handleEditorClick("linkedIn")}
              className="flex items-center gap-2"
            >
              <div className="bg-[#CA6D18] flex justify-center items-center w-5 h-5 rounded-[50%] ">
                <Icon
                  icon="basil:linkedin-outline"
                  width="12px"
                  height="12px"
                  style={{ color: "#CA6D18", background: "white" }}
                />
              </div>
              {activeEditor === "linkedIn" ? (
                <div className="relative ">
                  <CustomToolbar />

                  <ReactQuill
                    value={linkedIn}
                    onChange={setLinkedIn}
                    modules={modules}
                    formats={formats}
                    placeholder="Enter your LinkedIn profile here..."
                  />
                </div>
              ) : (
                <div
                  className="para-ex-small font-medium text-nowrap underline font-parata"
                  dangerouslySetInnerHTML={{ __html: linkedIn }}
                ></div>
              )}
            </div>

            {/* Phone */}
            <div
              onClick={() => handleEditorClick("phone")}
              className="flex items-center gap-2"
            >
              <div className="bg-[#CA6D18] flex justify-center items-center w-5 h-5 rounded-[50%] ">
                <Icon
                  icon="ph:phone"
                  width="12px"
                  height="12px"
                  style={{ color: "#CA6D18", background: "white" }}
                />
              </div>
              {activeEditor === "phone" ? (
                <div className="relative  ">
                  <CustomToolbar />
                  <ReactQuill
                    value={phone}
                    onChange={setPhone}
                    modules={modules}
                    formats={formats}
                    placeholder="Enter your phone number here..."
                  />
                </div>
              ) : (
                <div
                  className="para-ex-small font-medium text-nowrap underline font-parata"
                  dangerouslySetInnerHTML={{ __html: phone }}
                ></div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="p-5">
            {/* WORK EXPERIENCE */}

            <div>
              {resume?.jobExperiences?.map((experience, index) => (
                <div key={experience.id} className="mb-6">
                  {/* Title */}
                  <div
                    onClick={() => handleEditorClick(`title-${experience.id}`)}
                  >
                    {activeEditor === `title-${experience.id}` ? (
                      <div className="relative w-[289px]">
                        <CustomToolbar />
                        <ReactQuill
                          value={experience?.jobTitle || "Product Designer"}
                          // onChange={(value) =>
                          //   handleJobExperienceChange(index, "jobTitle", value)
                          // }
                          modules={modules}
                          formats={formats}
                          placeholder="Enter title here..."
                        />
                      </div>
                    ) : (
                      <div
                        className="ql-editor para-small font-bold font-OpenSan text-nowrap"
                        // style={bodyTextStyle}
                        dangerouslySetInnerHTML={{
                          __html: experience?.jobTitle || "Product Designer",
                        }}
                      ></div>
                    )}
                  </div>

                  {/* Company */}
                  <div
                    onClick={() =>
                      handleEditorClick(`company-${experience.id}`)
                    }
                  >
                    {activeEditor === `company-${experience.id}` ? (
                      <div className="relative w-[289px]">
                        <CustomToolbar />
                        <ReactQuill
                          value={
                            experience.company || "Fintech, Oct 2019 - Present"
                          }
                          // onChange={(value) =>
                          //   handleJobExperienceChange(index, "company", value)
                          // }
                          modules={modules}
                          formats={formats}
                          placeholder="Enter company name and dates here..."
                        />
                      </div>
                    ) : (
                      <div
                        className="ql-editor grayShade7 italic para-small font-semibold font-OpenSan text-nowrap"
                        // style={bodyTextStyle}
                        dangerouslySetInnerHTML={{
                          __html:
                            experience.company || "Fintech, Oct 2019 - Present",
                        }}
                      ></div>
                    )}
                  </div>

                  {/* Description */}
                  <div
                    onClick={() =>
                      handleEditorClick(`description-${experience.id}`)
                    }
                  >
                    {activeEditor === `description-${experience.id}` ? (
                      <div className="relative w-[289px]">
                        <CustomToolbar />
                        <ReactQuill
                          value={
                            experience.description ||
                            "Designing end-to-end experience for financial products on mobile & web platforms. Working closely with managers, marketing specialists and developers."
                          }
                          // onChange={(value) =>
                          //   handleJobExperienceChange(index, "description", value)
                          // }
                          modules={modules}
                          formats={formats}
                          placeholder="Enter description here..."
                        />
                      </div>
                    ) : (
                      <div
                        className="ql-editor para-small font-normal font-OpenSan"
                        // style={bodyTextStyle}
                        dangerouslySetInnerHTML={{
                          __html:
                            experience.description ||
                            "Designing end-to-end experience for financial products on mobile & web platforms. Working closely with managers, marketing specialists and developers.",
                        }}
                      ></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Learning */}
          <div className="p-5">
            {/* Education */}
            <div>
              <h4 className="para-small font-normal text-[#CA6D18] font-parata text-nowrap">
                Education & Learning
              </h4>
              {education.map((edu) => (
                <div key={edu.id} className="mt-4">
                  {activeEditor === `degree-${edu.id}` ? (
                    <div className="relative ">
                      <CustomToolbar />

                      <ReactQuill
                        value={edu.degree}
                        onChange={(value) =>
                          setEducation((prev) =>
                            prev.map((e) =>
                              e.id === edu.id ? { ...e, degree: value } : e
                            )
                          )
                        }
                        modules={modules}
                        formats={formats}
                        placeholder="Enter degree here..."
                      />
                    </div>
                  ) : (
                    <div
                      className="para-small font-normal font-parata"
                      onClick={() => handleEditorClick(`degree-${edu.id}`)}
                      dangerouslySetInnerHTML={{ __html: edu.degree }}
                    ></div>
                  )}

                  {activeEditor === `school-${edu.id}` ? (
                    <div className="relative ">
                      <CustomToolbar />
                      <ReactQuill
                        value={edu.school}
                        onChange={(value) =>
                          setEducation((prev) =>
                            prev.map((e) =>
                              e.id === edu.id ? { ...e, school: value } : e
                            )
                          )
                        }
                        modules={modules}
                        formats={formats}
                        placeholder="Enter school name and dates here..."
                      />
                    </div>
                  ) : (
                    <div
                      className="grayShade7 para-ex-small font-normal font-parata"
                      onClick={() => handleEditorClick(`school-${edu.id}`)}
                      dangerouslySetInnerHTML={{ __html: edu.school }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills */}

        <div onClick={() => handleEditorClick("skills")} className="px-5">
          <h4 className="para-small font-normal text-[#CA6D18] font-parata text-nowrap">
            Skills
          </h4>
          <div className="flex gap-5">
            {activeEditor === "skills" ? (
              <div className="relative ">
                <CustomToolbar />
                <ReactQuill
                  value={skills}
                  onChange={setSkills}
                  modules={modules}
                  formats={formats}
                />
              </div>
            ) : (
              <div
                className="pb-4 font-poppin para-ex-small"
                dangerouslySetInnerHTML={{ __html: skills }}
              ></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate2;
