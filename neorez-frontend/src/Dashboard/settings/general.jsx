/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import dp from "../../assets/icons/dashboard/dp.svg";
import Input from "../../components/shared/input";
import Button from "../../components/shared/button";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateField } from "../../redux/userInfo";
import { useDispatch } from "react-redux";

const General = () => {
  const user = useSelector((state) => state?.user?.userInfo);
  // console.log(user);
  const dispatch = useDispatch();
  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;
  const [updateUser, setUpdateUser] = useState({
    name: user?.data?.name || "",
    email: user?.data?.email || "",
    image: user?.data?.image || "",
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      // When file is fully loaded, convert to Base64 and update state
      reader.onloadend = () => {
        const base64String = reader.result; // This is the Base64 encoded string
        // console.log("Base64 String:", base64String);

        // Update the state with the Base64 string
        setUpdateUser((prev) => ({
          ...prev,
          image: base64String,
        }));
      };

      // Read the file as a Data URL (Base64)
      reader.readAsDataURL(file);
    }
  };
  // console.log(selectedFile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateUserInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${ApiUrl}/user/update/${user.data._id}`,
        updateUser
      );
      if (response.data.success) {
        toast.success(response?.data?.message);
        // Update the image in the state if a new image URL is returned
        if (response.data.image) {
          setUpdateUser((prev) => ({
            ...prev,
            image: response.data.image,
          }));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetUserData = async () => {
    const userId = user?.data?._id;
    if (!userId) return;
    try {
      const response = await axios.get(`${ApiUrl}/user/${userId}`);
      console.log("User data fetched:", response.data);
      if (response.data) {
        setUpdateUser({
          name: response.data.name || "",
          email: response.data.email || "",
          image: response.data.image || "",
        });
        dispatch(updateField("name", response.data.name));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    handleGetUserData();
  }, [user?.data?._id, ApiUrl]);
  return (
    <>
      <div>
        <form
          action=""
          className="general-input flex flex-col gap-[26px] mt-[65px] w-auto lg10:w-[579px]"
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-[10px] lg:gap-[52px]">
            <label className="font-OpenSan font-semibold text-[14px] sm:text-[16px] darkGray">
              Profile picture:
            </label>

            {/* <div className="flex items-center gap-[10px]"> */}
            <div className="">
              {/* <img src={dp} alt="profile" /> */}

              <label
                className=" flex items-center gap-[10px] font-OpenSan font-semibold para-small primary"
                htmlFor="profilePicture"
              >
                <img
                  key={updateUser.image}
                  src={updateUser.image || dp}
                  alt="profile"
                  className="w-32 h-32 object-cover rounded-full"
                  onError={(e) => {
                    console.error("Image failed to load:", e);
                    e.target.src = dp;
                  }}
                  onLoad={() => console.log("Image loaded successfully")}
                />
                Upload image
              </label>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* <p className="font-OpenSan font-semibold para-small primary">
                Upload image
              </p> */}
            </div>
          </div>
          <div>
            <Input
              type="text"
              placeholder="James"
              label="Name:"
              name="name"
              value={updateUser.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="@gmail.com"
              label="Email Address :"
              name="email"
              value={updateUser.email}
              //   onChange={(e) => setName(e.target.value)}
              disabled
            />
          </div>
          <div className="flex items-center gap-2 justify-center md:justify-end">
            {/* <Button
              text="Discard"
              className="btn-outline !h-[40px] sm:!h-[50px]"
            /> */}
            <Button
              text="Save Changes"
              className="btn-primary px-[14px] h-[40px] sm:h-[50px]"
              onClick={handleUpdateUserInfo}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default General;
