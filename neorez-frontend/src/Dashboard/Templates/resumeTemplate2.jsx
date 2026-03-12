import { Icon } from "@iconify/react/dist/iconify.js";
import dp from "../../assets/icons/dashboard/dp.svg";
import React, { useEffect, useRef, useState } from "react";
import { Progress, Popover } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import text from "../../assets/icons/dashboard/text.svg";
import writer from "../../assets/icons/dashboard/write.svg";
import border from "../../assets/icons/dashboard/border.svg";
import fontStyle from "../../assets/icons/dashboard/fontStyle.svg";
import calender from "../../assets/icons/dashboard/calender.svg";
import link from "../../assets/icons/dashboard/link.svg";
import Delete from "../../assets/icons/dashboard/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  addAbout,
  addEducation,
  addHobbies,
  addJobExperience,
  addLanguage,
  addReference,
  addSkill,
  deleteAbout,
  deleteEducation,
  deleteHobbies,
  deleteJobExperience,
  deleteLanguage,
  deleteReference,
  deleteSkill,
  updateAbout,
  // updateCustomField,
  updateEducation,
  updateHobbies,
  updateJobExperience,
  updateLanguage,
  updateProfile,
  updateReference,
  updateSkill,
} from "../../redux/resumeSlice";
import Button from "../../components/shared/button";
import axios from "axios";
import parse from "html-react-parser";
import Quill from "../ReactQuill/Quill";
// import parse from "html-react-parser";

const ResumeTemplate2 = () => {
  const [profileImage, setProfileImage] = useState("");
  const dispatch = useDispatch();
  const [currentValue, setCurrentValue] = useState("");
  const [textIndex, setTextIndex] = useState("");
  const [parsedtext, setParsedText] = useState([]);
  const [aboutUs, setAboutUs] = useState("");
  const [value, setValue] = useState("");

  const [resumeData, setResumeData] = useState({
    userId: "",
    profile: {
      profileImage: "",
      name: "",
      contactNumber: "",
      email: "",
      address: "",
      jobTitle: "",
      links: [""],
    },
    about: [{ description: "" }],
    education: [{ degree: "", institution: "", reference: "", year: "" }],
    jobExperiences: [
      {
        jobTitle: "",
        company: "",
        duration: "",
        description: [{ value: "", style: "" }],
      },
    ],
    skills: [{ name: "", level: "" }],
    languages: [{ name: "", proficiency: "" }],
    hobbies: [{ name: "" }],
    references: [{ name: "", detail: "", contactInfo: "", email: "" }],
    customFields: [{ key: "", value: "" }],
  });

  const handleQuillChangee = (value, section) => {
    setResumeData((prevData) => ({
      ...prevData,
      [section]: value,
    }));
  };

  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;
  // const ApiUrl = "http://localhost:5000";
  const resume = useSelector((state) => state.resume);
  // console.log(resume);
  const ref = useRef();
  const user = useSelector((state) => state?.user?.userInfo);

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = value;
      // setValue();
    }
  }, [value, ref.current]);

  const handleProfileChange = (field, value) => {
    dispatch(updateProfile({ [field]: value }));
  };
  const handleAboutChange = (index, field, value) => {
    // console.log(index);
    // console.log(field);
    // console.log(value);

    dispatch(updateAbout({ index, data: { [field]: value } }));
  };

  const handleEducationChange = (index, field, value) => {
    // console.log(index, field, value);

    dispatch(updateEducation({ index, data: { [field]: value } }));
  };

  const handleJobExperienceChange = (index, field, value) => {
    // console.log(index, field, value);

    dispatch(updateJobExperience({ index, data: { [field]: value } }));
  };

  const handleSkillChange = (index, field, value) => {
    dispatch(updateSkill({ index, data: { [field]: value } }));
  };

  const handleLanguageChange = (index, field, value) => {
    dispatch(updateLanguage({ index, data: { [field]: value } }));
  };
  const handleHobbiesChange = (index, field, value) => {
    dispatch(updateHobbies({ index, data: { [field]: value } }));
  };

  const handleReferenceChange = (index, field, value) => {
    dispatch(updateReference({ index, data: { [field]: value } }));
  };

  // const handleCustomFieldChange = (index, field, value) => {
  //   dispatch(updateCustomField({ index, data: { [field]: value } }));
  // };
  // const handleDeleteField = (index, field, value) => {
  //   dispatch(updateCustomField({ index, data: { [field]: value } }));
  // };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result;
      // console.log(base64Image);

      setProfileImage(base64Image); // Base64 string
      dispatch(updateProfile({ profileImage: base64Image })); // Correctly dispatching the updated profileImage
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // {Add new fields on each section}

  const handleAddEducation = () => {
    dispatch(
      addEducation({
        degree: "",
        institution: "",
        reference: "",
        year: "",
      })
    );
  };
  const handleAddAbout = () => {
    dispatch(
      addAbout({
        description:
          "What's the one thing that makes you the best candidate for this job",
      })
    );
  };

  const handleAddJobExperience = () => {
    dispatch(
      addJobExperience({
        jobTitle: "title",
        company: "Company Name",
        duration: "",
        description: [
          "Which of you achievements match the job you're applying to?",
        ],
      })
    );
  };

  const handleAddSkill = () => {
    dispatch(
      addSkill({
        name: "",
        level: "",
      })
    );
  };

  const handleAddLanguage = () => {
    dispatch(
      addLanguage({
        name: "",
        proficiency: "",
      })
    );
  };

  const handleAddHobbies = () => {
    dispatch(
      addHobbies({
        name: "",
      })
    );
  };

  const handleAddReference = () => {
    dispatch(
      addReference({
        name: "",
        detail: "",
        contactInfo: "",
        email: "",
      })
    );
  };

  // remove extra fields
  const handleDeleteAbout = (itemIndex) => {
    // console.log(itemIndex);

    dispatch(deleteAbout(itemIndex));
  };

  const handleDeleteEducation = (index) => {
    dispatch(deleteEducation(index));
  };

  const handleDeleteReference = (index) => {
    dispatch(deleteReference(index));
  };

  const handleDeleteHobbies = (index) => {
    dispatch(deleteHobbies(index));
  };

  const handleDeleteLanguage = (index) => {
    dispatch(deleteLanguage(index));
  };

  const handleDeleteSkill = (index) => {
    dispatch(deleteSkill(index));
  };

  const handleDeleteJobExperience = (index) => {
    dispatch(deleteJobExperience(index));
  };
  const [clickedIndex, setClickedIndex] = useState(null);

  const strategy = {
    education: handleAddEducation,
    reference: handleAddReference,
    hobbies: handleAddHobbies,
    language: handleAddLanguage,
    skill: handleAddSkill,
    experience: handleAddJobExperience,
    about: handleAddAbout,
  };
  const DeleteStrategy = {
    education: (index) => handleDeleteEducation(index),
    reference: (index) => handleDeleteReference(index),
    hobbies: (index) => handleDeleteHobbies(index),
    language: (index) => handleDeleteLanguage(index),
    skill: (index) => handleDeleteSkill(index),
    experience: (index) => handleDeleteJobExperience(index),
    about: (index) => handleDeleteAbout(index),
  };

  const handleClick = (index) => {
    // console.log(index);
    setClickedIndex(index === clickedIndex ? null : index);
  };

  const handleAddNewField = () => {
    // console.log(clickedIndex);

    const action = strategy[clickedIndex];
    if (action) {
      action();
    }
  };
  // const handleDeleteField = ({ index, currentvalue }) => {
  //   console.log("=================", index);
  //   console.log("=================", currentvalue);
  //   if (currentvalue) {
  //     handleProfileChange(currentvalue, "");
  //     return;
  //   }
  //   const action = DeleteStrategy[clickedIndex];
  //   if (action) {
  //     action();
  //   }
  // };

  const handleDeleteField = ({ index = 0, currentIndex }) => {
    // console.log("=================", index);
    // console.log("=================", currentIndex);
    // console.log("=================", clickedIndex);

    if (currentIndex !== undefined) {
      handleProfileChange(currentIndex, "");
    } else {
      const action = DeleteStrategy[clickedIndex];
      if (action) {
        action(index); // Pass the index of the item to delete
      }
    }
  };

  const contentAi = (index) => (
    <div className="ai-popover">
      <div className="modal-wrap bg-white absolute flex gap-[10px] justify-center items-center w-[250px]  py-1 rounded-md ">
        {/* Text Section */}
        <div className="relative group cursor-pointer">
          <div className="flex items-center gap-3 ">
            <img src={text} alt="Icon" />
            <img src={border} alt="Icon" />
          </div>
          {/* Hover text */}
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out absolute top-[-40px] left-0 w-[90px] flex gap-[10px] justify-start items-center py-[7px] px-[10px] bg-white rounded-md">
            <img src={fontStyle} alt="font styles" />
            <img src={link} alt="link" />
          </div>
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <img src={calender} alt="Icon" />
          <img src={border} alt="Icon" />
        </div>
        {/* New Added Section */}

        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={handleAddNewField}
        >
          <img src={writer} alt="Icon" />
          <img src={border} alt="Icon" />
        </div>
        {/* {Delete Icons} */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => {
            if (index) {
              handleDeleteField({ index });
            } else {
              handleDeleteField({ currentValue });
            }
          }}
        >
          <img src={Delete} alt="Icon" />
          <img src={border} alt="Icon" />
        </div>
        <div className="group">
          <Button
            text="AI Writer"
            className="btn-primary group-hover:scale-125"
            // onClick={handleAiModal}
          />
        </div>
      </div>
    </div>
  );
  // const about = useSelector((state) => state.resume.about);
  // console.log(about);

  // const handleQuillChange = (value) => {
  //   console.log(value);

  //   const parsedValue = HTMLReactParser(value);
  //   console.log(parsedValue);

  //   // Convert parsedValue to an array if it's not already
  //   const ensureArray = (data) => {
  //     return Array.isArray(data) ? data : [data];
  //   };

  //   // Ensure description is always an array
  //   let description = ensureArray(parsedValue).map((item) => {
  //     return item?.props?.children || "";
  //   });

  //   console.log(description);

  //   // dispatch(updateAbout({ index, data: { [field]: value } }));

  //   console.log(textIndex);
  //   console.log(description);
  //   if (description) {
  //     dispatch(
  //       updateAbout({
  //         index: textIndex,
  //         data: { description: description },
  //       })
  //     );
  //   }
  // };

  const handleQuillChange = (value) => {
    // console.log(value);

    setValue(value);

    handleAboutChange(textIndex, "description", value);
    // const parsedValue = HTMLReactParser(value);
    // console.log(parsedValue);

    // let description;

    // if (Array.isArray(parsedValue)) {
    //   description = parsedValue.map((item) => {
    //     return item?.props?.children;
    //   });
    // } else {
    //   description = parsedValue?.props?.children;
    // }

    // console.log(description);

    // dispatch(updateAbout({ index, data: { [field]: value } }));

    // console.log(textIndex);
    // console.log(description);
    // if (value) {
    // dispatch(
    //   updateAbout({
    //     index: textIndex,
    //     data: { description: value },
    //   })
    // );
    // }
  };

  // const handleQuillChange = (value) => {
  //   console.log(value);

  //   const parsedValue = HTMLReactParser(value);
  //   let newDescription;

  //   if (Array.isArray(parsedValue)) {
  //     newDescription = parsedValue.map((item) => item?.props?.children);
  //   } else {
  //     newDescription = parsedValue?.props?.children;
  //   }

  //   console.log(newDescription);

  //   const currentDescription = resume.about[textIndex]?.description || "";

  //   if (newDescription !== currentDescription) {
  //     dispatch(
  //       updateAbout({
  //         index: textIndex,
  //         data: { description: newDescription },
  //       })
  //     );
  //   }
  // };

  // console.log(parsedtext);
  // console.log(textIndex);

  const module = {
    toolbar: false,
  };

  return (
    <>
      <div>
        <div className="resume  ">
          <div className=" flex  bg-white gap-5 resume-outline px-3">
            <div className=" h-auto w-[50%] flex justify-center ">
              <div className="w-[90%] bg-[#F0F0F0]">
                <div className="bg-[#333333] radius pt-[40px] pb-2 px-[25px] flex flex-col items-center  justify-center">
                  <Popover content={contentAi} trigger="click" placement="top">
                    <div
                      className={`${
                        clickedIndex === "profile" ? "onclickBorder" : ""
                      }`}
                      onClick={() => handleClick("profile")}
                    >
                      <h3
                        className="text-[25px] font-OpenSan white font-extrabold uppercase w-full text-center "
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          handleProfileChange("name", e.target.textContent)
                        }
                        onClick={() => setCurrentValue("name")}
                      >
                        {resume.profile.name || "NEOL TAYLOR"}
                      </h3>
                      <h4
                        className="para-small font-Lato white h-auto  uppercase w-full text-center text-wrap"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          handleProfileChange("jobTitle", e.target.textContent)
                        }
                      >
                        {resume?.profile?.jobTitle || "Graphic & Web Designer"}
                      </h4>
                    </div>
                  </Popover>
                  {/* <div className="mt-3 bg-white w-[220px] h-[220px] flex justify-center items-center rounded-[50%] ">
                    <img
                      src={dp}
                      alt="profile image"
                      className="w-[200px] h-[200px]"
                    />
                  </div> */}
                  <div className="mt-3 bg-white w-[220px] h-[220px] flex justify-center items-center rounded-[50%] ">
                    <div className="w-[200px] h-[200px] flex justify-center items-center rounded-full overflow-hidden cursor-pointer">
                      <input
                        type="file"
                        id="profileImageInput"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden  "
                      />
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="profile image "
                          className="w-[200px] h-[200px] "
                        />
                      ) : (
                        <img
                          src={dp}
                          alt="profile image"
                          className="w-[200px] h-[200px]"
                          onClick={() =>
                            document.getElementById("profileImageInput").click()
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
                {/* Profile Section */}
                <div className="flex justify-center">
                  <div className="mt-3 ">
                    <div className="flex items-center justify-center gap-1">
                      <div className="iconWrap">
                        <Icon
                          icon="fluent-mdl2:contact"
                          width="15px"
                          height="15px"
                          style={{ color: "white" }}
                        />
                      </div>
                      <h4
                        className="font-Inter para-large font-extrabold darkGray h-auto 
                       text-center uppercase "
                      >
                        Contact me
                      </h4>
                    </div>
                    <div className="mt-3 flex flex-col gap-1 justify-center items-center">
                      <div className="flex gap-3 items-center ">
                        <div>
                          <Icon
                            icon="gg:phone"
                            width="20px"
                            height="20px"
                            style={{ color: "#333333" }}
                          />
                        </div>
                        <Popover
                          content={contentAi}
                          trigger="click"
                          placement="top"
                        >
                          <div
                            className={`${
                              clickedIndex === "contact" ? "onclickBorder" : ""
                            }`}
                            onClick={() => handleClick("contact")}
                          >
                            <p
                              className="font-Lato font-medium mediumGray para-ex-small text-left"
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) =>
                                handleProfileChange(
                                  "contactNumber",
                                  e.target.textContent
                                )
                              }
                            >
                              {resume.profile.contactNumber || "+123-456-7890"}
                            </p>
                          </div>
                        </Popover>
                      </div>
                      <div className="flex gap-3  items-center">
                        <div>
                          <Icon
                            icon="tabler:world-upload"
                            width="20px"
                            height="20px"
                            style={{ color: "#333333" }}
                          />
                        </div>
                        <p
                          className="font-Lato font-medium mediumGray  para-ex-small text-left "
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleProfileChange("links", e.target.textContent)
                          }
                        >
                          {"www.yourwebsite.com" || resume.profile.links}
                        </p>
                      </div>
                      <div className="flex gap-3 items-center">
                        <div>
                          <Icon
                            icon="mdi:location"
                            width="20px"
                            height="20px"
                            style={{ color: "#333333" }}
                          />
                        </div>
                        <p
                          className="font-Lato font-medium mediumGray  para-ex-small text-left"
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleProfileChange("address", e.target.textContent)
                          }
                        >
                          {resume.profile.address ||
                            "769 Purdencelincon Park MI"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Education */}
                <div>
                  <div className="bg-[#333333] radius2 pt-[40px] pb-2 px-[25px] flex flex-col items-center  justify-center gap-3 mt-4">
                    <div className="flex justify-center items-center gap-3">
                      <div className="iconWrapWhite mt-8">
                        <Icon
                          icon="zondicons:education"
                          width="15px"
                          height="15px"
                          style={{ color: "#333" }}
                        />
                      </div>
                      <h4 className="mt-8 para-large font-Lato font-bold white h-auto   text-center uppercase ">
                        Education
                      </h4>
                    </div>

                    <div className="flex flex-col gap-4">
                      <Popover
                        content={contentAi}
                        trigger="click"
                        placement="top"
                      >
                        <div
                          className={`${
                            clickedIndex === "education" ? "onclickBorder" : ""
                          }`}
                          onClick={() => handleClick("education")}
                        >
                          {resume.education.map((edu, index) => (
                            <div key={index} className="flex flex-col ">
                              <p
                                className="para-small font-Lato font-semibold white h-auto  uppercase w-full text-wrap"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) =>
                                  handleEducationChange(
                                    index,
                                    "institution",
                                    e.target.textContent
                                  )
                                }
                              >
                                {edu.institution || "Stanford University"}
                              </p>
                              <p
                                className="para-small font-Lato font-normal white h-auto  uppercase "
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) =>
                                  handleEducationChange(
                                    index,
                                    "degree",
                                    e.target.textContent
                                  )
                                }
                              >
                                {edu.degree || "Master Degree Graduate"}
                              </p>
                              <p
                                className="para-ex-small font-Lato font-normal white h-auto  uppercase "
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) =>
                                  handleEducationChange(
                                    index,
                                    "year",
                                    e.target.textContent
                                  )
                                }
                              >
                                {edu.year || "2020-2022"}
                              </p>
                            </div>
                          ))}
                        </div>
                      </Popover>
                      <div className="flex flex-col hidden">
                        <p className="para-small font-Lato font-semibold white h-auto uppercase ">
                          University of chicago
                        </p>
                        <p className="para-small font-Lato font-normal white h-auto  uppercase ">
                          Bachelor Degree Graduate
                        </p>
                        <p className="para-ex-small font-Lato font-normal white h-auto  uppercase">
                          2020-2022
                        </p>
                      </div>
                      <div>
                        <h4 className="mt-6 mb-3 para-large font-Lato font-bold white h-auto  text-center uppercase w-full text-wrap">
                          References
                        </h4>
                        <div className="flex flex-col gap-4">
                          <Popover
                            content={contentAi}
                            trigger="click"
                            placement="top"
                          >
                            <div
                              className={`${
                                clickedIndex === "references"
                                  ? "onclickBorder"
                                  : ""
                              }`}
                              onClick={() => handleClick("references")}
                            >
                              {resume.references.map((ref, index) => (
                                <>
                                  <div className="flex flex-col ">
                                    <p
                                      className="para-small font-Lato font-semibold white h-auto uppercase"
                                      contentEditable
                                      suppressContentEditableWarning
                                      onBlur={(e) =>
                                        handleReferenceChange(
                                          index,
                                          "name",
                                          e.target.textContent
                                        )
                                      }
                                    >
                                      {ref.name || "Drawin B. Magana"}
                                    </p>
                                    <p
                                      className="para-ex-small font-Lato font-normal white "
                                      contentEditable
                                      suppressContentEditableWarning
                                      onBlur={(e) =>
                                        handleReferenceChange(
                                          index,
                                          "address",
                                          e.target.textContent
                                        )
                                      }
                                    >
                                      {ref.address ||
                                        "769 Purdencelincon Park MI"}
                                    </p>
                                    <p
                                      className="para-ex-small font-Lato font-normal white "
                                      contentEditable
                                      suppressContentEditableWarning
                                      onBlur={(e) =>
                                        handleReferenceChange(
                                          index,
                                          "contact",
                                          e.target.textContent
                                        )
                                      }
                                    >
                                      {ref.contact || "+123-456-999"}
                                    </p>
                                    <p
                                      className="para-ex-small font-Lato font-normal white"
                                      contentEditable
                                      suppressContentEditableWarning
                                      onBlur={(e) =>
                                        handleReferenceChange(
                                          index,
                                          "email",
                                          e.target.textContent
                                        )
                                      }
                                    >
                                      {ref.email || "www.example@gmail.com"}
                                    </p>
                                  </div>
                                </>
                              ))}
                            </div>
                          </Popover>
                          <div className="flex flex-col hidden">
                            <p className="para-small font-Lato font-semibold white  uppercase ">
                              Drawin b. magana
                            </p>
                            <p className="para-ex-small font-Lato font-normal white   ">
                              769 Purdencelincon Park MI
                            </p>
                            <p className="para-ex-small font-Lato font-normal white h-auto ">
                              +123-456-999
                            </p>
                            <p className="para-ex-small font-Lato font-normal white h-auto ">
                              www.example@gmail.com
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white h-auto w-[60%] mt-10">
              {/* About me */}
              {resume?.about?.length > 0 ? (
                <div>
                  <div className="flex items-center gap-3">
                    <div className="iconWrap">
                      <Icon
                        icon="ri:contacts-fill"
                        width="15px"
                        height="15px"
                        style={{ color: "white" }}
                      />
                    </div>
                    <h4 className="w-[50%] font-Inter para-large font-extrabold darkGray h-auto  text-left uppercase  ">
                      About me
                    </h4>
                  </div>
                  {/* {console.log(resume)} */}
                  {resume?.about?.map((about, index) => (
                    <>
                      <Popover
                        content={() => contentAi(index)}
                        trigger="click"
                        placement="top"
                      >
                        <div
                          className={`${
                            clickedIndex === "about" ? "onclickBorder2" : ""
                          }`}
                          onClick={() => handleClick("about")}
                        >
                          {/* <p
                            contentEditable={true}
                            onInput={(e) => {
                              console.log(
                                "=======================",
                                e.currentTarget.innerHTML
                              );

                              handleAboutChange(
                                index,
                                "description",
                                e.target.value
                              );
                              setValue(e.currentTarget.innerHTML);
                            }}
                          >
                            {parse(value)}
                          </p> */}
                          {/* <textarea
                            rows={4}
                            ref={ref}
                            placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam nam quos alias sint. Incidunt iste impedit dolore rem id tenetur enim, blanditiis vitae, laboriosam cum repellat explicabo et officia sit?"
                            className="border-none outline-none w-full font-Inter para-ex-small font-normal darkGray text-left mt-3"
                            value={parse(value)?.props?.children}
                            onChange={(e) => {
                              console.log(
                                "=======================",
                                parse(about?.description)
                              );

                              handleAboutChange(
                                index,
                                "description",
                                e.target.value
                              );
                              setValue(e.target.value);
                            }}
                            onClick={() => {
                               
                              setTextIndex(index);
                            }}
                            
                          /> */}
                          <ReactQuill
                            value={value}
                            modules={module}
                            // className="border-none outline-none font-Inter para-ex-small font-normal darkGray h-auto bg-transparent text-left"
                            theme="snow"
                            onChange={onchange}
                          />
                        </div>
                      </Popover>
                    </>
                  ))}
                </div>
              ) : (
                ""
              )}
              {/* JOB EXPERIENCE */}
              {resume?.jobExperiences?.length > 0 ? (
                <div>
                  <div className="flex items-center gap-3 mt-10">
                    <div className="iconWrap">
                      <Icon
                        icon="hugeicons:job-link"
                        width="15px"
                        height="15px"
                        style={{ color: "white" }}
                      />
                    </div>
                    <h4 className=" font-Inter para-large font-extrabold darkGray h-auto bg-transparent text-left uppercase w-full text-wrap">
                      JOB EXPERIENCE
                    </h4>
                  </div>
                  {resume?.jobExperiences?.map((job, index) => (
                    <>
                      <Popover
                        content={() => contentAi(index)}
                        trigger="click"
                        placement="top"
                      >
                        <div
                          className={`${
                            clickedIndex === "experience"
                              ? "onclickBorder2"
                              : ""
                          }`}
                          onClick={() => handleClick("experience")}
                        >
                          <div className="mt-3">
                            {/* Title */}
                            <div className="flex justify-between">
                              <p
                                className=" font-Inter para-small font-bold darkGray text-left uppercase"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) =>
                                  handleJobExperienceChange(
                                    index,
                                    "position",
                                    e.target.textContent
                                  )
                                }
                              >
                                {job.position || "Senior web designer"}
                              </p>
                              <p
                                className=" font-Inter para-ex-small font-semibold darkGray h-auto bg-transparent text-left  text-wrap"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={
                                  (e) =>
                                    handleJobExperienceChange(
                                      index,
                                      "duration",
                                      e.target.textContent
                                    )

                                  // dispatch(
                                  //   updateJobExperience({
                                  //     index,
                                  //     data: { duration: e.target.textContent },
                                  //   })
                                  // )
                                }
                              >
                                {job.duration || "2020-Present"}
                              </p>
                            </div>

                            <p
                              className=" font-Inter para-ex-small italic darkGray h-auto bg-transparent text-left text-wrap mb-3"
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) =>
                                handleJobExperienceChange(
                                  index,
                                  "company",
                                  e.target.textContent
                                )
                              }
                            >
                              {job.company || "Creative Agency / Chicago"}
                            </p>
                            {/* <ReactQuill
                              theme="snow"
                              value={value}
                              onChange={setValue}
                            /> */}

                            <p
                              className="border-none outline-none font-Inter para-ex-small font-normal darkGray h-auto bg-transparent text-left"
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) =>
                                handleJobExperienceChange(
                                  index,
                                  "description",
                                  e.target.textContent
                                )
                              }
                            >
                              {"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam nam quos alias sint." ||
                                job.description}
                            </p>
                          </div>
                        </div>
                      </Popover>
                    </>
                  ))}
                </div>
              ) : (
                ""
              )}
              {/* Skills */}
              {resume?.skills?.length > 0 ? (
                <div>
                  <div className="flex items-center mt-10">
                    <h4 className="mb-3 font-Inter para-large font-extrabold darkGray h-auto bg-transparent text-left uppercase w-full text-wrap">
                      Skills
                    </h4>
                  </div>
                  <div className="gap-3 flex flex-wrap">
                    {resume.skills.map((skill, index) => (
                      <>
                        <Popover
                          content={() => contentAi(index)}
                          trigger="click"
                          placement="top"
                        >
                          <div
                            className={`${
                              clickedIndex === "skill" ? "onclickBorder2" : ""
                            }`}
                            onClick={() => handleClick("skill")}
                          >
                            <div className="flex items-center justify-center gap-2 w-[40%]">
                              <p
                                className="  font-Inter para-ex-small font-semibold darkGray h-auto bg-transparent text-left  w-[110px] "
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) =>
                                  handleSkillChange(
                                    index,
                                    "name",
                                    e.target.textContent
                                  )
                                }
                              >
                                {skill.name || "Adobe Photoshop"}
                              </p>
                              <Progress
                                percent={skill.level || 50}
                                showInfo={false}
                                className="w-[120px]"
                              />
                            </div>
                            <div className="flex items-center justify-center gap-1  w-[40%] hidden">
                              <p className="font-Inter para-ex-small font-semibold darkGray h-auto bg-transparent text-left  w-[110px] text-wra">
                                Adobe illustrator
                              </p>
                              <Progress
                                percent={50}
                                showInfo={false}
                                className="w-[120px]"
                              />
                            </div>
                          </div>
                        </Popover>
                      </>
                    ))}
                    <div className="flex items-center justify-center gap-1  w-[40%] hidden">
                      <p className="w-[110px] font-Inter para-ex-small font-semibold darkGray h-auto bg-transparent text-left">
                        MS Word
                      </p>
                      <Progress
                        percent={50}
                        showInfo={false}
                        className="w-[120px]"
                      />
                    </div>
                    <div className="flex items-center justify-center gap-1  w-[40%] hidden">
                      <p className="font-Inter para-ex-small font-semibold darkGray h-auto bg-transparent text-left w-[110px] ">
                        MS Powerpoint
                      </p>
                      <Progress
                        percent={50}
                        showInfo={false}
                        className="w-[120px]"
                      />
                    </div>
                    <div className="flex items-center justify-center gap-1  w-[40%] hidden">
                      <p className="font-Inter para-ex-small font-semibold darkGray h-auto bg-transparent text-left uppercase w-[110px] text-wra">
                        HTML-S/CSS-3
                      </p>
                      <Progress
                        percent={50}
                        showInfo={false}
                        className="w-[120px]"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {/* Languages */}
              <div className="flex justify-between items-center  mt-10">
                <div className="w-[50%]">
                  <div className="flex items-center mb-3 gap-1">
                    <div className="iconWrap">
                      <Icon
                        icon="ic:sharp-language"
                        width="15px"
                        height="15px"
                        style={{ color: "white" }}
                      />
                    </div>
                    <h4 className=" font-Inter para-large font-extrabold darkGray h-auto bg-transparent text-left uppercase ">
                      Languages
                    </h4>
                  </div>
                  <div>
                    <ul className="  ml-4 flex flex-wrap gap-3 ">
                      {resume.languages.map((language, index) => (
                        <>
                          <Popover
                            content={contentAi}
                            trigger="click"
                            placement="top"
                          >
                            <div
                              className={`${
                                clickedIndex === "langauage"
                                  ? "onclickBorder2"
                                  : ""
                              }`}
                              onClick={() => handleClick("langauage")}
                            >
                              <li key={index}>
                                <p
                                  className="font-Inter para-ex-small font-semibold darkGray h-auto bg-transparent text-left uppercase "
                                  contentEditable
                                  suppressContentEditableWarning
                                  onBlur={
                                    (e) =>
                                      handleLanguageChange(
                                        index,
                                        "name",
                                        e.target.textContent
                                      )
                                    // dispatch(
                                    //   updateLanguage({
                                    //     index,
                                    //     data: { name: e.target.textContent },
                                    //   })
                                    // )
                                  }
                                >
                                  {language.name || "English"}
                                </p>
                              </li>
                            </div>
                          </Popover>
                        </>
                      ))}
                      {/* <li >
                        <p className="font-Inter para-ex-small font-semibold darkGray h-auto bg-transparent text-left uppercase ">
                          Spanish
                        </p>
                      </li>

                      <li>
                        <p className="font-Inter para-ex-small font-semibold darkGray h-auto bg-transparent text-left uppercase">
                          french
                        </p>
                      </li>
                      <li>
                        <p className="font-Inter para-ex-small font-semibold darkGray h-auto bg-transparent text-left uppercase ">
                          german
                        </p>
                      </li> */}
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="flex  items-center gap-1">
                    <div className="iconWrap mb-2">
                      <Icon
                        icon="ph:flag-fill"
                        width="15px"
                        height="15px"
                        style={{ color: "white" }}
                      />
                    </div>
                    <h4 className=" font-Inter para-large font-extrabold darkGray h-auto bg-transparent text-left uppercase w-full text-wrap mb-3">
                      Hobbies
                    </h4>
                  </div>
                  <div>
                    <div>
                      <ul className="flex flex-col  list-disc ">
                        {/* {console.log(resume.hobbies)} */}

                        {resume.hobbies.map((hobby, index) => (
                          <>
                            <Popover
                              content={contentAi}
                              trigger="click"
                              placement="top"
                            >
                              <div
                                className={`${
                                  clickedIndex === "hobbies"
                                    ? "onclickBorder2"
                                    : ""
                                }`}
                                onClick={() => handleClick("hobbies")}
                              >
                                <li key={index}>
                                  <p
                                    className="font-Inter para-ex-small font-semibold darkGray h-auto bg-transparent text-left uppercase w-full text-wra"
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) =>
                                      handleHobbiesChange(
                                        index,
                                        "name",
                                        e.target.textContent
                                      )
                                    }
                                  >
                                    {hobby.name || "Reading books"}
                                  </p>
                                </li>
                              </div>
                            </Popover>
                          </>
                        ))}
                        {/* <li>
                          <p className="font-Inter para-ex-small font-semibold darkGray h-auto bg-transparent text-left uppercase w-full text-wra">
                            traveling
                          </p>
                        </li>
                        <li>
                          <p className="font-Inter para-ex-small font-semibold darkGray h-auto bg-transparent text-left uppercase w-full text-wra">
                            playing chess
                          </p>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <Quill
                value={value}
                onchange={handleQuillChange}
                Section={clickedIndex}
              />
              {/* <ReactQuill
                value={value}
                modules={module}
                // className="border-none outline-none font-Inter para-ex-small font-normal darkGray h-auto bg-transparent text-left"
                theme="snow"
                onChange={handleQuillChange}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeTemplate2;
