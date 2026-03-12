import React, { useEffect, useState } from "react";
import feature from "../../../assets/icons/dashboard/feature.svg";
import work from "../../../assets/icons/dashboard/working.svg";
import blog from "../../../assets/icons/dashboard/blogs.svg";
import pricing from "../../../assets/icons/dashboard/pricing.svg";
import update from "../../../assets/icons/dashboard/updateScript.svg";
import updateLogo from "../../../assets/icons/dashboard/updateLogo.svg";
import updateNavbar from "../../../assets/icons/dashboard/updateNavbar.svg";
import neorezLogo from "../../../assets/icons/dashboard/logoNeorez.svg";
import Button from "../../../components/shared/button";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

const AdminContent = () => {
  const items = [
    {
      icon: feature,
      label: "Features",
      link: "/feature-admin",
      content: "Edit your Features Section of Website",
    },
    {
      icon: work,
      label: "How it Works",
      link: "/work",
      content: "Edit your How it Works Section of Website",
    },
    {
      icon: pricing,
      label: "Pricing Plan",
      link: "/pricing-plan",
      content: "Edit your Pricing Plan Section of Website",
    },
    // {
    //   icon: blog,
    //   label: "Blogs",
    //   link: "/blog-admin",
    //   content: "Edit your Blogs Section of Website",
    // },
    {
      icon: update,
      label: "Update Script",
      link: "/update-script",
      content: "Edit script for Resume and Cover letter Generations",
    },
    // {
    //   icon: updateLogo,
    //   label: "Update Logo",
    //   link: "handleUpdateLogoModal",
    //   content: "Edit your logo",
    // },
    // {
    //   icon: updateNavbar,
    //   label: "Update Navbar",
    //   link: "handleUpdateNavbarModal",
    //   content: "Edit Navbar",
    // },
  ];

  const navigate = useNavigate();
  const [isUpdateLogoModalOpen, setIssUpdateLogoModalOpen] = useState(false);
  const [isUpdateNavbarModalOpen, setIsNavbarLogoModalOpen] = useState(false);

  const handleUpdateLogoModal = () => {
    setIssUpdateLogoModalOpen(!isUpdateLogoModalOpen);
  };

  const handleUpdateNavbarModal = () => {
    setIsNavbarLogoModalOpen(!isUpdateNavbarModalOpen);
  };

  const handleItemClick = (item) => {
    if (item.link === "handleUpdateLogoModal") {
      handleUpdateLogoModal();
    } else if (item.link === "handleUpdateNavbarModal") {
      handleUpdateNavbarModal();
    } else {
      navigate(item.link);
    }
  };

  return (
    <>
      <div className="contentWrap">
        <div>
          {/* Heading */}
          <div className="pt-7 mb-[47px]">
            <h2 className="text-center darkGray font-light font-OpenSan">
              Website
              <span className="font-bold"> Section</span>
            </h2>
          </div>
          <div className="mb-[40px] lg:mb-[100px] bg-white rounded-2xl p-[30px] pb-20">
            <div className="flex flex-wrap justify-center 2xl:justify-start items-center gap-6">
              {items.map((item) => (
                <div
                  key={item.link}
                  className="manageContent flex flex-col items-center justify-center gap-4 px-[30px] py-[20px] rounded-2xl w-[220px] cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <img src={item.icon} alt="Icon" />
                  <p className="font-OpenSan darkGray para-small font-semibold">
                    {item.label}
                  </p>
                  <p className="GrayOpacity font-OpenSan para-ex-small font-semibold text-center">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* UPDATE LOGO */}
      <Modal
        open={isUpdateLogoModalOpen}
        onCancel={handleUpdateLogoModal}
        footer={null}
        centered
      >
        <div className="py-[25px] px-0 sm:px-[50px] updateLogo">
          <h2 className="text-center font-bold darkGray  font-OpenSan mb-5">
            Update
            <span className="font-light"> Logo</span>
          </h2>
          <div className="flex flex-col  gap-5 justify-center items-center p-2 updateBox">
            <div className="logoBox">
              <img src={neorezLogo} alt="Logo" />
            </div>
            <Button
              text="Upload Logo"
              className="btn-primary mb-3"
              minWidth={141}
            />
          </div>
          <div className="mt-5 flex items-center gap-2 justify-center ">
            <Button
              text="Discard"
              className="btn-outline !h-[41px]"
              minWidth={108}
              onClick={handleUpdateLogoModal}
            />
            <Button
              text="Save Changes"
              className="btn-primary"
              minWidth={145}
              minHeight={36}
              onClick={handleUpdateLogoModal}
            />
          </div>
        </div>
      </Modal>

      {/* UPDATE NAVBAR */}
      <Modal
        open={isUpdateNavbarModalOpen}
        onCancel={handleUpdateNavbarModal}
        footer={null}
        centered
      >
        <div className="py-[25px] px-0 sm:px-[50px] updateLogo">
          <h2 className="text-center font-bold darkGray  font-OpenSan mb-5">
            Update
            <span className="font-light"> Navbar</span>
          </h2>
          <div>
            <ul className="flex flex-wrap gap-3 justify-start items-center updateBox px-2 pt-2 pb-6">
              <li className="updateNavlist">AI Resume Builder</li>
              <li className="updateNavlist">Cover Letter Creator</li>
              <li className="updateNavlist">Pricing</li>
              <li className="updateNavlist">Resources</li>
              <li className="updateNavlist">Tools</li>
            </ul>
          </div>
          <div className="mt-5 flex items-center gap-2 justify-center ">
            <Button
              text="Discard"
              className="btn-outline !h-[41px]"
              minWidth={108}
              onClick={handleUpdateNavbarModal}
            />
            <Button
              text="Save Changes"
              className="btn-primary"
              minWidth={145}
              minHeight={36}
              onClick={handleUpdateNavbarModal}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdminContent;
