import React, { useState } from "react";
import Navbar from "../components/layout/navbar";
import contact from "../assets/images/footer/contact.webp";
import Input from "../components/shared/input";
import eyeClose from "../assets/icons/eye-close.svg";
import Button from "../components/shared/button";
import { useNavigate } from "react-router-dom";
import Footer from "../components/layout/footer";
import Textarea from "../components/shared/textarea";
import backline from "../assets/images/home/backLine.webp";

const Contact = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");

  const validate = () => {
    const errors = {};

    if (!name) {
      errors.name = "Name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // console.log("Form submitted with", { name });
      navigate("/");
    }
  };
  return (
    <>
      <div className="absolute top-1 -z-10">
        <img src={backline} alt="" />
      </div>
      <Navbar />
      <div className="cover">
        <div className="container">
          <div className="contact-wrapper flex flex-col lg:flex-row justify-center items-center gap-[157px] mt-12 md:mt-40 ">
            <div className="w-full sm:w-[422px]">
              <div className="mb-7">
                <h2 className=" darkGray font-bold font-OpenSan ">
                  Get in
                  <span className="primary"> touch</span>
                </h2>
                <p className=" para-small grayShade6 text-black font-normal font-OpenSan ">
                  We are here for you! How can we help?
                </p>
              </div>
              <div>
                <form action="" className="flex flex-col gap-4">
                  <div>
                    <Input
                      type="text"
                      label="Name"
                      //   placeholder="James Adam"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && (
                      <p className="red para-ex-small mt-1 font-OpenSan">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="email"
                      label="Email"
                      //   placeholder="@gmail.com"
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
                  <div>
                    <Textarea
                      label="Message"
                      rows={6}
                      //   placeholder="Enter your textarea content"
                    />
                  </div>

                  <div className="">
                    <Button
                      text="Submit"
                      className="w-full h-[50px] btn-primary text-[20px]  "
                      onClick={handleSubmit}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="hidden lg:block">
              <img src={contact} alt="image" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
