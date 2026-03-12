import React, { useState } from "react";
import { Modal } from "antd";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import resume from "../assets/images/home/resume1.png";
import resume2 from "../assets/images/home/resume4.png";
import template from "../assets/images/footer/template.webp";
import Button from "../components/shared/button";
import backline from "../assets/images/home/backLine.webp";

const MyResume = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedResume, setSelectedResume] = useState(null);
  const handleResumeModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const resumes = [
    { id: 1, src: resume },
    { id: 2, src: resume2 },
    { id: 3, src: resume },
    { id: 4, src: resume2 },
    { id: 5, src: resume },
    { id: 6, src: resume2 },
    { id: 7, src: resume },
    { id: 8, src: resume2 },
    { id: 9, src: resume },
    { id: 10, src: resume2 },
    { id: 11, src: resume },
    { id: 12, src: resume2 },
    { id: 13, src: resume },
    { id: 14, src: resume2 },
    { id: 15, src: resume },
    { id: 16, src: resume2 },
    { id: 17, src: resume },
    { id: 18, src: resume2 },
  ];

  // const [resume, setResume] = useState({
  //   userId: "",
  //   profile: {
  //     profileImage: "",
  //     name: "",
  //     contactNumber: "",
  //     email: "",
  //     address: "",
  //     jobTitle: "",
  //     links: [""],
  //   },
  //   about: "",
  //   education: [
  //     {
  //       degree: "",
  //       institution: "",
  //       major: "",
  //       graduationYear: "",
  //     },
  //   ],
  //   jobExperiences: [
  //     {
  //       jobTitle: "",
  //       company: "",
  //       duration: "",
  //       description: [""],
  //     },
  //   ],
  //   skills: [
  //     {
  //       name: "",
  //       level: "", // e.g., "Beginner", "Intermediate", "Advanced"
  //     },
  //   ],
  //   languages: [
  //     {
  //       name: "",
  //       proficiency: "", // e.g., "Native", "Fluent", "Conversational"
  //     },
  //   ],
  //   references: [
  //     {
  //       name: "",
  //       relationship: "",
  //       contactInfo: "",
  //     },
  //   ],
  //   customFields: [
  //     {
  //       key: "",
  //       value: "",
  //     },
  //   ],
  // });

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
              My
              <span className="primary"> Resumes</span>
            </h2>
            <h3 className="para-small grayShade6 text-center font-normal font-OpenSan max-w-[978px] m-auto">
              Manage all your resumes in one convenient location. With Neorez,
              you can save multiple versions of your resume, track changes, and
              easily access them whenever you need to apply for new
              opportunities.
            </h3>
          </div>

          <div className="mt-4 md:mt-20  flex flex-wrap justify-center gap-5">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="relative group  overflow-hidden rounded-md"
              >
                <img
                  src={resume.src}
                  alt={`resume image ${resume.id}`}
                  className="opacity-1 w-full"
                />
                <Button
                  className="absolute w-32 h-10 btn-primary translate-x-[25px]  opacity-0 group-hover:opacity-100 group-hover:translate-y-[-60px] group-hover:block transition-all  duration-300 ease-in-out"
                  text="View Template"
                  onClick={() => handleResumeModal(resume.src)}
                />
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
          <img src={template} alt="Selected Resume" />
        </div>
      </Modal>
      <Footer />
    </>
  );
};

export default MyResume;
