/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
// import jwtDecode from "jwt-decode";
import logo from "../assets/icons/logo.svg";
import Input from "../components/shared/input";
// import eyeOpen from "../assets/icons/eye-open.svg";
import eyeClose from "../assets/icons/eye-close.svg";
import { Icon } from "@iconify/react";
import Button from "../components/shared/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slice";
import { toast } from "react-toastify";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { jwtDecode } from "jwt-decode";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;
  // const ApiUrl = "http://localhost:5000";
  // console.log(ApiUrl);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const validate = () => {
    const errors = {};

    if (!formFields.email) {
      errors.email = "Email is required";
    }
    // else if (!/\S+@\S+\.\S+/.test(email)) {
    //   errors.email = "Email address is invalid";
    // }

    if (!formFields.password) {
      errors.password = "Password is required";
    } else if (formFields.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // console.log("Form submitted with", { formFields.email, password });
      // navigate("/");
    }
    const headers = {
      "Content-Type": "application/json",
    };

    const body = JSON.stringify({
      email: formFields.email,
      password: formFields.password,
    });
    try {
      const response = await axios.post(`${ApiUrl}/user/signin`, body, {
        headers,
      });
      if (response.data.success) {
        const user = response.data;
        const token = response.token;
        dispatch(setUser(user, token));
        toast.success("Login Successfully");
        // const userData = jwtDecode(response.data.token);
  
        const redirectAfterLogin = localStorage.getItem("redirectAfterLogin");

        if (redirectAfterLogin) {
          let stripeLink = "";

          if (redirectAfterLogin === "Trial Period") {
            stripeLink = "https://buy.stripe.com/8wM3ep0dM6MYfiU7ss";
          } else if (redirectAfterLogin === "Weekly Plan") {
            stripeLink = "https://buy.stripe.com/8wM3ep0dM6MYfiU7ss";
          } else if (redirectAfterLogin === "Monthly Plan") {
            stripeLink = "https://buy.stripe.com/eVa8yJ3pY5IU4Eg001";
          } else {
            stripeLink = "https://buy.stripe.com/fZe7uF5y67R2gmY4gi";
          }

        
          window.location.href = stripeLink;
         
        
          localStorage.removeItem("redirectAfterLogin");
        } else {
          navigate("/dashboard");
        }
      
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user) {
      navigate("/upgrade-plan");
    
    } else {
     
      navigate("/signin");
    }
  }, []);

  // REMOVED: Google login logic - now handled by GoogleLoginButton component

  return (
    <>
      <div className="register">
        <div className="p-6 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
        </div>
        <div className="container">
          <div className="h-auto md:h-[85vh] flex justify-center items-center">
            <div className="w-[581px] p-[15px] sm:py-[34px] sm:px-[27px] formWrap rounded-[50px]">
              <div className=" bg-white rounded-[50px] p-[25px]  sm:p-[50px]">
                <div className="mb-[25px]">
                  <h2 className="text-center font-semibold primary font-OpenSan">
                    Sign In
                  </h2>
                </div>
                <div>
                  <form action="" className="flex flex-col gap-4">
                    <div>
                      <Input
                        type="email"
                        label="Email"
                        placeholder="James@gmail.com"
                        name="email"
                        value={formFields.email}
                        onChange={handleInputChange}
                      />

                      {errors.email && (
                        <p className="red para-ex-small mt-1 font-OpenSan">
                          {errors.email}
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

                    <div className="flex justify-end">
                      <p className="para-small ">
                        <Link to="/password-recovery">Forget Password</Link>
                      </p>
                    </div>
                    <div className="mt-[36px]">
                      <Button
                        text="Sign in"
                        className="w-full h-[50px] btn-primary text-[16px] md:text-[24px] "
                        onClick={handleSubmit}
                      />
                    </div>
                    <div className="flex justify-center  mt-4 sm:mt-12">
                      <p className="para-small ">
                        Doesn't have an account?
                        <span className="primary">
                          <Link to="/signup"> Sign Up</Link>{" "}
                        </span>
                      </p>
                    </div>
                    <div className="flex justify-center gap-5 mt-4 sm:mt-11">
                      <div className="w-full">
                        <GoogleLoginButton ApiUrl={ApiUrl} />
                      </div>
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

export default SignIn;
