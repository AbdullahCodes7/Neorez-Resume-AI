import React, { useEffect, useState } from "react";
import Input from "../../../components/shared/input";
import Textarea from "../../../components/shared/textarea";
import Button from "../../../components/shared/button";
import doc from "../../../assets/icons/dashboard/importDoc.svg";
import add from "../../../assets/icons/dashboard/ic_round-add.svg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addEducation,
  addSkills,
  deleteSkills,
  setUserInfo,
  updateEducation,
  updateField,
  updateSkills,
  UpdateUserInfo,
} from "../../../redux/userInfo";
import axios from "axios";
import { toast } from "react-toastify";
import { Spin } from "antd";
// import Delete from "../../../assets/icons/dashboard/material-symbols--delete-outline.svg";
// import Delete from "../../../assets/icons/dashboard/typcn--minus.svg";
import Delete from "../../../assets/icons/dashboard/streamline--delete-1-solid.svg";

const BasicInfo = () => {
  const userInfo = useSelector((state) => state.userData);
  const user = useSelector((state) => state?.user?.userInfo);
  const [updateUser, setUpdateUser] = useState({
      name: "",
      email: user?.data?.email || "",
      image: "",
    });
  const userId = useSelector((state) => state.user?.userInfo?.data?._id);
  const [isUploading, setIsUploading] = useState(false); // Track upload status
  // console.log(userId);
  console.log(updateUser);
  const apiUrl = import.meta.env.VITE_APP_BACKEND_API;
  const dispatch = useDispatch();

  // redux functions
  // const handleFieldChange = (field, value) => {
  //   dispatch(updateField({ field, value }));
  // };

  const handleFieldChange = (field, value) => {
    if (field === "email") {
     
      setUpdateUser((prev) => ({ ...prev, email: value }));
    } else {
      dispatch(updateField({ field, value }));
    }
  };
  const handleEducationChange = (index, field, value) => {
    dispatch(updateEducation({ index, field, value }));
  };

  const handleAddEducation = (e) => {
    e.preventDefault();
    dispatch(addEducation());
  };

  const handleSkillChange = (index, field, value) => {
    dispatch(updateSkills({ index, field, value }));
  };

  const handleAddSkills = (e) => {
    e.preventDefault();
    dispatch(addSkills());
  };
  const handleDeleteSkills = (index) => {
    dispatch(deleteSkills(index));
  };

  //api functions

  const handleAddUserInfo = async (e) => {
    e.preventDefault();

    // List of required fields
    const requiredFields = [
      "name",
      "email",
      "contactNumber",
      "country",
      "address",
    ];

    // Check if any required field is empty
    for (let field of requiredFields) {
      if (!userInfo[field] || userInfo[field].trim() === "") {
        toast.error(`${field} is required`);
        return; // Stop the form submission if any required field is empty
      }
    }

    try {
      const payload = {
        ...userInfo,
        userId,
      };

      const response = await axios.post(`${apiUrl}/userInfo/`, {
        payload,
      });
      // console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);

      console.log("error", err);
    }
  };
  const handleGetUserInfo = async () => {
    try {
      const response = await axios.get(`${apiUrl}/userInfo/${userId}`);
      // console.log("response.data", response.data);
      dispatch(setUserInfo(response.data));
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    handleGetUserInfo();
  }, []);

  // const handleUploadCV = async ()=>{
  //   try{
  // const
  //   }catch(err){
  //     console.log("error", err);
  //   }
  // }

  // Upload CV and extract data from the backend
  const handleUploadCV = async (e, file) => {
    e.preventDefault(); // Prevent default form submission
    // console.log("file", file);

    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("cv", file);

    try {
      setIsUploading(true); // Start loader
      const response = await axios.post(`${apiUrl}/userInfo/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log("response.data", response.data);

      if (response.data) {
        dispatch(UpdateUserInfo(response.data)); // Populate the form with extracted data
        toast.success("CV uploaded and data extracted successfully!");
        setIsUploading(false);
      } else {
        throw new Error(response.data.message || "Failed to extract data.");
      }
    } catch (error) {
      console.error("Error uploading CV:", error);
      toast.error(
        "An error occurred while uploading the CV. Please try again."
      );
    } finally {
      setIsUploading(false); // Stop loader
    }
  };

  console.log(userInfo);
  useEffect(() => {
    // After fetching userInfo, make sure email is set
    if (user?.data?.email && !userInfo.email) {
      handleFieldChange("email", user.data.email);
    }
  }, [user, userInfo]);

  return (
    <>
      <div className="h-auto bg-white mb-[89px]  rounded-2xl">
        {/* Heading */}
        <div className="pt-7 mb-[47px] ">
          <h2 className="text-center darkGray font-light font-OpenSan">
            Basic
            <span className="font-bold"> Info</span>
          </h2>
        </div>
        <div className="px-[20px] 2xl:px-[58px] info">
          <form
            action=""
            className="grid lg10:grid-cols-2 gap-[49px] pb-[30px]"
          >
            <div className="flex flex-col gap-6">
              <div>
                <Input
                  type="text"
                  label="Name *"
                  placeholder="James"
                  value={userInfo?.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                />
              </div>
              {/* <div>
                <Input
                  type="text"
                  label="Last Name *"
                  placeholder="Johns"
                  value={userInfo?.lastName}
                  onChange={(e) =>
                    handleFieldChange("lastName", e.target.value)
                  }
                />
              </div> */}
              <div>
                <Input
                  type="email"
                  label="Email Address *"
                  placeholder="james@gmail.com"
                  value={updateUser.email}
                  // disabled
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                />
              </div>
              <div>
                <Input
                  type="number"
                  label="Phone Number *"
                  placeholder="+123456789"
                  value={userInfo?.contactNumber}
                  onChange={(e) =>
                    handleFieldChange("contactNumber", e.target.value)
                  }
                />
              </div>
              <div>
                <p className="darkGray font-bold font-OpenSan mb-3">
                  Other Info
                </p>
                {/* <div className="eduInfo"> */}
                {/* <p className="darkGray font-semibold font-OpenSan">
                    Education
                  </p>

                  <div>
                    <Input
                      type="text"
                      label="School Name:"
                      placeholder="Type here"
                    />
                  </div>
                  <div>
                    <Input type="text" label="City:" placeholder="Type here" />
                  </div>
                  <div>
                    <Input
                      type="text"
                      label="Country:"
                      placeholder="Type here"
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      label="Time Period from:"
                      placeholder="Type here"
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      label="Time Period to:"
                      placeholder="Type here"
                    />
                  </div> */}

                {/* Education Section */}
                {userInfo?.education?.map((education, index) => {
                  // console.log(education);

                  return (
                    <div className="eduInfo mt-2" key={index}>
                      <p className="darkGray font-semibold font-OpenSan">
                        Education
                      </p>
                      <Input
                        type="text"
                        label="School Name:"
                        placeholder="Type here"
                        name="schoolName"
                        value={education?.institution}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "institution",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        type="text"
                        label="Degree:"
                        placeholder="Type here"
                        value={education?.degree}
                        onChange={(e) =>
                          handleEducationChange(index, "degree", e.target.value)
                        }
                      />
                      <Input
                        type="text"
                        label="Reference:"
                        placeholder="Type here"
                        value={education?.reference}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "reference",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        type="text"
                        label="Time Period from:"
                        placeholder="Type here"
                        value={education?.startDate}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "startDate",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        type="text"
                        label="Time Period to:"
                        placeholder="Type here"
                        value={education?.endDate}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "endDate",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  );
                })}
                <div>
                  <Button
                    img={add}
                    text="Add More"
                    minHeight={50}
                    className="btn-primary w-full mt-3"
                    onClick={handleAddEducation}
                  />
                </div>
                {/* </div> */}
                {/* <Button
                  img={add}
                  text="Add More"
                  minHeight={50}
                  className="btn-primary w-full"
                /> */}
              </div>
              <div className="flex flex-col gap-1 items-start">
                <Button
                  img={!isUploading && doc}
                  text={
                    isUploading ? (
                      <Spin className="white-spinner" tip="Uploading..." />
                    ) : (
                      "Import from File"
                    )
                  }
                  className="btn-primary  h-[50px] max-w-[200px] w-full"
                  // onClick={() => dispatch(addEducation())}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default behavior
                    document.getElementById("cvUploadInput").click();
                  }}
                />
                <input
                  id="cvUploadInput"
                  type="file"
                  accept=".pdf,.docx,.doc"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    e.preventDefault(); // Prevent default behavior
                    handleUploadCV(e, e.target.files[0]);
                  }}
                />
                <p className="GrayOpacity font-Lato font-normal para-ex-small">
                  Import your basic info through file
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <div>
                  <Input
                    type="text"
                    label="Country *"
                    placeholder="United States"
                    value={userInfo?.country}
                    onChange={(e) =>
                      handleFieldChange("country", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    label="Address *"
                    placeholder="3977 Fowler Avenue, Newnan, Georgia"
                    value={userInfo?.address}
                    onChange={(e) =>
                      handleFieldChange("address", e.target.value)
                    }
                  />
                </div>
                {/* <div>
                  <Textarea
                    rows={7}
                    type="text"
                    label="Skills:"
                    placeholder="Paid Social Advertising, creative campaigns, analytics, social media strategy, SEO, Canva, HTML/CSS, Budget Management, WordPress, CRM, Moz, Paid Media, SEMrush, Adobe Creative, LinkedIn Ads."
                    value={userInfo?.skills}
                    onChange={(e) =>
                      handleFieldChange("skills", e.target.value)
                    }
                  />
                </div> */}
                {/* Skills Section */}
                <div className="">
                  <p className="darkGray font-semibold font-OpenSan">Skills</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {userInfo?.skills?.map((skill, index) => (
                      <div key={index} className="col-span-1 relative">
                        <Input
                          type="text"
                          // label={`Skill Name ${index + 1}`}
                          placeholder="Enter skill"
                          value={skill?.name}
                          onChange={(e) =>
                            handleSkillChange(index, "name", e.target.value)
                          }
                        />
                        {userInfo?.skills.length > 1 && index !== 0 && (
                          <div className="absolute p-3 top-0 right-0 w-10">
                            <img
                              className="  cursor-pointer"
                              src={Delete}
                              alt=""
                              onClick={() => handleDeleteSkills(index)}
                            />
                          </div>
                        )}
                        {/* <Input
                          type="text"
                          label="Level"
                          placeholder="Enter level"
                          value={skill?.level}
                          onChange={(e) =>
                            handleSkillChange(index, "level", e.target.value)
                          }
                        /> */}
                      </div>
                    ))}
                  </div>
                  <Button
                    img={add}
                    text="Add More Skills"
                    minHeight={50}
                    className="btn-primary w-full mt-3"
                    onClick={handleAddSkills}
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    label="Desired Location for Job:"
                    placeholder="United States"
                    value={userInfo?.desiredLocation}
                    onChange={(e) =>
                      handleFieldChange("desiredLocation", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Textarea
                    rows={7}
                    type="text"
                    label="Desired Job Title:"
                    placeholder="Web Developer"
                    value={userInfo?.desiredJobTitle}
                    onChange={(e) =>
                      handleFieldChange("desiredJobTitle", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="flex  items-center justify-start md:justify-end mb-4 mt-7 lg:mt-0">
                <div className="flex items-center gap-[17px] ">
                  {/* <Button
                    text="Discard"
                    className="btn-outline !h-[40px] sm:!h-[50px]"
                  /> */}
                  <Button
                    type="submit"
                    onClick={handleAddUserInfo}
                    text="Save Changes"
                    className="btn-primary w-[126px] h-[40px] sm:h-[50px]"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BasicInfo;
