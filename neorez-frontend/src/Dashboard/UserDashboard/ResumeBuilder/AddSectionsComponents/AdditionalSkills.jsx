import React from "react";
import Button from "../../../../components/shared/button";

const AdditionalSkills = () => {
  return (
    <>
      <div className="flex flex-col gap-2 w-[359px] addSection">
        <div className="relative group overflow-hidden rounded-md">
          <div className="sectionBox opacity-1 px-[10px] py-5 flex flex-col gap-1 ">
            <p className="font-OpenSan darkBlack para-text font-semibold">
              Additional Skills
            </p>
            <p className="font-OpenSan text-left para-text font-semibold darkBlue">
              Frontend
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-OpenSan mediumGray para-ex-small blank">
                Lorem ipsum
              </p>
              <p className="font-OpenSan mediumGray para-ex-small blank">
                Lorem ipsum
              </p>
              <p className="font-OpenSan mediumGray para-ex-small blank">
                Lorem ipsum
              </p>
              <p className="font-OpenSan mediumGray para-ex-small blank">
                Lorem ipsum
              </p>
              <p className="font-OpenSan mediumGray para-ex-small blank">
                Lorem ipsum
              </p>
              <p className="font-OpenSan mediumGray para-ex-small blank">
                Lorem ipsum
              </p>
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
          Additional Skills
        </p>
      </div>
    </>
  );
};

export default AdditionalSkills;
