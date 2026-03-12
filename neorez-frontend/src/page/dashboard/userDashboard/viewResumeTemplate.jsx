import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import cv from "../../../assets/images/dashboard/CV-Template.webp";
import eye from "../../../assets/icons/dashboard/eye.svg";
import { message, Modal, Tooltip } from "antd";
import Rearrange from "../../../Dashboard/UserDashboard/ResumeBuilder/rearrange";
import SelectTemplate from "../../../Dashboard/UserDashboard/ResumeBuilder/selectTemplate";
import DesignFont from "../../../Dashboard/UserDashboard/ResumeBuilder/design";
import AnalyseResume from "../../../Dashboard/UserDashboard/ResumeBuilder/analyseResume";
import AiWriteButton from "../../../Dashboard/UserDashboard/aiWriteButton";
// import ResumeTemplate1 from "../../../Dashboard/UserDashboard/ResumeTemplate/resumeTemplate";
// import ResumeTemplate1Integrated from "../../../Dashboard/UserDashboard/ResumeTemplate/resumeTemplate copy";
import ResumeTemplate2 from "../../../Dashboard/UserDashboard/ResumeTemplate/resumeTemlate2";
import ResumeTemplate3 from "../../../Dashboard/UserDashboard/ResumeTemplate/resumeTemplate3";
import ResumeTemplate4 from "../../../Dashboard/UserDashboard/ResumeTemplate/resumeTemplate4";
import ResumeTemplate5 from "../../../Dashboard/UserDashboard/ResumeTemplate/resumeTemplate5";
import ResumeTemplate6 from "../../../Dashboard/UserDashboard/ResumeTemplate/resumeTemplate6";
import ResumeTemplate7 from "../../../Dashboard/UserDashboard/ResumeTemplate/resumeTemplate7";
import { Drawer } from "antd";
import Hamburger from "hamburger-react";
import ResumeTemps from "../../../Dashboard/ResumeTemps/pages/resume";
import ResumeTemp1 from "../../../Dashboard/ResumeTemps/pages/resumeTemp1";
import { useSelector } from "react-redux";
import axios from "axios";

import ResumeTemp2 from "../../../Dashboard/ResumeTemps/pages/resumeTemp2";
import ResumeTemp3 from "../../../Dashboard/ResumeTemps/pages/resumeTemp3";
import ResumeTemp4 from "../../../Dashboard/ResumeTemps/pages/resumeTemp4";
import ResumeTemp5 from "../../../Dashboard/ResumeTemps/pages/resumeTemp5";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  updateAllSections,
  updateSection,
  updateTemplateId,
} from "../../../redux/resumeSlice2";
import { fetchResumeData } from "../../../redux/actions/fetchResume";
import Rearranget1 from "../../../Dashboard/UserDashboard/ResumeBuilder/rearranget1";
import ResumeTemp6 from "../../../Dashboard/ResumeTemps/pages/resumeTemp6";
import { useSectionsContext } from "../../../App";

const ViewResumeTemplate = ({ resumeRef }) => {
  // console.log("resumeRef", resumeRef);
  const { id, uid } = useParams();
  const { setSectionsState } = useSectionsContext();

  // console.log("id", id);
  // console.log("uid", uid);
  const location = useLocation();
  const { fromTemplatePage } = location?.state || {};
  const navigate = useNavigate();
  // console.log("Saved Draft Templates:", fromTemplatePage);
  const [open, setOpen] = useState(false);
  const { activeTab, setActiveTab } = useOutletContext();
  const [isEyeModalOpen, setIsEyeModalOpen] = useState(false);
  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;
  const dispatch = useDispatch();

  // console.log("resume===============", resume);

  const userInfo = useSelector((state) => state.userData);

  // console.log("user =============", user);

  // useEffect(() => {
  //   const TemplateId = localStorage.getItem("tId");
  //   dispatch(updateTemplateId(TemplateId));
  // }, []);
  useEffect(() => {
    const currentUid = uid;

    if (fromTemplatePage == true) {
      navigate(location.pathname, { replace: true, state: {} }); // Reset `location.state` to avoid persisting
    } else if (currentUid) {
      // console.log("first uid");
      dispatch(fetchResumeData(currentUid, setSectionsState));
    } else if (userInfo) {
      // console.log("first user info");

      // Map userInfo fields to the resume 'profile' section
      dispatch(
        updateSection({
          type: "profile",
          data: {
            name: userInfo?.name || "ISABEL MERCADO",
            contactNumber: userInfo?.contactNumber,
            email: userInfo?.email,
            address: userInfo?.address,
            jobTitle: userInfo?.desiredJobTitle,
            links: userInfo?.links || [],
          },
        })
      );

      // Map education info to the 'education' section in resume
      dispatch(
        updateSection({
          type: "education",
          data: {
            items: userInfo.education.map((edu) => ({
              degree: edu.degree,
              institution: edu.institution,
              reference: edu.reference,
              startDate: edu.startDate,
              endDate: edu.endDate,
            })),
          },
        })
      );

      // Map skills to the 'skills' section in resume
      // dispatch(
      //   updateSection({
      //     type: "skills",
      //     data: {
      //       items: userInfo.skills.map((skill) => ({
      //         name: skill.name,
      //         level: skill.level,
      //       })),
      //     },
      //   })
      // );
    }
  }, [userInfo, dispatch]);
  // useEffect(() => {
  //   console.log("uid", uid);
  //   if (uid) {
  //     // If pdf is false, fetch the data from the database
  //     dispatch(fetchResumeData(uid));
  //   }
  // }, [dispatch]);

  const handleEyeModal = () => {
    setIsEyeModalOpen(!isEyeModalOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Rearrange":
        if (["1", "2", "3", "4", "5", "6"].includes(id)) {
          return <Rearranget1 setActiveTab={setActiveTab} />;
        } else {
          return <Rearrange setActiveTab={setActiveTab} />;
        }
      case "Templates":
        return <SelectTemplate setActiveTab={setActiveTab} />;
      case "Design & Font":
        return <DesignFont setActiveTab={setActiveTab} />;
      case "Analyse Resume":
        return <AnalyseResume setActiveTab={setActiveTab} />;
      default:
        return null;
    }
  };

  // useEffect(() => {
  //   console.log("activeTab", activeTab);
  // }, []);

  return (
    <>
      <div className="pb-10 mt-10 xl:mt-0 ">
        <div className="bg-white h-auto rounded-lg py-6 px-0 xl:px-5 flex gap-5 relative">
          {/* left area */}
          <div
            className={`flex justify-center transition-all duration-300 ${
              activeTab
                ? "w-full xl:w-[60%] h-full"
                : "w-full xl:w-[595px] m-auto"
            }`}
          >
            <div className="flex w-[595px] justify-center gap-10 relative">
              {/* <img src={cv} alt="cv template" className="w-full h-auto" /> */}

              {/* {id === "1" && (
                <ResumeTemps
                  style="resume1"
                  resumeRef={resumeRef}
                  fromTemplatePage={fromTemplatePage}
                />
              )} */}
              {id === "2" && (
                <ResumeTemp1
                  style="resumeTemp1"
                  resumeRef={resumeRef}
                  fromTemplatePage={fromTemplatePage}
                />
              )}
              {id === "3" && (
                <ResumeTemp1
                  style="resumeTemp2"
                  resumeRef={resumeRef}
                  fromTemplatePage={fromTemplatePage}
                />
              )}
              {id === "4" && (
                <ResumeTemp1
                  style="resumeTemp3"
                  resumeRef={resumeRef}
                  fromTemplatePage={fromTemplatePage}
                />
              )}
              {id === "5" && (
                <ResumeTemp6
                  style="resumeTemp4"
                  resumeRef={resumeRef}
                  fromTemplatePage={fromTemplatePage}
                />
              )}
              {id === "6" && (
                <ResumeTemp6
                  style="resumeTemp5"
                  resumeRef={resumeRef}
                  fromTemplatePage={fromTemplatePage}
                />
              )}
              {id === "7" && (
                <ResumeTemp2
                  style="resumeTemplate6"
                  resumeRef={resumeRef}
                  fromTemplatePage={fromTemplatePage}
                />
              )}
              {id === "8" && (
                <ResumeTemp2
                  style="resumeTemplate7"
                  resumeRef={resumeRef}
                  fromTemplatePage={fromTemplatePage}
                />
              )}
              {id === "9" && (
                <ResumeTemp2
                  style="resumeTemplate8"
                  resumeRef={resumeRef}
                  fromTemplatePage={fromTemplatePage}
                />
              )}
              {id === "10" && (
                <ResumeTemp2
                  style="resumeTemplate9"
                  resumeRef={resumeRef}
                  fromTemplatePage={fromTemplatePage}
                />
              )}
              {id === "11" && (
                <ResumeTemp2
                  style="resumeTemplate10"
                  resumeRef={resumeRef}
                  fromTemplatePage={fromTemplatePage}
                />
              )}
              {id === "12" && (
                <ResumeTemp2
                  style="resumeTemplate11"
                  resumeRef={resumeRef}
                  fromTemplatePage={fromTemplatePage}
                />
              )}
              {id === "13" && (
                <ResumeTemp2
                  style="resumeTemplate18"
                  resumeRef={resumeRef}
                  fromTemplatePage={fromTemplatePage}
                />
              )}
              {id === "14" && (
                <ResumeTemp1
                  style="resumeTemplate14"
                  resumeRef={resumeRef}
                  fromTemplatePage={fromTemplatePage}
                />
              )}
              {id === "15" && (
                <ResumeTemp1
                  style="resumeTemp16"
                  resumeRef={resumeRef}
                  fromTemplatePage={fromTemplatePage}
                />
              )}
              {id === "16" && (
                <ResumeTemp3
                  style="resumeTemplate12"
                  resumeRef={resumeRef}
                  fromTemplatePage={fromTemplatePage}
                />
              )}
              {id === "17" && (
                <ResumeTemp4
                  style="resumeTemplate13"
                  resumeRef={resumeRef}
                  fromTemplatePage={fromTemplatePage}
                />
              )}
              {id === "18" && (
                <ResumeTemp4
                  style="resumeTemplate19"
                  resumeRef={resumeRef}
                  fromTemplatePage={fromTemplatePage}
                />
              )}
              {id === "19" && (
                <ResumeTemp5
                  style="resumeTemplate17"
                  resumeRef={resumeRef}
                  fromTemplatePage={fromTemplatePage}
                />
              )}
              {id === "20" && (
                <ResumeTemp4
                  style="resumeTemplate15"
                  resumeRef={resumeRef}
                  fromTemplatePage={fromTemplatePage}
                />
              )}

              {/* <div className="absolute right-0 cursor-pointer">
                <img src={eye} alt="eye icon" onClick={handleEyeModal} />
              </div> */}
              {/* AI write popover */}
              <div className="absolute top-6 right-10">
                {/* <AiWriteButton /> */}
              </div>
            </div>
          </div>

          {/* right area */}
          {activeTab && (
            <div className="xl:w-[40%] transition-all duration-300">
              <div className="hidden xl:block">{renderContent()}</div>
              {/*Right Area for Smaller Screens(1280px) */}
              <div className="block xl:hidden viewTemplate">
                <div>
                  <Hamburger toggled={open} toggle={setOpen} />
                </div>
                <div>
                  <Drawer
                    placement="right"
                    closable={true}
                    onClose={() => setOpen(false)}
                    open={open}
                  >
                    <div>{renderContent()}</div>
                  </Drawer>
                </div>
              </div>
            </div>
          )}
          <div className="absolute left-8 top-6 ">
            <Tooltip
              title=" click on the respective section to edit it."
              placement="right"
              color="#2A9DF4"
              trigger="hover"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 48 48"
              >
                <circle cx="24" cy="24" r="21" fill="#2196f3" />
                <path fill="#fff" d="M22 22h4v11h-4z" />
                <circle cx="24" cy="16.5" r="2.5" fill="#fff" />
              </svg>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Eye Modal */}
      <Modal
        open={isEyeModalOpen}
        onCancel={handleEyeModal}
        footer={null}
        centered
      >
        <div className="py-4">
          <img src={cv} alt="cv template" />
        </div>
      </Modal>
    </>
  );
};

export default ViewResumeTemplate;
