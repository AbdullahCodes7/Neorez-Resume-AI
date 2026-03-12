import React from "react";
import Button from "../../../../components/shared/button";
import Calender from "../../../../assets/icons/dashboard/Calendar.svg";
import DatePickerComponent from "../../../ResumeTemps/components/datePicker";

const Volunteer = () => {
  return (
    <>
      <div className="flex flex-col gap-2 w-[359px] min-h-[174px] addSection">
        <div className="relative group overflow-hidden rounded-md">
          <div className="sectionBox opacity-1 px-[10px] py-5 flex flex-col gap-1 ">
            <p className="font-OpenSan darkBlack para-text font-semibold">
              Volunteering
            </p>
          
              <div className="flex flex-col gap-1">
                <div className="flex flex-col items-start gap-1">
                  <p className="font-OpenSan  para-text text-center font-semibold darkBlue">
                    Executive Member
                  </p>
                  <p className="font-OpenSan  para-ex-small text-center font-semibold darkBlue">
                    AIESEC
                  </p>
                  <div className="flex items-center gap-1">
                    <img src={Calender} alt="Calender Icon" />
                    <DatePickerComponent />
                  </div>
                </div>
                <div className="blank">
                  <li className="font-OpenSan mediumGray para-ex-small list-disc">
                    Lorem ipsum dolor sit amet consectetur. Quis facilisi justo
                    integer malesuada.
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
          Volunteering
        </p>
      </div>
    </>
  );
};

export default Volunteer;
