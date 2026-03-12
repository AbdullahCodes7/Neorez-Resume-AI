import React from "react";
import Button from "../../../../components/shared/button";

const Philosophy = () => {
  return (
    <>
      <div className="flex flex-col gap-2 w-[359px] min-h-[174px] addSection">
        <div className="relative group overflow-hidden rounded-md">
          <div className="sectionBox opacity-1 px-[10px] py-5 flex flex-col gap-1 items-start ">
            <p className="font-OpenSan darkBlack para-text font-semibold">
              My Life Philosophy
            </p>
            <p className="font-OpenSan  para-text text-center font-semibold darkBlue">
              Heading
            </p>
            <div className="blank flex flex-col ">
              <p className="font-OpenSan para-ex-small darkBlue">
                Lorem ipsum dolor sit amet consectetur. Quis facilisi justo
                integer malesuada.
              </p>
              <p className="font-OpenSan para-ex-small darkBlack text-right">
                James Bro
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
          My Life Philosophy
        </p>
      </div>
    </>
  );
};

export default Philosophy;
