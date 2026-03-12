import React, { useState } from "react";
import logo from "../assets/icons/logo.svg";
import Input from "../components/shared/input";
// import eyeOpen from "../assets/icons/eye-open.svg";
import eyeClose from "../assets/icons/eye-close.svg";
import { Icon } from "@iconify/react";
import Button from "../components/shared/button";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SetPassword = () => {
  const location = useLocation();
  const email = location?.state?.email;
  const navigate = useNavigate();
  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;

  const [confirmpass, setConfirmPass] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!otp) {
      errors.otp = "OTP is required";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    if (!confirmpass) {
      errors.confirmpass = "Re Enter your password";
    } else if (confirmpass !== password) {
      errors.confirmpass = "Passwords do not match";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // console.log("Form submitted with", { password, confirmpass });
    }
    // console.log(otp, password, email);

    try {
      const resonse = await axios.post(`${ApiUrl}/user/reset-password`, {
        email,
        otp,
        password,
      });
      // console.log(resonse.data);
      if (resonse.data) {
        navigate("/signin");
      }
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
          <div className="h-[80vh] flex justify-center items-center">
            <div className="w-[581px] p-[15px] sm:py-[34px] sm:px-[27px] formWrap rounded-[50px]">
              <div className=" bg-white rounded-[50px] p-[25px] sm:p-[50px]">
                <div className="mb-[25px]">
                  <h2 className="text-center font-semibold primary font-OpenSan">
                    Set New Password
                  </h2>
                </div>
                <div>
                  <form action="" className="flex flex-col gap-4">
                    <div>
                      <Input
                        type="number"
                        label="Enter OTP"
                        placeholder="*******"
                        // height="50px"
                        name="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      {errors.otp && (
                        <p className="red para-ex-small mt-1 font-OpenSan">
                          {errors.otp}
                        </p>
                      )}
                    </div>
                    <div>
                      <Input
                        type="password"
                        label="Enter Password"
                        placeholder="*******"
                        // height="50px"
                        icon={eyeClose}
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && (
                        <p className="red para-ex-small mt-1 font-OpenSan">
                          {errors.password}
                        </p>
                      )}
                    </div>
                    <div>
                      <Input
                        type="password"
                        label="Re Enter Password"
                        placeholder="*******"
                        icon={eyeClose}
                        name="confirmpass"
                        value={confirmpass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                      />
                      {errors.confirmpass && (
                        <p className="red para-ex-small mt-1 font-OpenSan">
                          {errors.confirmpass}
                        </p>
                      )}
                    </div>
                    <div className="mt-4 sm:mt-9">
                      <Button
                        text="Continue"
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

export default SetPassword;
