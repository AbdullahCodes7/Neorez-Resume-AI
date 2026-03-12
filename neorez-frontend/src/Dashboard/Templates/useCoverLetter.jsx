import React, { useState } from "react";
import ResumeTemplate2 from "./resumeTemplate2";
import { Modal } from "antd";
import Button from "../../components/shared/button";
import save from "../../assets/icons/dashboard/save.svg";
import copy from "../../assets/icons/dashboard/copy.svg";

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
import CoverLetterTemplate from "./coverLetterTemplate";
import adjustEdit from "../../assets/icons/dashboard/adjustEdit.svg";

const UseCoverLetterTemplate = () => {
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/dashboard");
  };
  const handleSaveModal = () => {
    setIsSaveModalOpen(!isSaveModalOpen);
  };

  const handleAiModal = () => {
    setIsAiModalOpen(!isAiModalOpen);
  };

  const contentAi = (
    <div>
      <div className="modal-wrap bg-white absolute flex gap-[10px] justify-center items-center w-[250px]  py-1 rounded-md ">
        {/* Text Section */}
        <div className="relative group cursor-pointer">
          <div className="flex items-center gap-3 ">
            <img src={text} alt="Icon" />
            <img src={border} alt="Icon" />
          </div>
          {/* Hover text */}
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out absolute top-[-40px] left-0 w-[90px] flex gap-[10px] justify-start items-center py-[7px] px-[10px] bg-white rounded-md">
            <img src={fontStyle} alt="font styles" />
            <img src={link} alt="link" />
          </div>
        </div>
        {/* Calendar Section */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img src={calender} alt="Icon" />
          <img src={border} alt="Icon" />
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <img src={writer} alt="Icon" />
          <img src={border} alt="Icon" />
        </div>
        <div className="group">
          <Button
            text="AI Writer"
            className="btn-primary group-hover:scale-125"
            onClick={handleAiModal}
          />
        </div>
      </div>
    </div>
  );
  const contentSave = (
    <div>
      <p className="darkGray para-ex-small font-OpenSan font-bold px-3 py-2">
        Save
      </p>
    </div>
  );
  const contentCopy = (
    <div>
      <p className="darkGray para-ex-small font-OpenSan font-bold px-3 py-2">
        Copied to Clipboard
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
      <div className="h-auto pb-[30px] bg-white rounded-2xl resume">
        {/* Heading */}
        <div className="pt-7 mb-[47px] ">
          <h2 className="text-center darkGray font-light font-OpenSan">
            Cover Letter
            <span className="font-bold"> Templates</span>
          </h2>
        </div>

        <div className="flex gap-[30px] px-6">
          <div className="relative">
            <div>
              <Popover content={contentAi}>
                <div>
                  <CoverLetterTemplate />
                </div>
              </Popover>
            </div>
            <div>
              <img
                src={adjustEdit}
                alt="icon"
                className="absolute top-[225px] right-[66px]"
              />
            </div>
            <div className="modal-wrap">
              <div className="flex items-center justify-end gap-1 absolute top-[50px] right-[50px] ">
                <div className="iconContainer" onClick={handleSaveModal}>
                  <Popover content={contentCopy} title={null}>
                    <img src={copy} alt="copy Icon" />
                  </Popover>
                </div>
                <div className="iconContainer" onClick={handleSaveModal}>
                  <Popover content={contentSave}>
                    <img src={save} alt="copy Icon" onClick={handleSaveModal} />
                  </Popover>
                </div>
                <div className="iconContainer" onClick={handleSaveModal}>
                  <Popover content={contentDownload}>
                    <img src={download} alt="Download Icon" />
                  </Popover>
                </div>
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

      {/* Saved Successfully Modal*/}
      <Modal
        open={isSaveModalOpen}
        onCancel={handleSaveModal}
        footer={null}
        centered
        // width="484px"
      >
        <div className="py-[20px]  modal-wrap flex flex-col items-center justify-center gap-[42px]">
          <img src={check} alt="Icon" />

          <h3 className="font-OpenSan font-semibold ">Saved Successfully</h3>

          <Button
            text="Continue"
            className="btn-primary w-32"
            onClick={handleNavigate}
          />
        </div>
      </Modal>
    </>
  );
};

export default UseCoverLetterTemplate;
