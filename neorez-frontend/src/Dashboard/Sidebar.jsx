import React, { useEffect, useMemo, useRef, useState } from "react";
import Button from "../components/shared/button";
import logo from "../assets/icons/dashboard/sidebarLogo.svg";
import logout from "../assets/icons/dashboard/sign-out.svg";
import home from "../assets/icons/dashboard/home.svg";
import extension from "../assets/icons/dashboard/extension.svg";
import upgrade from "../assets/icons/dashboard/upgrade.svg";
import document from "../assets/icons/dashboard/savedoc.svg";
import setting from "../assets/icons/dashboard/setting.svg";
import info from "../assets/icons/dashboard/info.svg";
import started from "../assets/icons/dashboard/started.svg";
import manage from "../assets/icons/dashboard/manage.svg";
import account from "../assets/icons/dashboard/user.svg";
import { Switch, Tooltip } from "antd";
//Resume Builder Imports
import addSection from "../assets/icons/dashboard/addSection.svg";
import rearrange from "../assets/icons/dashboard/rearrange.svg";
import templates from "../assets/icons/dashboard/template.svg";
import design from "../assets/icons/dashboard/design.svg";
import Analyze from "../assets/icons/dashboard/ix--analyze.svg";
import download from "../assets/icons/dashboard/downloadIcon.svg";
import branding from "../assets/icons/dashboard/branding.svg";
import RenameResume from "../assets/icons/dashboard/renameResume.svg";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/slice";
import { Drawer } from "antd";
import Hamburger from "hamburger-react";
import AddSection from "../Dashboard/UserDashboard/ResumeBuilder/addSection";
import AddSectionCoverletter from "./UserDashboard/CoverletterBuilder/addSection";
import Download from "./UserDashboard/ResumeBuilder/download";
import DownloadCoverLetter from "./UserDashboard/CoverletterBuilder/download";
import {
  resetDesignDefaults,
  resetResumeState,
  updateResumeRef,
} from "../redux/resumeSlice2";
import { resetCoverLetter } from "../redux/coverLetterSlice";
import { resetuserInfo } from "../redux/userInfo";
import { Icon } from "@iconify/react/dist/iconify.js";
import Tippy from "@tippyjs/react";
import { useSectionsContext } from "../App";
import RenameResumeModal from "./UserDashboard/ResumeBuilder/resumeRename";

import Download2 from "./UserDashboard/ResumeBuilder/Download2";
// import DownloadModal from "./UserDashboard/ResumeBuilder/download";
// import PDFViewerModal from "./UserDashboard/ResumeBuilder/download";

const Sidebar = ({ setActiveTab, activeTab, resumeRef, coverLetterRef }) => {
  // const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { sectionsState, setSectionsState } = useSectionsContext(); // Get context state

  // const resumeRef = useRef(null);
  // const resumeRef = useSelector((state) => state.resume.resumeRef);
  const location = useLocation();
  const navigate = useNavigate();
  const isViewTemplatePage = location.pathname.includes("view-resume");
  const isViewCoverletterTemplatePage =
    location.pathname.includes("view-coverletter");
  //Resume Builder
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [isRenameResumeModalOpen, setIsRenameResumeModalOpen] = useState(false);
  const [isAnalyseModalOpen, setIsAnalyseModalOpen] = useState(false);
  //Cover letter Builder
  const [isClSectionModalOpen, setIsClSectionModalOpen] = useState(false);

  //show download model
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isDownloadCoverModalOpen, setIsDownloadCoverModalOpen] =
    useState(false);
  // SIDEBAR ITEMS
  const sidebarItems = [
    // Default Menu Items
    { icon: home, label: "Dashboard", link: "dashboard" },
    { icon: started, label: "Getting Started", link: "started" },
    { icon: extension, label: "Chrome Extension", link: "extension" },
    // { icon: upgrade, label: "Upgrade to Pro", link: "upgrade-plan" },
    { icon: document, label: "Saved Documents", link: "documents" },
    { icon: setting, label: "Settings", link: "settings" },
  ];
  //ADMIN SIDEBAR ITEMS
  // useEffect(() => {
  //   if (resumeRef.current) {
  //     // Do something with resumeRef, for example:
  //     console.log("resumeRef is availables:", resumeRef.current);
  //   }
  // }, [resumeRef]);
  const adminSidebarItems = [
    { icon: home, label: "Dashboard", link: "admin-dashboard" },
    // { icon: resume, label: "Resume", link: "choose-resume" },
    // { icon: document, label: "CoverLetter", link: "choose-coverletter" },
    // { icon: document, label: "Saved Documents", link: "documents" },
    { icon: manage, label: "Manage Content", link: "content" },
    { icon: setting, label: "Settings", link: "admin-setting" },
  ];
  //settings dropdown
  const settingsDropdownItems = [
    { icon: account, label: "Account Setting", link: "settings" },
    { icon: info, label: "Basic Info", link: "info" },
  ];
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const handleSettingsClick = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };
  const { id } = useParams();
  const [arrow, setArrow] = useState("Show");
  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }
    if (arrow === "Show") {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);
  // Track the currently active (open) menu item
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  // Toggle the active state of menu items
  const handleToggle = (tab) => {
    if (activeTab === tab) {
      setActiveTab(null); // If the tab is already active, close it (set to null)
    } else {
      setActiveTab(tab); // Set the clicked tab as active
    }
  };

  const handleDownloadClick = () => {
    // if (resumeRef.current) {
    // dispatch(updateResumeRef(resumeRef)); // Dispatch the current ref to Redux
    setIsDownloadModalOpen(true); // Then open the modal
    // } else {
    //   console.error("resumeRef is not assigned yet."); // Handle the case where it's null
    // }
  };
  const handleDownloadClickCoverLetter = () => {
    // if (resumeRef.current) {
    // dispatch(updateResumeRef(resumeRef)); // Dispatch the current ref to Redux
    setIsDownloadCoverModalOpen(true); // Then open the modal
    // } else {
    //   console.error("resumeRef is not assigned yet."); // Handle the case where it's null
    // }
  };

  // BUILDER ITEMS
  const menuItems = isViewTemplatePage
    ? [
        // Resume Builder
        {
          icon: addSection,
          label: "Add Section",
          link: () => setIsSectionModalOpen(true),
          tooltipContent:
            "Add new sections to your resume to highlight your experience and skills.",
        },
        {
          icon: rearrange,
          label: "Rearrange",
          link: () => setActiveTab("Rearrange"),
          tooltipContent:
            "Reorder your sections to prioritize the most relevant content.",
        },
        {
          icon: templates,
          label: "Templates",
          link: () => setActiveTab("Templates"),
          tooltipContent:
            "Browse different templates to customize the look of your resume.",
        },
        {
          icon: design,
          label: "Design & Font",
          link: () => setActiveTab("Design & Font"),
          tooltipContent:
            "Adjust colors, fonts, and design to make your resume unique.",
        },
        {
          icon: download,
          label: "Download",
          // link: "download",
          link: handleDownloadClick,
          tooltipContent:
            "Download your resume in PDF format to easily share with employers.",
        },
        {
          icon: Analyze,
          label: "Analyse Resume",
          link: () => setActiveTab("Analyse Resume"),
          // link: () => setIsAnalyseModalOpen(true),
          tooltipContent:
            "Get insights and tips to improve the quality of your resume.",
        },

        {
          icon: RenameResume,
          label: "Rename Resume",
          link: () => setIsRenameResumeModalOpen(true),
          tooltipContent: "Rename your resume .",
        },

        {
          icon: branding,
          label: (
            <div className="sidebarSwitch flex gap-[40px] justify-between items-center">
              Branding
              <Switch size="small" defaultChecked />
            </div>
          ),
          link: "branding",
          tooltipContent: "Enable or disable branding in your documents.",
        },
      ]
    : [
        // Cover Letter Builder

        // {
        //   icon: addSection,
        //   label: "Add Section",
        //   link: () => setIsClSectionModalOpen(true),
        // },
        // {
        //   icon: rearrange,
        //   label: "Rearrange",
        //   link: () => setIsClRearrangeModalOpen(true),
        // },

        {
          icon: templates,
          label: "Templates",
          link: () => setActiveTab("TemplatesCl"),
          tooltipContent: "Choose templates for cover letters.",
        },
        {
          icon: design,
          label: "Design & Font",
          link: () => setActiveTab("Design & FontCl"),
          tooltipContent: "Customize cover letter's appearance.",
        },
        {
          icon: download,
          label: "Download",
          // link: "download",
          link: handleDownloadClickCoverLetter,
          tooltipContent: "Download your cover letter in PDF format.",
        },
        {
          icon: branding,
          label: (
            <div className="sidebarSwitch flex gap-[40px] justify-between items-center">
              Branding
              <Switch size="small" defaultChecked />
            </div>
          ),
          link: "branding",
        },
      ];

  const user = useSelector((state) => state.user.userInfo);
  // console.log(user);

  const isAdmin = user?.data?.role;

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(resetResumeState());
    dispatch(resetCoverLetter());
    dispatch(resetDesignDefaults());
    dispatch(resetCoverLetter());
    dispatch(resetuserInfo());
    navigate("/signin");
  };

  const handleNavigate = () => {
    dispatch(resetResumeState());
    dispatch(resetCoverLetter());
    setSectionsState("");
  };

  useEffect(() => {
    setIsSectionModalOpen(false);
    setIsRenameResumeModalOpen(false);
  }, [location.pathname]);

  // const [resumeRef3, setResumeRef3] = useState("");

  // useEffect(() => {
  //   if (resumeRef.current) {
  //     // Accessing the resumeTemp3 element
  //     const resumeTemp3Element =
  //       resumeRef.current.querySelector(".resumeTemp3");

  //     if (resumeTemp3Element) {
  //       console.log("Found resumeTemp3:", resumeTemp3Element);
  //       setResumeRef3(resumeTemp3Element);
  //       // You can now interact with this element
  //     } else {
  //       console.log("resumeTemp3 element not found.");
  //     }
  //   }
  // }, [resumeRef]); // Ensure this runs when resumeRef is available
  const handleDashboardClick = () => {
    navigate("/");
  };
  return (
    <>
      {/* large screen */}
      <div className="relative  sidebar hidden xl:block">
        <div
          className={`bg-white sidebarShadow  rounded-[16px] py-4 w-full left-0 absolute ${
            isViewTemplatePage || isViewCoverletterTemplatePage
              ? "hidden lg10:block"
              : "hidden"
          }`}
        >
          <Link to="/" onClick={handleDashboardClick}>
            <div className="flex justify-center">
              <img src={logo} alt="logo" />
            </div>
          </Link>
        </div>
        <div
          className={` sidebarShadow bg-white w-full p-4   rounded-[0px] lg10:rounded-[16px] ${
            isViewTemplatePage || isViewCoverletterTemplatePage
              ? "absolute left-0 top-0 lg10:top-[15%] h-full lg10:h-[85%]"
              : "h-full"
          }`}
        >
          <div
            className={` ${
              isViewTemplatePage || isViewCoverletterTemplatePage
                ? "block lg10:hidden py-4"
                : "hidden"
            }`}
          >
            <Link to="/dashboard">
              <div className="flex justify-center">
                <img src={logo} alt="logo" />
              </div>
            </Link>
          </div>
          <div
            className={`h-[100%] flex flex-col justify-between  ${
              isViewTemplatePage || isViewCoverletterTemplatePage
                ? "lg10:h-[78vh]"
                : "lg10:h-[85vh]"
            }`}
          >
            <div>
              {isViewTemplatePage || isViewCoverletterTemplatePage ? (
                <div>
                  <div className="mb-8 ">
                    <div className="flex flex-col gap-3">
                      <h3 className="darkGray para-med font-OpenSan font-bold text-center">
                        {isViewTemplatePage ? "Resume" : "Coverletter"}{" "}
                        <span className="font-light"> Builder</span>
                      </h3>
                      <div className="bg-[#333] opacity-20  h-[1px]"></div>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-4">
                    {menuItems.map((item, index) => (
                      <div key={index}>
                        <li>
                          <div className=" ">
                            <a
                              className="cursor-pointer "
                              onClick={() => {
                                if (typeof item.link === "function") {
                                  item.link(); // Execute the function (modal open, etc.)
                                } else {
                                  handleToggle(item.link); // Toggle the tab using setActiveTab
                                }
                              }}
                            >
                              <div className="flex gap-1 justify-between items-center w-full">
                                <div className="flex  gap-2 ">
                                  <img src={item?.icon} alt="icons" />
                                  {item?.label}
                                </div>

                                <Tooltip
                                  title={item.tooltipContent}
                                  placement="right"
                                  color="#2A9DF4"
                                  trigger="hover"
                                  key={item.tooltipContent}
                                >
                                  {/* <Icon
                                    icon="flat-color-icons:info"
                                    width="20px"
                                    height="20px"
                                    color="#2A9DF4"
                                  /> */}

                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    viewBox="0 0 48 48"
                                  >
                                    <circle
                                      cx="24"
                                      cy="24"
                                      r="21"
                                      fill="#2196f3"
                                    />
                                    <path fill="#fff" d="M22 22h4v11h-4z" />
                                    <circle
                                      cx="24"
                                      cy="16.5"
                                      r="2.5"
                                      fill="#fff"
                                    />
                                  </svg>
                                </Tooltip>
                              </div>
                            </a>
                          </div>
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>
              ) : (
                <div>
                  <div className="mb-8 flex justify-center">
                    <Link to="/">
                      <img src={logo} alt="logo" />
                    </Link>
                  </div>
                  <ul className="flex flex-col gap-4">
                    {isAdmin == "Admin"
                      ? adminSidebarItems.map((item, idx) =>
                          item.label !== "Settings" ? (
                            <div key={idx}>
                              <li>
                                <NavLink
                                  to={item?.link}
                                  className="cursor-pointer"
                                >
                                  <img src={item?.icon} alt="icons" />
                                  {item?.label}
                                </NavLink>
                              </li>
                            </div>
                          ) : (
                            <div key={idx}>
                              <li className="relative">
                                <NavLink
                                  to={item?.link}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleSettingsClick();
                                  }}
                                >
                                  <img src={item?.icon} alt="icons" />
                                  {item?.label}
                                </NavLink>
                                {isSettingsOpen && (
                                  <ul className="mt-2 flex flex-col gap-3 ml-4">
                                    {settingsDropdownItems.map(
                                      (dropdownItem, idx) => (
                                        <li key={idx}>
                                          <NavLink
                                            to={dropdownItem.link}
                                            className="cursor-pointer flex items-center gap-2"
                                          >
                                            <img
                                              src={dropdownItem.icon}
                                              alt="icons"
                                            />
                                            {dropdownItem.label}
                                          </NavLink>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                )}
                              </li>
                            </div>
                          )
                        )
                      : sidebarItems.map((item, idx) =>
                          item.label !== "Settings" ? (
                            <div key={idx}>
                              <li>
                                <NavLink
                                  to={item?.link}
                                  className="cursor-pointer flex items-center gap-2"
                                >
                                  <img src={item?.icon} alt="icons" />
                                  {item?.label}
                                </NavLink>
                              </li>
                            </div>
                          ) : (
                            <div key={idx}>
                              <li className="relative">
                                <NavLink
                                  to={item?.link}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleSettingsClick();
                                  }}
                                >
                                  <img src={item?.icon} alt="icons" />
                                  {item?.label}
                                </NavLink>
                                {isSettingsOpen && (
                                  <ul className="mt-2 flex flex-col gap-3 ml-4">
                                    {settingsDropdownItems.map(
                                      (dropdownItem, idx) => (
                                        <li key={idx}>
                                          <NavLink
                                            to={dropdownItem.link}
                                            className="cursor-pointer flex items-center gap-2"
                                          >
                                            <img
                                              src={dropdownItem.icon}
                                              alt="icons"
                                            />
                                            {dropdownItem.label}
                                          </NavLink>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                )}
                              </li>
                            </div>
                          )
                        )}
                  </ul>
                </div>
              )}
            </div>
            {!isViewTemplatePage && !isViewCoverletterTemplatePage && (
              <div>
                <Button
                  className="btn-primary para-small flex justify-start gap-4 w-full"
                  text="Logout"
                  img={logout}
                  onClick={handleLogout}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Screen */}
      <div className="fixed top-0 mb-10 left-0 z-50  w-[100%]  bg-white p-3 boxShadow xl:hidden ">
        <div className="flex justify-between  w-[100%] ">
          <div className="flex justify-center">
            <Link to="/dashboard">
              <img src={logo} alt="logo icon" />
            </Link>
          </div>
          <div>
            <Hamburger toggled={open} toggle={setOpen} />
          </div>
        </div>
      </div>
      {/* Sidebar Drawer */}
      <Drawer
        placement="left"
        closable={true}
        onClose={() => setOpen(false)}
        open={open}
        width={250}
        className="block md:hidden"
      >
        <div>
          <div className="sidebar ">
            <div className="h-[100%]  flex flex-col justify-between">
              <div>
                {isViewTemplatePage || isViewCoverletterTemplatePage ? (
                  <div>
                    <div className="mb-8 ">
                      <div className="flex flex-col gap-3">
                        <Link to="/dashboard">
                          <div className="mb-4 flex justify-center">
                            <img src={logo} alt="logo" />
                          </div>
                        </Link>
                        <h3 className="darkGray para-med font-OpenSan font-bold text-center">
                          {isViewTemplatePage ? "Resume" : "Coverletter"}{" "}
                          <span className="font-light"> Builder</span>
                        </h3>
                        <div className="bg-[#333] opacity-20  h-[1px]"></div>
                      </div>
                    </div>
                    <ul className="flex flex-col gap-4">
                      {menuItems.map((item, idx) => (
                        <div key={idx}>
                          <li>
                            <a className="cursor-pointer" onClick={item?.link}>
                              <img src={item?.icon} alt="icons" />
                              {item?.label}
                            </a>
                          </li>
                        </div>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>
                    <div className="mb-8 flex justify-center">
                      <img src={logo} alt="logo" />
                    </div>
                    <ul className="flex flex-col gap-4">
                      {isAdmin == "Admin"
                        ? adminSidebarItems.map((item, idx) =>
                            item.label !== "Settings" ? (
                              <div key={idx}>
                                <li>
                                  <NavLink
                                    to={item?.link}
                                    className="cursor-pointer"
                                  >
                                    <img src={item?.icon} alt="icons" />
                                    {item?.label}
                                  </NavLink>
                                </li>
                              </div>
                            ) : (
                              <div key={idx}>
                                <li className="relative">
                                  <NavLink
                                    to={item?.link}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleSettingsClick();
                                    }}
                                  >
                                    <img src={item?.icon} alt="icons" />
                                    {item?.label}
                                  </NavLink>
                                  {isSettingsOpen && (
                                    <ul className="mt-2 flex flex-col gap-3 ml-4">
                                      {settingsDropdownItems.map(
                                        (dropdownItem, idx) => (
                                          <li key={idx}>
                                            <NavLink
                                              to={dropdownItem.link}
                                              className="cursor-pointer flex items-center gap-2"
                                            >
                                              <img
                                                src={dropdownItem.icon}
                                                alt="icons"
                                              />
                                              {dropdownItem.label}
                                            </NavLink>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  )}
                                </li>
                              </div>
                            )
                          )
                        : sidebarItems.map((item, idx) =>
                            item.label !== "Settings" ? (
                              <div key={idx}>
                                <li>
                                  <NavLink
                                    to={item?.link}
                                    className="cursor-pointer flex items-center gap-2"
                                  >
                                    <img src={item?.icon} alt="icons" />
                                    {item?.label}
                                  </NavLink>
                                </li>
                              </div>
                            ) : (
                              <div key={idx}>
                                <li className="relative">
                                  <NavLink
                                    to={item?.link}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleSettingsClick();
                                    }}
                                  >
                                    <img src={item?.icon} alt="icons" />
                                    {item?.label}
                                  </NavLink>
                                  {isSettingsOpen && (
                                    <ul className="mt-2 flex flex-col gap-3 ml-4">
                                      {settingsDropdownItems.map(
                                        (dropdownItem, idx) => (
                                          <li key={idx}>
                                            <NavLink
                                              to={dropdownItem.link}
                                              className="cursor-pointer flex items-center gap-2"
                                            >
                                              <img
                                                src={dropdownItem.icon}
                                                alt="icons"
                                              />
                                              {dropdownItem.label}
                                            </NavLink>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  )}
                                </li>
                              </div>
                            )
                          )}
                    </ul>
                  </div>
                )}
              </div>
              {!isViewTemplatePage && !isViewCoverletterTemplatePage && (
                <div>
                  <Button
                    className="btn-primary para-small flex justify-start gap-4 w-full"
                    text="Logout"
                    img={logout}
                    onClick={handleLogout}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Drawer>
      {/* RESUME BUILDER SECTIONS */}
      {/* Add Section Modal */}
      <AddSection
        isSectionModalOpen={isSectionModalOpen}
        setIsSectionModalOpen={setIsSectionModalOpen}
      />
      <RenameResumeModal
        isRenameResumeModalOpen={isRenameResumeModalOpen}
        setIsRenameResumeModalOpen={setIsRenameResumeModalOpen}
      />

      {/* <AnalyseResume
        isAnalyseModalOpen={isAnalyseModalOpen}
        setIsAnalyseModalOpen={setIsAnalyseModalOpen}
      /> */}
      {/* COVER LETTER BUILDER SECTION */}
      {/* Add Section Modal */}
      <AddSectionCoverletter
        isClSectionModalOpen={isClSectionModalOpen}
        setIsClSectionModalOpen={setIsClSectionModalOpen}
      />
      {/* Download Resume Modal */}
      {/* {console.log("resumeref", resumeRef3)} */}
      {["1", "2", "3", "4", "5", "6"].includes(id) ? (
        <Download2
          isModalOpen={isDownloadModalOpen}
          setIsDownloadModalOpen={setIsDownloadModalOpen}
          handleCancel={() => setIsDownloadModalOpen(false)}
          resumeRef={resumeRef}
        />
      ) : (
        <Download
          isModalOpen={isDownloadModalOpen}
          setIsDownloadModalOpen={setIsDownloadModalOpen}
          handleCancel={() => setIsDownloadModalOpen(false)}
          resumeRef={resumeRef}
        />
      )}
      {/* Download Cover Letter Modal */}
      <DownloadCoverLetter
        isModalOpen={isDownloadCoverModalOpen}
        setIsDownloadCoverModalOpen={setIsDownloadCoverModalOpen}
        handleCancel={() => setIsDownloadCoverModalOpen(false)}
        coverLetterRef={coverLetterRef}
      />
    </>
  );
};

export default Sidebar;
