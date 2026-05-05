/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Button from "../components/shared/button";
import Input from "../components/shared/input";
import resumeSection from "../assets/images/dashboard/resume-section.webp";
import clSection from "../assets/images/dashboard/cl-section.webp";
import plus from "../assets/icons/dashboard/create.svg";
import upload from "../assets/icons/dashboard/importRes.svg";
import ai from "../assets/icons/dashboard/aiGenerative.svg";
import { Modal, Popover, Spin } from "antd";
import Textarea from "../components/shared/textarea";
import line from "../assets/icons/dashboard/line.svg";
import rectangle from "../assets/icons/dashboard/rectangle.svg";
import adjustEdit from "../assets/icons/dashboard/adjustEdit.svg";
import JobsLibrary from "./jobsLibrary";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { message, Upload } from "antd";
import { Select } from "antd";
import {
  setCoverLetter,
  setupCoverLetter,
  updateCoverLetter,
  updateCoverLetterUid,
} from "../redux/coverLetterSlice";
import AiWriteButton from "./UserDashboard/aiWriteButton";
import { v4 as uuidv4 } from "uuid";
import {
  resetResumeState,
  updateAllSections,
  updateSection,
  updateTemplateId,
  updateUid,
} from "../redux/resumeSlice2";

// import {updateUid}

import { fetchResumeData } from "../redux/actions/fetchResume";
import { handleGetUserInfo } from "../redux/actions/fetchUserInfo";
import { useSectionsContext } from "../App";
import { setUserInfo } from "../redux/userInfo";
import { saveCoverLetterData } from "../redux/actions/SaveCoverLEtter";
import { toast } from "react-toastify";

const Index = () => {
  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;
  const user = useSelector((state) => state?.user?.userInfo);
  const userData = JSON.parse(localStorage.getItem("user"));
  const queryParams = new URLSearchParams(location.search);
  const checkoutid = queryParams.get("checkoutid");
 console.log("userData", userData);
  const uid = useSelector((state) => state.resume.uid);
  // useEffect(() => {
  //   console.log(user);
  // }, []);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isGenerateAiModal, setIsGenerateAiModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(false);
  const [isCoverLetterModalOpen, setIsCoverLetterModalOpen] = useState(false);
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coverLetterLoader, setCoverLetterLoader] = useState(false);
  const [generateAiData, setGenerateAiData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    contact: "",
    country: "",
    city: "",
  });

  const navigate = useNavigate();
  const [uidState, setSidState] = useState("");
  const dispatch = useDispatch();
  const coverLetter = useSelector((state) => state.coverLetter);
  // console.log(coverLetter.designation);
  const resume = useSelector((state) => state.resume.sections);
  const [isLimitExceededModalOpen, setIsLimitExceededModalOpen] =
    useState(false);
  const [
    isCoverLetterLimitExceededModalOpen,
    setIsCoverLetterLimitExceededModalOpen,
  ] = useState(false);
  const [templateID, setTemplateID] = useState("11");
  const [cltemplateID, setCLTemplateID] = useState("1");
  useEffect(() => {
    if (user?.data?._id) {
      dispatch(setCoverLetter({ userId: user.data?._id }));
    }
  }, [user, dispatch]);
  const userInfo = useSelector((state) => state.userData);
  const [validationErrors, setValidationErrors] = useState({});
  const templateId = resume.templateId;
  const [errors, setErrors] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { sectionsState, setSectionsState } = useSectionsContext(); // Get context state
  const userId = useSelector((state) => state.user?.userInfo?.data?._id);
  const apiUrl = import.meta.env.VITE_APP_BACKEND_API;

  const handleGetUserInfo = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/${userId}`);
      // console.log("response.data", response.data);
      dispatch(setUserInfo(response.data));
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    handleGetUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo) {
      // Map userInfo fields to the resume 'profile' section
      dispatch(
        updateSection({
          type: "profile",
          data: {
            name: userInfo?.name,

            contactNumber: userInfo.contactNumber,
            email: userInfo.email,
            address: userInfo.address,
            jobTitle: userInfo.desiredJobTitle,
            links: userInfo.links || [],
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
      dispatch(
        updateSection({
          type: "skills",
          data: {
            items: userInfo.skills.map((skill) => ({
              name: skill.name,
              level: skill.level,
            })),
          },
        })
      );
    }
  }, [userInfo, dispatch]);
  let tempId = 11;
  const handleNavigate = () => {
    // setIsSaveModalOpen(false);
    setIsStartModalOpen(false);
    setIsGenerateModalOpen(false);
    // setIsMyResumeModalOpen(false);
    setIsCoverLetterModalOpen(false);
    navigate("/dashboard");
  };
  const handleNavigateCl = () => {
    navigate("/choose-coverletter");
  };

  const handleGenerateAiModal = () => {
    setIsGenerateAiModal(!isGenerateAiModal);
  };
  // Handle input change for the form fields
  // New function to validate a single field
  const validateField = (name, value) => {
    let error = "";

    if (name === "firstName" && !value.trim()) {
      error = "First name is required.";
    }

    if (name === "lastName" && !value.trim()) {
      error = "Last name is required.";
    }

    if (name === "jobTitle" && !value.trim()) {
      error = "Desired job title is required.";
    }

    if (name === "email" && !emailRegex.test(value.trim())) {
      error = "Please enter a valid email address.";
    }

    // Set the error for the specific field in the errors state
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    // Return true if there's no error, false otherwise
    return !error;
  };

  const handleGenerateAiChange = (e) => {
    const { name, value } = e.target;
    setGenerateAiData({
      ...generateAiData,
      [name]: value,
    });

    // Validate individual field
    // validateField(name, value);
  };

  const validateAllFields = () => {
    const newErrors = {};

    if (!generateAiData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!generateAiData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!generateAiData.jobTitle.trim()) {
      newErrors.jobTitle = "Desired job title is required.";
    }

    if (!emailRegex.test(generateAiData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors); // Set errors for all fields at once

    // If no errors, it means all fields are valid
    return Object?.keys(newErrors)?.length === 0;
  };

  const handleViewResume = () => {
    // Navigate to the view-resume page and pass the selected resume ID
    const uid = uuidv4(); // Generate a unique uid
    // localStorage.setItem("tId", id);
    dispatch(updateUid(uid)); // Dispatch the generated uid to Redux
    localStorage.setItem("uid", uid);

    dispatch(updateTemplateId(templateID));
    setSidState(uid);
    navigate(`/view-resume/${templateID}/${uid}`);
  };
  const handleViewCoverLetter = () => {
    // Navigate to the view-resume page and pass the selected resume ID
    const uid = uuidv4(); // Generate a unique uid
    // localStorage.setItem("tId", id);
    dispatch(updateCoverLetterUid(uid)); // Dispatch the generated uid to Redux
    dispatch(updateTemplateId(cltemplateID));
    localStorage.setItem("cuid", uid);

    setSidState(uid);
    navigate(`/view-coverletter/${cltemplateID}/${uid}`);
  };
  const handleViewCoverLetterAI = () => {
    // Navigate to the view-resume page and pass the selected resume ID
    const uid = uuidv4(); // Generate a unique uid
    // localStorage.setItem("tId", id);
    dispatch(updateCoverLetterUid(uid)); // Dispatch the generated uid to Redux
    dispatch(updateTemplateId(cltemplateID));
    localStorage.setItem("cuid", uid);

    setSidState(uid);
    navigate(`/view-coverletter/${cltemplateID}/${uid}`, {
      state: { from: "AI" },
    });
  };

  const handleSubmitGenerateAi = (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    const isValid = validateAllFields();

    if (isValid) {
      // Proceed with form submission or action
      handleNavigateGenerate();
    }
  };

  // Helper function to build all sections
  const buildAllSections = (resumeData) => {
    return [
      buildProfileSection(resumeData.profile),
      buildAboutSection(resumeData.summary),
      buildEducationSection(resumeData.education),
      buildWorkExperienceSection(resumeData.workExperience),
      buildSkillsSection(resumeData.skills),
      // buildLanguagesSection(resumeData.languages),
      // buildHobbiesSection(resumeData.hobbies),
      buildCertificationsSection(resumeData.certifications),
      // buildCustomSections(resumeData.customSections),
    ];
  };

  // Individual section builders for clarity and modularity

  const buildProfileSection = (profile = {}) => ({
    type: "profile",
    header: "Profile",
    profileImage: profile?.profileImage || "",
    name: profile?.name || "",
    contactNumber: profile?.contactNumber || "",
    email: profile?.email || "",
    address: profile?.address || "",
    jobTitle: profile?.jobTitle || "",
    links: profile?.links || [""],
    column: profile?.column,
    visibility: {
      contactNumber: profile?.visibility?.contactNumber ?? true,
      email: profile?.visibility?.email ?? true,
      address: profile?.visibility?.address ?? true,

      links: profile?.visibility?.links ?? true,
    },
  });

  const buildAboutSection = (summary = {}) => ({
    type: "about",
    header: "About",
    items: [
      {
        description: summary?.items?.[0]?.description || "",
      },
    ],
    column: summary.column,
  });

  const buildEducationSection = (education = {}) => ({
    type: "education",
    column: education?.column,
    header: "Education",
    items:
      education.items?.map((edu) => ({
        degree: edu?.degree || "",
        institution: edu?.institution || "",
        reference: edu?.reference || "",
        startDate: edu?.startDate || "",
        endDate: edu?.endDate || "",
      })) || [],
  });

  const buildWorkExperienceSection = (workExperience = {}) => ({
    type: "workExperience",
    column: workExperience?.column,
    header: "Work Experience",
    items:
      workExperience?.items?.map((job) => ({
        jobTitle: job?.jobTitle || "",
        company: job?.company || "",
        startDate: job?.startDate || "",
        endDate: job?.endDate || "",
        description: job?.description || "",
      })) || [],
  });

  const buildSkillsSection = (skills = {}) => ({
    type: "skills",
    header: "Skills",
    column: skills?.column,
    items:
      skills.items?.map((skill) => ({
        name: skill.name || "",
        level: skill.level || "Advanced",
      })) || [],
  });

  const buildLanguagesSection = (languages = {}) => ({
    type: "languages",
    header: "Languages",
    column: languages?.column,
    items:
      languages.items?.map((lang) => ({
        name: lang?.name || "",
        proficiency: lang?.proficiency || "",
      })) || [],
  });

  const buildHobbiesSection = (hobbies = {}) => ({
    type: "hobbies",
    header: "Hobbies",
    column: hobbies.column,
    items:
      hobbies.items?.map((hobby) => ({
        name: hobby.name || "",
      })) || [],
  });

  const buildCertificationsSection = (certifications = {}) => ({
    type: "certificates",
    header: "Certifications",
    column: certifications?.column,
    items:
      certifications?.items?.map((cert) => ({
        title: cert?.title || "",
        date: cert?.date || "",
        description: cert?.description || "",
      })) || [],
  });

  const buildCustomSections = (customSections = {}) => ({
    type: "customSections",
    header: "Custom Section",
    column: customSections?.column,
    items:
      customSections?.items?.map((customSection) => ({
        projectName: customSection?.projectName || "",
        startDate: customSection?.startDate || "",
        endDate: customSection?.endDate || "",
        description: customSection?.description || "",
      })) || [],
  });

  const handleNavigateGenerate = async () => {
    const formData = {
      firstName: generateAiData.firstName,
      lastName: generateAiData.lastName,
      jobTitle: generateAiData.jobTitle, // make sure the key matches with backend requirements
      email: generateAiData.email,
      contact: generateAiData.contact,
      country: generateAiData.country,
      city: generateAiData.city,
    };
    setIsGenerateAiModal(false);
    setLoading(true);
    try {
      const response = await axios.post(`${ApiUrl}/resume/generateAiResume`, {
        formData,
      });
      // console.log(response.data);
      // console.log("Resume uploaded successfully", response.data);

      const resumeData = response.data.cv;
      setLoading(false);

      // Consolidate all sections into an array matching the slice structure
      // const allSections = [
      //   {
      //     type: "profile",
      //     header: "Profile",
      //     profileImage: resumeData.profile?.profileImage || "",
      //     name: resumeData.profile?.name || "",
      //     contactNumber: resumeData.profile?.contactNumber || "",
      //     email: resumeData.profile?.email || "",
      //     address: resumeData.profile?.address || "",
      //     jobTitle: resumeData.profile?.jobTitle || "",
      //     links: resumeData.profile?.links || [""],
      //   },
      //   {
      //     type: "about",
      //     header: "About",
      //     items: [
      //       {
      //         description: resumeData.summary?.items?.[0]?.description || "",
      //       },
      //     ],
      //   },
      //   {
      //     type: "education",
      //     header: "Education",
      //     items:
      //       resumeData.education?.items?.map((edu) => ({
      //         degree: edu.degree || "",
      //         institution: edu.institution || "",
      //         reference: edu.reference || "",
      //         startDate: edu.startDate,
      //         endDate: edu.endDate,
      //       })) || [],
      //   },
      //   {
      //     type: "workExperience", // Ensure this is consistent
      //     header: "Work Experience",
      //     items:
      //       resumeData.workExperience?.items?.map((job) => ({
      //         jobTitle: job.jobTitle || "",
      //         company: job.company || "",
      //         startDate: job.startDate || "",
      //         endDate: job.endDate || "",
      //         description: job.description || "",
      //       })) || [], // Fix to ensure correct mapping of items
      //   },
      //   {
      //     type: "skills",
      //     header: "Skills",
      //     items:
      //       resumeData.skills?.items?.map((skill) => ({
      //         name: skill.name || "",
      //         level: skill.level || "Advanced",
      //       })) || [],
      //   },
      //   {
      //     type: "languages",
      //     header: "Languages",
      //     items:
      //       resumeData.languages?.items?.map((lang) => ({
      //         name: lang.name || "",
      //         proficiency: lang.proficiency || "",
      //       })) || [],
      //   },
      //   {
      //     type: "hobbies",
      //     header: "Hobbies",
      //     items:
      //       resumeData.hobbies?.items?.map((hobby) => ({
      //         name: hobby.name || "",
      //       })) || [],
      //   },
      //   {
      //     type: "certificates",
      //     header: "Certifications",
      //     items:
      //       resumeData.certifications?.items?.map((cert) => ({
      //         title: cert.title || "",
      //         date: cert.date || "",
      //         description: cert.description || "",
      //       })) || [],
      //   },
      //   {
      //     type: "customSections",
      //     header: "Custom Section",
      //     items:
      //       resumeData.customSections?.items?.map((customSection) => ({
      //         projectName: customSection.projectName || "",
      //         endDate: customSection.endDate || "",
      //         startDate: customSection.startDate || "",
      //         description: customSection.description || "",
      //       })) || [],
      //   },
      // ];

      // Call function to build all sections
      const allSections = buildAllSections(resumeData);

      // console.log("Prepared sections:", allSections); // Log the prepared sections before dispatch

      // Dispatch a single action to update all sections
      dispatch(updateAllSections({ sections: allSections }));
      // Update context state directly
      setSectionsState((prevState) => ({
        ...prevState,
        sections: allSections, // Update sections only
      }));
      handleViewResume();
    } catch (err) {
      setLoading(false);

      console.log(err);
    }
  };

  const handleResumeModal = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    // if (userData?.data?.subscriptionStatus === "inactive") {
    //   message.warning("Please Purchase A Subscription Plan to Create A Resume");
    //   return;
    // }
    setIsResumeModalOpen(!isResumeModalOpen);
  };

  const contentAi = (
    <div>
      <AiWriteButton />
    </div>
  );

  const handleCoverLetterModal = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.data?.subscriptionStatus === "active") {
      message.warning("Please Purchase A Subscription Plan to Create A Cover Letter");
      return;
    }
    setIsCoverLetterModalOpen(!isCoverLetterModalOpen);
  };

  const handleStartModal = () => {
    setIsStartModalOpen(!isStartModalOpen);
  };

  const handleGenerateModal = (e) => {
    // console.log("Generate button clicked");
    // e.preventDefault();
    setIsGenerateModalOpen(!isGenerateModalOpen);
  };

  // Add Cover Letter

  // console.log("coverLetter index js", coverLetter);

  const handleChange = (e, type) => {
    const { textContent } = e.target;
    const { name, value } = e.target;
    if (type === "links") {
      const linksArray = textContent
        .split(/[\s,]+/)
        .filter((link) => link.trim() !== "");
      dispatch(
        setCoverLetter({
          [type]: linksArray,
        })
      );
    } else if (type) {
      dispatch(
        setCoverLetter({
          [type]: textContent,
        })
      );
    } else {
      dispatch(
        setCoverLetter({
          [name]: value,
        })
      );
    }
    // Remove validation error once the field is filled
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
    }
    // dispatch(updateCoverLetter({ [name]: value }));
  };

  // Validate required fields
  const validateForm = () => {
    const errors = {};

    if (!coverLetter.designation) {
      errors.designation = "Job Title is required.";
    }

    if (!coverLetter.name) {
      errors.name = "Name is required.";
    }

    if (!coverLetter.location) {
      errors.location = "Address is required.";
    }

    // if (!coverLetter.phone) {
    //   errors.phone = "Phone number is required.";
    // }
    if (!emailRegex.test(coverLetter.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    // if (!coverLetter.email) {
    //   errors.email = "Email is required.";
    // }

    setValidationErrors(errors);

    // If there are no errors, return true
    return Object.keys(errors).length === 0;
  };
  // console.log("validationErrors", validationErrors);

  const handleCoverLetterOpenAi = async () => {
    // console.log(coverLetter);
    setIsStartModalOpen(false);
    setCoverLetterLoader(true);
    try {
      const response = await axios.post(
        `${ApiUrl}/cover/generateCoverLetter`,
        coverLetter,
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${yourToken}`,
          },
        }
      );
      // console.log("Cover letter created:", response.data.coverletter);
      if (response.data) {
        // console.log("coverLetterData coverleter", response.data);

        const aiResponse = await response.data.coverLetter.coverLetter;
        const { designation, name, email, location, phone } = response.data;
        // console.log("aiResponse", aiResponse);
        // console.log("designation", designation);
        // console.log("aiResponse cover_letter", aiResponse.cover_letter);

        dispatch(
          setupCoverLetter({
            body: [
              {
                description: aiResponse || "",
              },
            ],
            designation: designation,
            name: name,
            email: email,
            location: location,
            phone: phone,
          })
        );
        setCoverLetterLoader(false);

        handleViewCoverLetterAI();

        // Call saveCoverLetterData after setting up the Redux state
        await saveCoverLetterData("body", [{ description: aiResponse || "" }]); // Save the body
        await saveCoverLetterData("designation", designation); // Save designation
        await saveCoverLetterData("name", name); // Save name
        await saveCoverLetterData("email", email); // Save email
        await saveCoverLetterData("location", location); // Save location
        await saveCoverLetterData("phone", phone);
        // handleGenerateModal();
      }
    } catch (error) {
      setCoverLetterLoader(false);

      console.error("Error creating cover letter:", error);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    // e.preventDefault();
    if (validateForm()) {
      handleCoverLetterOpenAi();
    }
  };

  // const renderTextAsParagraphs = (text) => {
  //   return text.split("\n\n").map((str, index) => <p key={index}>{str}</p>);
  // };

  const handleAddCoverLetter = async () => {
    // console.log(coverLetter);

    try {
      const response = await axios.post(`${ApiUrl}/cover`, coverLetter, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${yourToken}`,
        },
      });
      // console.log("Cover letter created:", response.data);
      if (response.data) {
        // handleGenerateModal();
      }
    } catch (error) {
      console.error("Error creating cover letter:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  //handle pdf upload functionality

  const handleUpload = async (file) => {
    if (uploaded) {
      message.info("File has already been uploaded.");
      return false;
    }

    // Check for supported file types
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(file.type)) {
      message.error(
        "Unsupported file type. Please upload a PDF, DOC, or DOCX file."
      );
      return false;
    }

    setLoading(true); // Show loading spinner during the upload process

    const formData = new FormData();
    formData.append("cv", file);

    try {
      // Make the API call to upload the file
      const response = await axios.post(
        `${ApiUrl}/resume/pdfResume`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Resume uploaded successfully", response.data);

      const resumeData = response.data;

      // Consolidate all sections into an array matching the slice structure
      let allSections = [
        {
          pdf: true,
          type: "profile",
          header: "Profile",
          profileImage: resumeData?.profile?.profileImage || "",
          name: resumeData?.profile?.name || "",
          contactNumber: resumeData?.profile?.contactNumber || "",
          email: resumeData?.profile?.email || "",
          address: resumeData?.profile?.address || "",
          jobTitle: resumeData?.profile?.jobTitle || "",
          links: resumeData?.profile?.links || [""],
          column: resumeData?.profile?.column,
          visibility: {
            contactNumber:
              resumeData?.profile?.visibility?.contactNumber ?? true,
            email: resumeData?.profile?.visibility?.email ?? true,
            address: resumeData?.profile?.visibility?.address ?? true,

            links: resumeData?.profile?.visibility?.links ?? true,
          },
        },
        {
          type: "about",
          header: "About",
          column: resumeData?.summary?.column,

          items: [
            {
              description: resumeData?.summary?.items?.[0]?.description || "",
            },
          ],
        },
        {
          type: "education",
          header: "Education",
          column: resumeData?.education?.column,

          items:
            resumeData?.education?.items?.map((edu) => ({
              degree: edu?.degree || "",
              institution: edu?.institution || "",
              reference: edu?.reference || "",
              startDate: edu?.startDate,
              endDate: edu?.endDate,
            })) || [],
        },
        {
          type: "workExperience", // Ensure this is consistent
          header: "Work Experience",
          column: resumeData?.workExperience?.column,
          items:
            resumeData.workExperience?.items?.map((job) => ({
              jobTitle: job?.jobTitle || "",
              company: job?.company || "",
              startDate: job?.startDate || "",
              endDate: job?.endDate || "",
              description: job?.description || "",
            })) || [], // Fix to ensure correct mapping of items
        },
        {
          type: "skills",
          header: "Skills",
          column: resumeData?.skills?.column,

          items:
            resumeData?.skills?.items?.map((skill) => ({
              name: skill?.name || "",
              level: skill?.level || "Advanced",
            })) || [],
        },
        // {
        //   type: "languages",
        //   header: "Languages",
        //   column: resumeData.languages.column,

        //   items:
        //     resumeData.languages?.items?.map((lang) => ({
        //       name: lang.name || "",
        //       proficiency: lang.proficiency || "",
        //     })) || [],
        // },
        // {
        //   type: "hobbies",
        //   header: "Hobbies",
        //   column: resumeData.hobbies.column,

        //   items:
        //     resumeData.hobbies?.items?.map((hobby) => ({
        //       name: hobby.name || "",
        //     })) || [],
        // },
        resumeData?.certifications?.items?.length > 0 &&
          resumeData?.certifications?.column && {
            type: "certificates",
            header: "Certifications",
            column: resumeData?.certifications?.column,

            items:
              (resumeData?.certifications?.items?.length > 0 &&
                resumeData?.certifications?.items?.map((cert) => ({
                  title: cert?.title || "",
                  date: cert?.date || "",
                  description: cert?.description || "",
                }))) ||
              [],
          },

        resumeData?.customSections?.header === "Projects" &&
          resumeData?.customSections?.column &&
          resumeData?.customSections?.items?.length > 0 && {
            type: "projects",
            header: "Projects",
            column: resumeData?.customSections?.column,

            items:
              resumeData?.customSections?.items?.map((customSection) => ({
                projectName: customSection?.projectName || "",
                // endDate: customSection.endDate || "",
                // startDate: customSection.startDate || "",
                description: customSection?.description || "",
              })) || [],
          },
      ];

      allSections = allSections.filter(Boolean);
      console.log("Prepared sections:", allSections); // Log the prepared sections before dispatch
      //
      // Dispatch a single action to update all sections
      dispatch(updateAllSections({ pdf: true, sections: allSections }));

      // Update context state directly
      setSectionsState((prevState) => ({
        ...prevState,
        sections: allSections, // Update sections only
      }));
      message.success("Resume uploaded and data dispatched successfully!");

      setUploaded(true); // Prevent re-uploading
      setLoading(false); // Hide loading spinner

      handleViewResume();
    } catch (error) {
      console.error("Error uploading the file", error);
      message.error("Failed to upload the file, please try again.");
      setLoading(false);
    }

    return false;
  };

  // console.log(resume);
  // const handleSubmit = async () => {

  // };

  // {===========================================LIMIT EXCEED LOGIC===================================================================}

  const [resumes, setResumes] = useState([]);
  const [savedCoverLetters, setSavedCoverLetters] = useState([]);
  // Fetch resumes to check the limit
  // Fetch resumes to check the limit
  const handleGetResumes = async () => {
    try {
      const response = await axios.get(`${ApiUrl}/resume/draft/${userId}`);
      const resumeData = response.data;

      if (resumeData && resumeData.length > 0) {
        setResumes(resumeData);
      }
    } catch (error) {
      console.error("Error fetching resume data:", error);
      // message.error("Failed to fetch resumes. Please try again.");
    }
  };

  const handleGetCoverLetters = async () => {
    try {
      // setLoading(true);

      const response = await axios.get(`${ApiUrl}/cover/${userId}`);
      const coverLetterData = response.data;

      // console.log("coverLetterDatacoverLetterData", coverLetterData);
      // Assuming you want to set the first resume's templateId
      if (coverLetterData && coverLetterData.length > 0) {
        setSavedCoverLetters(coverLetterData); // Store the fetched cover letters
        // setLoading(false); // Hide deletion loader
      }

      // console.log("Fetched coverLetterData:", coverLetterData);
    } catch (error) {
      // setLoading(false); // Hide deletion loader

      console.error("Error fetching cover letter data:", error);
    }
  };

  // Resume limit removed: allow unlimited resumes
  const handleCheckLimit = (action) => {
    action();
  };
  // Limit check and action handler
  const handleCheckCOverLetterLimit = async (action) => {
    await handleGetCoverLetters();
    if (savedCoverLetters.length >= 5) {
      setIsCoverLetterLimitExceededModalOpen(true); // Open the modal if limit is exceeded
    } else {
      action(); // Proceed with the desired action if limit is not exceeded
    }
  };

  // Modal actions
  const handleNavigateToSavedDocuments = () => {
    setIsLimitExceededModalOpen(false);
    navigate("/documents");
    localStorage.setItem("activeDocSection", "resume");
  };
  const handleNavigateToCoverLetterSavedDocuments = () => {
    setIsCoverLetterLimitExceededModalOpen(false);
    navigate("/documents");
    localStorage.setItem("activeDocSection", "coverletter");
  };

  const handleCloseLimitModal = () => {
    setIsLimitExceededModalOpen(false);
  };
  const handleCloseCoverLetterLimitModal = () => {
    setIsCoverLetterLimitExceededModalOpen(false);
  };
//  const fetchCheckoutSession = async (checkoutid) => {
//     try {
//       const response = await axios.get(
//         `${ApiUrl}/StripePayment/checkout-session/${checkoutid}`
//       );
//       if (response.status) {
//         toast.success(response.data.message);
//         const userData = localStorage.getItem("user")
//           ? JSON.parse(localStorage.getItem("user"))
//           : null;

//         const result = await axios.get(
//           `${ApiUrl}/userInfo/get-user/${userData.data._id}`
//         );
//         console.log(result)
//         if (result.status) {
//           const updatedUserData = {
//             ...userData,
//             data: result.data,
//           };
//           console.log(updatedUserData)
//           localStorage.setItem("user", JSON.stringify(updatedUserData));

//         }
//       }
     
      
//     } catch (error) {
//       console.error("Error fetching checkout session:", error);
//       setLoading(false);
//     }
//   };

const fetchCheckoutSession = async (checkoutid) => {
  try {
    const response = await axios.get(
      `${ApiUrl}/StripePayment/checkout-session/${checkoutid}`
    );
    if (response.status) {
      toast.success(response.data.message);

      // After Stripe payment is completed, fetch the updated user data
      const userData = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;

      const result = await axios.get(
        `${ApiUrl}/user/${userData.data._id}`
      );
      console.log(result); // To check the updated data
      if (result.status) {
        // Update the user data in the localStorage and Redux store
        const updatedUserData = {
          ...userData,
          data: result.data,
        };
        console.log(updatedUserData);
        localStorage.setItem("user", JSON.stringify(updatedUserData));

        // Make sure user data is updated in state if required
        dispatch(setUserInfo(result.data)); // Update Redux store with the new data
      }
    }
  } catch (error) {
    console.error("Error fetching checkout session:", error);
    setLoading(false);
  }
};


  useEffect(() => {
    if (checkoutid) {
      fetchCheckoutSession(checkoutid);
    }
  }, [checkoutid]);

  useEffect(() => {
    handleGetResumes();
    handleGetCoverLetters();
  }, []);
  

  return (
    <>
      <div className="dashboard h-[100vh]  pt-1 2xl:pt-20 ">
        <div className="flex flex-col justify-center items-center pb-[50px] 2xl:pb-[101px]">
          <div className="mb-[30px] 2xl:mb-[100px] ">
            <h2 className="text-center darkGray font-light font-OpenSan">
              Welcome,
              <span className="font-bold">
                {" "}
                {user?.data?.name || userInfo?.name || "James Adam"}
              </span>
            </h2>
          </div>
          <div className="flex flex-col gap-5 justify-center items-center m-auto">
            <div className=" box flex flex-col items-center gap-10 lg10:flex-row lg10:justify-between lg10:gap-0 ">
              <div className="max-w-[100%] flex flex-col gap-4 justify-center items-center lg10:gap-0 lg10:items-start  lg10:max-w-[70%] ">
                <h3 className="font-OpenSan font-semibold mb-[20px] text-center lg10:text-left">
                  Customize Your <span className="primary">Resume</span> For
                  Every Job
                </h3>
                <p className="para-small grayShade5 font-OpenSan mb-2">
                  Unlock the power of our powerful AI to instantly refine your
                  resume for any role. Create an interview-ready resume tailored
                  to any job description in seconds.
                </p>
                <p className="para-small grayShade5 font-OpenSan">
                  Our AI system optimizes keywords, highlights key achievements,
                  and ensures the perfect <br />
                  match—helping you stand out and make a lasting impression.
                  <span className="primary"> Get noticed. Get hired</span>.
                </p>

                <Button
                  text="Generate"
                  className="btn-primary mb-[40px] lg10:mt-12"
                  minHeight={50}
                  minWidth={118}
                  onClick={handleResumeModal}
                />
              </div>
              <div>
                <img src={resumeSection} alt="image" />
              </div>
            </div>
            <div className=" box flex flex-col items-center gap-10 lg10:flex-row lg10:justify-between lg10:gap-4 ">
              <div className="max-w-[100%] flex flex-col gap-4 justify-center items-center lg10:gap-0 lg10:items-start  lg10:max-w-[70%] ">
                <h3 className="font-OpenSan font-semibold mb-[20px] text-center lg10:text-left">
                  Generate <span className="primary">Cover Letter</span>{" "}
                  According to Job
                </h3>
                <p className="para-small grayShade5 font-OpenSan mb-2">
                  Craft the perfect cover letter in seconds with our powerful
                  AI. Our cover letter creator analyzes the job description and
                  your experience to generate a compelling, customized letter
                  that highlights your strengths and maximizes your
                  impact—helping you stand out and get noticed faster.
                  {/* <span className="primary">magna aliqua</span>. Ut enim{" "} */}
                </p>
                <p className="para-small grayShade5 font-OpenSan"></p>
                <Button
                  text="Create"
                  className="btn-primary mb-[40px] lg10:mt-12"
                  minHeight={50}
                  minWidth={118}
                  onClick={handleCoverLetterModal}
                />
              </div>
              <div>
                <img src={clSection} alt="image" />
              </div>
            </div>
          </div>
        </div>
        <JobsLibrary />
      </div>

      {/* Resume Modal */}
      <Modal
        open={isResumeModalOpen}
        onCancel={handleResumeModal}
        footer={null}
        centered
        width="fit-content"
        maskClosable={false}
      >
        <div className="py-[51px] px-0 sm:px-[63px] modal-wrap">
          <h2 className="text-center font-bold darkGray font-OpenSan mb-2">
            Resume
            <span className="font-light"> Builder</span>
          </h2>
          <p className="text-center para-small darkGray font-OpenSan font-semibold opacity-40 mb-9">
            Choose how you want to build your resume
          </p>

          {loading ? (
            <div className="flex justify-center items-center flex-col gap-3">
              {/* <Spin size="large" /> */}

              <p className="text-center para-small text-black font-OpenSan font-semibold mb-9">
                AI is Analyzing ...
              </p>

              <div className="loader"></div>
            </div>
          ) : (
            <div className="flex  md:flex-row flex-col gap-2 sm:gap-5 justify-center items-center">
              <div
                onClick={() => handleCheckLimit(handleViewResume)}
                className="cursor-pointer"
              >
                <div className="modal-box w-[150px] sm:w-[228px]">
                  <img src={plus} alt="icon" />
                  <p className="text-center text-wrap sm:text-nowrap para-small darkGray font-OpenSan font-semibold">
                    Start from Scratch
                  </p>
                </div>
              </div>
              <Upload
                customRequest={({ file }) =>
                  handleCheckLimit(() => handleUpload(file))
                }
                showUploadList={false}
                beforeUpload={(file) => {
                  const validTypes = [
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  ];
                  if (!validTypes.includes(file.type)) {
                    message.error(
                      "Unsupported file type. Please upload a PDF, DOC, or DOCX file."
                    );
                    return false;
                  }
                  return true;
                }}
              >
                <div className="modal-box w-[150px] sm:w-[228px] cursor-pointer">
                  <label htmlFor="upload-resume" className="cursor-pointer">
                    <img src={upload} alt="icon" className="cursor-pointer" />
                  </label>
                  <p className="text-center para-small darkGray font-OpenSan font-semibold">
                    Upload Source Resume or CV
                  </p>
                </div>
              </Upload>
              <div
                className="modal-box w-[150px] sm:w-[228px] h-[193px] cursor-pointer"
                onClick={() => handleCheckLimit(handleGenerateAiModal)}
                // customRequest={({ file }) =>
                //   handleCheckLimit(() => handleUpload(file))
                // }
              >
                <img src={ai} alt="icon" />
                <p className="text-center text-wrap sm:text-nowrap para-small darkGray font-OpenSan font-semibold">
                  Generate
                </p>
              </div>
            </div>
          )}
        </div>
      </Modal>
      {/* Generate with Ai */}
      <Modal
        open={isGenerateAiModal}
        onCancel={handleGenerateAiModal}
        footer={null}
        centered
        maskClosable={false}
      >
        <div className="py-[20px] px-0 sm:px-[30px] modal-wrap">
          <h2 className="text-center font-semibold darkBlack  font-OpenSan mb-2 para-large">
            Create with AI
          </h2>
          <form
            action=""
            className="flex flex-col gap-5"
            // onSubmit={handleSubmitGenerateAi}
          >
            <div className="input-cl">
              <Input
                type="text"
                label="First Name *"
                placeholder="Type here"
                name="firstName"
                value={generateAiData.firstName}
                onChange={handleGenerateAiChange}
              />
              {errors.firstName && (
                <p style={{ color: "red" }}>{errors.firstName}</p>
              )}
            </div>
            <div className="input-cl">
              <Input
                type="text"
                label="Last Name *"
                placeholder="Type here"
                name="lastName"
                value={generateAiData.lastName}
                onChange={handleGenerateAiChange}
              />
              {errors.lastName && (
                <p style={{ color: "red" }}>{errors.lastName}</p>
              )}
            </div>
            <div className="input-cl">
              <Input
                type="text"
                label="Desired Job Title. *"
                placeholder="Type here"
                name="jobTitle"
                value={generateAiData.jobTitle}
                onChange={handleGenerateAiChange}
              />
              {errors.jobTitle && (
                <p style={{ color: "red" }}>{errors.jobTitle}</p>
              )}
            </div>
            <div className="input-cl">
              <Input
                type="email"
                label="Email *"
                placeholder="Type here"
                name="email"
                value={generateAiData.email}
                onChange={handleGenerateAiChange}
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>
            <div className="input-cl">
              <Input
                type="number"
                label="Contact (optional)"
                placeholder="Type here"
                name="contact"
                value={generateAiData.contact}
                onChange={handleGenerateAiChange}
              />
            </div>
            <div className="input-cl">
              <Input
                type="text"
                label="City (optional)"
                placeholder="Type here"
                name="city"
                value={generateAiData.city}
                onChange={handleGenerateAiChange}
              />
            </div>
            <div className="input-cl">
              <Input
                type="text"
                label="Country (optional)"
                placeholder="Type here"
                name="country"
                value={generateAiData.country}
                onChange={handleGenerateAiChange}
              />
            </div>

            <div className="flex flex-col  gap-5 justify-center items-center w-[80%] m-auto">
              <Button
                text="Generate"
                className="darkGray py-4 btn-primary font-normal w-52 "
                onClick={handleSubmitGenerateAi}
                // disabled={Object.values(errors).some((error) => error)}
              />
            </div>
          </form>
        </div>
      </Modal>

      {/* CoverLetter Modal */}
      <Modal
        open={isCoverLetterModalOpen}
        onCancel={handleCoverLetterModal}
        footer={null}
        centered
        // width="484px"
      >
        <div className="py-[51px] px-0 sm:px-[50px] modal-wrap">
          <h2 className="text-center font-bold darkGray  font-OpenSan mb-2">
            Cover Letter
            <span className="font-light"> Builder</span>
          </h2>
          <p className="text-center para-small darkGray font-OpenSan font-semibold opacity-40 mb-9">
            How you want to build your Cover Letter
          </p>
          {coverLetterLoader ? (
            <div className="flex justify-center items-center">
              {/* <Spin size="large" /> */}
              <div className="loader"></div>
            </div>
          ) : (
            <div className="flex flex-col  gap-5 justify-center items-center w-[80%] m-auto">
              <Button
                text="Generate"
                className="darkGray w-full py-4  hover:bg-[#2A9DF4] hover:text-white"
                onClick={() => handleCheckCOverLetterLimit(handleStartModal)}
              />
              <Button
                text="Use Template"
                className="darkGray w-full py-4 hover:bg-[#2A9DF4] hover:text-white"
                onClick={() =>
                  handleCheckCOverLetterLimit(handleViewCoverLetter)
                }
              />
            </div>
          )}
        </div>
      </Modal>

      {/* Start from Scratch Modal */}
      {/* API INTEGRATION FOR COVER LETTER */}
      <Modal
        open={isStartModalOpen}
        onCancel={handleStartModal}
        footer={null}
        centered
      >
        <div className="py-[20px] px-0 sm:px-[30px] modal-wrap">
          <h2 className="text-center font-semibold darkBlack  font-OpenSan mb-2 para-large">
            Add your cover Letter <br /> Info
          </h2>
          <form
            action=""
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="input-cl">
              <Input
                type="text"
                label="Job Title *"
                placeholder="Type here"
                name="designation"
                required
                value={coverLetter?.designation}
                onChange={handleChange}
              />
              {validationErrors.designation && (
                <p className="text-red-500 text-sm">
                  {validationErrors.designation}
                </p>
              )}
            </div>

            <div>
              <p className="darkBlack font-OpenSan para-small font-normal">
                Personal Information
              </p>
              <div className="input-wrap">
                <div>
                  <Input
                    type="text"
                    label="Name *"
                    placeholder="James Adam"
                    name="name"
                    value={coverLetter?.name}
                    onChange={handleChange}
                  />
                  {validationErrors.name && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    type="text"
                    label="Address *"
                    placeholder="United States"
                    name="location"
                    value={coverLetter?.location}
                    onChange={handleChange}
                  />
                  {validationErrors.location && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.location}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    type="number"
                    label="Phone No "
                    placeholder="+123456789"
                    name="phone"
                    value={coverLetter?.phone}
                    onChange={handleChange}
                  />
                  {/* {validationErrors.phone && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.phone}
                    </p>
                  )} */}
                </div>
                <div>
                  <Input
                    type="email"
                    label="Email *"
                    placeholder="@gmail.com"
                    name="email"
                    value={coverLetter?.email}
                    onChange={handleChange}
                  />
                  {validationErrors.email && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.email}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="input-cl">
              <Textarea
                label="Additional Information"
                rows={6}
                placeholder="Type any additional information here (optional) "
                name="additionalInfo"
                value={coverLetter?.additionalInfo}
                onChange={handleChange}
              />
            </div>
            <div className="selector input-cl hidden">
              <label htmlFor="">Template Style</label>
              <Select
                defaultValue="Formal"
                name="template"
                value={coverLetter.template || "Formal"}
                popupClassName="select-dropdown-coverletter"
                className="input-cl mt-2"
                style={{
                  width: "100%",
                  height: "57px",
                }}
                onChange={(selectedOption) => {
                  dispatch(setCoverLetter({ template: selectedOption }));
                }}
                options={[
                  {
                    value: "Formal",
                    label: "Formal",
                  },
                  {
                    value: "creative",
                    label: "Creative",
                  },
                  {
                    value: "tech specific",
                    label: "Tech Specific",
                  },
                ]}
              />
            </div>
            <div className="flex flex-col  gap-5 justify-center items-center w-[80%] m-auto">
              <Button
                text="Generate"
                className="darkGray py-4 btn-primary font-normal w-52"
                type="submit"
                // onClick={() => {
                //   // handleGenerateModal();
                //   // handleCoverLetterOpenAi();
                //   handleSubmit();
                // }}
              />
            </div>
          </form>
        </div>
      </Modal>

      {/* Generate Modal Containing itegrated coverleter  */}
      <Modal
        open={isGenerateModalOpen}
        onCancel={handleGenerateModal}
        footer={null}
        centered
        // width="484px"
      >
        <div className="py-[34px]  modal-wrap">
          <div className="generateModal">
            <div className="ml-9 mt-4 relative">
              <img src={line} alt="line image" />
              <img
                src={rectangle}
                alt="line image"
                className="absolute top-12"
              />
              <Popover content={contentAi} trigger={"click"} placement="top">
                <div className="absolute top-6 left-[20px]">
                  <h3
                    className="font-OpenSans text-[27px] font-normal mediumBlack"
                    contentEditable
                    onBlur={(e) => handleChange(e, "name")}
                  >
                    {coverLetter.name || "Nancel Camebert"}
                  </h3>
                  <p
                    className="font-bold font-OpenSan para-ex-small mediumGray"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleChange(e, "title")}
                  >
                    {coverLetter.title || "Web UX/UI Designer"}
                  </p>
                  <p
                    className="font-bold font-OpenSan para-ex-small mediumGray"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleChange(e, "email")}
                  >
                    {coverLetter.email || "Your Email"}
                  </p>
                  <p
                    className="font-bold font-OpenSan para-ex-small mediumGray"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleChange(e, "phone")}
                  >
                    {coverLetter.phone || "Phone Number"}
                  </p>
                  <p
                    className="font-bold font-OpenSan para-ex-small mediumGray w-[383px] "
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleChange(e, "address")}
                  >
                    {coverLetter.address || "your Address"}
                  </p>
                  <p
                    className="font-bold font-OpenSan para-ex-small mediumGray w-[383px] "
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleChange(e, "links")}
                  >
                    {coverLetter.links && coverLetter.links.length > 0
                      ? coverLetter.links.join(", ")
                      : "your links"}
                  </p>
                </div>
              </Popover>
            </div>
            <p
              className="ml-9 mt-[100px] mb-3 font-normal font-OpenSan mediumBlack text-[10px] "
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleChange(e, "to")}
            >
              {coverLetter.to || "Dear, Mr. Daniel"}
            </p>
            <div className="generateBox relative">
              <div>
                {!isEditing && (
                  <img
                    src={adjustEdit}
                    alt="icon"
                    className="absolute top-[-40px] right-0 cursor-pointer"
                    onClick={handleEditClick}
                  />
                )}
              </div>

              {isEditing ? (
                <>
                  <Popover content={contentAi} trigger={"click"}>
                    <p
                      className="font-normal font-OpenSan mediumGray para-ex-small "
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => handleChange(e, "description")}
                    >
                      {coverLetter.description
                        ? coverLetter.description
                            .split("\n\n")
                            .map((str, index) => <p key={index}>{str}</p>)
                        : "Your cover letter will appear here"}
                      {/* {coverLetter.description
                        ? renderTextAsParagraphs(coverLetter.description)
                        : "Your cover letter will appear here"} */}
                    </p>
                  </Popover>
                </>
              ) : (
                <>
                  <p className="font-normal font-OpenSan mediumGray para-ex-small ">
                    Lorem ipsum dolor sit amet consectetur. Quis facilisi justo
                    integer malesuada. Augue quis mauris vitae amet adipiscing
                    semper suspendisse velit. Volutpat morbi et lacus nec
                    dignissim neque. Dictum non elit sed lectus odio. Feugiat ac
                    euismod feugiat eget. Etiam ullamcorper ligula sed in. Duis
                    sed turpis enim aenean tincidunt pellentesque. Consequat id
                    eu iaculis leo. Arcu bibendum suscipit diam sociis. Nibh eu
                    dolor eget fermentum pretium a sit in. Lorem ipsum dolor sit
                    amet consectetur. Quis facilisi justo integer malesuada.
                    Augue quis mauris vitae amet adipiscing semper suspendisse
                    velit. Volutpat morbi et lacus nec dignissim neque. Dictum
                    non elit sed lectus odio. Feugiat ac euismod feugiat eget.
                    Etiam ullamcorper ligula sed in. Duis sed turpis enim aenean
                    tincidunt pellentesque. Consequat id eu iaculis leo. Arcu
                    bibendum suscipit diam sociis. Nibh eu dolor eget fermentum
                    pretium a sit in. Lorem ipsum dolor sit amet consectetur.
                    Quis facilisi justo integer malesuada. Augue quis mauris
                    vitae amet adipiscing semper suspendisse velit. Volutpat
                    morbi et lacus nec dignissim neque. Dictum non elit sed
                    lectus odio. Feugiat ac euismod feugiat eget. Etiam
                    ullamcorper ligula sed in. Duis sed turpis enim aenean
                    tincidunt pellentesque.
                  </p>
                </>
              )}
            </div>
            <div>
              <p className=" font-normal font-OpenSan mediumBlack para-ex-small mt-2 ml-[74px]">
                {" "}
                Best regards
              </p>
              <div className="ml-[103px] mt-4">
                <p
                  className=" font-normal font-OpenSan primary para-small"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleChange("name", e.target.textContent)}
                >
                  {coverLetter.name || "Nancel Camebert"}
                </p>
                <p
                  className=" font-normal font-OpenSan mediumGray para-ex-small"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleChange("title", e.target.textContent)}
                >
                  {coverLetter.title || "Web UX/UI Designer"}
                </p>
              </div>
            </div>
          </div>
          <div>
            {/* <div className="flex items-center justify-end gap-1 absolute top-[60px] right-[22px]">
              <div className="iconContainer" onClick={handleSaveModal}>
                
                <Icon
                  color="white"
                  icon="clarity:copy-to-clipboard-line"
                  width={18}
                  height={18}
                />

                <div className="iconBox darkGray font-display font-semibold para-ex-small text-nowrap opacity-0 top-[-33px] right-[43px]">
                  Copied to Clipboard
                </div>
              </div>
              <div
                className="iconContainer"
                onClick={() => {
                  handleSaveModal();
                  handleAddCoverLetter();
                }}
              >
                <img src={save} alt="Save Icon" />
                <div className="iconBox darkGray font-display font-semibold para-ex-small text-nowrap opacity-0 top-[-33px] right-[33px]">
                  Save
                </div>
              </div>
              <div className="iconContainer" onClick={handleSaveModal}>
                <img src={download} alt="Download Icon" />
                <div className="iconBox darkGray font-display font-semibold para-ex-small text-nowrap opacity-0 top-[-33px] right-0">
                  Download
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </Modal>

      {/* Resume limit modal removed: unlimited resumes allowed */}
      {/* Limit Exceeded Cover Letter Modal */}
      <Modal
        open={isCoverLetterLimitExceededModalOpen}
        onCancel={handleCloseCoverLetterLimitModal}
        footer={null}
        centered
      >
        <div className="flex justify-center items-center flex-col gap-4">
          <h3>You have reached the saved cover letter limit 5</h3>
          <p>
            Please delete an existing cover letters to save more cover letters.
          </p>
          <div>
            <button
              className="bg-red-600"
              onClick={handleNavigateToCoverLetterSavedDocuments}
            >
              Delete Saved Documents
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Index;
