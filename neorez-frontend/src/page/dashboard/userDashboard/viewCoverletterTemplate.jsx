import React, { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import cv from "../../../assets/images/dashboard/coverletterView.webp";
import eye from "../../../assets/icons/dashboard/eye.svg";
import { Drawer, Modal } from "antd";
import RearrangeCoverLetter from "../../../Dashboard/UserDashboard/CoverletterBuilder/rearrange";
import SelectTemplateCoverletter from "../../../Dashboard/UserDashboard/CoverletterBuilder/selectTemplate";
import DesignFontCoverletter from "../../../Dashboard/UserDashboard/CoverletterBuilder/design";
import Hamburger from "hamburger-react";
import CoverletterMain from "../../../Dashboard/coverletterTemplates/page/coverletterMain";
import { useSelector } from "react-redux";
import Cookies from "js-cookie"; // Install using `npm install js-cookie
import {
  setCoverLetter,
  updateCoverLetter,
} from "../../../redux/coverLetterSlice";
import { useDispatch } from "react-redux";
import { fetchCoverLetterData } from "../../../redux/actions/fetchCoverLetter";

const ViewCoverletterTemplate = ({ coverLetterRef }) => {
  const [open, setOpen] = useState(false);
  const LocationData = useLocation();
  const dispatch = useDispatch();
  const { id, uid } = useParams();
  // console.log("LocationData", LocationData.state);
  // console.log("id", id);
  // console.log("uid", uid);
  const { activeTab, setActiveTab } = useOutletContext();
  const [isEyeModalOpen, setIsEyeModalOpen] = useState(false);
  const handleEyeModal = () => {
    setIsEyeModalOpen(!isEyeModalOpen);
  };
  const { fromTemplatePage } = location?.state || {};
  // console.log("location.state",location.state)
  const navigate = useNavigate();
  // console.log("user =============", user);
  const [loading, setLoading] = useState(false);

  const userInfo = useSelector((state) => state.userData);
  const coverLetter = useSelector((state) => state.coverLetter);

  // console.log("user =============", userInfo);
  // console.log("userId =============", userId);
  // console.log("id =============", id);
  // console.log("templateId outside =============", templateId);

  useEffect(() => {
    // Check if it's the first visit from "AI"
    const isFirstTimeFromAI =
      LocationData?.state?.from === "AI" &&
      !sessionStorage?.getItem("visitedFromAI");
    // console.log("abc", LocationData.state.from);
    // console.log("fsdf", LocationData.state.from === "AI");

    if (isFirstTimeFromAI) {
      // Mark as visited for subsequent actions
      sessionStorage?.setItem("visitedFromAI", "true");
      return; // Skip dispatch on the first time from "AI"
    }

    // Dispatch only if the user refreshes or it's not the first time from "AI"
    const currentUid = uid;
    if (fromTemplatePage == true) {
      navigate(location.pathname, { replace: true, state: {} }); // Reset `location.state` to avoid persisting
    }
    //  {
    else if (userInfo?.name) {
      // console.log("test11")
      dispatch(
        setCoverLetter({
          userId: userInfo.id || null, // if user ID exists
          name: userInfo?.name,
          phone: userInfo?.contactNumber,
          email: userInfo?.email,
          location: userInfo?.address,
          jobTitle: userInfo?.desiredJobTitle,
          company: userInfo?.currentCompany || "",
          designation: userInfo?.currentDesignation || "",
          linkedIn: userInfo?.linkedIn || "",
          // Add more fields as needed for the cover letter
        })
      );
    } else if (currentUid) {
      dispatch(fetchCoverLetterData(currentUid));
      // console.log("uiddddddddd in");
    }
    // }
  }, [userInfo, dispatch, LocationData]);

  const renderContent = () => {
    switch (activeTab) {
      case "RearrangeCl":
        return <RearrangeCoverLetter setActiveTab={setActiveTab} />;
      case "TemplatesCl":
        return <SelectTemplateCoverletter setActiveTab={setActiveTab} />;
      case "Design & FontCl":
        return <DesignFontCoverletter setActiveTab={setActiveTab} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="pb-10 mt-10 xl:mt-0 ">
        <div className="bg-white px-0 xl:px-5 rounded-lg py-6 flex gap-9 w-full">
          {/* left area */}
          <div
            className={`flex justify-center transition-all duration-300 ${
              activeTab
                ? "w-full xl:max-w-full h-full"
                : "w-full xl:w-[595px] m-auto"
            }`}
          >
            <div className="flex flex-col justify-center gap-10 relative w-[595px] ">
              {id === "1" && (
                <CoverletterMain
                  coverLetterRef={coverLetterRef}
                  style="coverletter1"
                />
              )}
              {id === "2" && (
                <CoverletterMain
                  coverLetterRef={coverLetterRef}
                  style="coverletter2"
                />
              )}
              {id === "3" && (
                <CoverletterMain
                  coverLetterRef={coverLetterRef}
                  style="coverletter3"
                />
              )}
              {id === "4" && (
                <CoverletterMain
                  coverLetterRef={coverLetterRef}
                  style="coverletter4"
                />
              )}
              {id === "5" && (
                <CoverletterMain
                  coverLetterRef={coverLetterRef}
                  style="coverletter5"
                />
              )}
              {id === "6" && (
                <CoverletterMain
                  coverLetterRef={coverLetterRef}
                  style="coverletter6"
                />
              )}
              {id === "7" && (
                <CoverletterMain
                  coverLetterRef={coverLetterRef}
                  style="coverletter7"
                />
              )}
              {id === "8" && (
                <CoverletterMain
                  coverLetterRef={coverLetterRef}
                  style="coverletter8"
                />
              )}
              {id === "9" && (
                <CoverletterMain
                  coverLetterRef={coverLetterRef}
                  style="coverletter9"
                />
              )}
              {id === "10" && (
                <CoverletterMain
                  coverLetterRef={coverLetterRef}
                  style="coverletter10"
                />
              )}

              {/* <div className="absolute top-[-17px] right-[-13px] cursor-pointer">
                <img src={eye} alt="eye icon" onClick={handleEyeModal} />
              </div> */}
            </div>
          </div>

          {/* right area */}
          {activeTab && (
            <div className="xl:w-full transition-all duration-300">
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
        </div>
      </div>

      {/* Eye Modal */}
      <Modal
        open={isEyeModalOpen}
        onCancel={handleEyeModal}
        footer={null}
        centered
      >
        <div className="py-6">
          <img src={cv} alt="cv template" />
        </div>
      </Modal>
    </>
  );
};

export default ViewCoverletterTemplate;
