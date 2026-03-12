import React, { useEffect, useState } from "react";
import Button from "../../components/shared/button";
import Input from "../../components/shared/input";
import Textarea from "../../components/shared/textarea";

import { Select } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

const AdminPricingEdit = ({ plan, handleCancel, handleMainPriceFunc }) => {
  // console.log("plan", plan);
  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;

  const user = JSON.parse(localStorage.getItem("user"));
  // console.log("user", user.data.role);

  const [formData, setFormData] = useState({
    heading: "",
    price: "",
    month: "",
  });

  useEffect(() => {
    if (plan) {
      setFormData({
        heading: plan?.planTitle,
        price: plan?.price,
        month: plan?.duration,
      });
    }
  }, [plan]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // if (name === "price") {
    //   const formattedValue = value?.replace(/[^0-9.]+/g, "");
    //   setFormData((prev) => ({
    //     ...prev,
    //     [name]: formattedValue ? `$${formattedValue}` : "",
    //   }));
    // } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // }
  };
  const handlePricingFunc = async (e) => {
    e?.preventDefault();
    try {
      const response = await axios.put(`${ApiUrl}/pricing-plan/${plan?._id}`, {
        role: user?.data?.role,

        duration: formData?.month,
        price: formData?.price,
        planTitle: formData?.heading,
      });
      // console.log("response: ", response);
      toast.success(response.data.message);
      handleMainPriceFunc();
      handleCancel();
    } catch (err) {
      toast.error(err.response.data);
      console.log(err);
    }
  };
  //   const [textValue, setTextValue] = useState(`
  // • Lorem ipsum dolor sit amet consectetur. Eros vulputate integer.
  // • Lorem ipsum dolor sit amet consectetur. Eros vulputate integer.
  // • Lorem ipsum dolor sit amet consectetur. Eros vulputate integer.`);
  return (
    <>
      <div className="mb-[40px] lg:mb-[80px] h-auto bg-white pb-[50px] lg:pb-[100px]  rounded-2xl">
        {/* Heading */}
        <div className="pt-7 mb-[47px] ">
          <h2 className="text-center darkGray font-light font-OpenSan">
            Edit
            <span className="font-bold"> Pricing Card</span>
          </h2>
        </div>
        <div className="adminpricing m-auto w-[80%] sm:w-[400px] lg:w-[427px]">
          <form action="" className="flex flex-col gap-[10px]">
            <div className="flex flex-col gap-[2px]">
              <label className="font-semibold  black-shade">Time Period:</label>
              {/* <Select
                defaultValue="Monthly"
                popupClassName="update-dropdown"
                style={{
                  width: "100%",
                }}
                // onChange={handleChange}
                options={[
                  {
                    label: (
                      <span className="grayShade6 text-[14px] font-normal">
                        Monthly
                      </span>
                    ),
                    value: "monthly",
                  },
                  {
                    label: (
                      <span className="grayShade6 text-[14px] font-normal">
                        Weekly
                      </span>
                    ),
                    value: "weekly",
                  },
                  {
                    label: (
                      <span className="grayShade6 text-[14px] font-normal">
                        Trial Period
                      </span>
                    ),
                    value: "trial",
                  },
                  {
                    label: (
                      <span className="grayShade6 text-[14px] font-normal">
                        Annually
                      </span>
                    ),
                    value: "annually",
                  },
                ]}
              /> */}

              <Input
                type="text"
                name="heading"
                value={formData.heading}
                onChange={handleInputChange}
                className="input-field"
                disabled
              />
            </div>
            <div>
              <Input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="$24.95"
                className="input-field"
              />
            </div>
            <div>
              <Input
                type="text"
                name="month"
                value={formData.month}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
            {/* <div>
              <Textarea rows={8} label="Description" value={textValue} />
            </div> */}
            <div className="flex flex-col gap-[2px] hidden">
              <p className="black-shade font-OpenSan para-small font-semibold">
                Description:
              </p>
              <div className="bg-[#F6F6F6] rounded-[9.97px] py-[15px] px-3 hidden">
                <ul className="black-shade font-OpenSan para-small list-disc ml-7 flex flex-col gap-5">
                  <li contentEditable>
                    Lorem ipsum dolor sit amet consectetur. Eros vulputate
                    integer.
                  </li>
                  <li contentEditable>
                    Lorem ipsum dolor sit amet consectetur. Eros vulputate
                    integer.
                  </li>
                  <li contentEditable>
                    Lorem ipsum dolor sit amet consectetur. Eros vulputate
                    integer.
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 justify-center ">
              {/* <Button
                text="Discard"
                className="btn-outline !h-[40px] sm:!h-[50px]"
                onClick={() => {
                  setFormData({ heading: "", price: "", month: "" });
                }}
                // minHeight={50}
              /> */}
              <Button
                text="Save Changes"
                className="btn-primary h-[40px] sm:h-[50px]"
                onClick={(e) => {
                  e.preventDefault();
                  handlePricingFunc();
                }}
                // minHeight={50}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminPricingEdit;
