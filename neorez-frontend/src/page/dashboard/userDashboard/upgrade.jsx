import React from "react";
import Pricingcard from "../../../components/home/pricingCard/pricingcard";



const Upgrade = () => {
  return (
    <>
      <div className="h-auto pb-7 mb-7 bg-white   rounded-2xl">
        {/* Heading */}
        <div className="pt-7 mb-[100px] ">
          <h2 className="text-center darkGray font-light font-OpenSan">
            Upgrade to
            <span className="font-bold"> Pro</span>
          </h2>
          <h3 className="GrayOpacity text-center font-semibold font-OpenSan para-small">
          Which member ship you want to purchase?
        </h3>
        </div>

        <div className="w-[90%] m-auto">
          <Pricingcard isAdminPage={true} />
        </div>
      </div>
    </>
  );
};

export default Upgrade;
