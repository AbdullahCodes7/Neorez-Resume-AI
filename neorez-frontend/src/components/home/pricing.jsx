import React from "react";
import PricingBanner from "./pricingCard/pricingBanner";
import Pricingcard from "./pricingCard/pricingcard";


const Pricing = () => {
  return (
    <section name="pricing">
      <div className="container">
        <div className="mt-40">
          <PricingBanner />
          <Pricingcard/>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
