/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Input from "../../components/shared/input";
import Button from "../../components/shared/button";
import eyeClose from "../../assets/icons/eye-close.svg";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const navigate = useNavigate();
  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;

  const user = useSelector((state) => state.user.userInfo);

  const [formFields, setFormFields] = useState({
    oldpass: "",
    password: "",
    confirmpass: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!formFields.oldpass) {
      errors.oldpass = "Password is required";
    } else if (formFields.oldpass.length < 8) {
      errors.oldpass = "Password must be at least 8 characters long";
    }

    if (!formFields.password) {
      errors.password = "Password is required";
    } else if (formFields.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    if (!formFields.confirmpass) {
      errors.confirmpass = "Re Enter your password";
    } else if (formFields.confirmpass !== formFields.password) {
      errors.confirmpass = "Passwords do not match";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleDiscard = (e) => {
    e.preventDefault();
    setFormFields({
      oldpass: "",
      password: "",
      confirmpass: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      // console.log("Form submitted with", formFields);
      // navigate("/");
      return;
    }
    try {
      const response = await axios.post(`${ApiUrl}/user/change-password`, {
        email: user?.data?.email,
        oldPassword: formFields?.oldpass,
        newPassword: formFields?.password,
      });
      toast.success(response?.data?.message || "password updated successfully");
      // console.log(response);
    } catch (error) {
      toast.error(error.response?.data?.message);

      console.log(error);
    }
  };
  return (
    <div>
      <form
        action=""
        className="general-input flex flex-col gap-[26px] mt-[65px] w-auto lg10:w-[596px]"
      >
        <div>
          <Input
            type="password"
            label="Old Password:"
            placeholder="*******"
            // height="50px"
            icon={eyeClose}
            name="oldpass"
            value={formFields.oldpass}
            onChange={handleInputChange}
          />
          {errors.oldpass && (
            <p className="ml-[170px] red para-ex-small mt-1 font-OpenSan">
              {errors.oldpass}
            </p>
          )}
        </div>
        <div>
          <Input
            type="password"
            label="Password:"
            placeholder="*******"
            // height="50px"
            icon={eyeClose}
            name="password"
            value={formFields.password}
            onChange={handleInputChange}
          />
          {errors.password && (
            <p className="ml-[170px] red para-ex-small mt-1 font-OpenSan">
              {errors.password}
            </p>
          )}
        </div>
        <div>
          <Input
            type="password"
            label="Re Enter Password:"
            placeholder="*******"
            icon={eyeClose}
            name="confirmpass"
            value={formFields.confirmpass}
            onChange={handleInputChange}
          />
          {errors.confirmpass && (
            <p className="ml-[170px] red para-ex-small mt-1 font-OpenSan">
              {errors.confirmpass}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 justify-center md:justify-end">
          <Button
            text="Discard"
            className="btn-outline !h-[40px] sm:!h-[50px]"
            onClick={handleDiscard}
          />
          <Button
            text="Save Changes"
            className="btn-primary px-[14px] h-[40px] sm:h-[50px]"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
