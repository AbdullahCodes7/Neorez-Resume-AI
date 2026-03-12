import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import dp from "../../../assets/icons/dashboard/profile.svg";
import { Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateSection } from "../../../redux/resumeSlice2";
import { debounce } from "../../../utils/debounce";
import PopoverToolbar from "./popover";

const Profile = ({ headingStyle, fontFamily, style, color, section }) => {
  const dispatch = useDispatch();
  const resume = useSelector((state) => state?.resume);
  const quillRefs = useRef({});
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverTarget, setPopoverTarget] = useState(null);
  // console.log("section profile ================", section);
  const profile =
    section || resume.sections.find((section) => section?.type === "profile");

  // console.log("profied", profile);

  const [profileData, setProfileData] = useState({
    name: profile?.name || "ISABEL MERCADO",
    jobTitle: profile?.jobTitle || "Business Manager",
    profileImage: profile?.profileImage || "",
  });

  useEffect(() => {
    setProfileData({
      name: profile?.name || "ISABEL MERCADO",
      jobTitle: profile?.jobTitle || "Business Manager",
      profileImage: profile?.profileImage || "",
    });
  }, [profile]);

  const [activeEditor, setActiveEditor] = useState(null);
  const [isPopoverFocused, setIsPopoverFocused] = useState(false);
  const modules = { toolbar: { container: ["bold", "italic", "underline"] } };
  const formats = ["bold", "italic", "underline", "list", "bullet", "link"];

  const debouncedDispatch = (field, value) => {
    dispatch(updateSection({ type: "profile", data: { [field]: value } }));
  };

  const handleEditorClick = (editorType, event) => {
    setActiveEditor(editorType);
    openPopover(event); // Open the popover on click
    // setPopoverVisible(false);
    setIsPopoverFocused(true); // Mark the popover as active
    // Open the Popover and focus the ReactQuill editor after a slight delay
    setTimeout(() => {
      if (quillRefs.current[editorType]) {
        quillRefs.current[editorType].focus();
      }
    }, 100);
  };

  const handleBlur = (field) => {
    if (!isPopoverFocused) {
      debouncedDispatch(field, profileData[field]);
      setActiveEditor(null);
      setActiveEditor(null);
    }
  };

  const handleChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result;
      setProfileData((prevData) => ({
        ...prevData,
        profileImage: base64Image,
      }));
      dispatch(
        updateSection({ type: "profile", data: { profileImage: base64Image } })
      );
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const openPopover = (event) => {
    setPopoverVisible(true);
    setPopoverTarget(event.currentTarget);
    setIsPopoverFocused(true); // Popover is now focused
  };

  return (
    <div
      className={`resume-section resume-section-break resume-profile ${style?.style}`}
      style={{
        backgroundColor: ![
          "resumeTemp1",
          "resumeTemp2",
          "resumeTemp3",
          "resumeTemp4",
          "resumeTemp5",
          // "resumeTemplate3"
          "resumeTemplate6",
          "resumeTemplate7",
          "resumeTemplate8",
          "resumeTemplate9",
          "resumeTemplate10",
        ].includes(style)
          ? color
          : "",
      }}
    >
      {/* Popover Toolbar */}
      <Popover
        content={<PopoverToolbar activeEditor={activeEditor} />}
        trigger="click"
        placement="left"
        visible={popoverVisible}
        onVisibleChange={(visible) => {
          setPopoverVisible(visible);
          setIsPopoverFocused(visible); // Update focus state based on visibility
        }}
        getPopupContainer={() => popoverTarget || document.body}
      />
      {/* Profile Image */}
      <>
        <div
          className="image"
          onClick={(event) => {
            handleEditorClick("profileImage", event);
          }}
        >
          <input
            type="file"
            id="profileImageInput"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          {profileData?.profileImage ? (
            <img
              src={profileData?.profileImage}
              alt="profile"
              className="w-14 h-14 rounded-full object-cover"
            />
          ) : (
            <img
              src={dp}
              alt="profile placeholder"
              className="w-14 h-14 rounded-full object-cover"
              onClick={() =>
                document.getElementById("profileImageInput").click()
              }
            />
          )}
        </div>

        {/* Name and Job Title */}
        <div className="p-2 name-designation">
          {/* Name Field */}
          {/* {profile?.visibility?.name && ( */}
          <div
            className="name-wrap"
            onClick={(event) => handleEditorClick("name", event)}
          >
            {activeEditor === "name" ? (
              <ReactQuill
                ref={(el) => (quillRefs.current["name"] = el)}
                value={profileData?.name}
                modules={modules}
                formats={formats}
                theme="bubble"
                placeholder="Write your name here..."
                onChange={(value) => handleChange("name", value)}
                onBlur={
                  () => handleBlur("name")
                  // setActiveEditor(null);
                }
              />
            ) : (
              <div
                className={`name ${style?.style}`}
                style={{
                  color: [
                    "resumeTemplate8",
                    "resumeTemplate9",
                    "resumeTemplate10",
                    "resumeTemplate6",
                    "resumeTemp2",
                    "resumeTemp3",
                    "resumeTemp4",
                    "resumeTemp5",
                  ].includes(style)
                    ? color
                    : "",
                  fontFamily: fontFamily,
                }}
                dangerouslySetInnerHTML={{ __html: profileData?.name }}
              />
            )}
          </div>
          {/* )} */}

          <div className="seperateHeading"></div>

          {/* Job Title Field */}
          {/* {profile?.visibility?.jobTitle && ( */}
          <div
            className="designation-wrap"
            onClick={(event) => {
              handleEditorClick("designation", event);
            }}
          >
            {activeEditor === "designation" ? (
              <ReactQuill
                ref={(el) => (quillRefs.current["designation"] = el)}
                value={profileData?.jobTitle}
                modules={modules}
                formats={formats}
                theme="bubble"
                placeholder="Write your designation here..."
                onChange={(value) => handleChange("jobTitle", value)}
                onBlur={() => handleBlur("jobTitle")}
              />
            ) : (
              <div
                className={`designation ${style?.style}`}
                style={{
                  fontFamily: fontFamily,
                }}
                dangerouslySetInnerHTML={{ __html: profileData?.jobTitle }}
              />
            )}
          </div>
          {/* )} */}
        </div>
      </>
    </div>
  );
};

export default Profile;
