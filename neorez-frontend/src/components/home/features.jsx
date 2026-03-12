import React, { useState } from "react";
import ResumeFeature from "./ResumeFeature"; // Import the ResumeFeature component
import Button from "../shared/button"; // Button component
import Swal from "sweetalert2";
import feature1 from "../../assets/images/feature-1.webp";
import feature2 from "../../assets/images/feature-2.webp";
import featureBg from "../../assets/images/home/gradient.webp";
import CoverLetterFeature from "./coverLetterFeature";
import { useNavigate } from "react-router-dom";
const Features = ({ isAdminContent, resumeId, coverLetterId }) => {
  const [isEditingResume, setIsEditingResume] = useState(false); // Track edit state for resume
  const [isEditingCoverLetter, setIsEditingCoverLetter] = useState(false); // Track edit state for cover letter
  const navigate = useNavigate();
  const [resumeFields, setResumeFields] = useState({
    badge: "Resume Builder",
    heading: "Give Your Resume a Fighting Chance",
    body: "Craft a standout resume with our AI-powered Resume Builder! Get tailored templates and instant feedback to optimize your content.",
    features: [
      "ATS Optimization",
      "Increase your chances of getting noticed by applicant tracking systems",
      "Customizable Templates",
      "Choose from a variety of professional designs.",
      "Real-time Feedback",
      "Receive instant suggestions for improvement.",
    ],
    videoBase64: "",
    videoName: "video.mp4",
    videoMimeType: "video/mp4",
    resumeId: "",
    image: feature1,
  });

  const [coverLetterFields, setCoverLetterFields] = useState({
    badge: "AI-Powered Cover Letter Builder",
    heading:
      "Generate a cover letter in seconds with NEOREZ artificial intelligence.",
    body: "Enhance your application with a compelling cover letter! Our Cover Letter Builder offers personalized templates and tips.",
    features: [
      "Craft a personalized, compelling narrative of your career with ease.",
      "Seamlessly match the tone and style of your tailored resume, reinforcing that you’re exactly what the job needs.",
      "In seconds, our AI creates impactful, customized cover letters that make you unforgettable.",
    ],
    videoBase64: "",
    videoName: "cover-letter.mp4",
    videoMimeType: "video/mp4",
    coverLetterId: "123teusdy21g",
    image: feature2,
  });
  const handleClick = () => {
    const user = JSON.parse(localStorage.getItem("user")); 

    if (user) {
      
      if (user?.data?.role === "user") {
        navigate("/dashboard"); 
      } else if (user?.data?.role === "Admin") {
        navigate("/feature-admin"); 
      }
    } else {
      
      navigate("/signin");
    }
  };

  return (
    <div className="feature">
      <div className="container">
        <div className="">
          {/* HEADING */}
          <div>
            <h2 className="text-center darkGray font-semibold">
              Experience Job Search Success <br className="hidden sm:block" />{" "}
              with Our
              <span className="primary"> Key Features </span>
            </h2>
          </div>

          <div>
            {/* Display resume features */}
            <ResumeFeature
              feature={resumeFields}
              isAdminContent={isAdminContent}
              handleClick={handleClick}
            />
            {/* <Button text="Edit Resume" onClick={handleEditToggleResume} /> */}
          </div>
          <section className="coverLetter">
            <div>
              {/* Display cover letter features */}
              <CoverLetterFeature
                feature={coverLetterFields}
                isAdminContent={isAdminContent}
                handleClick={handleClick}
              />
              {/* <Button
              text="Edit Cover Letter"
              onClick={handleEditToggleCoverLetter}
            /> */}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Features;
