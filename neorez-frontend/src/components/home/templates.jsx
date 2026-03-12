import React from "react";

// import resume1 from "../../assets/images/home/resume1.svg";
// import resume2 from "../../assets/images/home/resume2.svg";
// import resume3 from "../../assets/images/home/resume3.svg";
// import resume4 from "../../assets/images/home/res.svg";

import resume2 from "../../assets/images/templates/resume/resume2.webp";
import resume3 from "../../assets/images/templates/resume/resume3.webp";
import resume4 from "../../assets/images/templates/resume/resume4.webp";
import resume5 from "../../assets/images/templates/resume/resume5.webp";
import resume6 from "../../assets/images/templates/resume/resume6.webp";
import resume7 from "../../assets/images/templates/resume/resume7.webp";
import resume8 from "../../assets/images/templates/resume/resume8.webp";
import resume9 from "../../assets/images/templates/resume/resume9.webp";
import resume10 from "../../assets/images/templates/resume/resume10.webp";
import resume11 from "../../assets/images/templates/resume/resume11.webp";

import Marquee from "react-fast-marquee";

const Templates = () => {
  return (
    <div className="templateWrapper wrap">
      <h2 className="mx-auto text-center font-semibold font-OpenSan darkGray">
        <span className="primary">The Ultimate Resume Template </span> –
        Designed for Success we provide
      </h2>
      <p className="mx-auto mt-4 w-4/5 text-center font-semibold font-OpenSan darkGray">
        Sick of wading through endless subpar templates that don’t deliver? We
        get it. That’s why we’ve crafted a full library of resume templates you
        need: sleek, professionally designed, and engineered to grab attention.
        Easy to customize, effortlessly readable, and optimized to stand out in
        any industry—your perfect resume starts here.
      </p>
      <Marquee speed="100" pauseOnHover>
        <div className="resumeContainer ">
          <img className="cvv" src={resume2} alt="" />
          <img className="cvv" src={resume3} alt="" />
          <img className="cvv" src={resume4} alt="" />
          <img className="cvv" src={resume5} alt="" />
          <img className="cvv" src={resume6} alt="" />
          <img className="cvv" src={resume7} alt="" />
          <img className="cvv" src={resume8} alt="" />
          <img className="cvv" src={resume9} alt="" />
          <img className="cvv" src={resume10} alt="" />
          <img className="cvv" src={resume11} alt="" />
        </div>
      </Marquee>
    </div>
  );
};

export default Templates;
