import React, { useState } from "react";
import { Modal } from "antd";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
// import resume from "../assets/images/home/resume1.png";
// import resume2 from "../assets/images/home/resume4.png";
// import template from "../assets/images/footer/template.webp";
// import resume1 from "../assets/images/templates/resume/resume1.webp";
import resume2 from "../assets/images/templates/resume/resume2.webp";
import resume3 from "../assets/images/templates/resume/resume3.webp";
import resume4 from "../assets/images/templates/resume/resume4.webp";
import resume5 from "../assets/images/templates/resume/resume5.webp";
import resume6 from "../assets/images/templates/resume/resume6.webp";
import resume7 from "../assets/images/templates/resume/resume7.webp";
import resume8 from "../assets/images/templates/resume/resume8.webp";
import resume9 from "../assets/images/templates/resume/resume9.webp";
import resume10 from "../assets/images/templates/resume/resume10.webp";
import resume11 from "../assets/images/templates/resume/resume11.webp";
import Button from "../components/shared/button";
import backline from "../assets/images/home/backLine.webp";
const ResumeTemplates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);

  const handleResumeModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const resumes = [
    // { id: 1, src: resume1 },
    { id: 2, src: resume2 },
    { id: 3, src: resume3 },
    { id: 4, src: resume4 },
    { id: 5, src: resume5 },
    { id: 6, src: resume6 },
    { id: 7, src: resume7 },
    { id: 8, src: resume8 },
    { id: 9, src: resume9 },
    { id: 10, src: resume10 },
    { id: 11, src: resume11 },
    // { id: 12, src: resume2 },
    // { id: 13, src: resume },
    // { id: 14, src: resume2 },
    // { id: 15, src: resume },
    // { id: 16, src: resume2 },
    // { id: 17, src: resume },
    // { id: 18, src: resume2 },
  ];

  return (
    <>
      <div className="absolute top-1 -z-10">
        <img src={backline} alt="" />
      </div>
      <div className="cover">
        <Navbar />
        <div className="container">
          {/* HEADING */}
          <div className="mb-[50px] md:mb-[100px] mt-7 md:mt-40">
            <h2 className="text-center darkGray font-bold font-OpenSan mb-2">
              <span className="primary">Resume</span> Templates
            </h2>
            <h3 className="para-small grayShade6 text-center font-normal font-OpenSan max-w-[978px] m-auto">
              Choose from a wide selection of professionally designed resume
              templates that cater to various industries and job levels. Our
              templates are fully customizable, ensuring you can create a resume
              that reflects your unique style and experience.
            </h3>
          </div>

          <div className="mt-4 md:mt-20 grid grid-cols-3 justify-center items-center gap-4 ">
            {/* <div className="mt-4 md:mt-20 flex flex-wrap justify-center items-center gap-4 "> */}
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="relative group  overflow-hidden rounded-md h-full"
              >
                <img
                  src={resume.src}
                  alt={`resume image ${resume.id}`}
                  className="opacity-1 w-full h-[590px]"
                />
                {/* <Button
                  className="absolute w-32 h-10 btn-primary translate-x-[25px]  opacity-0 group-hover:opacity-100 group-hover:translate-y-[-60px] group-hover:block transition-all  duration-300 ease-in-out"
                  text="View Template"
                  onClick={() => handleResumeModal(resume.src)}
                /> */}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={handleResumeModal}
        footer={null}
        centered
      >
        <div className="mt-4">
          {/* <img src={selectedResume} alt="Selected Resume" className="w-[556.416px] h-[787.416]"/> */}
          {/* <img src={template} alt="Selected Resume" /> */}
        </div>
      </Modal>
      <Footer />
    </>
  );
};

export default ResumeTemplates;
