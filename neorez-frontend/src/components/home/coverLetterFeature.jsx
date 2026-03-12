import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import Button from "../shared/button";
import checkIcon from "../../assets/icons/checkIcon.svg";
import axios from "axios";

const CoverLetterFeature = ({ feature, isAdminContent, handleClick }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedFeature, setEditedFeature] = useState(feature);
  const [displayImage, setDisplayImage] = useState(feature?.image || ""); // Main displayed image
  const [tempImage, setTempImage] = useState(""); // Temporary image during editing
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility

  const apiUrl = import.meta.env.VITE_APP_BACKEND_API;

  const handleEditToggle = () => {
    setIsEditing(true);
    setIsModalOpen(true);
    setTempImage(displayImage); // Initialize tempImage with the current displayed image
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result; // Extract Base64 string
        setEditedFeature({
          ...editedFeature,
          imageBase64: base64String,
          imageName: file.name,
          imageMimeType: file.type,
        });
        setTempImage(reader.result); // Update tempImage only
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = async () => {
    const {
      resumeId,
      heading,
      body,
      features,
      userId,
      imageBase64,
      imageName,
      imageMimeType,
    } = editedFeature;

    const requestBody = {
      resumeId,
      userId,
      heading,
      body,
      features,
      imageBase64: imageBase64 || "",
      imageName: imageName || "",
      imageMimeType: imageMimeType || "",
    };

    try {
      const response = await fetch(
        `${apiUrl}/admin-route/update-cover-letter-feature/676cffc7a3e16987a5128596`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        // console.log("Feature saved successfully");
        setDisplayImage(tempImage); // Update the main display image only on save
      } else {
        console.error("Failed to save feature:", await response.text());
      }
    } catch (error) {
      console.error("Error saving feature:", error);
    }

    setIsEditing(false);
    setIsModalOpen(false); // Close the modal after saving
  };

  const getCoverLetterFeatureData = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/admin-route/get-cover-letter-feature/676cffc7a3e16987a5128596`
      );

      const data = response.data;
      setEditedFeature(data); // Populate the fetched data into state
      setDisplayImage(data.image); // Set the fetched image URL into state
    } catch (error) {
      console.error("Error fetching cover letter feature data:", error);
    }
  };

  useEffect(() => {
    getCoverLetterFeatureData();
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20 mt-14">
        <div className={`relative w-full ${isAdminContent ? "overlay" : ""}`}>
          <div className="feature-bg">
            <img
              src={displayImage || feature?.image}
              alt="feature Image"
              className="bg max-h-[506px] w-full "
            />
          </div>
        </div>

        {/* Left Side - Content */}
        <div className="flex flex-col items-start gap-4 max-w-full lg:max-w-[491px]">
          <div className="flex gap-2">
            <Button text={feature?.badge} className="w-52 btn-badge" />
            {isAdminContent && (
              <Button
                text={"Edit"}
                className="text-nowrap btn-secondary"
                onClick={handleEditToggle}
              />
            )}
          </div>
          <h3 className="darkGray font-semibold text-left">
            {feature?.heading}
          </h3>
          <p className="para-small darkGray">{feature?.body}</p>
          <div>
            <ul>
              {editedFeature?.features?.map((feat, i) => (
                <li
                  key={i}
                  className="flex items-center !justify-start gap-2 mb-3"
                >
                  <img src={checkIcon} alt="check Icon" />
                  <p className="para-small font-semibold darkGray">{feat}</p>
                </li>
              ))}
            </ul>
          </div>
          {!isAdminContent && (
            <Button
              text="Get Started"
              className="w-52 btn-primary py-4 px-8 para-large"
              onClick={handleClick}
            />
          )}
        </div>
      </div>

      {/* Modal for Editing */}
      <Modal
        title="Edit Cover Letter Feature"
        visible={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setIsEditing(false); // Cancel editing
        }}
        footer={null} // Remove default footer
        width={1000} // Big modal width
        bodyStyle={{ padding: "20px" }} // Custom padding
      >
        <div className="flex flex-col gap-6">
          {/* Inputs for Heading and Body */}
          <input
            type="text"
            value={editedFeature?.heading}
            onChange={(e) =>
              setEditedFeature({
                ...editedFeature,
                heading: e.target.value,
              })
            }
            className="input-edit darkGray font-semibold text-left"
          />
          <textarea
            value={editedFeature?.body}
            onChange={(e) =>
              setEditedFeature({ ...editedFeature, body: e.target.value })
            }
            className="textarea-edit para-small darkGray"
          />
          {/* Features List */}
          <div>
            <ul>
              {editedFeature?.features?.map((feat, i) => (
                <li key={i} className="flex items-center gap-2 mb-3">
                  <img src={checkIcon} alt="check Icon" />
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) =>
                      setEditedFeature({
                        ...editedFeature,
                        features: editedFeature?.features?.map((f, index) =>
                          index === i ? e.target.value : f
                        ),
                      })
                    }
                    className="input-edit w-full para-small font-semibold darkGray"
                  />
                </li>
              ))}
            </ul>
          </div>
          {/* Temporary Image Preview */}
          <div className="relative w-full">
            <img
              src={tempImage || displayImage || feature?.image}
              alt="Feature Preview"
              className="w-full max-h-[506px] object-cover rounded-md"
            />
            <Button
              text="Replace Image"
              className="btn-primary mt-4"
              onClick={() =>
                document.getElementById("imageUploadInput").click()
              }
            />
            <input
              id="imageUploadInput"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          {/* Save and Cancel Buttons */}
          <div className="flex gap-4">
            <Button
              text="Save"
              className="btn-primary"
              onClick={handleSaveClick}
            />
            <Button
              text="Cancel"
              className="btn-secondary"
              onClick={() => {
                setIsModalOpen(false);
                setIsEditing(false); // Cancel editing
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CoverLetterFeature;
