import React from "react";
import coverletterTemplate from "../../../assets/images/dashboard/coverletterTemp.webp";
import Button from "../../../components/shared/button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams } from "react-router-dom";
import CoverLetter7 from "../../../assets/images/templates/cv/letter1.png";
import CoverLetter1 from "../../../assets/images/templates/cv/letter2.png";
import CoverLetter8 from "../../../assets/images/templates/cv/letter3.png";
import CoverLetter6 from "../../../assets/images/templates/cv/letter4.png";
import CoverLetter5 from "../../../assets/images/templates/cv/letter5.png";
import CoverLetter4 from "../../../assets/images/templates/cv/letter6.png";
import CoverLetter3 from "../../../assets/images/templates/cv/letter7.png";
import CoverLetter2 from "../../../assets/images/templates/cv/letter8.png";
import CoverLetter9 from "../../../assets/images/templates/cv/letter9.png";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  updateCLTemplateId,
  updateCoverLetterUid,
} from "../../../redux/coverLetterSlice";
import { saveCoverLetterData } from "../../../redux/actions/SaveCoverLEtter";

const CoverletterCatagory = ({ showAll, isSavePage, coverLetter }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,

    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
        },
      },
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const navigate = useNavigate();
  // const handleNavigation = () => {
  //   navigate("/view-coverletter");
  // };
  const uidParams = useParams();
  console.log("uidParams", uidParams);
  const dispatch = useDispatch();

  const handleViewCoverLetter = (id) => {
    // Navigate to the view-resume page and pass the selected resume ID
    const uid = uuidv4() || uidParams.uid; // Generate a unique uid
    localStorage.setItem("cId", id);
    dispatch(updateCoverLetterUid(uid));
    dispatch(updateCLTemplateId(id));
    // Call the function to save cover letter data
    saveCoverLetterData("templateId", id); // Update to call save function with new template ID

    navigate(`/view-coverletter/${id}/${uid}`);
  };

  const resume = [
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
    {
      id: 7,
      src: CoverLetter7,
      // , title: "Graphic Designer"
    },
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
  ];

  return (
    <div className="template">
      {showAll || isSavePage ? (
        <div
          className={`grid grid-cols-2 ${
            isSavePage
              ? "px-10 justify-center md:justify-start"
              : "justify-center"
          } gap-3 items-center`}
        >
          {resume.map((resume) => (
            <div key={resume.id} className="groupWrap h-full relative">
              <div className=" bg-[#F2F2F2] bgHover rounded-[12px] flex flex-col gap-3 items-center justify-between px-[25px] py-5 h-full">
                <div className="relative group overflow-hidden rounded-md">
                  <div>
                    <img
                      src={resume.src}
                      alt={`resume image ${resume.id}`}
                      className="opacity-1 w-full h-full "
                    />
                  </div>
                  <Button
                    className="group-hover absolute w-[90%] btn-primary left-[10px] opacity-0 transition-all duration-300 ease-in-out"
                    text="Use Template"
                    minHeight={41}
                    onClick={() => handleViewCoverLetter(resume.id)}
                  />
                </div>
                <p className="para-small font-OpenSan darkGray font-semibold text-nowrap">
                  {resume.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Slider {...settings}>
          {resume.map((resume, index) => (
            <div key={index} className="flex justify-center">
              <div key={resume.id} className="px-[15px] groupWrap ">
                <div className=" bg-[#F2F2F2] bgHover rounded-[12px] flex flex-col gap-3 items-center justify-center p-5 w-[260px] sm:w-auto">
                  <div className="relative group overflow-hidden rounded-md">
                    <img
                      src={resume.src}
                      alt={`resume image ${resume.id}`}
                      className="opacity-1 "
                    />
                    <Button
                      className="group-hover absolute w-[90%] btn-primary left-[10px] opacity-0 transition-all duration-300 ease-in-out"
                      text="Use Template"
                      minHeight={41}
                      onClick={() => handleViewCoverLetter(resume.id)}
                    />
                  </div>
                  <p className="para-small font-OpenSan darkGray font-semibold text-nowrap">
                    {resume.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default CoverletterCatagory;
