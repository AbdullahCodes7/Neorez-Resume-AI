import React from "react";
import Button from "../../../../components/shared/button";

const Certification = () => {
  return (
    <>
      <div className="flex flex-col gap-2 w-[359px] min-h-[174px] addSection">
        <div className="relative group overflow-hidden rounded-md">
          <div className="sectionBox opacity-1 px-[10px] py-5 flex flex-col gap-1">
            <p className="font-OpenSan darkBlack para-text font-semibold">
              Certifications
            </p>
            <div className="flex  justify-between gap-5 items-start">
              <div className="blank flex flex-col items-start gap-1">
                <p className="font-OpenSan  para-ex-small text-center font-semibold darkBlue text-nowrap">
                  Google Analytics Individual
                </p>
                <p className="font-OpenSan  para-ex-small text-center font-semibold darkBlue">
                  Qualification
                </p>
                <p className="font-OpenSan  para-ex-small text-center font-semibold darkBlack ">
                  Google
                </p>
              </div>

              <div className="blank flex flex-col items-start gap-1">
                <p className="font-OpenSan  para-ex-small text-center font-semibold darkBlue text-nowrap">
                  Contextual Marketing
                </p>
                <p className="font-OpenSan  para-ex-small text-center font-semibold darkBlack mb-5">
                  Hubspot Academy
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
          Certifications
        </p>
      </div>
    </>
  );
};

export default Certification;
