import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
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

const ResumeTemplate4 = () => {
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
      company: "Fintef",
      date: "Oct 2019 - Present",
      description:
        "Designing end-to-end experience for financial products on mobile & web platforms. Working closely with managers, marketing specialists and developers.",
    },
    {
      id: 2,
      title: "UX Designer",
      company: "Resume Worded",
      date: " Sep 2017 – Sep 2019",
      description:
        "Revamped website flows and navigation menus, reducing the frequency of misdirected customer service queries by 30%. Conducted user testing with 10+ participants using UserTesting.com; designed against findings which reduced bounce rate for primary user flow by 30%.",
    },
  ]);

  //education
  const [education, setEducation] = useState([
    {
      id: 1,
      degree: "Master’s in Human-Computer Interaction",
      school: "Copenhagen School of Design and Technology",
      date: "Sep 2015 – Jun 2016",
    },
    {
      id: 2,
      degree: "Bachelor's of Arts",
      school: "Copenhagen School of Design and Technology",
      date: "Sep 2011 – Jun 2015",
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
    <div className=" resumeTemplate bg-white">
      <div className="border flex flex-col gap-6">
        <div>
          <div className="flex gap-5 p-7">
            <div className="flex flex-col gap-5">
              {/* Name */}
              <div>
                <div onClick={() => handleEditorClick("name")}>
                  {activeEditor === "name" ? (
                    <div className="relative ">
                      <CustomToolbar />
                      <ReactQuill
                        value={name}
                        onChange={setName}
                        modules={modules}
                        formats={formats}
                      />
                    </div>
                  ) : (
                    <div
                      className="font-bold font-poppin text-nowrap para-small"
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
                      />
                    </div>
                  ) : (
                    <div
                      className="font-medium font-poppin text-nowrap para-small"
                      dangerouslySetInnerHTML={{ __html: designation }}
                    ></div>
                  )}
                </div>
              </div>
            </div>
            <div>
              {/* Email */}
              <div onClick={() => handleEditorClick("email")}>
                {activeEditor === "email" ? (
                  <div className="relative ">
                    <CustomToolbar />
                    <ReactQuill
                      value={email}
                      onChange={setEmail}
                      modules={modules}
                      formats={formats}
                    />
                  </div>
                ) : (
                  <div
                    className="para-ex-small font-semibold text-nowrap underline font-poppin"
                    dangerouslySetInnerHTML={{ __html: email }}
                  ></div>
                )}
              </div>
              {/* LinkedIn */}
              <div onClick={() => handleEditorClick("linkedIn")}>
                {activeEditor === "linkedIn" ? (
                  <div className="relative  ">
                    <CustomToolbar />
                    <ReactQuill
                      value={linkedIn}
                      onChange={setLinkedIn}
                      modules={modules}
                      formats={formats}
                    />
                  </div>
                ) : (
                  <div
                    className="para-ex-small font-semibold text-nowrap underline font-poppin"
                    dangerouslySetInnerHTML={{ __html: linkedIn }}
                  ></div>
                )}
              </div>
              {/* Phone */}
              <div onClick={() => handleEditorClick("phone")}>
                {activeEditor === "phone" ? (
                  <div className="relative  ">
                    <CustomToolbar />
                    <ReactQuill
                      value={phone}
                      onChange={setPhone}
                      modules={modules}
                      formats={formats}
                    />
                  </div>
                ) : (
                  <div
                    className="para-ex-small font-semibold text-nowrap underline font-poppin"
                    dangerouslySetInnerHTML={{ __html: phone }}
                  ></div>
                )}
              </div>
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
                />
              </div>
            ) : (
              <div
                className="font-poppin para-ex-small px-7 black font-normal"
                dangerouslySetInnerHTML={{ __html: summary }}
              ></div>
            )}
          </div>
        </div>

        {/* WORK EXPERIENCE */}
        <div className=" px-7">
          <div className="grid grid-cols-3">
            <div>
              <h2 className="para-small font-semibold black font-poppin">
                Experience
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              {workExperiences.map((experience) => (
                <div key={experience.id} className="mb-6">
                  {/* Title */}
                  <div
                    onClick={() => handleEditorClick(`title-${experience.id}`)}
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
                        />
                      </div>
                    ) : (
                      <div
                        className="para-ex-small font-normal font-poppin text-nowrap"
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
                      <div className="relative ">
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
                        />
                      </div>
                    ) : (
                      <div
                        className="para-ex-small font-semibold font-poppin"
                        dangerouslySetInnerHTML={{
                          __html: experience.company,
                        }}
                      ></div>
                    )}
                  </div>

                  {/* Date */}
                  <div
                    onClick={() => handleEditorClick(`date-${experience.id}`)}
                  >
                    {activeEditor === `date-${experience.id}` ? (
                      <div className="relative  ">
                        <CustomToolbar />
                        <ReactQuill
                          value={experience.date}
                          onChange={(value) =>
                            setWorkExperiences((prevExperiences) =>
                              prevExperiences.map((exp) =>
                                exp.id === experience.id
                                  ? { ...exp, date: value }
                                  : exp
                              )
                            )
                          }
                          modules={modules}
                          formats={formats}
                        />
                      </div>
                    ) : (
                      <div
                        className="para-ex-small grayShade7 font-semibold font-poppin text-nowrap"
                        dangerouslySetInnerHTML={{
                          __html: experience.date,
                        }}
                      ></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div>
              {workExperiences.map((experience) => (
                <div key={experience.id} className="mb-6">
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
                        className="para-ex-small font-normal font-OpenSan"
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
        {/* Education & Learning */}
        <div className="flex justify-start px-7">
          <div className="w-1/3">
            <h4 className="para-small font-semibold  font-poppin text-nowrap">
              Education
            </h4>
          </div>
          <div className="flex flex-col gap-4 w-2/4">
            {education.map((edu) => (
              <div key={edu.id}>
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
                    />
                  </div>
                ) : (
                  <div
                    className=" para-ex-small font-semibold font-poppin text-nowrap"
                    onClick={() => handleEditorClick(`school-${edu.id}`)}
                    dangerouslySetInnerHTML={{ __html: edu.school }}
                  ></div>
                )}
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
                    />
                  </div>
                ) : (
                  <div
                    className="para-ex-small font-normal font-poppin"
                    onClick={() => handleEditorClick(`degree-${edu.id}`)}
                    dangerouslySetInnerHTML={{ __html: edu.degree }}
                  ></div>
                )}

                {activeEditor === `date1-${edu.id}` ? (
                  <div className="relative ">
                    <CustomToolbar />
                    <ReactQuill
                      value={edu.date}
                      onChange={(value) =>
                        setEducation((prev) =>
                          prev.map((e) =>
                            e.id === edu.id ? { ...e, date: value } : e
                          )
                        )
                      }
                      modules={modules}
                      formats={formats}
                    />
                  </div>
                ) : (
                  <div
                    className="grayShade7 para-ex-small font-normal font-poppin text-nowrap"
                    onClick={() => handleEditorClick(`date1-${edu.id}`)}
                    dangerouslySetInnerHTML={{ __html: edu.date }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-start px-7 mb-4">
            <div className="w-1/3">
              <h4 className="para-small font-semibold font-poppin text-nowrap">
                Skills
              </h4>
            </div>

            <div onClick={() => handleEditorClick("skills")} className="w-2/4 ">
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
                  className="para-ex-small font-normal font-poppin"
                  dangerouslySetInnerHTML={{ __html: skills }}
                ></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate4;
