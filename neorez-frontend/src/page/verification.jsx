/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import logo from "../assets/icons/logo.svg";
import Input from "../components/shared/input";
import Button from "../components/shared/button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Verification = () => {
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;
  const { email } = useParams();
  // console.log(params);

  // const ApiUrl = "http://localhost:5000";
  // console.log(ApiUrl);
  const validate = () => {
    const errors = {};

    // if (!email) {
    //   errors.email = "Email is required";
    // } else if (!/\S+@\S+\.\S+/.test(email)) {
    //   errors.email = "Email address is invalid";
    // }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // console.log("Form submitted with", { name });
      // navigate("/set-password");
    }
    try {
      const response = await axios.post(`${ApiUrl}/user/verifyotp`, {
        email: email,
        otp: otp,
      });
      // console.log(response);
      if (response.data.success) {
        navigate("/signin");
        toast.success("OTP verified successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleReSendOTP = async () => {
    try {
      const response = await axios.post(`${ApiUrl}/user/resendotp`, {
        email: email,
      });
      // console.log(response);
      toast.success("OTP has been sent again");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="register">
        <div className="p-6">
          <img src={logo} alt="logo" />
        </div>
        <div className="container">
          <div className="flex justify-center items-center h-[80vh]">
            <div className="w-[581px] p-[15px] sm:py-[34px] sm:px-[27px] formWrap rounded-[50px]">
              <div className=" bg-white rounded-[50px] p-[25px] sm:p-[50px]">
                <div className="mb-[25px]">
                  <h2 className="text-center font-semibold primary font-OpenSan">
                    Email Verification
                  </h2>
                </div>
                <div>
                  <form action="" className="flex flex-col gap-4">
                    <div>
                      <Input
                        type="email"
                        label="Email"
                        placeholder="@gmail.com"
                        name="email"
                        value={email}
                        disabled
                        // onChange={(e) => setEmail(e.target.value)}
                      />
                      {/* {errors.email && (
                        <p className="red para-ex-small mt-1 font-OpenSan">
                          {errors.email}
                        </p>
                      )} */}
                    </div>
                    <div>
                      <Input
                        type="text"
                        label="Verification Code has been sent to your Email"
                        placeholder="****"
                        name="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      {/* {errors.name && (
                        <p className="red para-ex-small mt-1 font-OpenSan">
                          {errors.name}
                        </p>
                      )} */}
                    </div>

                    <div className="flex justify-end">
                      <p
                        className="para-small cursor-pointer "
                        onClick={handleReSendOTP}
                      >
                        Didn’t receive the code?
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-9">
                      <Button
                        text="Verify"
                        className="w-full h-[50px] btn-primary text-[16px] md:text-[24px]  "
                        onClick={handleSubmit}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verification;
