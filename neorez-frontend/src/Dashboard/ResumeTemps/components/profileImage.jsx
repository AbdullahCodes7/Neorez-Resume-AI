import React from "react";
import dp from "../../../assets/icons/dashboard/profile.svg";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../redux/resumeSlice";

const ProfileImage = ({ style, activeOverLay }) => {
  const dispatch = useDispatch();

  // Fetch the profile image from Redux state
  const resume = useSelector((state) => state.resume);
  const profile = resume.sections[0];
  const profileImage = profile?.profileImage || "";

  // Image Upload Handler
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result;

      // Dispatch only to Redux without using local state
      dispatch(updateProfile({ profileImage: base64Image }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div
        className={`resume-image ${style} ${
          style === "resumeTemp4"
            ? activeOverLay
              ? "!bg-[#0f303ff5]"
              : ""
            : style === "resumeTemp5"
            ? activeOverLay
              ? "!bg-[#114a52]"
              : ""
            : ""
        }
        
      
        `}
      >
        {/* IMAGE */}
        <div className="image">
          <input
            type="file"
            id="profileImageInput"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          {profileImage ? (
            <img
              src={profileImage}
              alt="profile image"
              onClick={() =>
                document.getElementById("profileImageInput").click()
              }
              className="w-14 h-14 rounded-[50%] object-cover"
            />
          ) : (
            <img
              src={dp}
              alt="default profile image"
              onClick={() =>
                document.getElementById("profileImageInput").click()
              }
              className="w-14 h-14 rounded-[50%] object-cover"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileImage;
