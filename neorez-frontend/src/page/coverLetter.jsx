import React, { useState } from "react";
import { Modal } from "antd";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import CoverLetter7 from "../assets/images/templates/cv/letter1.png";
import CoverLetter1 from "../assets/images/templates/cv/letter2.png";
import CoverLetter8 from "../assets/images/templates/cv/letter3.png";
import CoverLetter6 from "../assets/images/templates/cv/letter4.png";
import CoverLetter5 from "../assets/images/templates/cv/letter5.png";
import CoverLetter4 from "../assets/images/templates/cv/letter6.png";
import CoverLetter3 from "../assets/images/templates/cv/letter7.png";
import CoverLetter2 from "../assets/images/templates/cv/letter8.png";
import CoverLetter9 from "../assets/images/templates/cv/letter9.png";

// import resume from "../assets/images/footer/cv1.webp";
// import resume2 from "../assets/images/footer/cv2.webp";
// import template from "../assets/images/footer/template2.webp";
import Button from "../components/shared/button";
import backline from "../assets/images/home/backLine.webp";

const CoverLetter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);
  const handleResumeModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const resumes = [
    { id: 1, src: CoverLetter1 },
    { id: 2, src: CoverLetter2 },
    { id: 3, src: CoverLetter3 },
    { id: 4, src: CoverLetter4 },
    { id: 5, src: CoverLetter5 },
    { id: 6, src: CoverLetter6 },
    { id: 7, src: CoverLetter7 },
    { id: 8, src: CoverLetter8 },
    { id: 9, src: CoverLetter9 },
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
              <span className="primary">Cover Letter</span> Templates
            </h2>
            <h3 className="para-small grayShade6 text-center font-normal font-OpenSan max-w-[978px] m-auto">
              Craft the perfect cover letter with our customizable templates.
              Each template is designed to complement your resume and
              effectively convey your personality and qualifications to
              potential employers.
            </h3>
          </div>

          {/* <div className="mt-4 md:mt-20 flex flex-wrap gap-4 justify-center"> */}
          <div className="mt-4 md:mt-20 grid grid-cols-3 gap-4 justify-center">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="relative group  overflow-hidden rounded-md"
                style={{ boxShadow: "0px 0px 10px 0px rgba(153, 153, 153, 1)" }}
              >
                <img
                  src={resume.src}
                  alt={`resume image ${resume.id}`}
                  className="opacity-1 w-full h-full"
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

export default CoverLetter;
