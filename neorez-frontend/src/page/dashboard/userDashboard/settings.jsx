/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import General from "../../../Dashboard/settings/general";
import ChangePassword from "../../../Dashboard/settings/changePassword";
import Subscription from "../../../Dashboard/settings/subscription";
const Settings = () => {
  const [activeSection, setActiveSection] = useState(
    localStorage.getItem("activeSection") || "general"
  );

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    localStorage.setItem("activeSection", activeSection);
  }, [activeSection]);
  const getHeading = () => {
    switch (activeSection) {
      case "general":
        return "Saved";
      case "password":
        return "Account";
      case "subscription":
        return "Account";
      default:
        return "Saved";
    }
  };

  return (
    <>
      <div className="h-auto mb-[40px]  pb-[50px] sm:pb-[120px]  bg-white rounded-2xl">
        {/* Heading */}
        <div className="pt-7 mb-[47px] ">
          <h2 className="text-center darkGray font-light font-OpenSan">
            {getHeading()}
            <span className="font-bold"> Settings</span>
          </h2>
        </div>
        {/* Toggle Buttons */}
        <div className=" flex justify-center md:justify-start ml-2 mr-2 sm:ml-[62px] mb-4">
          <div className="p-1 rounded lightGrayBg flex items-center justify-start  sm:gap-[11px]">
            <button
              onClick={() => setActiveSection("general")}
              className={`shadow-none px-4 py-2 rounded para-text font-normal ${
                activeSection === "general"
                  ? "white primaryBg"
                  : "lightGrayBg darkGray"
              }`}
            >
              General
            </button>
            {!user.data.googleId && (
              <button
                onClick={() => setActiveSection("password")}
                className={`text-nowrap shadow-none px-[16px] py-2 rounded para-text font-normal ${
                  activeSection === "password"
                    ? "white primaryBg"
                    : "lightGrayBg darkGray"
                }`}
              >
                Change Password
              </button>
            )}
            <button
              onClick={() => setActiveSection("subscription")}
              className={`shadow-none px-[16px] py-2 rounded para-text font-normal ${
                activeSection === "subscription"
                  ? "white primaryBg"
                  : "lightGrayBg darkGray"
              }`}
            >
              Subscription
            </button>
          </div>
        </div>

        <div className="ml-[10%] mr-[10%] lg10:mr-0 lg10:ml-[62px]">
          {activeSection === "general" && <General />}
          {!user.data.googleId && activeSection === "password" && (
            <ChangePassword />
          )}
          {activeSection === "subscription" && <Subscription />}
        </div>
      </div>
    </>
  );
};

export default Settings;
