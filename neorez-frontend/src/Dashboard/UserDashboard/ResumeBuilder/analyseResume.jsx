import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Button from "../../../components/shared/button";
import ResumeMatchCard from "./resumeChart";
import { useSectionsContext } from "../../../App";
import { isEqual } from "lodash";

const AnalyseResume = () => {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false); // Button enable/disable state

  const resume = useSelector((state) => state.resume.sections); // Resume sections data
  const extension = useSelector((state) => state.resume.extension);
  const { extensionState } = useSectionsContext(); // Get context state
  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;

  // console.log("extensionState", extensionState);
  // const [previousResume, setPreviousResume] = useState(null); // To store previous resume data

  // Function to fetch the resume score based on current resume data
  const fetchResumeScore = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${ApiUrl}/resume/generateResumeScore`,
        {
          data: resume, // Send the current resume sections to the API
        }
      );
      const result = response.data;
      // console.log("Fetched resume data:", result);

      setResumeData(result); // Set the response data
    } catch (error) {
      setError("Failed to fetch resume score. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false); // Stop loading once the fetch is complete
    }
  };

  // Function to fetch the resume score from the extension
  const fetchResumeScoreFromExtension = async () => {
    setLoading(true);
    setError(null);

    const storedData = localStorage.getItem("eData");
    let parsedData;

    if (storedData) {
      // console.log("Found stored job data:", storedData);
      parsedData = JSON.parse(storedData);
    }

    const payload = {
      resume, // Pass the resume state
      extension: parsedData || extensionState,
    };

    try {
      const response = await axios.post(
        `${ApiUrl}/resume/generateResumeScoreExtension`,
        {
          data: payload,
        }
      );
      const result = response.data?.score;
      // console.log("Fetched resume data:", result);

      setResumeData(result);
    } catch (error) {
      setError("Failed to fetch resume score. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const isFirstRender = useRef(true);
  const previousResume = useRef(null);
  // useEffect(() => {
  //   if (extension === true) {
  //     fetchResumeScoreFromExtension();
  //   } else {
  //     fetchResumeScore();
  //   }
  // }, [extension]);

  // Automatically trigger analysis when resume changes
  const previousResumeString = useRef(null);
  const resumeString = JSON.stringify(resume);
  useEffect(() => {
    // if (isFirstRender.current) {
    //   isFirstRender.current = false;
    //   return; // Skip API call on initial render
    // }

    // Deep comparison using lodash (or your preferred method)
    if (!isEqual(resume, previousResume.current)) {
      // Use Lodash or deep comparison
      previousResume.current = resume; // Update previous resume data
      if (extension === true) {
        fetchResumeScoreFromExtension();
      } else {
        fetchResumeScore();
      }
    }
  }, [resume]);

  const handleAnalyzeAgain = () => {
    if (extension === true) {
      fetchResumeScoreFromExtension();
    } else {
      fetchResumeScore();
    }

    // setPreviousResume(resume);
  };

  useEffect(() => {
    // console.log("previousResume", previousResume);
    if (
      previousResume &&
      JSON.stringify(resume) !== JSON.stringify(previousResume)
    ) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [resume, previousResume]);

  // useEffect(() => {
  //   if (resume) {
  //     setPreviousResume(resume);
  //   }
  // }, []);

  return (
    <div className="left-Area modal-wrap p-5 bg-white rounded-lg flex flex-col gap-11 justify-center items-center">
      <div className="sliderDesign flex flex-col gap-5 justify-center items-center ">
        <h2 className="text-center font-light darkGray font-OpenSan mb-2">
          Resume <span className="font-bold">Analysis Result</span>
        </h2>
        {loading ? (
          <div className="h-[359px] flex flex-col items-center justify-center gap-[42px]">
            <h3 className="text-center font-bold darkGray font-OpenSan mb-8">
              Analyzing Resume
            </h3>
            <div className="loader"></div>
          </div>
        ) : (
          resumeData && (
            <>
              <div className="w-full flex items-center flex-col gap-3">
                <ResumeMatchCard
                  score={resumeData.overallScore}
                  review={resumeData.reviewInOneLine}
                  resumeData={resumeData}
                />
                {/* <Button
                  text="Analyse Again"
                  className="btn-primary mt-4"
                  onClick={handleAnalyzeAgain}
                  disabled={!isButtonEnabled}
                /> */}
              </div>
              <div className="flex gap-2 items-center hidden">
                <h3 className="font-OpenSan font-bold">Score:</h3>
                <h3 className="font-medium font-OpenSan">
                  {resumeData.overallScore}
                </h3>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default AnalyseResume;
