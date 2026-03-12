import { Modal } from "antd";
import React, { useState } from "react";
import resumeTemplate from "../../../assets/images/dashboard/resume-template.webp";
import Button from "../../../components/shared/button";
// import resumeTemplate from "../../../assets/images/dashboard/resume-template.webp";
import resume1 from "../../../assets/images/templates/resume/resume1.webp";
import resume2 from "../../../assets/images/templates/resume/resume2.webp";
import resume3 from "../../../assets/images/templates/resume/resume3.webp";
import resume4 from "../../../assets/images/templates/resume/resume4.webp";
import resume5 from "../../../assets/images/templates/resume/resume5.webp";
import resume6 from "../../../assets/images/templates/resume/resume6.webp";
import resume7 from "../../../assets/images/templates/resume/resume7.webp";
import resume8 from "../../../assets/images/templates/resume/resume8.webp";
import resume9 from "../../../assets/images/templates/resume/resume9.webp";
import resume10 from "../../../assets/images/templates/resume/resume10.webp";
import resume11 from "../../../assets/images/templates/resume/resume11.webp";
import { useDispatch } from "react-redux";
import { updateTemplateId, updateUid } from "../../../redux/resumeSlice2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";
// const SelectTemplate = ({ isTemplateModalOpen, setIsTemplateModalOpen }) => {
const SelectTemplate = ({ setActiveTab }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uid = useSelector((state) => state.resume.uid);

  // Template Modal
  // const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const handleTemplateModal = () => {
    setIsTemplateModalOpen(!isTemplateModalOpen);
  };
  const resume = [
    // {
    //   id: 1,
    //   src: resume1,
    //   // title: "Software Engineer"
    // },
    {
      id: 2,
      src: resume2,
      // title: "Graphic Designer"
    },
    {
      id: 3,
      src: resume3,
      // title: "UI Designer"
    },
    {
      id: 4,
      src: resume4,
      // title: "Quality Assurance"
    },
    {
      id: 5,
      src: resume5,
      // title: "Frontend Developer"
    },
    {
      id: 6,
      src: resume6,
      // title: "Software Engineer"
    },
    {
      id: 7,
      src: resume7,
      //  title: "Graphic Designer"
    },
    {
      id: 8,
      src: resume8,
      // title: "UI Designer"
    },
    {
      id: 9,
      src: resume9,
      // title: "Quality Assurance"
    },
    {
      id: 10,
      src: resume10,
      // title: "Frontend Developer"
    },
    {
      id: 11,
      src: resume11,
      // title: "Software Engineer"
    },
    // { id: 12, src: resumeTemplate, title: "Graphic Designer" },
    // { id: 13, src: resumeTemplate, title: "UI Designer" },
    // { id: 14, src: resumeTemplate, title: "Quality Assurance" },
    // { id: 15, src: resumeTemplate, title: "Frontend Developer" },
    // { id: 16, src: resumeTemplate, title: "Frontend Developer" },
    // { id: 17, src: resumeTemplate, title: "Frontend Developer" },
    // { id: 18, src: resumeTemplate, title: "Frontend Developer" },
    // { id: 19, src: resumeTemplate, title: "Frontend Developer" },
    // { id: 20, src: resumeTemplate, title: "Frontend Developer" },
  ];

  const handleViewResume = (id) => {
    const uid = localStorage.getItem("uid");

    // Navigate to the view-resume page and pass the selected resume ID
    dispatch(updateTemplateId(id));
    dispatch(updateUid(uid));
    localStorage.setItem("tId", id);
    navigate(`/view-resume/${id}/${uid}`, {
      state: {
        fromTemplatePage: true,
      },
    });
  };
  return (
    <>
      {/*Select Template  modal */}

      <div className="pt-4 px-4 pb-4 left-Area h-[95vh] overflow-auto template">
        <div className="flex justify-end items-center cursor-pointer mt-2">
          <Icon
            icon="radix-icons:cross-2"
            width="20px"
            height="20px"
            className="text-black hover:text-blue-500"
            onClick={() => setActiveTab(null)}
          />
        </div>
        <p className="text-center para-large font-OpenSan font-semibold darkGray mb-[34px]">
          Select <span className="primary"> Templates</span>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {resume.map((resume) => (
            <div key={resume.id} className="groupWrap ">
              <div className="bg-[#F2F2F2] bgHover rounded-[12px] flex flex-col gap-3 items-center justify-center p-5">
                <div className="relative group overflow-hidden rounded-md">
                  <img
                    src={resume.src}
                    alt={`resume image ${resume.id}`}
                    className="opacity-1 w-[192px] h-[271px]"
                  />

                  <Button
                    className="group-hover absolute w-[90%] btn-primary left-[10px] opacity-0 transition-all duration-300 ease-in-out"
                    text="Use Template"
                    minHeight={41}
                    onClick={() => handleViewResume(resume.id)}
                  />
                </div>
                <p className="para-small font-OpenSan darkGray font-semibold">
                  {resume.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectTemplate;
