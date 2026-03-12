import React from "react";
import Howitwork from "../../../components/home/howitwork";
import Button from "../../../components/shared/button";

const Work = () => {
  return (
    <>
      {/* Heading */}
      <div className="pt-7 mb-[47px]">
        <h2 className="text-center darkGray font-light font-OpenSan">
          How it Works
          <span className="font-bold"> Section</span>
        </h2>
      </div>
      <div className="mb-[40px] lg:mb-[100px] bg-white rounded-2xl p-[30px]  pb-20">
        <div className="bg-white rounded-2xl px-0 sm:px-[30px] py-[30px] w-[90%] m-auto">
          <div className="flex flex-col items-center justify-center gap-[80px]">
            <Howitwork isAdminContent={true} />
            {/* <div className="mt-5 flex items-center gap-2 justify-center ">
              <Button
                text="Discard"
                className="btn-outline !h-[41px]"
                minWidth={108}
              />
              <Button
                text="Save Changes"
                className="btn-primary"
                minWidth={145}
                minHeight={36}
              />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Work;
