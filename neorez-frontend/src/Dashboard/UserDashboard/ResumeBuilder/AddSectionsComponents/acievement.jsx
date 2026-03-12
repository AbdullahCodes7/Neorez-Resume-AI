import React from "react";
import Button from "../../../../components/shared/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import headingIcon from "../../../../assets/icons/dashboard/headingIcon.svg";

const KeyAchievement = () => {
  return (
    <>
      <div className="flex flex-col gap-2 w-[359px] min-h-[174px] addSection">
        <div className="relative group overflow-hidden rounded-md">
          <div className="sectionBox opacity-1 px-[10px] py-5 flex flex-col gap-1 ">
            <p className="font-OpenSan darkBlack para-text font-semibold">
              Key Achievements
            </p>
            <div className="flex  justify-between gap-5 items-start">
              <div className="blank flex flex-col gap-1 items-start">
                <div className="flex items-center gap-1">
                  <img src={headingIcon} alt="Heading Icon" />
                  <p className="font-OpenSan  para-text text-center font-semibold darkBlue">
                    Inspired
                  </p>
                </div>
                <p className="font-OpenSan mediumGray para-ex-small">
                  Lorem ipsum dolor sit amet consectetur. Quis facilisi justo
                  integer malesuada.
                </p>
              </div>

              <div className="blank flex flex-col items-start gap-1">
                <div className="flex items-center gap-1">
                  <Icon
                    icon="ph:speaker-simple-high-thin"
                    width="18px"
                    height="18px"
                    className="primary"
                  />
                  <p className="font-OpenSan  para-text text-center font-semibold darkBlue">
                    Developed Strong
                  </p>
                </div>
                <p className="font-OpenSan mediumGray para-ex-small">
                  Lorem ipsum dolor sit amet consectetur. Quis facilisi justo
                  integer malesuada.
                </p>
              </div>
            </div>
            <Button
              className="absolute w-[60%] btn-primary opacity-0 group-hover:opacity-100 group-hover:block 
            left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out"
              text="Add section"
              minHeight={41}
              // onClick={() => handleAddSection(add)}
            />
          </div>
        </div>
        <p className="font-OpenSan  para-small text-center font-semibold darkBlue">
          Key Achievements
        </p>
      </div>
    </>
  );
};

export default KeyAchievement;
