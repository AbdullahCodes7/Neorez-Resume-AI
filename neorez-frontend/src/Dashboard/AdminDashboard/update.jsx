import React, { useEffect, useState } from "react";
import Button from "../../components/shared/button";
import check from "../../assets/icons/dashboard/check.svg";
import { Modal } from "antd";
import { Select, Slider, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Update = () => {
  const location = useLocation();
  // console.log("location", location);

  const activeDocSection = location.state?.activeDocSection || "resume";
  // console.log(location.state);
  // const ApiUrl = "http://localhost:5000";
  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;
  const navigate = useNavigate();
  const [updatePrompt, setUpdatePrompt] = useState({
    professionalSummary: "", // For resume
    body: "", // For cover letter
    temperature: location?.state?.textValue?.parameters?.temperature || "0.5",
    maxTokens: location?.state?.textValue?.parameters?.maxTokens || "1500",
    model: location?.state?.textValue?.parameters?.model || "gpt-4o",
  });
  const [stepsCount, setStepsCount] = useState(5);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const handleUpdateModal = () => {
    setIsUpdateModalOpen(!isUpdateModalOpen);
  };

  // console.log(updatePrompt);

  // useEffect(() => {
  //   if (location.state?.textValue) {
  //     setUpdatePrompt((prev) => ({
  //       ...prev,
  //       professionalSummary: location?.state?.textValue?.professionalSummary,
  //     }));
  //   }
  // }, [location.state]);

  useEffect(() => {
    if (location.state?.textValue) {
      if (activeDocSection === "coverletter") {
        setUpdatePrompt((prev) => ({
          ...prev,
          body: location.state.textValue.coverLetterContent || "", // Set body for cover letter
        }));
      } else {
        setUpdatePrompt((prev) => ({
          ...prev,
          professionalSummary:
            location.state.textValue.professionalSummary || "", // Set professionalSummary for resume
        }));
      }
    }
  }, [location.state, activeDocSection]);

  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    setUpdatePrompt((prev) => ({
      ...prev,
      model: value,
    }));
  };

  // Update sliders and select value
  const handleSliderChange = (field) => (value) => {
    setUpdatePrompt((prev) => ({ ...prev, [field]: value }));
  };

  // const handleUpdateprompt = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${ApiUrl}/resume/update-prompt/66d83b233dd93b0011256b72`,
  //       {
  //         promptText: updatePrompt,
  //       }
  //     );
  //     // console.log(response);
  //     toast.success("Script Updated Successfully");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleUpdateprompt = async () => {
    try {
      // Prepare prompt data
      const promptData = {
        promptText: {
          professionalSummary:
            activeDocSection === "resume"
              ? updatePrompt.professionalSummary
              : undefined, // Send professionalSummary if it's a resume
          body:
            activeDocSection === "coverletter" ? updatePrompt.body : undefined, // Send body if it's a cover letter
          temperature: updatePrompt.temperature,
          maxTokens: updatePrompt.maxTokens,
          model: updatePrompt.model,
        },
        // documentType: activeDocSection, // Include the active section type
      };

      // Determine the API endpoint based on activeDocSection
      const apiUrl =
        activeDocSection === "resume"
          ? `${ApiUrl}/resume/update-prompt/66d83b233dd93b0011256b72`
          : `${ApiUrl}/cover/update-prompt/671200dca57d01869ccc25bb`; // Update this URL to match your cover letter endpoint

      // Make the API call
      const response = await axios.post(apiUrl, promptData);

      toast.success("Script Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = () => {
    navigate("/update-script");
  };
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

        {/* Main Content */}
        <div className="w-[90%] lightGrayBg m-auto rounded-[10px] p-6 updateScript">
          <div className="flex justify-between">
            <h3 className="OpenSan font-semibold darkGray">Script</h3>
          </div>
          <div className="script mt-[20px] ">
            <div className="grid lg10:grid-cols-2  py-7">
              <div className="flex flex-col w-full lg10:w-[80%]  gap-8 sliderUpdate">
                <div className="flex flex-col  gap-2">
                  <div className="flex justify-between">
                    <h4 className="para-small font-semibold font-OpenSan darkGray">
                      Temperature
                    </h4>
                    <div className="px-4 py-1 rounded-[8px] bg-[#FAFAFA]">
                      <p className="para-small font-semibold font-OpenSan darkGray">
                        {updatePrompt.temperature || 0.5}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Typography.Title level={0.5} />
                    <Slider
                      min={0.1}
                      max={0.9}
                      step={0.1}
                      value={updatePrompt.temperature || 0.5}
                      onChange={handleSliderChange("temperature")}
                    />
                  </div>
                </div>

                <div className="flex flex-col  gap-2 hidden">
                  <div className="flex justify-between">
                    <h4 className="para-small font-semibold font-OpenSan darkGray">
                      Top P
                    </h4>
                    <div className="px-4 py-1 rounded-[8px] bg-[#FAFAFA]">
                      <p className="para-small font-semibold font-OpenSan darkGray">
                        1
                      </p>
                    </div>
                  </div>
                  <div>
                    <Typography.Title level={5} />
                    <Slider
                      min={2}
                      max={10}
                      value={stepsCount}
                      onChange={setStepsCount}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 hidden">
                  <div className="flex justify-between">
                    <h4 className="para-small font-semibold font-OpenSan darkGray">
                      Presence Penality
                    </h4>
                    <div className="px-4 py-1 rounded-[8px] bg-[#FAFAFA]">
                      <p className="para-small font-semibold font-OpenSan darkGray">
                        0
                      </p>
                    </div>
                  </div>
                  <div>
                    <Typography.Title level={5} />
                    <Slider
                      min={2}
                      max={10}
                      value={stepsCount}
                      onChange={setStepsCount}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 lg10:mt-0 flex flex-col w-full lg10:w-[80%]  gap-8 sliderUpdate">
                <div className="flex flex-col  gap-2">
                  <div className="flex justify-between">
                    <h4 className="para-small font-semibold font-OpenSan darkGray">
                      Maximum Tokens
                    </h4>
                    <div className="px-4 py-1 rounded-[8px] bg-[#FAFAFA]">
                      <p className="para-small font-semibold font-OpenSan darkGray">
                        {updatePrompt.maxTokens || 1500}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Typography.Title level={1500} />
                    <Slider
                      min={1000}
                      max={4096}
                      value={updatePrompt.maxTokens || 1500}
                      onChange={handleSliderChange("maxTokens")}
                    />
                  </div>
                </div>

                <div className="flex flex-col  gap-2 hidden">
                  <div className="flex justify-between">
                    <h4 className="para-small font-semibold font-OpenSan darkGray">
                      Frequency Penality
                    </h4>
                    <div className="px-4 py-1 rounded-[8px] bg-[#FAFAFA]">
                      <p className="para-small font-semibold font-OpenSan darkGray">
                        0
                      </p>
                    </div>
                  </div>
                  <div>
                    <Typography.Title level={5} />
                    <Slider
                      min={2}
                      max={10}
                      value={stepsCount}
                      onChange={setStepsCount}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 hidden">
                  <div className="flex flex-col gap-3">
                    <h4 className="para-small font-semibold font-OpenSan darkGray">
                      Presence Penality
                    </h4>
                    <div className="w-full">
                      <Select
                        defaultValue="Select Modal"
                        popupClassName="update-dropdown"
                        style={{
                          width: "100%",
                        }}
                        dropdownStyle={{ backgroundColor: "#F2F2F2" }}
                        onChange={handleChange}
                        options={[
                          {
                            label: (
                              <span className="grayShade6 text-[14px] font-normal font-OpenSan">
                                GPT-3.5-turbo-0125
                              </span>
                            ),
                            value: "gpt3.5",
                          },
                          {
                            label: (
                              <span className="grayShade6 text-[14px] font-normal font-OpenSan">
                                GPT-4
                              </span>
                            ),
                            value: "gpt4",
                          },
                          {
                            label: (
                              <span className="grayShade6 text-[14px] font-normal font-OpenSan">
                                GPT-4-0314
                              </span>
                            ),
                            value: "gpt403",
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex  items-center justify-end mt-7">
            <div className="flex items-center gap-[17px]">
              <Button text="Discard" className="btn-outline" />
              <Button
                text="Update"
                className="btn-primary w-[126px] h-[50px]"
                onClick={handleUpdateModal}
              />
              <Button
                text="Back"
                className="btn-primary w-[126px] h-[50px]"
                onClick={handleNavigate}
              />
            </div>
          </div>
        </div>
      </div>
      {/* UPDATE MODAL */}
      <Modal
        open={isUpdateModalOpen}
        onCancel={handleUpdateModal}
        footer={null}
        centered
        // width="484px"
      >
        <div className="py-[20px]  modal-wrap flex flex-col items-center justify-center gap-[42px]">
          <img src={check} alt="Icon" />

          <h3 className="font-OpenSan font-semibold ">
            Prompt Updated Succesfully
          </h3>

          <div className="flex items-center gap-[17px]">
            <Button text="Discard" className="btn-outline" />
            <Button
              text="Continue"
              className="btn-primary w-[126px] h-[50px]"
              onClick={() => {
                handleUpdateModal();
                handleUpdateprompt();
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Update;
