import React, { useState } from "react";
import ResumeTemplate2 from "./resumeTemplate2";
import { Modal } from "antd";
import Button from "../../components/shared/button";
import save from "../../assets/icons/dashboard/save.svg";
import edit from "../../assets/icons/dashboard/edit.svg";
import download from "../../assets/icons/dashboard/download.svg";
import check from "../../assets/icons/dashboard/check.svg";
import del from "../../assets/icons/dashboard/delete.svg";
import { Popover } from "antd";
import { useNavigate } from "react-router-dom";
import calender from "../../assets/icons/dashboard/calender.svg";
import text from "../../assets/icons/dashboard/text.svg";
import writer from "../../assets/icons/dashboard/write.svg";
import border from "../../assets/icons/dashboard/border.svg";
import fontStyle from "../../assets/icons/dashboard/fontStyle.svg";
import link from "../../assets/icons/dashboard/link.svg";
import Input from "../../components/shared/input";
import Textarea from "../../components/shared/textarea";
import { useSelector } from "react-redux";
import axios from "axios";

const UseResumeTemplate = () => {
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const navigate = useNavigate();
  // const ApiUrl = "http://localhost:5000";
  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;

  const resume = useSelector((state) => state.resume);
  const user = useSelector((state) => state?.user?.userInfo);
  // console.log(user);
  // console.log(resume);
  const handleNavigate = () => {
    navigate("/dashboard");
  };
  const handleSaveModal = async () => {
    const userId = user?.data?._id;
    try {
      const resumeWithUserId = {
        ...resume,
        userId: userId,
      };
      const response = await axios.post(
        `${ApiUrl}/resume/create`,
        resumeWithUserId
      );
      // console.log(response.data);
      if (response.data.seccess) {
        setIsSaveModalOpen(!isSaveModalOpen);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAiModal = () => {
    setIsAiModalOpen(!isAiModalOpen);
    if (isEditModalOpen) {
      setIsEditModalOpen(false);
    }
  };

  const handleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
    if (isAiModalOpen) {
      setIsAiModalOpen(false);
    }
  };

 
  const contentSave = (
    <div>
      <p className="darkGray para-ex-small font-OpenSan font-bold px-3 py-2">
        Save
      </p>
    </div>
  );
  const contentEdit = (
    <div>
      <p className="darkGray para-ex-small font-OpenSan font-bold px-3 py-2">
        Adjust Edit
      </p>
    </div>
  );
  const contentDownload = (
    <div>
      <p className="darkGray para-ex-small font-OpenSan font-bold px-3 py-2">
        Download
      </p>
    </div>
  );

  return (
    <>
      <div className="h-auto pb-[80px] bg-white rounded-2xl resume">
        {/* Heading */}
        <div className="pt-7 mb-[47px] ">
          <h2 className="text-center darkGray font-light font-OpenSan">
            Resume
            <span className="font-bold"> Templates</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-[30px] px-6">
          <div className="relative ai-popover">
            <div>
           
              <div>
                <ResumeTemplate2 />
              </div>
        
            </div>
          </div>
          <div>
            {/* AI Modal*/}
            {isAiModalOpen && (
              <div className="resume-outline px-[50px] modal-wrap flex flex-col items-center  gap-[30px]  py-[24px]">
                <p className="para-large font-OpenSan font-normal text-center darkGray">
                  Write with AI
                </p>
                <form action="" className="ai flex flex-col gap-5 mt-10">
                  <div>
                    <p className="font-OpenSan font-normal black para-small mb-2">
                      Enter Prompt
                    </p>
                    <div className="flex items-center input-container  overflow-hidden relative w-[716px]">
                      <Input type="text" placeholder="Type here" />
                      <Button
                        text="Generate"
                        className="btn-primary px-[22px] py-2 absolute right-2 font-normal"
                      />
                    </div>
                  </div>
                  <div>
                    <Textarea
                      label="AI Response"
                      rows={9}
                      placeholder="Lorem ipsum dolor sit amet consectetur. Quis facilisi justo integer malesuada. Augue quis mauris vitae amet adipiscing semper suspendisse velit. Volutpat morbi et lacus nec,  Augue quis mauris vitae amet adipiscing semper suspendisse velit. Volutpat morbi et lacus nec"
                    />
                  </div>
                  <div className="flex justify-center">
                    <Button
                      text="Update"
                      className="btn-primary w-[142px] font-normal py-[10px]"
                      onClick={handleAiModal}
                    />
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

     
    </>
  );
};

export default UseResumeTemplate;
