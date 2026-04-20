import React, { useEffect, useRef, useState } from "react";
import Button from "../../../components/shared/button";
import chrome from "../../../assets/icons/dashboard/chrome.svg";
import { message, Modal, Table } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  updateAllExtensionSections,
  updateAllSections,
  updateSection,
  updateTemplateId,
  updateUid,
} from "../../../redux/resumeSlice2";
import { v4 as uuidv4 } from "uuid";
import { useSectionsContext } from "../../../App";
import {
  setCoverLetter,
  updateCLTemplateId,
  updateCoverLetter,
  updateCoverLetterExtension,
  updateCoverLetterUid,
} from "../../../redux/coverLetterSlice";
import ResumeTemps from "../../../Dashboard/ResumeTemps/pages/resume";
import ResumeTemp1 from "../../../Dashboard/ResumeTemps/pages/resumeTemp1";
import ResumeTemp2 from "../../../Dashboard/ResumeTemps/pages/resumeTemp2";
import ResumeTemp3 from "../../../Dashboard/ResumeTemps/pages/resumeTemp3";
import ResumeTemp4 from "../../../Dashboard/ResumeTemps/pages/resumeTemp4";
import ResumeTemp5 from "../../../Dashboard/ResumeTemps/pages/resumeTemp5";
import CoverletterMain from "../../../Dashboard/coverletterTemplates/page/coverletterMain";
const Extension = () => {
  const [isExtensionModal, setIsExtensionModal] = useState(null);
  const { sectionsState, setSectionsState, extensionState, setExtensionState } =
    useSectionsContext(); // Get context state

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const userGoogleId = user?.userId;
  const userId = useSelector(
    (state) => state?.user?.userInfo?.data?._id || userGoogleId
  );
  const userInfo = useSelector((state) => state.userData);
  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;
  const [isGenerateBtnModalOpen, setIsGenerateBtnModalOpen] = useState(false);
  const [isLoaderModalOpen, setIsLoaderBtnModalOpen] = useState(false);
  const [isSavedResumeModalOpen, setIsSavedResumeModalOpen] = useState(false);
  const [savedResumes, setSavedResumes] = useState([]); // Resume data
  const [isLoaderCoverLetterModal, setIsLoaderCoverLetterModal] =
    useState(false);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // State to control job details modal
  const [selectedJob, setSelectedJob] = useState(null); // To hold selected job data
  const [uidState, setSidState] = useState("");
  const [templateID, setTemplateID] = useState("11");
  const handleExtensionModal = () => {
    setIsExtensionModal(!isExtensionModal);
  };
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generatedType, setGeneratedType] = useState(null); // "resume" or "coverLetter"
  const [savedResumesData, setSavedResumesData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const [isCoverLetterVisible, setIsCoverLetterVisible] = useState(false);
  const [activeDocSection, setActiveDocSection] = useState("resume");
  // const [jobData, setJobData] = useState(null);
  // const userData = getLocalStorage("user");
  const [savedCoverLetters, setSavedCoverLetters] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUpdated = useRef(false); // Prevent duplicate updates
  const [coverLetter, setCoverLetters] = useState([]);
  useEffect(() => {
    // Check if user exists in localStorage
    const parsedData = localStorage.getItem("user");
    const user = JSON.parse(parsedData);

    if (!user) {
      navigate("/signin");
      return;
    }

    // Retrieve job data from localStorage
    const existingEventData = localStorage.getItem("eData");
    if (existingEventData) {
      const parsedEventData = JSON.parse(existingEventData);
      if (JSON.stringify(parsedEventData) !== JSON.stringify(jobData)) {
        setJobData(parsedEventData);
      }
    }

    const handleMessage = (event) => {
      const { action, data } = event.data;

      if (action === "SEND_JOB_DATA") {
        if (!isUpdated.current) {
          localStorage.setItem("eData", JSON.stringify(data));

          // Only update if data is different
          if (JSON.stringify(data) !== JSON.stringify(extensionState)) {
            setExtensionState(data);
          }
          if (JSON.stringify(data) !== JSON.stringify(jobData)) {
            setJobData(data);
          }

          isUpdated.current = true; // Mark as updated
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  // Define the columns for the table
  const columns = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Apply Method",
      dataIndex: "applyMethod",
      key: "applyMethod",
    },
    {
      title: "Application Date",
      dataIndex: "applicationDate",
      key: "applicationDate",
    },
    // {
    //   title: "Action",
    //   dataIndex: "jobUrl",
    //   key: "jobUrl",
    //   // render: (text) => (
    //   //   <a href={text} target="_blank" rel="noopener noreferrer">
    //   //     {text}
    //   //   </a>
    //   // ),
    // },
  ];
  if (jobData) {
    columns.push({
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div className="flex justify-center gap-2">
          {jobData ? (
            <>
              <Button
                text="Generate"
                className="btn-primary h-[30px] px-2 py-4 para-ex-small"
                onClick={() => handleGenerateBtnModal(record)} // Trigger modal on clicking Generate
              />
              <Button
                text="Remove"
                className="bg-red-500 h-[30px] px-2 py-4 para-ex-small"
                onClick={() => handleRemove(record)} // Trigger modal to view details
              />
            </>
          ) : (
            ""
          )}
        </div>
      ),
    });
  }

  // Trigger modal on Generate button click and store selected job data
  const handleGenerateBtnModal = (jobData) => {
    const userData = JSON.parse(localStorage.getItem("user"));
        // if (userData?.data?.subscriptionStatus === "inactive") {
        //   message.warning("Please Purchase A Subscription Plan to Create A Resume");
        //   return;
        // }
    setSelectedJob(jobData); // Store selected job data
    setIsGenerateBtnModalOpen(true); // Open the modal
  };
  const handleRemove = (jobToRemove) => {
    const currentJobs = Array.isArray(jobData) ? jobData : [];
    const updatedJobs = currentJobs.filter((job) => job !== jobToRemove);

    setJobData(updatedJobs);
    localStorage.setItem("eData", JSON.stringify(updatedJobs));
  };
  // Start and stop loader
  const handleLoaderModal = (state) => {
    setIsLoaderBtnModalOpen(state); // Set the loader modal state
  };
  const handleViewResume = () => {
    const uid = uuidv4(); // Generate a unique uid
    // localStorage.setItem("tId", id);
    dispatch(updateUid(uid)); // Dispatch the generated uid to Redux
    localStorage.setItem("uid", uid);

    dispatch(updateTemplateId(templateID));
    // setSidState(uid);
    navigate(`/view-resume/${templateID}/${uid}`);
    // setSidState(uid);
  };

  // const handleViewCoverLetter = () => {
  //   // Navigate to the view-resume page and pass the selected resume ID
  //   const uid = uuidv4(); // Generate a unique uid
  //   // localStorage.setItem("tId", id);
  //   dispatch(updateUid(uid)); // Dispatch the generated uid to Redux
  //   // dispatch(updateTemplateId(id));
  //   setSidState(uid);
  //   navigate(`/view-coverletter/1/${uid}`);
  // };
  // Function to handle resume generation and loader
  const handleResumeTemplate = async () => {
    try {
      // Close the modal and start the loader
      setIsGenerateBtnModalOpen(false);
      handleLoaderModal(true);

      const payload = {
        title: selectedJob?.title,
        company: selectedJob?.company,
        description: selectedJob?.description,
      };

      // API call to generate the resume
      const response = await axios.post(
        `${ApiUrl}/resume/generateResume`,
        payload
      );

      const resumeData = response.data; // Assuming API returns the entire resume data

      const { cv, extension } = buildAllSections(resumeData);

      dispatch(updateAllExtensionSections({ cv, extension }));

      setSectionsState((prevState) => ({
        ...prevState,
        cv, // Update sections
        extension, // Update extension
      }));
      handleViewResume();
      setGeneratedType("resume"); // Set generated type as "resume"
      handleLoaderModal(false);
    } catch (err) {
      handleLoaderModal(false);
      console.error("Error generating resume:", err);
    }
  };

  // upload pdf resume and cover letter functionality functionality

  const handleResumeUpload = async (file) => {
    if (!file) {
      message.error("No file selected. Please choose a file to upload.");
      return;
    }

    // Allowed file types
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    // Validate file type
    if (!validTypes.includes(file.type)) {
      message.error(
        "Unsupported file type. Please upload a PDF, DOC, or DOCX file."
      );
      return;
    }

    const formData = new FormData();
    formData.append("cv", file); // Add the file
    // formData.append("extension", file.type); // Add file MIME type
    // formData.append("description", "Uploaded resume file"); // Optional description

    // Retrieve the job description from localStorage
    const jobDescription = localStorage.getItem("eData")
      ? JSON.parse(localStorage.getItem("eData"))
      : null;

    if (!jobDescription) {
      message.error("Job description data is missing for processing.");
      setIsLoaderBtnModalOpen(false);
      return;
    }

    // Add job description data to the FormData
    formData.append("title", jobDescription?.title || "Default Title");
    formData.append("company", jobDescription?.company || "Default Company");
    formData.append(
      "description",
      jobDescription?.description || "Default Job Description"
    );
    setIsLoaderBtnModalOpen(true); // Show loading spinner during upload

    try {
      // Call the combined API endpoint
      const response = await axios.post(
        `${ApiUrl}/resume/pdfResumeWithExtensionDescription`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const generatedResume = response.data;

        // Step 1: Build and dispatch resume sections
        const allSections = [
          {
            type: "profile",
            header: "Profile",
            profileImage: generatedResume?.profile?.profileImage || "",
            name: generatedResume?.profile?.name || "",
            contactNumber: generatedResume?.profile?.contactNumber || "",
            email: generatedResume?.profile?.email || "",
            address: generatedResume?.profile?.address || "",
            jobTitle: generatedResume?.profile?.jobTitle || "",
            links: generatedResume?.profile?.links || [""],
            column: generatedResume?.profile?.column,
            visibility: {
              contactNumber:
                generatedResume?.profile?.visibility?.contactNumber ?? true,
              email: generatedResume?.profile?.visibility?.email ?? true,
              address: generatedResume?.profile?.visibility?.address ?? true,
              links: generatedResume?.profile?.visibility?.links ?? true,
            },
          },

          {
            type: "about",
            header: "About",
            items: [
              {
                description:
                  generatedResume?.summary?.items?.[0]?.description || "",
              },
            ],
            column: generatedResume?.summary?.column,
          },
          {
            type: "education",
            header: "Education",
            column: generatedResume?.education?.column,
            items:
              generatedResume?.education?.items?.map((edu) => ({
                degree: edu.degree || "",
                institution: edu.institution || "",
                startDate: edu.startDate || "",
                endDate: edu.endDate || "",
              })) || [],
          },
          {
            type: "workExperience",
            header: "Work Experience",
            column: generatedResume?.workExperience?.column,
            items:
              generatedResume.workExperience?.items?.map((job) => ({
                jobTitle: job.jobTitle || "",
                company: job.company || "",
                startDate: job.startDate || "",
                endDate: job.endDate || "",
                description: job.description || "",
              })) || [],
          },
          {
            type: "skills",
            header: "Skills",
            column: generatedResume?.skills?.column,
            items:
              generatedResume?.skills?.items?.map((skill) => ({
                name: skill.name || "",
                level: skill.level || "Advanced",
              })) || [],
          },
          {
            type: "certificates",
            header: "Certifications",
            column: generatedResume.certifications?.column || "right",
            items:
              generatedResume.certifications?.items?.map((cert) => ({
                title: cert.title || "",
                date: cert.date || "",
                description: cert.description || "",
              })) || [],
          },
          // {
          //   type: "hobbies",
          //   header: "Hobbies",
          //   column: generatedResume.hobbies?.column || "right",
          //   items:
          //     generatedResume.hobbies?.items?.map((hobby) => ({
          //       name: hobby.name || "",
          //     })) || [],
          // },
          // {
          //   type: "languages",
          //   header: "Languages",
          //   column: generatedResume.languages?.column || "left",
          //   items:
          //     generatedResume.languages?.items?.map((lang) => ({
          //       name: lang.name || "",
          //       proficiency: lang.proficiency || "",
          //     })) || [],
          // },
          generatedResume?.customSections?.header === "Projects" &&
            generatedResume?.customSections?.column &&
            generatedResume?.customSections?.items?.length > 0 && {
              type: "projects",
              header: "Projects",
              column: generatedResume?.customSections?.column || "right",
              items:
                generatedResume?.customSections?.items?.map((project) => ({
                  projectName: project.projectName || "",
                  description: project.description || "",
                })) || [],
            },
        ];

        // Dispatch data to Redux or update local state
        dispatch(updateAllSections({ pdf: true, sections: allSections }));
        setSectionsState((prevState) => ({
          ...prevState,
          sections: allSections,
        }));

        message.success("Resume uploaded and processed successfully!");
        handleViewResume();
        setGeneratedType("resume"); // Set generated type as "resume"
      } else {
        throw new Error("Failed to process the uploaded resume.");
      }
      setIsLoaderBtnModalOpen(false);
    } catch (error) {
      console.error("Error processing the resume:", error);
      message.error(
        "An error occurred while processing the file. Please try again."
      );
    } finally {
      setIsLoaderBtnModalOpen(false); // Hide loading spinner
    }
  };

  const handleCoverLetterUpload = async (file) => {
    if (!file) {
      message.error("No file selected. Please choose a file to upload.");
      return;
    }

    // Allowed file types
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    // Validate file type
    if (!validTypes.includes(file.type)) {
      message.error(
        "Unsupported file type. Please upload a PDF, DOC, or DOCX file."
      );
      return;
    }

    const formData = new FormData();
    formData.append("cv", file);

    // Retrieve the job description from localStorage
    const jobDescription = localStorage.getItem("eData")
      ? JSON.parse(localStorage.getItem("eData"))
      : null;

    if (!jobDescription) {
      message.error("Job description data is missing for processing.");
      setIsLoaderBtnModalOpen(false);
      return;
    }

    // Add job description data to the FormData
    formData.append("title", jobDescription?.title || "Default Title");
    formData.append("company", jobDescription?.company || "Default Company");
    formData.append(
      "description",
      jobDescription?.description || "Default Job Description"
    );

    setIsLoaderCoverLetterModal(true); // Show loading spinner during upload

    try {
      // Call the combined API endpoint
      const response = await axios.post(
        `${ApiUrl}/cover/pdfCoverLetterWithExtensionDescription`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const generatedCoverLetter = response.data;

        // console.log("Generated cover letter:", generatedCoverLetter);

        // Build and dispatch cover letter data
        const coverLetterState = {
          name: generatedCoverLetter?.name || "",
          designation: generatedCoverLetter?.jobTitle || "",
          company: generatedCoverLetter?.company || "",
          body: generatedCoverLetter?.body || [], // Ensure this takes the entire array if available
          email: generatedCoverLetter?.contactInfo?.email || "",
          phone: generatedCoverLetter?.contactInfo?.phone || "",
          address: generatedCoverLetter?.contactInfo?.address || "",
          date: generatedCoverLetter?.date || new Date().toLocaleDateString(), // Default to current date if not provided
          linkedIn: generatedCoverLetter?.linkedIn || "",
          additionalInfo: generatedCoverLetter?.additionalInfo || "",
          links: generatedCoverLetter?.links || [""],
        };

        // Dispatch or update state with the new cover letter
        dispatch(updateCoverLetterExtension(coverLetterState));
        setGeneratedType("coverLetter");
        message.success("Cover letter uploaded and processed successfully!");
        handleViewCoverLetter();
      } else {
        throw new Error("Failed to process the uploaded cover letter.");
      }
    } catch (error) {
      console.error("Error processing the cover letter:", error);
      message.error(
        "An error occurred while processing the file. Please try again."
      );
    } finally {
      setIsLoaderCoverLetterModal(false); // Hide loading spinner
    }
  };

  useEffect(() => {
    if (generatedType === "resume" && uidState && templateID) {
      navigate(`/view-resume/${templateID}/${uidState}`);
    } else if (generatedType === "coverLetter" && uidState) {
      navigate(`/view-coverletter/1/${uidState}`);
    }
  }, [generatedType, uidState, templateID, navigate]);

  const buildAllSections = (resumeData) => {
    // console.log("Prepared resumeData", resumeData);

    // Check for expected properties in resumeData
    if (!resumeData) {
      console.error("Resume data is missing required sections.");
      return []; // Return empty if necessary data is not available
    }

    // return [
    //   buildProfileSection(resumeData.profile),
    //   buildAboutSection(resumeData.summary),
    //   buildEducationSection(resumeData.education),
    //   buildWorkExperienceSection(resumeData.workExperience),
    //   buildSkillsSection(resumeData.skills),
    //   buildLanguagesSection(resumeData.languages),
    //   buildHobbiesSection(resumeData.hobbies),
    //   buildCertificationsSection(resumeData.certifications),
    //   buildCustomSections(resumeData.customSections),
    // ];

    // console.log("userInfo", userInfo);

    // Prepare the sections array
    const sections = [
      // userInfo && userInfo.firstName && userInfo.lastName
      //   ? dispatch(
      //       updateSection({
      //         type: "profile",
      //         data: {
      //           name: `${userInfo?.firstName} ${userInfo?.lastName}`,
      //           contactNumber: userInfo?.phoneNumber,
      //           email: userInfo?.email,
      //           address: userInfo?.address,
      //           jobTitle: userInfo?.desiredJobTitle,
      //           links: userInfo?.links || [],
      //         },
      //       })
      //     )
      //   : buildProfileSection(resumeData.cv.profile),

      buildProfileSection(resumeData.cv.profile, userInfo),
      buildAboutSection(resumeData.cv.summary),
      buildEducationSection(resumeData.cv.education),
      buildWorkExperienceSection(resumeData.cv.workExperience),
      buildSkillsSection(resumeData.cv.skills),
      buildLanguagesSection(resumeData.cv.languages),
      buildHobbiesSection(resumeData.cv.hobbies),
      buildCertificationsSection(resumeData.cv.certifications),
      // buildCustomSections(resumeData.cv.customSections),
    ];

    // Assuming the extension value is in resumeData.extension (you can adjust based on your data)
    const extension = resumeData.extension || false; // Default to false if not found

    // Return the object with both sections and extension
    return { cv: sections, extension };
  };

  // Individual section builders for clarity and modularity

  const buildProfileSection = (profile = {}, userInfo = {}) => ({
    type: "profile",
    header: "Profile",
    profileImage: userInfo?.profileImage || profile?.profileImage || "", // Priority to userInfo
    name: userInfo?.name || profile?.name || "", // Use userInfo if available
    contactNumber: userInfo?.contactNumber || profile?.contactNumber || "",
    email: userInfo?.email || profile?.email || "",
    address: userInfo?.address || profile?.address || "",
    jobTitle: profile?.jobTitle || "",
    links:
      userInfo?.links?.length > 0 ? userInfo?.links : profile?.links || [""], // Check for userInfo links
    column: profile.column || userInfo.column || "", // Column from either profile or userInfo
    visibility: {
      contactNumber: profile.visibility?.contactNumber ?? true,
      email: profile.visibility?.email ?? true,
      address: profile.visibility?.address ?? true,
      links: profile.visibility?.links ?? true,
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
    column: summary?.column,
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
      workExperience.items?.map((job) => ({
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
        name: skill?.name || "",
        level: skill?.level || "Advanced",
      })) || [],
  });

  const buildLanguagesSection = (languages = {}) => ({
    type: "languages",
    header: "Languages",
    column: languages.column,
    items:
      languages.items?.map((lang) => ({
        name: lang?.name || "",
        proficiency: lang?.proficiency || "",
      })) || [],
  });

  const buildHobbiesSection = (hobbies = {}) => ({
    type: "hobbies",
    header: "Hobbies",
    column: hobbies?.column,
    items:
      hobbies?.items?.map((hobby) => ({
        name: hobby?.name || "",
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

  const handleViewCoverLetter = () => {
    // Navigate to the view-resume page and pass the selected resume ID
    const uid = uuidv4(); // Generate a unique uid
    // localStorage.setItem("tId", id);
    dispatch(updateCoverLetterUid(uid)); // Dispatch the generated uid to Redux
    dispatch(updateCLTemplateId("1"));
    setSidState(uid);
    navigate(`/view-coverletter/1/${uid}`, {
      state: { from: "AI" },
    });
  };

  const handleLoaderCoverLetterModal = (state) => {
    setIsLoaderCoverLetterModal(state); // Set the loader modal state
  };

  const handleCoverLetterTemplate = async () => {
    // navigate("/choose-coverletter");
    setIsLoaderCoverLetterModal(true);
    try {
      const payload = {
        title: selectedJob?.title,
        company: selectedJob?.company,
        description: selectedJob?.description,
      };

      // API call to generate the resume
      const response = await axios.post(
        `${ApiUrl}/cover/generateCoverLetterExtension`,
        payload
      );

      // console.log(
      //   "response cover letter template extension data",
      //   response.data
      // );
      const aiResponse = await response.data.description;

      dispatch(
        setCoverLetter({
          body: [
            {
              description: aiResponse || "",
            },
          ],
        })
      );
      setGeneratedType("coverLetter"); // Set generated type as "coverLetter"
      handleViewCoverLetter();
    } catch (err) {
      setIsLoaderCoverLetterModal(false);

      console.log(err);
    } finally {
      // Stop the loader once the process is done
      setIsLoaderCoverLetterModal(false);
    }
  };

  // Function to fetch saved resumes
  const fetchSavedResumes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${ApiUrl}/resume/resumes/${userId}`);
      setSavedResumes(response.data); // Update the resume data
    } catch (error) {
      console.error("Error fetching saved resumes:", error);
      // message.error("Failed to fetch saved resumes. Please try again.");
    }
    setLoading(false);
  };

  // Fetch cover letters
  const fetchSavedCoverLetters = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${ApiUrl}/cover/${userId}`);
      setSavedCoverLetters(response.data);
    } catch (error) {
      console.error("Error fetching saved cover letters:", error);
      // message.error("Failed to fetch saved cover letters. Please try again.");
    }
    setLoading(false);
  };

  // Open the saved resume modal
  const handleOpenSavedResumeModal = () => {
    fetchSavedResumes(); // Fetch the resumes before opening the modal
    setIsSavedResumeModalOpen(true);
  };

  useEffect(() => {
    if (activeDocSection === "resume") {
      fetchSavedResumes();
    } else if (activeDocSection === "coverletter") {
      fetchSavedCoverLetters();
    }
  }, [activeDocSection]);

  // Close the saved resume modal
  const handleCloseSavedResumeModal = () => {
    setIsSavedResumeModalOpen(false);
  };

  const handlesavedResumeData = async (record) => {
    // console.log("record saved", record);

    // Retrieve the job description from localStorage
    const jobDescription = localStorage.getItem("eData")
      ? JSON.parse(localStorage.getItem("eData"))
      : null;

    if (!jobDescription) {
      message.error("Job description data is missing for processing.");
      setIsLoaderBtnModalOpen(false);
      return;
    }

    // console.log("jobDescription", jobDescription);
    handleLoaderModal(true);

    try {
      const uid = record.uid;

      const response = await axios.post(
        `${ApiUrl}/resume/savedResumeWithExtensionDescription`,
        {
          uid,
          jobDescription,
        }
      );

      if (response.status === 200) {
        const generatedResume = response.data;

        // console.log("Generated resume:", generatedResume);

        // Step 1: Build and dispatch resume sections
        const allSections = [
          {
            type: "profile",
            header: "Profile",
            profileImage: generatedResume?.profile?.profileImage || "",
            name: generatedResume?.profile?.name || "",
            contactNumber: generatedResume?.profile?.contactNumber || "",
            email: generatedResume?.profile?.email || "",
            address: generatedResume?.profile?.address || "",
            jobTitle: generatedResume?.profile?.jobTitle || "",
            links: generatedResume?.profile?.links || [""],
            column: generatedResume?.profile?.column,
            visibility: {
              contactNumber:
                generatedResume?.profile.visibility?.contactNumber ?? true,
              email: generatedResume?.profile.visibility?.email ?? true,
              address: generatedResume?.profile.visibility?.address ?? true,
              links: generatedResume?.profile.visibility?.links ?? true,
            },
          },

          {
            type: "about",
            header: "About",
            items: [
              {
                description:
                  generatedResume?.summary?.items?.[0]?.description || "",
              },
            ],
            column: generatedResume?.summary?.column,
          },
          {
            type: "education",
            header: "Education",
            column: generatedResume?.education?.column,
            items:
              generatedResume?.education?.items?.map((edu) => ({
                degree: edu?.degree || "",
                institution: edu?.institution || "",
                startDate: edu?.startDate || "",
                endDate: edu?.endDate || "",
              })) || [],
          },
          {
            type: "workExperience",
            header: "Work Experience",
            column: generatedResume?.workExperience?.column,
            items:
              generatedResume?.workExperience?.items?.map((job) => ({
                jobTitle: job?.jobTitle || "",
                company: job?.company || "",
                startDate: job?.startDate || "",
                endDate: job?.endDate || "",
                description: job?.description || "",
              })) || [],
          },
          {
            type: "skills",
            header: "Skills",
            column: generatedResume?.skills?.column,
            items:
              generatedResume?.skills?.items?.map((skill) => ({
                name: skill.name || "",
                level: skill.level || "Advanced",
              })) || [],
          },
          {
            type: "certificates",
            header: "Certifications",
            column: generatedResume?.certifications?.column || "right",
            items:
              generatedResume?.certifications?.items?.map((cert) => ({
                title: cert.title || "",
                date: cert.date || "",
                description: cert.description || "",
              })) || [],
          },
          // {
          //   type: "hobbies",
          //   header: "Hobbies",
          //   column: generatedResume.hobbies?.column || "right",
          //   items:
          //     generatedResume.hobbies?.items?.map((hobby) => ({
          //       name: hobby.name || "",
          //     })) || [],
          // },
          // {
          //   type: "languages",
          //   header: "Languages",
          //   column: generatedResume.languages?.column || "left",
          //   items:
          //     generatedResume.languages?.items?.map((lang) => ({
          //       name: lang.name || "",
          //       proficiency: lang.proficiency || "",
          //     })) || [],
          // },
          {
            type: "projects",
            header: "Projects",
            column: generatedResume?.customSections?.column || "right",
            items:
              generatedResume.customSections?.items?.map((project) => ({
                projectName: project.projectName || "",
                description: project.description || "",
              })) || [],
          },
        ];

        // Dispatch data to Redux or update local state
        dispatch(updateAllSections({ pdf: true, sections: allSections }));
        setSectionsState((prevState) => ({
          ...prevState,
          sections: allSections,
        }));

        message.success("Resume uploaded and processed successfully!");
        handleLoaderModal(false);

        handleViewResume();
        setGeneratedType("resume"); // Set generated type as "resume"
      } else {
        throw new Error("Failed to process the uploaded resume.");
      }
      // handleViewResume();
      // console.log("Resume Data:", response.data);
    } catch (err) {
      handleLoaderModal(false);

      console.log("err", err);
    }
  };

  const handlesavedCoverLetterData = async (record) => {
    // console.log("record saved", record);

    // Retrieve the job description from localStorage
    const jobDescription = localStorage.getItem("eData")
      ? JSON.parse(localStorage.getItem("eData"))
      : null;

    if (!jobDescription) {
      message.error("Job description data is missing for processing.");
      setIsLoaderBtnModalOpen(false);
      return;
    }

    // console.log("jobDescription", jobDescription);
    handleLoaderModal(true);

    try {
      const uid = record.uid;

      const response = await axios.post(
        `${ApiUrl}/cover/generateCoverLetterExtensionDescription`,
        {
          uid,
          jobDescription,
        }
      );

      console.log("response cl ", response.data);
      if (response.status === 200) {
        const generatedCoverLetter = response.data;
        console.log("Generated cover letter:", generatedCoverLetter);
        dispatch(
          setCoverLetter({
            body: [
              {
                description: generatedCoverLetter.description || "",
              },
            ],
            designation: generatedCoverLetter.jobTitle,
            name: generatedCoverLetter.name || "",
            address: generatedCoverLetter.address || "",
            location: generatedCoverLetter.location || "",
            phone: generatedCoverLetter.phone || "",
            email: generatedCoverLetter.email || "",
            company: generatedCoverLetter.company || "",
            date: generatedCoverLetter.date || "",
            letterTo: generatedCoverLetter.letterTo || "",
          })
        );
      }
      handleLoaderModal(false);
      handleViewCoverLetter();
    } catch (err) {
      handleLoaderModal(false);

      console.log("err", err);
    }
  };

  const componentMapping = {
    1: { component: ResumeTemps, style: "resume1" },
    2: { component: ResumeTemp1, style: "resumeTemp1" },
    3: { component: ResumeTemp1, style: "resumeTemp2" },
    4: { component: ResumeTemp1, style: "resumeTemp3" },
    5: { component: ResumeTemp1, style: "resumeTemp4" },
    6: { component: ResumeTemp1, style: "resumeTemp5" },
    7: { component: ResumeTemp2, style: "resumeTemplate6" },
    8: { component: ResumeTemp2, style: "resumeTemplate7" },
    9: { component: ResumeTemp2, style: "resumeTemplate8" },
    10: { component: ResumeTemp2, style: "resumeTemplate9" },
    11: { component: ResumeTemp2, style: "resumeTemplate10" },
    12: { component: ResumeTemp2, style: "resumeTemplate11" },
    13: { component: ResumeTemp2, style: "resumeTemplate18" },
    14: { component: ResumeTemp1, style: "resumeTemplate14" },
    15: { component: ResumeTemp1, style: "resumeTemp16" },
    16: { component: ResumeTemp3, style: "resumeTemplate12" },
    17: { component: ResumeTemp4, style: "resumeTemplate13" },
    18: { component: ResumeTemp4, style: "resumeTemplate19" },
    19: { component: ResumeTemp5, style: "resumeTemplate17" },
    20: { component: ResumeTemp4, style: "resumeTemplate15" },
  };

  // Renders the component based on templateId and applies the respective style
  const renderResumeComponent = (templateId, resumeData) => {
    // console.log("resumeData", resumeData);
    const templateInfo = componentMapping[templateId];
    if (!templateInfo) return null;
    const previewCv = true;
    const { component: Component, style } = templateInfo;

    return <Component previewCv={previewCv} style={style} data={resumeData} />;
  };

  // Function to render the cover letter component based on the templateId and apply the style
  const renderCoverLetterComponent = (data, style) => {
    switch (data.templateId) {
      case 1:
        return <CoverletterMain style={style || "coverletter1"} data={data} />;
      case 2:
        return <CoverletterMain style={style || "coverletter2"} data={data} />;
      case 3:
        return <CoverletterMain style={style || "coverletter3"} data={data} />;
      case 4:
        return <CoverletterMain style={style || "coverletter4"} data={data} />;
      case 5:
        return <CoverletterMain style={style || "coverletter5"} data={data} />;
      case 6:
        return <CoverletterMain style={style || "coverletter6"} data={data} />;
      case 7:
        return <CoverletterMain style={style || "coverletter7"} data={data} />;
      case 8:
        return <CoverletterMain style={style || "coverletter8"} data={data} />;
      case 9:
        return <CoverletterMain style={style || "coverletter9"} data={data} />;
      case 10:
        return <CoverletterMain style={style || "coverletter10"} data={data} />;
      default:
        return <div>No Cover Letter Template Found</div>;
    }
  };

  // // Handle View Cover Letter based on templateId and uid
  // const handleViewCoverLetter = (cover) => {
  //   navigate(`/view-coverletter/${cover.templateId}/${cover.uid}`);
  // };

  // Table columns for displaying resume data
  const columnss = [
    {
      title: "Name",
      dataIndex: ["sections"],
      key: "name",
      render: (sections) => {
        const profile = sections.find((section) => section.type === "profile");
        const name =
          profile && profile.name
            ? profile.name
                .replace(/<p>/gi, "")
                .replace(/<\/p>/gi, "")
                .replace(/<u>/gi, "")
                .replace(/<\/u>/gi, "")
                .trim()
            : "Not Found"; // Remove <p> and <u> tags
        return name;
      },
    },
    {
      title: "Email",
      dataIndex: ["sections"],
      key: "email",
      render: (sections) => {
        const profile = sections.find((section) => section.type === "profile");
        const email =
          profile && profile.email
            ? profile.email
                .replace(/<p>/gi, "")
                .replace(/<\/p>/gi, "")
                .replace(/<u>/gi, "")
                .replace(/<\/u>/gi, "")
                .trim()
            : "Not Found"; // Remove <p> and <u> tags
        return email;
      },
    },
    {
      title: "Contact Number",
      dataIndex: ["sections"],
      key: "contactNumber",
      render: (sections) => {
        const profile = sections.find((section) => section.type === "profile");
        const contactNumber =
          profile && profile.contactNumber
            ? profile.contactNumber
                .replace(/<p>/gi, "")
                .replace(/<\/p>/gi, "")
                .replace(/<u>/gi, "")
                .replace(/<\/u>/gi, "")
                .trim()
            : "Not Found"; // Remove <p> and <u> tags
        return contactNumber;
      },
    },
    {
      title: "Job Title",
      dataIndex: ["sections"],
      key: "jobTitle",
      render: (sections) => {
        const profile = sections.find((section) => section.type === "profile");
        const jobTitle =
          profile && profile.jobTitle
            ? profile.jobTitle
                .replace(/<p>/gi, "")
                .replace(/<\/p>/gi, "")
                .replace(/<u>/gi, "")
                .replace(/<\/u>/gi, "")
                .trim()
            : "Not Found"; // Remove <p> and <u> tags
        return jobTitle;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex justify-center gap-2">
          <Button
            text="Generate"
            className="btn-primary"
            onClick={() => handlesavedResumeData(record)} // View resume function
          />
          <Button
            text="View"
            className="btn-primary"
            onClick={() => handleGetResume(record)} // View resume function
          />
        </div>
      ),
    },
  ];

  // Columns for Cover Letters Table
  const coverLetterColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex justify-center gap-2">
          <Button
            text="Generate"
            className="btn-primary"
            onClick={() => handlesavedCoverLetterData(record)} // View resume function
          />
          <Button
            text="View"
            className="btn-primary"
            onClick={() => handleGetCoverLetter(record)} // View resume function
          />
        </div>
      ),
    },
  ];

  const handleGetResume = async (record) => {
    // console.log("record: ", record);
    setSavedResumesData(Array.isArray(record) ? record : [record]);
    setIsModalVisible(true);
  };

  const handleGetCoverLetter = async (record) => {
    // console.log("record: ", record);
    setCoverLetters(Array.isArray(record) ? record : [record]);
    setIsCoverLetterVisible(true);
  };

  // console.log("savedResumesData", savedResumesData);
  return (
    <>
      <div className="mb-[40px] lg:mb-[80px] h-auto bg-white pb-[50px] lg:pb-[100px]  rounded-2xl">
        {/* Heading */}
        <div className="pt-7 mb-[47px] ">
          <h2 className="text-center darkGray font-light font-OpenSan">
            Quickly Add Job for
            <span className="font-bold"> AI Match</span>
          </h2>
        </div>
        <div className="extension flex flex-col justify-center items-center gap-[26px]">
          <div className="w-[95%] lg:w-[70%] box flex flex-col justify-center items-center gap-[21px] px-2 2xl:px-32  py-12">
            <div className="flex items-center gap-[15px]">
              <img src={chrome} alt="" className="hidden md:block" />
              <h2 className="lg:text-nowrap text-center darkGray font-light font-OpenSan ">
                Download Chrome
                <span className="font-bold"> Extension</span>
              </h2>
            </div>
            <p className="font-OpenSan font-normal para-small grayShade5 text-center">
              Our free Chrome browser extension lets you instantly add jobs from
              any job board to our AI system, which analyzes the posting and
              customizes your resume and cover letter for a perfect fit.
              Streamline your job search and apply with confidence in seconds.
            </p>
            <Button
              text="Download Extension"
              className="btn-primary py-[10px]"
              minHeight={50}
              onClick={handleExtensionModal}
            />
          </div>

          {jobData.companyName && (
            <div className=" w-[95%] lg:w-[70%] box flex flex-col justify-center items-center gap-[21px] px-2 2xl:px-12 py-12">
              {/* Antd Table */}

              <Table
                columns={columns}
                dataSource={jobData ? [jobData] : []}
                loading={loading}
                pagination={false}
                rowHoverable={false}
                // pagination={{ pageSize: 5 }} // Optional: Pagination settings
              />
            </div>
          )}

{jobData.length > 0 ? (
       <div className="w-[95%] lg:w-[70%] box flex flex-col justify-center items-center gap-[21px] px-2 2xl:px-12 py-12">
         <Table
           columns={columns}
           dataSource={jobData}
           loading={loading}
           pagination={false}
           rowHoverable={false}
         />
       </div>
     ) : (
       <div className="w-[95%] lg:w-[70%] box p-4 text-center">No jobs available. Add jobs via extension.</div>
     )}
        </div>
      </div>

      <Modal
        open={isExtensionModal}
        onCancel={handleExtensionModal}
        footer={null}
        centered
        width="700px"
      >
        <div className="px-[30px] modal-wrap flex flex-col gap-[24px] py-[20px]">
          <div>
            <h2 className="font-bold darkGray font-OpenSan text-xl mb-4">
              How to Install the Extension Locally
            </h2>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <span className="font-bold text-blue-600 min-w-[30px]">1.</span>
              <div>
                <p className="font-semibold darkGray">Open Chrome Extensions Page</p>
                <p className="text-gray-600 text-sm">Go to <code className="bg-gray-100 px-2 py-1 rounded">chrome://extensions</code> in your browser</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <span className="font-bold text-blue-600 min-w-[30px]">2.</span>
              <div>
                <p className="font-semibold darkGray">Enable Developer Mode</p>
                <p className="text-gray-600 text-sm">Toggle the <strong>Developer mode</strong> switch in the top-right corner</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <span className="font-bold text-blue-600 min-w-[30px]">3.</span>
              <div>
                <p className="font-semibold darkGray">Load Unpacked Extension</p>
                <p className="text-gray-600 text-sm">Click <strong>Load unpacked</strong> and select the <code className="bg-gray-100 px-2 py-1 rounded">neorez-extension</code> folder</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <span className="font-bold text-blue-600 min-w-[30px]">4.</span>
              <div>
                <p className="font-semibold darkGray">Extension is Ready</p>
                <p className="text-gray-600 text-sm">The extension will now appear in your extensions list and work locally</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-3 mt-4">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> Make sure your backend and frontend servers are running on <code className="bg-white px-1 rounded">localhost:3000</code> and <code className="bg-white px-1 rounded">localhost:5174</code>
            </p>
          </div>

          <div className="flex gap-3 justify-end mt-6">
            <Button
              text="Got it"
              className="btn-primary py-2 px-6"
              onClick={handleExtensionModal}
            />
          </div>
        </div>
      </Modal>

      {/* Commented out old modal */}
      {/* <Modal
        open={isExtensionModal}
        onCancel={handleExtensionModal}
        footer={null}
        centered
        width="974px"
      >
        <div className=" px-[30px] modal-wrap flex flex-col gap-[32px]">
          <div>
            <h2 className="font-light darkGray  font-OpenSan mb-2">
              Tracked
              <span className="font-bold"> Applications</span>
            </h2>
          </div>
          <div className=" jobTable">
            <Table
              columns={columns}
              pagination={false}
              dataSource={data}
              rowHoverable={false}
            />
          </div>
          <div className="flex gap-[10px] mt-7 ml-[20px]">
            <Button
              text="Clear All"
              className="redBg white font-OpenSan para-text py-2 font-bold "
            />
            <Button
              text="Copy to Clipboard"
              className="primaryBg white font-OpenSan para-text py-2 font-bold "
            />
            <Button
              text="Add Current Selected Job"
              className=" white font-OpenSan para-text py-2 font-bold greenBg"
            />
          </div>
        </div>
      </Modal> */}

      {/* Generate Button Modal */}
      <Modal
        open={isGenerateBtnModalOpen}
        onCancel={() => setIsGenerateBtnModalOpen(false)}
        footer={null}
        centered
      >
        <div className="py-[43px] px-0 sm:px-[50px]px-[50px] modal-wrap">
          <h3 className="text-center font-bold darkGray font-OpenSan mb-8">
            What you want to generate
          </h3>
          <div className="flex flex-col gap-5 justify-center items-center w-full sm:w-[60%] m-auto">
            {/* <Button
              text="Resume"
              className="darkGray w-full py-4 hover:bg-[#2A9DF4] hover:text-white"
              onClick={() => {
                setIsGenerateBtnModalOpen(false); // Close modal
                handleLoaderModal(true); // Start loader
                handleResumeTemplate(); // Call the resume generation function
              }}
            /> */}
            <Button
              text="Upload Resume"
              className="darkGray w-full py-4 hover:bg-[#2A9DF4] hover:text-white"
              onClick={() =>
                document.getElementById("resumeUploadInput").click()
              } // Open file picker
            />

            <input
              id="resumeUploadInput"
              type="file"
              accept=".pdf,.doc,.docx" // Restrict file extensions
              style={{ display: "none" }} // Hide the file input
              onChange={(e) => handleResumeUpload(e.target.files[0])} // Trigger upload function
            />
            <Button
              text="Upload Cover Letter"
              className="darkGray w-full py-4 hover:bg-[#2A9DF4] hover:text-white"
              // onClick={() => {
              //   setIsGenerateBtnModalOpen(false); // Close modal
              //   // handleLoaderModal(true); // Start loader
              //   // setTimeout(() => {
              //   handleCoverLetterTemplate(); // Simulate cover letter template generation
              //   // }, 1000);
              // }}
              onClick={() =>
                document.getElementById("coverletterUploadInput").click()
              }
            />

            <input
              id="coverletterUploadInput"
              type="file"
              accept=".pdf,.doc,.docx" // Restrict file extensions
              style={{ display: "none" }} // Hide the file input
              onChange={(e) => handleCoverLetterUpload(e.target.files[0])} // Trigger upload function
            />
            <Button
              text="Saved Documents"
              className="darkGray w-full py-4 hover:bg-[#2A9DF4] hover:text-white"
              onClick={handleOpenSavedResumeModal} // Open saved resume modal
            />
          </div>
        </div>
      </Modal>

      {/* Loader Modal */}
      <Modal
        open={isLoaderModalOpen}
        onCancel={() => handleLoaderModal(false)}
        footer={null}
        centered
      >
        <div className="h-[359px] flex flex-col items-center justify-center gap-[42px] modal-wrap">
          <div className="flex justify-center">
            <div className="loader"></div>
          </div>
          <div className="">
            <h3 className="text-center font-bold darkGray font-OpenSan mb-2">
              Generating Resume...
            </h3>
            <h3 className="text-center font-bold darkGray font-OpenSan mb-8">
              AI is analyzing...
            </h3>
          </div>
        </div>
      </Modal>

      {/* Job Details Modal */}
      <Modal
        open={isDetailsModalOpen}
        onCancel={() => setIsDetailsModalOpen(false)}
        footer={null}
        centered
      >
        <div className="py-[43px] px-0 sm:px-[50px]px-[50px] modal-wrap">
          <h3 className="text-center font-bold darkGray font-OpenSan mb-8">
            Job Details
          </h3>
          {selectedJob && (
            <div>
              <p>
                <strong>Title:</strong> {selectedJob.title}
              </p>
              <p>
                <strong>Company:</strong> {selectedJob.company}
              </p>
              <p>
                <strong>Description:</strong> {selectedJob.description}
              </p>
              <p>
                <strong>Location:</strong> {selectedJob.location}
              </p>
              <p>
                <strong>Employment Type:</strong> {selectedJob.employmentType}
              </p>
              <p>
                <strong>Time Posted:</strong> {selectedJob.timeAgoPosted}
              </p>
            </div>
          )}
        </div>
      </Modal>
      {/* Cover Letter Loader */}
      <Modal
        open={isLoaderCoverLetterModal}
        onCancel={() => handleLoaderCoverLetterModal(false)}
        footer={null}
        centered
      >
        <div className="h-[359px] flex flex-col items-center justify-center gap-[42px] modal-wrap">
          <div className="flex justify-center">
            <div className="loader"></div>
          </div>
          <h3 className="text-center font-bold darkGray font-OpenSan mb-8">
            Generating Cover Letter...
          </h3>
        </div>
      </Modal>

      {/* Saved Resume Modal */}
      <Modal
        // title="Saved Resumes"
        open={isSavedResumeModalOpen}
        onCancel={handleCloseSavedResumeModal}
        footer={null}
        centered
        width={1200}
        className="overflow-hidden"
      >
        <div className="overflow-auto">
          {/* Toggle Buttons */}

          <div className="flex justify-center mb-4">
            <div className="p-1 rounded lightGrayBg flex items-center gap-[11px]">
              <button
                onClick={() => setActiveDocSection("resume")}
                className={`shadow-none px-4 py-2 rounded para-text font-normal ${
                  activeDocSection === "resume"
                    ? "white primaryBg"
                    : "lightGrayBg darkGray"
                }`}
              >
                Resume
              </button>
              <button
                onClick={() => setActiveDocSection("coverletter")}
                className={`text-nowrap shadow-none px-[16px] py-2 rounded para-text font-normal ${
                  activeDocSection === "coverletter"
                    ? "white primaryBg"
                    : "lightGrayBg darkGray"
                }`}
              >
                Coverletter
              </button>
            </div>
          </div>
          {activeDocSection === "resume" && (
            <Table
              dataSource={savedResumes}
              columns={columnss}
              rowKey="_id"
              loading={loading}
              pagination={{ pageSize: 5 }}
            />
          )}

          {activeDocSection === "coverletter" && (
            <Table
              dataSource={savedCoverLetters}
              columns={coverLetterColumns}
              rowKey="_id"
              loading={loading}
              pagination={{ pageSize: 5 }}
            />
          )}
        </div>
      </Modal>

      {/* {Saved Resume View Model} */}

      <Modal
        // title="Confirm Deletion"
        width="800px"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)} // Close modal on cancel\
        footer={null}
      >
        {savedResumesData?.length > 0 &&
          savedResumesData?.map((resume, index) => (
            // console.log("resume", resume),
            <div key={resume._id} className="groupWrap relative">
              <div className="bg-[#F2F2F2] bgHover rounded-[12px] flex flex-col gap-3 p-5 overflow-hidden">
                <div className="relative group overflow-hidden rounded-md ">
                  <div className="flex w-[595px] mx-auto justify-center gap-10 relative pointer-events-none">
                    {renderResumeComponent(Number(resume.templateId), resume)}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Modal>
      <Modal
        // title="Confirm Deletion"
        width="800px"
        visible={isCoverLetterVisible}
        onCancel={() => setIsCoverLetterVisible(false)} // Close modal on cancel
        footer={null}
      >
        {coverLetter.length > 0 &&
          coverLetter.map((cover) => (
            <div key={cover.id} className="groupWrap h-full relative">
              <div className="bg-[#F2F2F2] bgHover rounded-[12px] flex flex-col gap-3 items-center justify-between px-[25px] py-5 h-full">
                <div className="relative group overflow-hidden rounded-md  pointer-events-none">
                  <div>{renderCoverLetterComponent(cover)}</div>
                </div>
              </div>
            </div>
          ))}
      </Modal>
    </>
  );
};

export default Extension;
