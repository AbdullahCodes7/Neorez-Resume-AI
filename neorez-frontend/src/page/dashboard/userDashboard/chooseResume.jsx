import React, { useState } from "react";
import ResumesCatagory from "../../../Dashboard/UserDashboard/Templates/resumeCatagory";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";

const ChooseResume = () => {
  const [showAll, setShowAll] = useState({
    chronological: false,
    functional: false,
    combination: false,
    targeted: false,
    infographic: false,
  });

  const handleToggle = (category) => {
    setShowAll((prev) => ({ ...prev, [category]: !prev[category] }));
  };
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };
  return (
    <div className="p-7 backgroundGray ">
      <div className="bg-white py-[20px] px-5 xs:px-10 rounded-md">
        <Icon
          icon="charm:cross"
          width="25px"
          height="25px"
          className="ml-auto cursor-pointer"
          onClick={handleNavigateBack}
        />
        <div className="pt-7 mb-[47px]">
          <h2 className="text-center darkGray font-light font-OpenSan">
            Choose
            <span className="font-bold"> Template</span>
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          {/* Chronological Resume */}
          <div className="pb-[100px]">
            <div className="flex flex-col items-start sm:flex-row sm:items-center justify-center gap-3 mb-5 w-[95%] m-auto">
              <p className="para-med font-OpenSan primary font-bold text-wrap sm:text-nowrap">
                Templates
              </p>
              <div className="w-[75%] h-[1px] primaryBg primary hidden sm:block "></div>
              <p
                className="para-med font-OpenSan primary font-semibold text-nowrap  cursor-pointer underline"
                onClick={() => handleToggle("chronological")}
              >
                {showAll.chronological ? "See Less" : "See All"}
              </p>
              <div className="w-[8%] h-[1px] primaryBg primary hidden lg:block"></div>
            </div>
            <ResumesCatagory showAll={showAll.chronological} />
          </div>

          {/* Functional Resume (Skills-Based Resume) */}
          <div className="pb-[100px] hidden">
            <div className="flex flex-col items-start sm:flex-row sm:items-center justify-center gap-3 mb-5 w-[95%] m-auto">
              <p className="para-med font-OpenSan primary font-bold  text-wrap sm:text-nowrap">
                Functional Resume (Skills-Based Resume)
              </p>
              <div className="w-[75%] h-[1px] primaryBg primary hidden sm:block "></div>
              <p
                className="para-med font-OpenSan primary font-semibold text-nowrap  cursor-pointer underline"
                onClick={() => handleToggle("functional")}
              >
                {showAll.functional ? "See Less" : "See All"}
              </p>
              <div className="w-[8%] h-[1px] primaryBg primary hidden lg:block"></div>
            </div>
            <ResumesCatagory showAll={showAll.functional} />
          </div>

          {/* Combination Resume */}
          <div className="pb-[100px] hidden">
            <div className="flex flex-col items-start sm:flex-row sm:items-center justify-center gap-3 mb-5 w-[95%] m-auto">
              <p className="para-med font-OpenSan primary font-bold  text-wrap sm:text-nowrap">
                Combination Resume (Hybrid Resume)
              </p>
              <div className="w-[75%] h-[1px] primaryBg primary hidden sm:block "></div>
              <p
                className="para-med font-OpenSan primary font-semibold text-nowrap  cursor-pointer underline"
                onClick={() => handleToggle("combination")}
              >
                {showAll.combination ? "See Less" : "See All"}
              </p>
              <div className="w-[8%] h-[1px] primaryBg primary hidden lg:block"></div>
            </div>
            <ResumesCatagory showAll={showAll.combination} />
          </div>

          {/* Targeted Resume */}
          <div className="pb-[100px] hidden">
            <div className="flex flex-col items-start sm:flex-row sm:items-center justify-center gap-3 mb-5 w-[95%] m-auto">
              <p className="para-med font-OpenSan primary font-bold  text-wrap sm:text-nowrap">
                Targeted Resume
              </p>
              <div className="w-[75%] h-[1px] primaryBg primary hidden sm:block "></div>
              <p
                className="para-med font-OpenSan primary font-semibold text-nowrap  cursor-pointer underline"
                onClick={() => handleToggle("targeted")}
              >
                {showAll.targeted ? "See Less" : "See All"}
              </p>
              <div className="w-[8%] h-[1px] primaryBg primary hidden lg:block"></div>
            </div>
            <ResumesCatagory showAll={showAll.targeted} />
          </div>

          {/* Infographic Resume */}
          <div className="pb-[100px] hidden">
            <div className="flex flex-col items-start sm:flex-row sm:items-center justify-center gap-3 mb-5 w-[95%] m-auto">
              <p className="para-med font-OpenSan primary font-bold text-nowrap">
                Infographic Resume
              </p>
              <div className="w-[75%] h-[1px] primaryBg primary hidden sm:block "></div>
              <p
                className="para-med font-OpenSan primary font-semibold text-nowrap  cursor-pointer underline"
                onClick={() => handleToggle("infographic")}
              >
                {showAll.infographic ? "See Less" : "See All"}
              </p>
              <div className="w-[8%] h-[1px] primaryBg primary hidden lg:block"></div>
            </div>
            <ResumesCatagory showAll={showAll.infographic} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseResume;
