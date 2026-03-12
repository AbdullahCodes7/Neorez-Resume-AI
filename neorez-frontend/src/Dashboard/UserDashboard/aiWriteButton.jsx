import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Spin, message } from "antd";
import axios from "axios";
import Button from "../../components/shared/button";
import { updateSection } from "../../redux/resumeSlice2";
import { updateBodyDescription } from "../../redux/coverLetterSlice";

const AiWriteButton = ({ activeEditor, activeIndex }) => {
  const dispatch = useDispatch();

  // console.log("activeEditor activeEditor", activeEditor);

  // Get the resume from Redux
  const resume = useSelector((state) => state.resume.sections);
  const coverLetter = useSelector((state) => state.coverLetter);
  // Get the section based on `activeEditor`
  const section = useSelector((state) =>
    state.resume.sections.find((section) => section.type === activeEditor)
  );

  // console.log("section section", section);

  // Initialize prompt based on active editor and index
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    // Set prompt based on section type (e.g., cover letter body, other sections)
    if (activeEditor === "body") {
      setPrompt(coverLetter.body[activeIndex]?.description || ""); // Cover letter body
    } else if (section?.items?.[activeIndex]) {
      const selectedItem = section.items[activeIndex];
      const initialPrompt =
        selectedItem.description ||
        selectedItem.content ||
        selectedItem.name ||
        "";
      setPrompt(initialPrompt); // For other sections like "about", "skills", etc.
    }
  }, [section, activeIndex, activeEditor]);

  const [isLoading, setIsLoading] = useState(false);
  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;
  let apiUrl = "";

  const handleGenerateResponse = async () => {
    // console.log("prompt", prompt);

    // Ensure prompt is provided
    if (!prompt.trim() && activeEditor !== "skills") {
      message.warning("Please enter a prompt.");
      return;
    }

    setIsLoading(true);

    try {
      if (activeEditor === "body") {
        // For the body of the cover letter, use the cover letter API
        apiUrl = `${ApiUrl}/cover/reGenerateCoverLetterBody`;
      } else {
        // Determine the API URL for other sections
        switch (activeEditor) {
          case "about":
            apiUrl = `${ApiUrl}/resume/generateSummary`;
            break;
          case "skills":
            apiUrl = `${ApiUrl}/resume/generateSkills`;
            break;
          case "education":
            apiUrl = `${ApiUrl}/resume/generateEducationDetails`;
            break;
          case "workExperience":
            apiUrl = `${ApiUrl}/resume/generateJobDescription`;
            break;
          case "strengths":
            apiUrl = `${ApiUrl}/resume/generateStrengths`;
            break;
          case "projects":
            apiUrl = `${ApiUrl}/resume/generateProjectDescription`;
            break;
          case "trainingCourses":
            apiUrl = `${ApiUrl}/resume/generateTrainingCourseDescription`;
            break;
          case "customTitle":
            apiUrl = `${ApiUrl}/resume/generateCustomTitle`;
            break;
          case "summary":
            apiUrl = `${ApiUrl}/resume/generateSummary`;
            break;
          default:
            message.error("Invalid editor type.");
            setIsLoading(false);
            return;
        }
      }

      // Prepare the request data
      const requestData =
        activeEditor === "skills"
          ? { resume } // Send the entire resume for skills generation
          : { prompt }; // Send the prompt for other sections

      // Make the API call
      const response = await axios.post(apiUrl, { requestData });

      // console.log("response.data", response.data);
      const dataField = mapResponseField(activeEditor);
      const responseData = response.data[dataField];

      // Log the response for debugging
      // console.log("responseData", responseData);

      // Update Redux based on editor type
      if (activeEditor === "body") {
        // If it's the cover letter body, update `coverLetter` Redux state
        dispatch(
          updateBodyDescription({
            index: activeIndex,
            description: response.data.description,
          })
        );
      } else {
        // For other sections like about, work experience, etc.
        updateReduxWithAIResponse(activeEditor, activeIndex, responseData);
      }

      message.success("AI content updated successfully!");
    } catch (error) {
      console.error("Error generating AI response:", error);
      message.error("Failed to generate response.");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to map editor type to response field
  const mapResponseField = (type) => {
    const fieldMap = {
      about: "summary",
      education: "details",
      workExperience: "description",
      body: "description",
      strengths: "strengths",
      projects: "projects",
      trainingCourses: "trainingCourse",
      customTitle: "customTitle",
      summary: "summary",
      skills: "skills",
    };
    return fieldMap[type] || "description";
  };

  // Helper function to dispatch the AI-generated response to Redux
  const updateReduxWithAIResponse = (sectionType, index, aiGeneratedText) => {
    // console.log("aiGeneratedText", aiGeneratedText);

    switch (sectionType) {
      case "about":
      case "summary":
      case "strengths":
      case "projects":
      case "customTitle":
      case "education":
        dispatch(
          updateSection({
            type: sectionType,
            data: {
              index,
              items: section.items.map((item, i) =>
                i === index ? { ...item, description: aiGeneratedText } : item
              ),
            },
          })
        );
        break;

      case "workExperience":
        dispatch(
          updateSection({
            type: sectionType,
            data: {
              items: section.items.map((item, i) =>
                i === index ? { ...item, description: aiGeneratedText } : item
              ),
            },
          })
        );
        break;

      case "body":
        dispatch(
          updateBodyDescription({
            index,
            description: aiGeneratedText,
          })
        );
        break;

      case "trainingCourses":
        dispatch(
          updateSection({
            type: sectionType,
            data: {
              items: section.items.map((item, i) =>
                i === index ? { ...item, content: aiGeneratedText } : item
              ),
            },
          })
        );
        break;

      case "skills":
        dispatch(
          updateSection({
            type: sectionType,
            data: {
              items: aiGeneratedText.map((skill) => ({
                name: skill.name || "",
                level: skill.level || "Beginner", // Default to Beginner if no level is provided
              })),
            },
          })
        );
        break;

      default:
        message.error("Unknown section type for updating.");
    }
  };

  return (
    <div className="flex items-center">
      <Button
        text={isLoading ? "Generating..." : "Regenerate"}
        className="btn-primary"
        onClick={handleGenerateResponse}
        disabled={isLoading} // Disable button while loading
      />
      {isLoading && (
        <div className="ml-4">
          <Spin size="small" />
        </div>
      )}
    </div>
  );
};

export default AiWriteButton;
