/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import logo from "../assets/icons/logo.svg";
import Input from "../components/shared/input";
// import eyeOpen from "../assets/icons/eye-open.svg";
import eyeClose from "../assets/icons/eye-close.svg";
import { Icon } from "@iconify/react";
import Button from "../components/shared/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PasswordRecovery = () => {
  const navigate = useNavigate();
  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // console.log("Form submitted with", { email });
    }
    try {
      const resonse = await axios.post(`${ApiUrl}/user/forget`, {
        email: email,
      });
      // console.log(resonse.data);
      if (resonse.data) {
        navigate("/set-password", { state: { email } });
      }
    } catch (error) {
      console.log(error);
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
                    Password Recovery
                  </h2>
                </div>
                <div>
                  <form action="" className="flex flex-col gap-4">
                    <div>
                      <Input
                        type="email"
                        label="Enter Email to receive Verification Code"
                        placeholder="@gmail.com"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && (
                        <p className="red para-ex-small mt-1 font-OpenSan">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="mt-5 sm:mt-9">
                      <Button
                        text="Submit"
                        className="w-full h-[50px] btn-primary text-[16px] md:text-[24px]"
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

export default PasswordRecovery;
