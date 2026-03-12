import React from "react";
import resumeTemplate from "../../../assets/images/dashboard/resume-template.webp";
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
import { v4 as uuidv4 } from "uuid";
import Button from "../../../components/shared/button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import resumeSlice2, {
  updateTemplateId,
  updateUid,
} from "../../../redux/resumeSlice2";

const ResumesCatagory = ({ showAll, isSaveResumePage }) => {
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
  const dispatch = useDispatch();
  const uidParams = useParams();
  // console.log("uidParams", uidParams);
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/view-resume");
  };
  const handleViewResume = (id) => {
    // Navigate to the view-resume page and pass the selected resume ID
    const uid = uuidv4() || uidParams.uid; // Generate a unique uid
    localStorage.setItem("tId", id);
    dispatch(updateUid(uid)); // Dispatch the generated uid to Redux
    dispatch(updateTemplateId(id));
    navigate(`/view-resume/${id}/${uid}`);
  };
  const resume = [
    {
      id: 1,
      src: resume1,
      //  title: "Software Engineer"
    },
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
      //  title: "Quality Assurance"
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
    // {
    //   id: 12,
    //   src: resumeTemplate,
    //   // title: "Graphic Designer"
    // },
    // {
    //   id: 13,
    //   src: resumeTemplate,
    //   // title: "UI Designer"
    // },
    // {
    //   id: 14,
    //   src: resumeTemplate,
    //   // title: "Quality Assurance"
    // },
    // {
    //   id: 15,
    //   src: resumeTemplate,
    //   // title: "Frontend Developer"
    // },
    // {
    //   id: 16,
    //   src: resumeTemplate,
    //   // title: "Frontend Developer"
    // },
    // {
    //   id: 17,
    //   src: resumeTemplate,
    //   // title: "Frontend Developer"
    // },
    // {
    //   id: 18,
    //   src: resumeTemplate,
    //   // title: "Frontend Developer"
    // },
    // {
    //   id: 19,
    //   src: resumeTemplate,
    //   // title: "Frontend Developer"
    // },
    // {
    //   id: 20,
    //   src: resumeTemplate,
    //   // title: "Frontend Developer"
    // },
  ];

  return (
    <div className="template">
      {showAll || isSaveResumePage ? (
        <div
          className={`flex flex-wrap ${
            isSaveResumePage
              ? "px-10 justify-center md:justify-start"
              : "justify-center"
          } gap-3 items-center`}
        >
          {resume.map((resume) => (
            <div key={resume.id} className="groupWrap relative">
              <div className=" bg-[#F2F2F2] bgHover rounded-[12px] flex flex-col gap-3 items-center justify-center  p-5 overflow-hidden">
                <div className="relative group overflow-hidden rounded-md">
                  <div>
                    <img
                      src={resume.src}
                      alt={`resume image ${resume.id}`}
                      className="opacity-1 w-[220px] h-[311px] object-fill "
                    />
                  </div>
                  <Button
                    className="group-hover left-[10px] absolute w-[90%] btn-primary  opacity-0 transition-all duration-300 ease-in-out"
                    text="Use Template"
                    minHeight={41}
                    onClick={() => handleViewResume(resume.id)}
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
              <div key={resume.id} className="px-[15px] groupWrap relative">
                <div className="w-[260px] sm:w-auto m-auto bg-[#F2F2F2] bgHover rounded-[12px] flex flex-col gap-3 items-center justify-center p-5">
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
                      // onClick={handleNavigation}
                      onClick={() => handleViewResume(resume.id)}
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

export default ResumesCatagory;
