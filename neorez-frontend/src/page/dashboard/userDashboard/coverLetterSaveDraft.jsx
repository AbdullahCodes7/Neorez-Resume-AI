import React, { useEffect, useState } from "react";
import Button from "../../../components/shared/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

// Import your template components
import CoverletterMain from "../../../Dashboard/coverletterTemplates/page/coverletterMain";
import { Modal, Spin } from "antd";

const CoverletterCatagory = ({
  showAll,
  isSavePage,
  coverLetter,
  handleGetCoverLetters,
  loading,
  setCoverLetter,
}) => {
  const [templateId, setTemplateId] = useState(null); // Local state for template ID
  const [style, setStyle] = useState(""); // Local state for style
  const uid = useSelector((state) => state.resume.uid);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [coverLetterToDelete, setCoverLetterToDelete] = useState(null);

  // Handle View Cover Letter based on templateId and uid
  const handleViewCoverLetter = (cover) => {
    navigate(`/view-coverletter/${cover.templateId}/${cover.uid}`);
  };

  // Delete cover letter by uid
  const handleDeleteCoverLetter = async () => {
    if (!coverLetterToDelete) return;

    try {
      const response = await axios.delete(
        `${ApiUrl}/cover/delete/${coverLetterToDelete.uid}`
      );
      if (response.data) {
        handleGetCoverLetters();
        setCoverLetter((prev) =>
          prev.filter((r) => r.uid !== coverLetterToDelete.uid)
        );
        toast.success("Cover letter deleted successfully!");
      } else {
        toast.error("Failed to delete cover letter!");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsModalVisible(false); // Hide modal
      setCoverLetterToDelete(null); // Reset resume to delete
    }
  };

  // Call the fetch function on component mount
  // useEffect(() => {
  //   fetchCoverLetterTemplate();
  // }, [uid]);

  // Function to render the cover letter component based on the templateId and apply the style
  const renderCoverLetterComponent = (data, style) => {
    // console.log("data data", data);
    switch (data.templateId) {
      case 1:
        return <CoverletterMain style={style || "coverletter1"} data={data} />;
      case 2:
        return <CoverletterMain style={style || "coverletter2"} data={data} />;
      case 3:
        return <CoverletterMain style={style || "coverletter3"} data={data} />;
      case 4:
        return <CoverletterMain style={style || "coverletter4"} data={data} />;
      case 5:
        return <CoverletterMain style={style || "coverletter5"} data={data} />;
      case 6:
        return <CoverletterMain style={style || "coverletter6"} data={data} />;
      case 7:
        return <CoverletterMain style={style || "coverletter7"} data={data} />;
      case 8:
        return <CoverletterMain style={style || "coverletter8"} data={data} />;
      case 9:
        return <CoverletterMain style={style || "coverletter9"} data={data} />;
      case 10:
        return <CoverletterMain style={style || "coverletter10"} data={data} />;
      default:
        return <div>No Cover Letter Template Found</div>;
    }
  };

  const confirmDeleteCL = (resume) => {
    setCoverLetterToDelete(resume);
    setIsModalVisible(true); // Show modal
  };

  return (
    <div className="template">
      {showAll || isSavePage ? (
        <div
          className={`grid grid-cols-2 ${
            isSavePage
              ? "px-10 justify-center md:justify-start"
              : "justify-center"
          } gap-3 items-center max-h-[100vh] overflow-y-auto`}
        >
          {loading ? (
            <div className="flex justify-center w-full py-5">
              <Spin size="large" />
            </div>
          ) : coverLetter.length > 0 ? (
            coverLetter.map((cover) => (
              <div key={cover.id} className="groupWrap h-full relative">
                <div className="bg-[#F2F2F2] bgHover rounded-[12px] flex flex-col gap-3 items-center justify-between px-[25px] py-5 h-full">
                  <div className="relative group overflow-hidden rounded-md  ">
                    <div className="pointer-events-none">
                      {/* Dynamically render the cover letter component with style */}
                      {renderCoverLetterComponent(cover, style)}
                    </div>
                    <Button
                      className="group-hover absolute w-[95%] btn-primary !left-[17px] opacity-0 transition-all duration-300 ease-in-out"
                      text="Use Template"
                      minHeight={41}
                      onClick={() => handleViewCoverLetter(cover)}
                    />
                    <Button
                      className="group-hover:opacity-100 absolute bottom-16 left-[17px] w-[95%] bg-red-600 text-white opacity-0 transition-all duration-300 ease-in-out hover:bg-red-700"
                      text="Delete"
                      minHeight={41}
                      onClick={() => confirmDeleteCL(cover)}
                    />
                  </div>
                  {/* {console.log("cover.title",cover)} */}

                  <p className="para-small font-OpenSan darkGray font-semibold text-nowrap">
                    {/* {cover.title} */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: cover.designation,
                      }}
                    />
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No data found</p>
          )}
        </div>
      ) : (
        <p>No data found</p>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
        onOk={handleDeleteCoverLetter} // Delete on confirmation
        onCancel={() => setIsModalVisible(false)} // Close modal on cancel
        okText="Yes, Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this resume?</p>
      </Modal>
    </div>
  );
};

export default CoverletterCatagory;
