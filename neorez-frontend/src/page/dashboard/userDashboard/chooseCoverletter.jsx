import React, { useState } from "react";
import CoverletterCatagory from "../../../Dashboard/UserDashboard/Templates/coverletterCatagory";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";

const ChooseCoverletter = () => {
  const [showAll, setShowAll] = useState({
    application: false,
    prospecting: false,
    networking: false,
    referral: false,
    proposition: false,
  });
  const navigate = useNavigate();
  const handleToggle = (category) => {
    setShowAll((prev) => ({ ...prev, [category]: !prev[category] }));
  };

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
          {/* Application Cover Letter */}
          <div className="pb-[100px]">
            <div className="flex flex-col items-start sm:flex-row sm:items-center justify-center gap-3 mb-5 w-[95%] m-auto">
              <p className="para-med font-OpenSan primary font-bold text-nowrap">
                Application Cover Letter
              </p>
              <div className="w-[75%] h-[1px] primaryBg primary hidden sm:block "></div>
              <p
                className="para-med font-OpenSan primary font-semibold text-nowrap  cursor-pointer underline"
                onClick={() => handleToggle("application")}
              >
                {showAll.application ? "See Less" : "See All"}
              </p>
              <div className="w-[8%] h-[1px] primaryBg primary hidden lg:block"></div>
            </div>
            <CoverletterCatagory showAll={showAll.application} />
          </div>

          {/* Prospecting Cover Letter */}
          <div className="pb-[100px]">
            <div className="flex flex-col items-start sm:flex-row sm:items-center justify-center gap-3 mb-5 w-[95%] m-auto">
              <p className="para-med font-OpenSan primary font-bold text-wrap md:text-nowrap">
                Prospecting Cover Letter (Letter of Interest or Inquiry)
              </p>
              <div className="w-[75%] h-[1px] primaryBg primary hidden sm:block"></div>
              <p
                className="para-med font-OpenSan primary font-semibold text-nowrap cursor-pointer underline"
                onClick={() => handleToggle("prospecting")}
              >
                {showAll.prospecting ? "See Less" : "See All"}
              </p>
              <div className="w-[8%] h-[1px] primaryBg primary hidden lg:block"></div>
            </div>
            <CoverletterCatagory showAll={showAll.prospecting} />
          </div>

          {/* Networking Cover Letter */}
          <div className="pb-[100px]">
            <div className="flex flex-col items-start sm:flex-row sm:items-center justify-center gap-3 mb-5 w-[95%] m-auto">
              <p className="para-med font-OpenSan primary font-bold text-nowrap">
                Networking Cover Letter
              </p>
              <div className="w-[75%] h-[1px] primaryBg primary hidden sm:block"></div>
              <p
                className="para-med font-OpenSan primary font-semibold text-nowrap cursor-pointer underline"
                onClick={() => handleToggle("networking")}
              >
                {showAll.networking ? "See Less" : "See All"}
              </p>
              <div className="w-[8%] h-[1px] primaryBg primary hidden lg:block"></div>
            </div>
            <CoverletterCatagory showAll={showAll.networking} />
          </div>

          {/*Referral Cover Letter*/}
          <div className="pb-[100px]">
            <div className="flex flex-col items-start sm:flex-row sm:items-center justify-center gap-3 mb-5 w-[95%] m-auto">
              <p className="para-med font-OpenSan primary font-bold text-nowrap">
                Referral Cover Letter
              </p>
              <div className="w-[75%] h-[1px] primaryBg primary hidden sm:block"></div>
              <p
                className="para-med font-OpenSan primary font-semibold text-nowrap cursor-pointer underline"
                onClick={() => handleToggle("referral")}
              >
                {showAll.referral ? "See Less" : "See All"}
              </p>
              <div className="w-[8%] h-[1px] primaryBg primary hidden lg:block"></div>
            </div>
            <CoverletterCatagory showAll={showAll.referral} />
          </div>

          {/* Value Proposition Cover Letter*/}
          <div className="pb-[100px]">
            <div className="flex flex-col items-start sm:flex-row sm:items-center justify-center gap-3 mb-5 w-[95%] m-auto">
              <p className="para-med font-OpenSan primary font-bold text-nowrap">
                Value Proposition Cover Letter
              </p>
              <div className="w-[75%] h-[1px] primaryBg primary hidden sm:block"></div>
              <p
                className="para-med font-OpenSan primary font-semibold text-nowrap cursor-pointer underline"
                onClick={() => handleToggle("proposition")}
              >
                {showAll.proposition ? "See Less" : "See All"}
              </p>
              <div className="w-[8%] h-[1px] primaryBg primary hidden lg:block"></div>
            </div>
            <CoverletterCatagory showAll={showAll.proposition} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseCoverletter;
