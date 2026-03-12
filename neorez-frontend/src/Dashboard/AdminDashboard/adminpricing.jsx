import React, { useState, useEffect } from "react";
import Button from "../../components/shared/button";
import tickIcon from "../../assets/icons/tickIcon.svg";
import edit from "../../assets/icons/dashboard/editCircle.svg";
import { Modal } from "antd";

import axios from "axios";
import AdminPricingEdit from "./adminpricingEdit";

const AdminPricing = () => {
  const [activeSection, setActiveSection] = useState("Monthly");
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const [selectedPlan, setSelectedPlan] = useState(null); // State to store the selected plan
  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;
  const [planData, setPlanData] = useState([]);

  const toggleContent = (section) => {
    setActiveSection(section);
  };

  const pricing = [
    {
      id: 1,
      heading: "Monthly",
      price: "$29",
      month: "/Month",
    },
    {
      id: 2,
      heading: "Weekly",
      price: "$14.99",
      month: "/Weekly",
    },
    {
      id: 3,
      heading: "Trial Period",
      price: "$7.99",
      month: "/14-Days Trial",
    },
    {
      id: 4,
      heading: "Annual",
      price: "$225",
      month: "/Annual",
    },
  ];

  const handlePricingFunc = async () => {
    try {
      const response = await axios.get(`${ApiUrl}/pricing-plan/`);
      // console.log("response: ", response);
      setPlanData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handlePricingFunc();
  }, []);

  const showModal = (plan) => {
    setSelectedPlan(plan); // Set the selected plan to be passed to the modal
    setIsModalVisible(true); // Show the modal
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Hide the modal
    setSelectedPlan(null); // Reset the selected plan
  };

  return (
    <>
      <div className="pricing">
        <div className="flex flex-wrap gap-7 justify-center">
          {planData.map((plan) => (
            <div className="relative" key={plan.id}>
              <div className="card2 w-[300px] xs:w-[444px]">
                <div className="text-center mt-0 sm:mt-[60px]">
                  <h2 className="font-semibold darkGray mb-4 font-OpenSan">
                    {plan.planTitle}
                  </h2>
                  <h2 className="gray font-OpenSan">${plan.price}</h2>
                  <p className="para-small gray-shade font-OpenSan">
                    {plan.duration}
                  </p>
                </div>
                {/* <div className="mt-7 sm:mt-14 ">
                  <ul>
                    {plan.features &&
                      plan.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex gap-2 items-center mb-3"
                        >
                          <img src={tickIcon} alt="tick icon" />
                          <p className="para-small darkGray GrayOpacity font-OpenSan">
                            {feature}
                          </p>
                        </li>
                      ))}
                  </ul>
                </div> */}
              </div>
              <div className="absolute top-5 right-0 sm:right-5">
                <button
                  onClick={() => showModal(plan)} // Pass the clicked plan to showModal
                  className="outline-none shadow-none"
                >
                  <img
                    src={edit}
                    alt="edit icon"
                    className="w-[80%] sm:w-full"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal to edit pricing */}
      <Modal
        title="Edit Pricing"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Remove the default footer
        width={800} // Customize the width if needed
      >
        {selectedPlan && (
          <AdminPricingEdit
            plan={selectedPlan}
            handleCancel={handleCancel}
            handleMainPriceFunc={handlePricingFunc}
          />
        )}
        {/* Pass the selected plan */}
      </Modal>
    </>
  );
};

export default AdminPricing;
