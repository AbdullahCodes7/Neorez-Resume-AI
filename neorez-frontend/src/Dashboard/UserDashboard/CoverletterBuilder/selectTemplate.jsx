import { Modal } from "antd";
import React, { useState } from "react";
import coverletterTemplate from "../../../assets/images/dashboard/coverletterTemp.webp";
import Button from "../../../components/shared/button";
import CoverLetter7 from "../../../assets/images/templates/cv/letter1.png";
import CoverLetter1 from "../../../assets/images/templates/cv/letter2.png";
import CoverLetter8 from "../../../assets/images/templates/cv/letter3.png";
import CoverLetter6 from "../../../assets/images/templates/cv/letter4.png";
import CoverLetter5 from "../../../assets/images/templates/cv/letter5.png";
import CoverLetter4 from "../../../assets/images/templates/cv/letter6.png";
import CoverLetter3 from "../../../assets/images/templates/cv/letter7.png";
import CoverLetter2 from "../../../assets/images/templates/cv/letter8.png";
import CoverLetter9 from "../../../assets/images/templates/cv/letter9.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  updateCLTemplateId,
  updateCoverLetterUid,
} from "../../../redux/coverLetterSlice";
import { saveCoverLetterData } from "../../../redux/actions/SaveCoverLEtter";
import { v4 as uuidv4 } from "uuid";
import { Icon } from "@iconify/react/dist/iconify.js";
const SelectTemplateCoverletter = ({ setActiveTab }) => {
  // Template Modal
  // const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.coverLetter.uid);

  // console.log("uid", uid);
  const navigate = useNavigate();
  // const handleTemplateModal = () => {
  //   setIsClTemplateModalOpen(!isClTemplateModalOpen);
  // };
  const coverletter = [
    {
      id: 1,
      src: CoverLetter9,
      // , title: "Software Engineer"
    },
    {
      id: 2,
      src: CoverLetter2,
      // , title: "Graphic Designer"
    },
    {
      id: 3,
      src: CoverLetter3,
      // , title: "UI Designer"
    },
    {
      id: 4,
      src: CoverLetter4,
      // , title: "Quality Assurance"
    },
    {
      id: 5,
      src: CoverLetter5,
      // , title: "Frontend Developer"
    },
    {
      id: 6,
      src: CoverLetter6,
      // , title: "Software Engineer"
    },
    // {
    //   id: 7,
    //   src: CoverLetter7,
    //   // , title: "Graphic Designer"
    // },
    {
      id: 8,
      src: CoverLetter8,
      // , title: "UI Designer"
    },
    {
      id: 9,
      src: CoverLetter1,
      // , title: "Quality Assurance"
    },
    {
      id: 10,
      src: CoverLetter7,
      // , title: "Quality Assurance"
    },
  ];

  const handleViewCoverLetter = (id) => {
    // Navigate to the view-resume page and pass the selected resume ID
    console.log("id===================", id);
    // const cuid = localStorage.getItem("cuid");
    // if (cuid == null) {
    //   localStorage.setItem("cuid", uid);
    // }

    // const uid = uuidv4();
    dispatch(updateCoverLetterUid(uid));
    dispatch(updateCLTemplateId(id));
    localStorage.setItem("cId", id);

    // Call the function to save cover letter data
    saveCoverLetterData("templateId", id); // Update to call save function with new template ID

    // dispatch(updateUid(uid));
    navigate(`/view-coverletter/${id}/${uid}`, {
      state: {
        fromTemplatePage: true,
      },
    });
  };

  return (
    <>
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
        <div className="flex flex-wrap items-center justify-center gap-4 grid grid-cols-2 w-full h-full">
          {coverletter.map((coverletter) => (
            <div
              key={coverletter.id}
              className="groupWrap relative w-full h-full"
            >
              <div className="bg-[#F2F2F2] bgHover rounded-[12px] flex flex-col gap-3 items-center justify-center p-5">
                <div className="relative group overflow-hidden rounded-md">
                  <img
                    src={coverletter.src}
                    alt={`resume image ${coverletter.id}`}
                    className="opacity-1 "
                  />

                  <Button
                    className="group-hover absolute w-[90%] btn-primary left-[10px] opacity-0 transition-all duration-300 ease-in-out"
                    text="Use Template"
                    minHeight={41}
                    onClick={() => handleViewCoverLetter(coverletter.id)}
                  />
                </div>
                <p className="para-small font-OpenSan darkGray font-semibold">
                  {coverletter.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectTemplateCoverletter;
