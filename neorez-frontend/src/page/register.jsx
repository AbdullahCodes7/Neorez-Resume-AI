// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import logo from "../assets/icons/logo.svg";
import Input from "../components/shared/input";
import axios from "axios";
// import eyeOpen from "../assets/icons/eye-open.svg";
import eyeClose from "../assets/icons/eye-close.svg";
import { Icon } from "@iconify/react";
import Button from "../components/shared/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "../redux/slice";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
const Register = () => {
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState({
    password: "",
    confirmpass: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;
  // const ApiUrl = "http://localhost:5000";
  // console.log(ApiUrl);
  const validate = () => {
    const errors = {};

    if (!formFields.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formFields.email)) {
      errors.email = "Email address is invalid";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      //   console.log("Form submitted with", formFields);
      //   // navigate("/");
    }
    try {
      const response = await axios.post(`${ApiUrl}/user/signup`, {
        name: formFields.name,
        password: formFields.password,
        confirmpass: formFields.confirmpass,
        email: formFields.email,
      });
      // console.log(response);
      if (response.data.success) {
        navigate(`/verification/${formFields.email}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      // setErrors(error.response.data.message);
    }
  };

  // REMOVED: Google login logic - now handled by GoogleLoginButton component

  return (
    <>
      <div className="h-[100vh] register">
        <div className="p-6 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
        </div>
        <div className="container  ">
          <div className=" h-auto md:h-[85vh] flex justify-center items-center">
            <div className="w-[581px] p-[15px] sm:py-[34px] sm:px-[27px] formWrap rounded-[50px]">
              <div className=" bg-white rounded-[50px] p-[25px] sm:p-[50px]">
                <div className="mb-[25px]">
                  <h2 className="text-center font-semibold primary font-OpenSan">
                    Sign up
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
                        value={formFields.email}
                        onChange={handleInputChange}
                      />
                      {errors.email && (
                        <p className="red para-ex-small mt-1 font-OpenSan">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <Input
                        type="password"
                        label="Password"
                        placeholder="*******"
                        // height="50px"
                        icon={eyeClose}
                        name="password"
                        value={formFields.password}
                        onChange={handleInputChange}
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
                        value={formFields.confirmpass}
                        onChange={handleInputChange}
                      />
                      {errors.confirmpass && (
                        <p className="red para-ex-small mt-1 font-OpenSan">
                          {errors.confirmpass}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 sm:mt-9">
                      <Button
                        text="Sign up"
                        className="w-full h-[50px] btn-primary text-[16px] md:text-[24px]  "
                        onClick={handleSubmit}
                      />
                    </div>
                    <div className="flex justify-center mt-4 sm:mt-12">
                      <p className="para-small ">
                        Already have an account?
                        <span className="primary">
                          <Link to="/signin">Sign In</Link>
                        </span>
                      </p>
                    </div>
                    <div className="flex justify-center gap-5 mt-4 sm:mt-11">
                      <div className="w-full">
                        <GoogleLoginButton ApiUrl={ApiUrl} />
                      </div>
                      {/* <div className="flex justify-center items-center w-full h-[50px] iconContainer">
                        <Icon
                          icon="hugeicons:new-twitter"
                          width="30px"
                          height="30px"
                          style={{ color: "#2A9DF4" }}
                          className="cursor-pointer"
                        />
                      </div> */}
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

export default Register;
