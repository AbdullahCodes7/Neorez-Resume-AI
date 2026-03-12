/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import General from "../../../Dashboard/settings/general";
import ChangePassword from "../../../Dashboard/settings/changePassword";

const AdminSetting = () => {
  const [activeAdminSetting, setactiveAdminSetting] = useState(
    localStorage.getItem("activeAdminSetting") || "general"
  );

  useEffect(() => {
    localStorage.setItem("activeAdminSetting", activeAdminSetting);
  }, [activeAdminSetting]);
  const getHeading = () => {
    switch (activeAdminSetting) {
      case "general":
        return "Saved";
      case "password":
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
              onClick={() => setactiveAdminSetting("general")}
              className={`shadow-none px-4 py-2 rounded para-text font-normal ${
                activeAdminSetting === "general"
                  ? "white primaryBg"
                  : "lightGrayBg darkGray"
              }`}
            >
              General
            </button>
            <button
              onClick={() => setactiveAdminSetting("password")}
              className={`text-nowrap shadow-none px-[16px] py-2 rounded para-text font-normal ${
                activeAdminSetting === "password"
                  ? "white primaryBg"
                  : "lightGrayBg darkGray"
              }`}
            >
              Change Password
            </button>
           
          </div>
        </div>

        <div className="ml-[10%] mr-[10%] lg10:mr-0 lg10:ml-[62px]">
          {activeAdminSetting === "general" && <General />}
          {activeAdminSetting === "password" && <ChangePassword />}
        
        </div>
      </div>
    </>
  );
};

export default AdminSetting;
