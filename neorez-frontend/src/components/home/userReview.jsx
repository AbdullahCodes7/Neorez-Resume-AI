import React, { useRef, useState } from "react";
import UserCard from "../../components/home/userCard";
import arrowLeft from "../../assets/icons/arrow-left.svg";
import sliderImg1 from "../../assets/images/home/sliderImg1.png";
import sliderImg2 from "../../assets/images/home/sliderImg2.png";
import sliderImg3 from "../../assets/images/home/sliderImg3.png";
import sliderImg4 from "../../assets/images/home/sliderImg4.webp";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import bgArrow from "../../assets/icons/bg-arrow.svg";

const UserReview = () => {
  const testiRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  const handleNext = () => {
    testiRef.current.slickNext();
  };

  const handlePrev = () => {
    testiRef.current.slickPrev();
  };

  const settings = {
    infinite: true,
    centerMode: true,
    // centerPadding: "100px",
    slidesToShow: 3,
    initialSlide: 1,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
    responsive: [
      {
        breakpoint: 1760,
        settings: {
          arrows: false,
          centerMode: true,
          // centerPadding: "100px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1520,
        settings: {
          arrows: false,
          centerMode: true,
          // centerPadding: "100px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "0px",
          slidesToShow: 2.4,
        },
      },
      {
        breakpoint: 1180,
        settings: {
          arrows: false,
          centerMode: true,
          // centerPadding: "1000px",
          slidesToShow: 2.3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          centerMode: true,
          slidesToShow: 2.2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          centerMode: true,
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="wrap">
        <div>
          <h2 className="text-center darkGray font-semibold font-OpenSan">
            <span className="primary">Hear From</span> Our Community
          </h2>
          <h3 className="text-gray-400 mx-auto text-center font-semibold font-OpenSan darkGray">
            Trusted and preferred by countless users worldwide.
          </h3>
        </div>
        <div className="userReviewWrapper ">
          <div className="sliderContainer mt-16 overflow-hidden">
            <Slider {...settings} ref={testiRef}>
              {sliderData.map((data, index) => (
                <div
                  key={index}
                  className={`slick-slide ${
                    currentSlide === index ? "slick-center" : ""
                  }`}
                >
                  <div className="flex justify-center  lg:mr-10 xl:mr-14">
                    <UserCard data={data} showReadMore={index === 0} />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <div className="gap-3 mt-8 arrow-slider-btns">
            <button className="testi-prev-btn " onClick={handlePrev}>
              <img src={arrowLeft} alt="leftarrow" />
            </button>
            <button className="testi-next-btn " onClick={handleNext}>
              <img src={arrowLeft} alt="leftarrow" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserReview;

const sliderData = [
  {
    id: 1,

    userName: "Samantha K.",
    designation: "Marketing Manager",
    details:
      "Neorez helped me fine-tune my resume and cover letter, ensuring that every detail aligned with industry standards. The AI-driven recommendations were incredibly accurate, and within two weeks, I landed an interview for my dream job!",
    userImg: sliderImg4,
  },
  {
    id: 2,

    userName: "Linda T",
    designation: "HR Specialist",
    details:
      "Creating resumes for job seekers is my job, and I must say, Neorez has streamlined the entire process. The AI suggestions are spot on, and the cover letter builder is a great addition for HR professionals to help candidates stand out.",
    userImg: sliderImg2,
  },
  {
    id: 3,

    userName: "David L.",
    designation: "Software Developer",
    details:
      "As a software developer, it's crucial to highlight both my technical skills and project experience effectively. Neorez made the process smooth and effortless. The resume builder's ATS optimization ensured my resume got noticed by recruiters.",
    userImg: sliderImg3,
  },
  {
    id: 4,

    userName: "John M.",
    designation: "Sales Professional",
    details:
      "I was struggling with a resume that didn't capture my sales achievements until I used Neorez. The platform's tailored suggestions and emphasis on results helped me craft a resume that truly highlights my successes in sales.",
    userImg: sliderImg1,
  },
];
