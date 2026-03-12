import React, { useEffect, useState } from "react";
import Button from "../../components/shared/button";
import Textarea from "../../components/shared/textarea";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateScript = () => {
  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;

  const [isSaved, setIsSaved] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const [activeDocSection, setActiveDocSection] = useState("resume"); // State to manage active section
  const [textValue, setTextValue] = useState({
    professionalSummary: "",
    coverLetterContent: "", // State for cover letter content
  });

  const handleButtonClick = () => {
    if (isSaved) {
      setIsEditable(true);
    } else {
      setIsEditable(false);
    }
    setIsSaved(!isSaved);
  };

  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/update", { state: { textValue, activeDocSection } });
  };

  const handleGetResumePrompt = async () => {
    try {
      const response = await axios.get(`${ApiUrl}/resume/get-all`);
      const promptData = response.data?.[1]?.promptText || {};
      const { professionalSummary } = promptData;

      // Update state based on the fetched data
      setTextValue((prev) => ({
        ...prev,
        professionalSummary: professionalSummary || "",
      }));
    } catch (error) {
      console.error("Error fetching prompts:", error.response);
    }
  };

  // Fetch cover letter prompts
  const handleGetCoverLetterPrompt = async () => {
    try {
      const response = await axios.get(
        `${ApiUrl}/cover/getPrompt/671200dca57d01869ccc25bb`
      ); // Change this URL based on your API structure
      const promptData = response.data;
      // console.log("promptData", promptData);
      const { body } = promptData.promptText; // Extract body from the response

      // Update state based on the fetched data
      setTextValue((prev) => ({
        ...prev,
        coverLetterContent: body || "", // Set cover letter content
      }));
    } catch (error) {
      console.error("Error fetching cover letter prompts:", error.response);
    }
  };

  useEffect(() => {
    if (activeDocSection === "resume") {
      handleGetResumePrompt();
    } else if (activeDocSection === "coverletter") {
      handleGetCoverLetterPrompt();
    }
  }, [activeDocSection]);

  return (
    <>
      <div className="h-auto mb-[40px] lg:mb-[100px] pb-[50px] lg:pb-[120px] bg-white rounded-2xl">
        {/* Heading */}
        <div className="pt-7 mb-[47px] ">
          <h2 className="text-center darkGray font-light font-OpenSan">
            AI Prompt
            <span className="font-bold"> Modification</span>
          </h2>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setActiveDocSection("resume")}
            className={`px-4 py-2 rounded ${
              activeDocSection === "resume"
                ? "btn-primary"
                : "lightGrayBg darkGray"
            }`}
          >
            Resume
          </button>
          <button
            onClick={() => setActiveDocSection("coverletter")}
            className={`ml-2 px-4 py-2 rounded ${
              activeDocSection === "coverletter"
                ? "btn-primary"
                : "lightGrayBg darkGray"
            }`}
          >
            Cover Letter
          </button>
        </div>

        {/* Main Content */}
        <div className="w-[90%] lightGrayBg m-auto rounded-[10px] p-6 updateScript">
          <div className="flex justify-between">
            <h3 className="OpenSan font-semibold darkGray">Script</h3>
            <Button
              text={isSaved ? "Edit" : "Save"}
              className="btn-primary w-[98px]"
              onClick={() => {
                handleButtonClick();
              }}
            />
          </div>
          <div className="script mt-[20px]">
            <Textarea
              rows={15}
              value={
                activeDocSection === "resume"
                  ? textValue.professionalSummary
                  : textValue.coverLetterContent
              }
              onChange={(e) =>
                setTextValue({
                  ...textValue,
                  [activeDocSection === "resume"
                    ? "professionalSummary"
                    : "coverLetterContent"]: e.target.value,
                })
              }
              disabled={!isEditable}
            />
          </div>
          <div className="flex items-center justify-end mt-7">
            <div className="flex items-center gap-[17px]">
              <Button text="Discard" className="btn-outline" />
              <Button
                text="Next"
                onClick={() => {
                  handleNavigation();
                  // handleUpdateprompt();
                }}
                className="btn-primary w-[126px] h-[50px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateScript;
