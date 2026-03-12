import React, { useState } from "react";
import Button from "../../../components/shared/button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateTemplateId, updateUid } from "../../../redux/resumeSlice2";
import { toast } from "react-toastify";
import axios from "axios";
import ResumeTemps from "../../../Dashboard/ResumeTemps/pages/resume";
import ResumeTemp1 from "../../../Dashboard/ResumeTemps/pages/resumeTemp1";
import ResumeTemp2 from "../../../Dashboard/ResumeTemps/pages/resumeTemp2";
import ResumeTemp3 from "../../../Dashboard/ResumeTemps/pages/resumeTemp3";
import ResumeTemp4 from "../../../Dashboard/ResumeTemps/pages/resumeTemp4";
import ResumeTemp5 from "../../../Dashboard/ResumeTemps/pages/resumeTemp5";
import { Modal, Spin } from "antd";

// Map each templateId to the appropriate component and style
const componentMapping = {
  1: { component: ResumeTemps, style: "resume1" },
  2: { component: ResumeTemp1, style: "resumeTemp1" },
  3: { component: ResumeTemp1, style: "resumeTemp2" },
  4: { component: ResumeTemp1, style: "resumeTemp3" },
  5: { component: ResumeTemp1, style: "resumeTemp4" },
  6: { component: ResumeTemp1, style: "resumeTemp5" },
  7: { component: ResumeTemp2, style: "resumeTemplate6" },
  8: { component: ResumeTemp2, style: "resumeTemplate7" },
  9: { component: ResumeTemp2, style: "resumeTemplate8" },
  10: { component: ResumeTemp2, style: "resumeTemplate9" },
  11: { component: ResumeTemp2, style: "resumeTemplate10" },
  12: { component: ResumeTemp2, style: "resumeTemplate11" },
  13: { component: ResumeTemp2, style: "resumeTemplate18" },
  14: { component: ResumeTemp1, style: "resumeTemplate14" },
  15: { component: ResumeTemp1, style: "resumeTemp16" },
  16: { component: ResumeTemp3, style: "resumeTemplate12" },
  17: { component: ResumeTemp4, style: "resumeTemplate13" },
  18: { component: ResumeTemp4, style: "resumeTemplate19" },
  19: { component: ResumeTemp5, style: "resumeTemplate17" },
  20: { component: ResumeTemp4, style: "resumeTemplate15" },
};

const ResumesCatagory = ({
  isSaveResumePage,
  resumes,
  loading,
  handleGetResumes,
  setResumes,
}) => {
  // console.log("first resumes", resumes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;
  const uidparams = useParams();
  const uid = useSelector((state) => state.resume.uid);

  // State for delete confirmation modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState(null);

  const handleViewResume = (data) => {
    const uid = data.uid || uidparams.uid;
    dispatch(updateUid(uid));
    navigate(`/view-resume/${data.templateId}/${uid}`);
  };

  const confirmDeleteResume = (resume) => {
    setResumeToDelete(resume);
    setIsModalVisible(true); // Show modal
  };

  const handleDeleteResume = async () => {
    if (!resumeToDelete) return;
    try {
      const response = await axios.delete(
        `${ApiUrl}/resume/delete/${resumeToDelete.uid}`
      );
      if (response.data) {
        handleGetResumes();
        setResumes((prev) => prev.filter((r) => r.uid !== resumeToDelete.uid));
        toast.success("Resume deleted successfully!");
      } else {
        toast.error("Failed to delete resume!");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsModalVisible(false); // Hide modal
      setResumeToDelete(null); // Reset resume to delete
    }
  };

  // Renders the component based on templateId and applies the respective style
  const renderResumeComponent = (templateId, resumeData) => {
    const templateInfo = componentMapping[templateId];
    if (!templateInfo) return null;

    const { component: Component, style } = templateInfo;

    return <Component style={style} data={resumeData} />;
  };

  // console.log("resumes", resumes);

  return (
    <div className="template">
      {isSaveResumePage ? (
        <div
          className={`3xl:grid 3xl:grid-cols-2 flex flex-col ${
            isSaveResumePage
              ? "px-10 justify-center md:justify-start"
              : "justify-center"
          } gap-3 items-center max-h-[100vh] overflow-y-auto`}
          style={{ gridAutoRows: "1fr" }}
        >
          {loading ? (
            // Show loader while initially loading resumes
            <div className="flex justify-center w-full py-5">
              <Spin size="large" />
            </div>
          ) : resumes && resumes.length > 0 ? (
            resumes.map(
              (resume) =>
                resume.uid && (
                  <div
                    key={resume._id}
                    className="groupWrap relative flex-col h-full"
                  >
                    <div className="bg-[#F2F2F2] bgHover rounded-[12px] flex flex-col gap-3 p-5 h-full justify-between">
                      <div className="relative group overflow-hidden rounded-md ">
                        <div className="flex w-[595px] mx-auto justify-center gap-10 relative pointer-events-none">
                          {renderResumeComponent(
                            Number(resume.templateId),
                            resume
                          )}
                        </div>
                        <Button
                          className="group-hover !left-[15px] absolute w-[95%] btn-primary opacity-0 transition-all duration-300 ease-in-out"
                          text="Use Template"
                          minHeight={41}
                          onClick={() => handleViewResume(resume)}
                        />
                        <Button
                          className="group-hover:opacity-100 absolute bottom-16 left-[15px] w-[95%] bg-red-600 text-white opacity-0 transition-all duration-300 ease-in-out hover:bg-red-700"
                          text="Delete"
                          minHeight={41}
                          onClick={() => confirmDeleteResume(resume)}
                        />
                      </div>
                      {/* {console.log("first in resume", resume)} */}
                      <p className="para-small font-OpenSan darkGray font-semibold text-nowrap text-center">
                        {resume.resumeName ? (
                          resume.resumeName
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: resume?.sections
                                ? resume?.sections[0]?.jobTitle
                                : "",
                            }}
                          />
                        )}
                        {/* {resume?.sections ? resume?.sections[0]?.jobTitle : ""} */}
                      </p>
                    </div>
                  </div>
                )
            )
          ) : (
            // Show "No data found" message if no resumes are available
            <p className="text-center py-5">No data Found</p>
          )}
        </div>
      ) : (
        <p>No data Found</p>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
        onOk={handleDeleteResume} // Delete on confirmation
        onCancel={() => setIsModalVisible(false)} // Close modal on cancel
        okText="Yes, Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this resume?</p>
      </Modal>
    </div>
  );
};

export default ResumesCatagory;
