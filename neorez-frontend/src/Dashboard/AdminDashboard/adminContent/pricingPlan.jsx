import React from "react";
import PricingBanner from "../../../components/home/pricingCard/pricingBanner";
import AdminPricing from "../adminpricing";
import Button from "../../../components/shared/button";

const PricingPlan = () => {
  return (
    <>
      <div className="pb-7">
        {/* Heading */}
        <div className="pt-7 mb-[47px]">
          <h2 className="text-center darkGray font-light font-OpenSan">
            Pricing
            <span className="font-bold"> Section</span>
          </h2>
        </div>
        <div className="h-auto bg-white rounded-2xl p-[30px]">
          <div className="flex flex-col items-center gap-[80px]">
            <div>
              <PricingBanner />
              <div className="extension flex justify-center items-center">
                <AdminPricing />
              </div>
            </div>
            {/* <div className=" flex items-center gap-2 justify-center ">
                <Button
                  text="Discard"
                  className="btn-outline !h-[41px]"
                  minWidth={108}
                  // minHeight={36}
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

export default PricingPlan;
