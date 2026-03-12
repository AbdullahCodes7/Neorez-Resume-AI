import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AiWriteButton from "../aiWriteButton";
import { Icon } from "@iconify/react/dist/iconify.js";
import add from "../../../assets/icons/dashboard/add.svg";

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

const ResumeTemplate3 = () => {
  // Track the currently active editor
  const [activeEditor, setActiveEditor] = useState(null);

  // Quill Formats
  const formats = ["bold", "italic", "underline", "list", "bullet", "link"];

  // Name
  const [name, setName] = useState("Kate Bishop");

  // Designation
  const [designation, setDesignation] = useState("Product Designer");

  // Summary
  const [summary, setSummary] = useState(
    "Over 5 years of professional experience conducting UX research and designing interactive end-to-end user flows. I enjoy working in close collaboration with teams across technology, business, and design."
  );

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
      isEditing: false,
    },
    {
      id: 4,
      title: "UX Analyst",
      company: "Growshi, Mar 2016 – Dec 2016",
      description:
        "Managed redesign of internal tracking system in use by 125 employees, resulting in 20+ new features and 25% higher engagement. Worked with product managers to validate design hypothesis by conducting interviews and usability sessions.",
      isEditing: false,
    },
   
  ]);
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
      degree: "UX: Interaction Design",
      school: "Trydesignlab.com, Dec 2017",
      isEditing: false,
    },
    {
      id: 6,
      degree: "UX: Interaction Design",
      school: "Trydesignlab.com, Dec 2017",
      isEditing: false,
    },
   
  ]);

  // Skills
  const [skills, setSkills] = useState(
    "Business Analysis, UX Research, User Testing and Validation, Customer Journey Mapping, Information Architecture, Low- and High- Fidelity Wireframing, Prototyping, Interaction Design, Visual Design, Defining Product Specifications, Design System Development, Design Sprints, A/B Testing."
  );
  // Tools
  const [tools, setTools] = useState(
    "Figma, Sketch, Adobe Illustrator, ProtoPie, Framer, Miro, Notion, Jira"
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
    <div className=" resumeTemplate bg-white">
      <div className="border flex flex-col">
        <div className="flex gap-5 p-7">
          {/* COULUMN 1 */}
          <div className="flex flex-col gap-6 w-[30%]">
            <div>
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
                    className=" font-bold font-poppin  text-[24px]"
                    dangerouslySetInnerHTML={{ __html: name }}
                  ></div>
                )}
              </div>
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
                    className=" font-semibold font-poppin text-[#0E6CC2] text-nowrap para-small"
                    dangerouslySetInnerHTML={{ __html: designation }}
                  ></div>
                )}
              </div>
            </div>

            {/* Summary */}
            <div onClick={() => handleEditorClick("summary")}>
              {activeEditor === "summary" ? (
                <div className="relative  ">
                  <CustomToolbar />
                  <ReactQuill
                    value={summary}
                    onChange={setSummary}
                    modules={modules}
                    formats={formats}
                    placeholder="Write your professional summary here..."
                  />
                </div>
              ) : (
                <div
                  className="font-poppin para-ex-small font-normal"
                  dangerouslySetInnerHTML={{ __html: summary }}
                ></div>
              )}
            </div>
            {/* Email , linkedin , phone */}
            <div className="flex flex-col gap-3">
              <h4 className="para-ex-small font-semibold text-[#0E6CC2] font-poppin text-nowrap">
                Contacts
              </h4>
              {/* Email */}
              <div
                onClick={() => handleEditorClick("email")}
                className="flex  items-center gap-1"
              >
                <Icon
                  icon="ic:baseline-email"
                  width="20px"
                  height="20px"
                  style={{ color: "black" }}
                />
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
                    className="para-ex-small font-normal  text-wrap underline font-poppin"
                    dangerouslySetInnerHTML={{ __html: email }}
                  ></div>
                )}
              </div>

              {/* LinkedIn */}
              <div
                onClick={() => handleEditorClick("linkedIn")}
                className="flex gap-2 items-center"
              >
                <Icon
                  icon="mingcute:linkedin-fill"
                  width="20px"
                  height="20px"
                  style={{ color: "black" }}
                />
                {activeEditor === "linkedIn" ? (
                  <div className="relative  ">
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
                    className="para-ex-small font-normal text-wrap underline font-poppin"
                    dangerouslySetInnerHTML={{ __html: linkedIn }}
                  ></div>
                )}
              </div>

              {/* Phone */}
              <div
                onClick={() => handleEditorClick("phone")}
                className="flex  items-center gap-2"
              >
                <Icon
                  icon="ph:phone-fill"
                  width="20px"
                  height="20px"
                  style={{ color: "black" }}
                />
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
                    className=" para-ex-small font-normal text-nowrap underline font-poppin"
                    dangerouslySetInnerHTML={{ __html: phone }}
                  ></div>
                )}
              </div>
            </div>

            {/* Skills */}
            <div onClick={() => handleEditorClick("skills")}>
              <h4 className="para-ex-small font-semibold text-[#0E6CC2] font-poppin text-nowrap">
                Skills
              </h4>
              {activeEditor === "skills" ? (
                <div className="relative ">
                  <CustomToolbar />
                  <ReactQuill
                    value={skills}
                    onChange={setSkills}
                    modules={modules}
                    formats={formats}
                    placeholder="Enter your skills here..."
                  />
                </div>
              ) : (
                <div
                className="para-ex-small font-poppin font-normal"
                  dangerouslySetInnerHTML={{ __html: skills }}
                ></div>
              )}
            </div>

            {/* Tools */}
            <div onClick={() => handleEditorClick("tools")}>
              <h4 className="para-ex-small font-semibold text-[#0E6CC2] font-poppin text-nowrap">
                Tools
              </h4>
              {activeEditor === "tools" ? (
                <div className="relative ">
                  <CustomToolbar />
                  <ReactQuill
                    value={tools}
                    onChange={setTools}
                    modules={modules}
                    formats={formats}
                    placeholder="Enter your tools here..."
                  />
                </div>
              ) : (
                <div
                  className="para-ex-small font-poppin font-normal"
                  dangerouslySetInnerHTML={{ __html: tools }}
                ></div>
              )}
            </div>
          </div>
          {/* COULUMN 2 */}
          <div className="w-full rounded-lg bg-[#F9F9F9] p-4">
            {/* WORK EXPERIENCE */}
            <div>
              <div className="flex flex-col gap-6">
                {workExperiences.map((experience) => (
                  <div key={experience.id} className="mb-6">
                    {/* Title */}
                    <div
                      onClick={() =>
                        handleEditorClick(`title-${experience.id}`)
                      }
                    >
                      {activeEditor === `title-${experience.id}` ? (
                        <div className="relative ">
                          <CustomToolbar />
                          <ReactQuill
                            value={experience.title}
                            onChange={(value) =>
                              setWorkExperiences((prevExperiences) =>
                                prevExperiences.map((exp) =>
                                  exp.id === experience.id
                                    ? { ...exp, title: value }
                                    : exp
                                )
                              )
                            }
                            modules={modules}
                            formats={formats}
                            placeholder="Enter title here..."
                          />
                        </div>
                      ) : (
                        <div
                          className=" para-ex-small font-bold font-poppin text-nowrap"
                          dangerouslySetInnerHTML={{ __html: experience.title }}
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
                        <div className="relative  ">
                          <CustomToolbar />
                          <ReactQuill
                            value={experience.company}
                            onChange={(value) =>
                              setWorkExperiences((prevExperiences) =>
                                prevExperiences.map((exp) =>
                                  exp.id === experience.id
                                    ? { ...exp, company: value }
                                    : exp
                                )
                              )
                            }
                            modules={modules}
                            formats={formats}
                            placeholder="Enter company name and dates here..."
                          />
                        </div>
                      ) : (
                        <div
                          className=" text-[#0E6CC2]  para-ex-small font-semibold font-poppin text-nowrap"
                          dangerouslySetInnerHTML={{
                            __html: experience.company,
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
                        <div className="relative ">
                          <CustomToolbar />
                          <ReactQuill
                            value={experience.description}
                            onChange={(value) =>
                              setWorkExperiences((prevExperiences) =>
                                prevExperiences.map((exp) =>
                                  exp.id === experience.id
                                    ? { ...exp, description: value }
                                    : exp
                                )
                              )
                            }
                            modules={modules}
                            formats={formats}
                            placeholder="Enter description here..."
                          />
                        </div>
                      ) : (
                        <div
                          className=" para-ex-small font-normal font-poppin"
                          dangerouslySetInnerHTML={{
                            __html: experience.description,
                          }}
                        ></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Education & Learning */}
        <div className=" m-auto mb-4 p-5 w-[90%] rounded-lg bg-[#F9F9F9] ">
          {/* Education */}
          <div>
            <h4 className="para-ex-small font-semibold text-[#0E6CC2] font-poppin text-nowrap">
              Education
            </h4>
            <div className=" flex flex-wrap  justify-between gap-4 items-center">
              {education.map((edu) => (
                <div key={edu.id}>
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
                      className=" para-ex-small font-bold font-poppin"
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
                      className=" black para-ex-small font-normal font-poppin text-nowrap"
                      onClick={() => handleEditorClick(`school-${edu.id}`)}
                      dangerouslySetInnerHTML={{ __html: edu.school }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate3;
