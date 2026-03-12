import React, { useState } from "react";
import { message, Modal, Spin, Table } from "antd";
import Button from "../components/shared/button";
import Input from "../components/shared/input";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  updateAllSections,
  updateTemplateId,
  updateUid,
} from "../redux/resumeSlice2";
import {
  updateCoverLetterExtension,
  updateCoverLetterUid,
} from "../redux/coverLetterSlice";
import { v4 as uuidv4 } from "uuid";
import { useSectionsContext } from "../App";
const JobsLibrary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [jobTitle, setJobTitle] = useState(""); // Job Title input
  const [location, setLocation] = useState(""); // Location input (Country)
  const [jobs, setJobs] = useState([]);
  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;
  const { sectionsState, setSectionsState, extensionState, setExtensionState } =
    useSectionsContext(); // Get context state
  const [templateID, setTemplateID] = useState("11");
  const [isLoaderCoverLetterModal, setIsLoaderCoverLetterModal] =
    useState(false);

  const [isGenerateBtnModalOpen, setIsGenerateBtnModalOpen] = useState(false);
  const [isLoaderModalOpen, setIsLoaderBtnModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // State to control job details modal
  const [selectedJob, setSelectedJob] = useState(null); // To hold selected job data
  const [errorMessage, setErrorMessage] = useState(""); // Error message for validation
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const columns = [
    {
      title: "Company",
      dataIndex: "employer_name",
      key: "employer_name",
    },
    {
      title: "Job Title",
      dataIndex: "job_title",
      key: "job_title",
    },
  ];
  if (jobs) {
    columns.push({
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div className="flex justify-center gap-2">
          <Button
            text="Generate"
            className="btn-primary h-[30px] px-2 py-4 para-ex-small"
            onClick={() => handleGenerateBtnModal(record)} // Trigger modal on clicking Generate
          />
          <Button
            text="View Details"
            className="btn-secondary h-[30px] px-2 py-4 para-ex-small"
            onClick={() => handleViewDetails(record)} // Trigger modal to view details
          />
        </div>
      ),
    });
  }

  const data = [
    {
      key: "1",
      company: "Panelist",
      title: "Senior/Advanced Back End Developer Node.JS",
    },
    {
      key: "2",
      company: "Panelist",
      title: "Senior/Advanced Back End Developer Node.JS",
    },
    {
      key: "3",
      company: "Panelist",
      title: "Senior/Advanced Back End Developer Node.JS",
    },
    {
      key: "4",
      company: "Panelist",
      title: "Senior/Advanced Back End Developer Node.JS",
    },
    {
      key: "5",
      company: "Panelist",
      title: "Senior/Advanced Back End Developer Node.JS",
    },
    {
      key: "6",
      company: "Panelist",
      title: "Senior/Advanced Back End Developer Node.JS",
    },
    {
      key: "7",
      company: "Panelist",
      title: "Senior/Advanced Back End Developer Node.JS",
    },
  ];

  // Trigger modal on Generate button click and store selected job data
  const handleGenerateBtnModal = (jobData) => {
    // console.log("generate btn clicked", jobData);
    setSelectedJob(jobData); // Store selected job data
    setIsGenerateBtnModalOpen(true); // Open the modal
  };

  // Trigger modal on View Details button click and store selected job data
  const handleViewDetails = (jobData) => {
    setSelectedJob(jobData); // Store the job details to be shown
    setIsDetailsModalOpen(true); // Open the job details modal
  };

  // Start and stop loader
  const handleLoaderModal = (state) => {
    setIsLoaderBtnModalOpen(state); // Set the loader modal state
  };

  // Function to handle resume generation and loader
  // const handleResumeTemplate = async () => {
  //   try {
  //     // Close the modal and start the loader
  //     setIsGenerateBtnModalOpen(false);
  //     handleLoaderModal(true);

  //     const payload = {
  //       title: selectedJob?.title,
  //       company: selectedJob?.company,
  //       description: selectedJob?.description,
  //     };

  //     // API call to generate the resume
  //     const response = await axios.post(
  //       `${ApiUrl}/resume/generateResume`,
  //       payload
  //     );

  //     const resumeData = response.data; // Assuming API returns the entire resume data

  //     console.log("Generated job description Resume:", resumeData);

  //     // Update Redux with the fetched resume data
  //     dispatch(
  //       updateAllSections({
  //         sections: [
  //           resumeData.profile,
  //           resumeData.summary,
  //           resumeData.education,
  //           resumeData.workExperience,
  //           resumeData.skills,
  //           resumeData.languages,
  //           resumeData.hobbies,
  //         ],
  //       })
  //     );

  //     // On success, navigate to the resume page
  //     navigate("/choose-resume");

  //     // Stop the loader after navigating
  //     handleLoaderModal(false);
  //   } catch (err) {
  //     // Stop the loader in case of error
  //     handleLoaderModal(false);
  //     console.error("Error generating resume:", err);
  //   }
  // };

  // Function to fetch jobs from the API
  const handleFetchJobs = async () => {
    // Validate inputs before making API call
    if (!jobTitle) {
      setErrorMessage(
        "Required field. Please fill in the job title and location."
      );
      return; // Stop execution if inputs are invalid
    }

    setErrorMessage(""); // Clear any previous error message
    setIsLoading(true); // Start loader
    try {
      const options = {
        method: "GET",
        url: "https://jsearch.p.rapidapi.com/search",
        params: {
          query: jobTitle,
          // country: location,
        },
        headers: {
          "x-rapidapi-key":
            "6259aacfe6msh79325b0dec8aa1ep1cf779jsnb6795aa2fe8f",
          "x-rapidapi-host": "jsearch.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);
      // console.log("rapid api fetch data", response?.data?.data);
      setJobs(response?.data?.data); // Set the fetched jobs in state
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false); // Stop loader
    }
  };
  // const handleFetchJobs = async () => {
  //   try {
  //     const options = {
  //       method: "GET",
  //       url: "https://jobs-api14.p.rapidapi.com/list",
  //       params: {
  //         query: jobTitle,
  //         location: location,
  //       },
  //       headers: {
  //         "x-rapidapi-key":
  //           "a69be5bc28mshb9c23d0306e2481p1e5be3jsn6c3e5da0e0ea",
  //         "x-rapidapi-host": "jobs-api14.p.rapidapi.com",
  //       },
  //     };

  //     const response = await axios.request(options);
  //     setJobs(response.data); // Set the fetched jobs in state
  //   } catch (error) {
  //     console.error("Error fetching jobs:", error);
  //   }
  // };

  // const handleCoverLetterTemplate = () => {
  //   navigate("/choose-coverletter");
  // };

  // console.log("selectedJob", selectedJob);

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
    // const jobDescription = localStorage.getItem("eData")
    //   ? JSON.parse(localStorage.getItem("eData"))
    //   : null;

    // if (!jobDescription) {
    //   message.error("Job description data is missing for processing.");
    //   setIsLoaderBtnModalOpen(false);
    //   return;
    // }

    // Add job description data to the FormData
    formData.append("title", selectedJob?.job_title || "Default Title");
    formData.append("company", selectedJob?.employer_name || "Default Company");
    formData.append(
      "description",
      selectedJob?.job_description || "Default Job Description"
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
          // generatedResume?.customSections?.header === "Projects" &&
          //   generatedResume?.customSections?.column &&
          //   generatedResume?.customSections?.items?.length > 0 && {
          //     type: "projects",
          //     header: "Projects",
          //     column: generatedResume?.customSections?.column || "right",
          //     items:
          //       generatedResume?.customSections?.items?.map((project) => ({
          //         projectName: project?.projectName || "",
          //         description: project?.description || "",
          //       })) || [],
          //   },
        ];

        console.log("allSections", allSections);
        // Dispatch data to Redux or update local state
        dispatch(updateAllSections({ pdf: true, sections: allSections }));
        setSectionsState((prevState) => ({
          ...prevState,
          sections: allSections,
        }));

        message.success("Resume uploaded and processed successfully!");
        handleViewResume();
        // setGeneratedType("resume"); // Set generated type as "resume"
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

  const handleViewResume = () => {
    // const uid = uuidv4(); // Generate a unique uid
    // // localStorage.setItem("tId", id);

    // dispatch(updateUid(uid)); // Dispatch the generated uid to Redux
    // // navigate(`/view-resume/${templateID}/${uid}`);

    // const path = `/view-resume/${templateID}/${uid}`;
    // // console.log("Navigating to:", path);
    // navigate(path);
    // dispatch(updateTemplateId(id));
    const uid = uuidv4(); // Generate a unique uid
    // localStorage.setItem("tId", id);
    dispatch(updateUid(uid)); // Dispatch the generated uid to Redux
    localStorage.setItem("uid", uid);

    dispatch(updateTemplateId(templateID));
    // setSidState(uid);
    navigate(`/view-resume/${templateID}/${uid}`);
    // setSidState(uid);
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
    // const jobDescription = localStorage.getItem("eData")
    //   ? JSON.parse(localStorage.getItem("eData"))
    //   : null;

    // if (!jobDescription) {
    //   message.error("Job description data is missing for processing.");
    //   setIsLoaderBtnModalOpen(false);
    //   return;
    // }

    // Add job description data to the FormData
    formData.append("title", selectedJob?.job_title || "Default Title");
    formData.append("company", selectedJob?.employer_name || "Default Company");
    formData.append(
      "description",
      selectedJob?.job_description || "Default Job Description"
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
        // setGeneratedType("coverLetter");
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

  const handleViewCoverLetter = () => {
    // Navigate to the view-resume page and pass the selected resume ID
    const uid = uuidv4(); // Generate a unique uid
    // localStorage.setItem("tId", id);
    dispatch(updateCoverLetterUid(uid)); // Dispatch the generated uid to Redux
    // dispatch(updateTemplateId(id));
    // setSidState(uid);
    navigate(`/view-coverletter/1/${uid}`);
  };

  const handleLoaderCoverLetterModal = (state) => {
    setIsLoaderCoverLetterModal(state); // Set the loader modal state
  };

  // console.log("jobs", jobs);
  return (
    <>
      <div className="pb-10 2xl:pb-20">
        <div className="dashboard bg-white py-16">
          <div className="jobBox">
            <div className="mb-8">
              <h2 className="text-center darkGray font-light font-OpenSan">
                <span className="font-bold"> Jobs </span>Library
              </h2>
            </div>

            <div className="mb-2">
              {" "}
              <strong className="ml-1"> Example:</strong>
              <span className="text-red-600 "> web developer in UK</span>
            </div>
            {errorMessage && (
              <div className="mb-4 text-red-500">{errorMessage}</div>
            )}

            <div className="flex flex-col xl:flex-row items-center gap-3 mb-[14px] w-full">
              <div className="flex items-center input-container w-full xl:w-[330px] relative">
                <Icon
                  icon="uil:briefcase"
                  width="20px"
                  height="20px"
                  style={{ color: "#333333" }}
                  className="ml-6"
                />
                <Input
                  type="text"
                  placeholder="web developer in uk"
                  value={jobTitle}
                  onChange={(e) => {
                    setJobTitle(e.target.value);
                    setErrorMessage(""); // Clear error message when typing
                  }}
                />
                {/* Error message */}
              </div>

              {/* <div className="mb-4">
                <p className="mb-2">test</p> */}

              {/* <div className="flex items-center input-container w-full xl:w-[276px] relative">
                <Icon
                  icon="mdi:map-marker"
                  width="20px"
                  height="20px"
                  style={{ color: "#333333" }}
                  className="ml-6"
                />
                <Input
                  type="text"
                  placeholder="Location (Country)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)} // Update state when user types
                />
              </div> */}
              {/* </div> */}
              <Button
                text="Get Jobs"
                className="btn-primary px-[22px] py-2"
                onClick={handleFetchJobs} // Trigger job fetch when "Get Jobs" is clicked
              />
            </div>

            <p className="primary font-semibold font-OpenSan para-small mb-2">
              Generate Resume or Cover Letter with the help of AI
            </p>
            {/* Loader */}
            {/* {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <Spin  size="large" />
              </div>
            ) : ( */}
            <div className="jobTable">
              <Table
                loading={isLoading}
                columns={columns}
                pagination={false}
                dataSource={jobs ? jobs : ""}
                rowHoverable={false}
                scroll={{
                  x: 400,
                }}
              />
            </div>
            {/* )} */}
          </div>
        </div>
      </div>

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
            <Button
              text="Upload Resume"
              className="darkGray w-full py-4 hover:bg-[#2A9DF4] hover:text-white"
              // onClick={() => {
              //   setIsGenerateBtnModalOpen(false); // Close modal
              //   handleLoaderModal(true); // Start loader
              //   handleResumeUpload(); // Call the resume generation function
              // }}

              onClick={() =>
                document.getElementById("resumeUploadInput").click()
              }
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
          <h3 className="text-center font-bold darkGray font-OpenSan mb-8">
            Generating Resume...
          </h3>
          <h3 className="text-center font-bold darkGray font-OpenSan mb-8">
            AI is analyzing...
          </h3>
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

      {/* Job Details Modal */}
      <Modal
        open={isDetailsModalOpen}
        onCancel={() => setIsDetailsModalOpen(false)}
        footer={null}
        width={800}
        centered
      >
        <div className="py-[43px] px-0 sm:px-[50px]px-[50px] modal-wrap">
          <h3 className="text-center font-bold darkGray font-OpenSan mb-8">
            Job Details
          </h3>
          {selectedJob && (
            <div>
              <p>
                <strong>Title:</strong> {selectedJob.job_title}
              </p>
              <p>
                <strong>Company:</strong> {selectedJob.employer_name}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {selectedJob.job_description.split("\n").map((desc, index) => (
                  <p key={index}>{desc}</p>
                ))}
              </p>
              <p>
                <strong>Location:</strong> {selectedJob.job_location}
              </p>
              <p>
                <strong>Employment Type:</strong>{" "}
                {selectedJob.job_employment_type}
              </p>
              <p>
                <strong>Time Posted:</strong>{" "}
                {selectedJob.job_posted_at_datetime_utc?.split("T")[0]}
              </p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default JobsLibrary;
