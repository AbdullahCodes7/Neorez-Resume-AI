import React from "react";
import Button from "../../../../components/shared/button";
import { Slider, Typography } from "antd";

const Expertise = () => {
  const [stepsCount, setStepsCount] = React.useState(5);
  return (
    <>
      <div className="flex flex-col gap-2 w-[359px] min-h-[174px] addSection">
        <div className="relative group overflow-hidden rounded-md">
          <div className="sectionBox opacity-1 px-[10px] py-5 flex flex-col gap-1">
            <p className="font-OpenSan darkBlack para-text font-semibold">
              Industry Expertise
            </p>
            <div className="flex  items-center justify-between w-full">
              <div className="blank flex flex-col items-start">
                <div className="add-slider flex flex-col items-start">
                  <Typography.Title
                    level={5}
                    className="font-OpenSan  para-text text-center font-semibold !text-[#2A9DF4]"
                  >
                    Leadership
                  </Typography.Title>
                  <Slider
                    min={2}
                    max={10}
                    value={stepsCount}
                    onChange={setStepsCount}
                  />
                </div>
              </div>

              <div className="blank flex flex-col items-start">
                <div className="add-slider flex flex-col items-start">
                  <Typography.Title
                    level={5}
                    className="font-OpenSan  para-text text-center font-semibold !text-[#2A9DF4]"
                  >
                    Management
                  </Typography.Title>
                  <Slider
                    min={2}
                    max={10}
                    value={stepsCount}
                    onChange={setStepsCount}
                  />
                </div>
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
          Industry Expertise
        </p>
      </div>
    </>
  );
};

export default Expertise;
