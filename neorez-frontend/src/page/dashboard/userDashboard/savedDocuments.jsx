import React, { useEffect, useState } from "react";
// import ResumesCatagory from "../../../Dashboard/UserDashboard/Templates/resumeCatagory";
import SaveAsDraft from "./SaveAsDraft";
// import CoverletterCatagory from "../../../Dashboard/UserDashboard/Templates/coverletterCatagory";
import CoverletterSavedDraft from "../../../page/dashboard/userDashboard/coverLetterSaveDraft";
import axios from "axios";
import { useSelector } from "react-redux";
import { fetchCoverLetterData } from "../../../redux/actions/fetchCoverLetter";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const SavedDocuments = () => {
  const [activeDocSection, setActiveDocSection] = useState(
    localStorage.getItem("activeDocSection") || "resume"
  );
  const dispatch = useDispatch();
  const [templateId, setTemplateId] = useState(null); // State to store templateId
  const [coverLetter, setCoverLetter] = useState([]); // Store fetched resumes
  const [resumes, setResumes] = useState([]); // Store fetched resumes
  const [loading, setLoading] = useState(true); // Loading state
  // Retrieve the user object from localStorage
  const userString = localStorage.getItem("user");
  // const Location = useLocation();
  // Parse the JSON string into an object
  const user = JSON.parse(userString);
  const userGoogleId = user?.userId;

  // console.log("location.state", Location.state.data == "coverletter");

  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;
  const userId = useSelector(
    (state) => state.user?.userInfo?.data?._id || userGoogleId
  );

  const handleGetResumes = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${ApiUrl}/resume/resumes/${userId}`);
      const resumeData = response.data;
      // console.log("resume data things", resumeData);
      // Assuming you want to set the first resume's templateId
      if (resumeData && resumeData.length > 0) {
        setResumes(resumeData); // Store the fetched resumes
      }
      setLoading(false); // Hide deletion loader

      // console.log("Fetched resumeData:", resumeData);
    } catch (error) {
      setLoading(false); // Hide deletion loader

      console.error("Error fetching resume data:", error);
    }
  };
  const handleGetCoverLetters = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${ApiUrl}/cover/${userId}`);
      const coverLetterData = response.data;

      // console.log("coverLetterDatacoverLetterData", coverLetterData);
      // Assuming you want to set the first resume's templateId
      if (coverLetterData && coverLetterData.length > 0) {
        setCoverLetter(coverLetterData); // Store the fetched cover letters
      }
      setLoading(false); // Hide deletion loader

      // console.log("Fetched coverLetterData:", coverLetterData);
    } catch (error) {
      setLoading(false); // Hide deletion loader

      console.error("Error fetching cover letter data:", error);
    }
  };

  useEffect(() => {
    handleGetCoverLetters();
    handleGetResumes();
  }, []);

  const getHeading = () => {
    switch (activeDocSection) {
      case "resume":
        return "Resumes";
      case "coverletter":
        return "Coverletter";
      default:
        return "Saved Document";
    }
  };

  return (
    <div className="h-auto mb-[40px] pb-[50px] sm:pb-[70px] bg-white rounded-2xl">
      {/* Heading */}
      <div className="pt-7 mb-[47px] ">
        <h2 className="text-center darkGray font-light font-OpenSan">
          Saved <span className="font-bold"> {getHeading()}</span>
        </h2>
      </div>
      {/* Toggle Buttons */}
      <div className="flex justify-center md:justify-start px-10 py-4 ">
        <div className="p-1 rounded lightGrayBg flex items-center justify-start sm:gap-[11px]">
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

      <div>
        {activeDocSection === "resume" && (
          <SaveAsDraft
            isSaveResumePage={true}
            userId={userId}
            templateId={templateId} // Pass templateId here
            resumes={resumes} // Pass the fetched resumes here
            handleGetResumes={handleGetResumes}
            setResumes={setResumes}
            loading={loading} // Show loading spinner when fetching resumes
          />
        )}
        {activeDocSection === "coverletter" && (
          <CoverletterSavedDraft
            isSavePage={true}
            userId={userId}
            coverLetter={coverLetter}
            handleGetCoverLetters={handleGetCoverLetters}
            setCoverLetter={setCoverLetter}
            loading={loading} // Show loading spinner when fetching cover letters
          />
        )}
      </div>
    </div>
  );
};

export default SavedDocuments;
