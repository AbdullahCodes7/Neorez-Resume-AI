import React from "react";
import Button from "../../../../components/shared/button";
import Calender from "../../../../assets/icons/dashboard/Calendar.svg";
import DatePickerComponent from "../../../ResumeTemps/components/datePicker";
import { Icon } from "@iconify/react/dist/iconify.js";

const AdditionalExperience = () => {
  return (
    <>
      <div className="flex flex-col gap-2 w-[359px] min-h-[174px] addSection">
        <div className="relative group overflow-hidden rounded-md">
          <div className="sectionBox opacity-1 px-[10px] py-5 flex flex-col gap-1 ">
            <p className="font-OpenSan darkBlack para-text font-semibold">
              Additional Experience
            </p>
            <p className="font-OpenSan darkBlack para-text font-semibold">
              Dublin 101
            </p>
            <p className="font-OpenSan darkBlue para-ex-small font-semibold">
              City of New York
            </p>
      
              <div className="flex flex-col gap-1">
                <div className="flex  items-center gap-1">
                  <div className="flex items-center gap-1">
                    <img src={Calender} alt="Calender Icon" />
                    <p className="font-OpenSan darkBlack para-ex-small font-normal">
                      Date Period
                    </p>
                  </div>
                  <div className="bg-[#2A9DF4] w-[1px] h-[10px]"></div>
                  <div className="flex items-center gap-1">
                    <Icon
                      icon="ion:location-outline"
                      width="18px"
                      height="18px"
                    />
                    <p className="font-OpenSan darkBlack para-ex-small font-normal">
                      New York,NY
                    </p>
                  </div>
                </div>
                <div className="blank">
                  <li className="font-OpenSan mediumGray para-ex-small list-disc">
                    Lorem ipsum dolor sit amet consectetur. Quis facilisi justo.
                  </li>
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
          Additional Experience
        </p>
      </div>
    </>
  );
};

export default AdditionalExperience;
