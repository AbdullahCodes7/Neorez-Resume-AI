import Button from "../../components/shared/button";
import React from "react";
import rightSecPic from "../../assets/images/home/userLaptop.webp";
import backLine from "../../assets/images/home/backLine.webp";
import rightAbsoImgs from "../../assets/images/home/heroAbsoluteImgg.webp";

import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/signin");
  };
  return (
    <>
      <div className="heroSection h-[100vh] ">
        <img className="backLine -z-10" src={backLine} alt="" />
        <div className="container">
          <div className="inner flex flex-col md:flex-row gap-20 md:gap-0 justify-center items-center">
            <div className=" w-full md:w-1/2 flex flex-col justify-center md:justify-start items-center md:items-start gap-2">
              <h1 className="font-bold font-OpenSan darkGray text-center md:text-left ">
                Tailor-Made <span className="primary"> Resume</span> in Seconds
                – Crafted with AI Precision !
              </h1>
              <p className="font-OpenSan font-normal para-large darkGray opacity-70 text-center md:text-left ">
                AI-Powered Resumes and Cover Letters Tailored to Any Job – in
                Minutes.
              </p>

              <Button
                className="btn-primary para-large  mt-4 "
                minWidth={224}
                minHeight={48}
                text="Get to Dashboard"
                onClick={handleClick}
              />
              {/* <div className="mt-4">
                <Button text="Get to Dashboard" className="btn-primary w-[224px] h-[48px] para-large"/>
              </div> */}
            </div>
            <div className="rightArea w-full md:w-1/2">
              <img className="rightAbsoImgs" src={rightAbsoImgs} alt="" />
              <img className="" src={rightSecPic} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
