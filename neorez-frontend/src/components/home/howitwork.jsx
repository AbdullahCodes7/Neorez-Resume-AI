import React, { useEffect, useState } from "react";
import resumeVideo from "../../assets/images/home/bg-work.png";
import workBackLine from "../../assets/images/home/workBackLine.png";
import gradient from "../../assets/images/home/gradient.webp";
import CustomVideoPlayer from "./video";
import dots from "../../assets/icons/dots.svg";
import Button from "../shared/button";
import axios from "axios";
import { Spin } from "antd";

const Howitwork = ({ isAdminContent, isUserDashboard }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState(resumeVideo); // Default to the old video
  const [loading, setLoading] = useState(false);
  const [getVideoLoading, setGetVideoLoading] = useState(false);
  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;
  // Handle video file selection
  const handleVideoChange = (e) => {
    setSelectedVideo(e.target.files[0]);
  };

  // Handle video file selection and upload
  // const handleVideoUpload = async (e) => {
  //   const selectedVideo = e.target.files[0];
  //   if (!selectedVideo) return;

  //   setLoading(true);
  //   const reader = new FileReader();
  //   reader.readAsDataURL(selectedVideo);
  //   reader.onload = async () => {
  //     const base64Video = reader.result;
  //     const videoFileName = selectedVideo.name;
  //     // console.log("base64Video", base64Video);
  //     try {
  //       const response = await axios.post(
  //         `${ApiUrl}/admin-route/upload-video`,
  //         {
  //           video: base64Video,
  //           filename: "videoFileName",
  //         }
  //       );

  //       console.log("firstVideo", response.data);
  //       setVideoUrl(response.data.videoUrl); // Update video URL
  //       alert("Video uploaded successfully!");
  //     } catch (error) {
  //       console.error("Error uploading video:", error);
  //       alert("There was an error uploading the video.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   reader.onerror = (error) => {
  //     console.error("Error converting video to Base64:", error);
  //     setLoading(false);
  //   };
  // };

  // const handleGetVideo = async () => {
  //   try {
  //     setGetVideoLoading(true);

  //     const response = await axios.get(`${ApiUrl}/admin-route/get-video`);
  //     setVideoUrl(response.data.videoUrl);
  //     setGetVideoLoading(false);
  //     // Update video URL
  //   } catch (error) {
  //     console.error("Error fetching video:", error);
  //     setGetVideoLoading(false);

  //     alert("Failed to fetch video. Please try again.");
  //   }
  // };

  // useEffect(() => {
  //   handleGetVideo();
  // }, []);

  return (
    <>
      <div
        className={`howItWorkSection min-h-[60vh] ${
          isAdminContent || isUserDashboard ? "" : "wrap"
        }`}
      >
        <img
          className={`${
            isAdminContent ? "hidden" : "workBackLine block -z-10"
          }`}
          src={workBackLine}
          alt=""
        />
        <div className="container">
          <div className="inner flex flex-col justify-start items-center gap-5">
            <img className="gradient" src={gradient} alt="" />
            <h2
              className={`mx-auto text-center font-semibold font-OpenSan darkGray ${
                isUserDashboard ? "hidden" : "block"
              }`}
            >
              How it <span className="primary">Works</span>
            </h2>

            <button
              className={`primary uploadBtn ${
                isUserDashboard ? "hidden" : "block"
              }`}
            >
              Upload an existing resume to get started
            </button>

            <div className="uploadingVideo mt-4 relative ">
              <div className={`relative ${isAdminContent ? "overlay" : ""}`}>
                {/* {console.log("videoUrl", videoUrl)} */}
                {/* {videoUrl && (
                  <video
                    className="max-h-[230px] sm:max-h-[350px] xl:max-h-[520px] max-w-full lg:max-w-[845px] w-full xl:w-[845px]"
                    controls
                  >
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )} */}
                {/* <img
                  src={videoUrl}
                  alt="Video Thumbnail"
                  className="max-h-[230px] sm:max-h-[350px] xl:max-h-[520px] max-w-full lg:max-w-[845px] w-full xl:w-[845px]"
                /> */}
                <img src={dots} alt="" className="" />

 {/* <img
                  src={videoUrl}
                  alt="Video Thumbnail"
                  className="max-h-[230px] sm:max-h-[350px] xl:max-h-[520px] max-w-full lg:max-w-[845px] w-full xl:w-[845px]"
                />
                <CustomVideoPlayer
                  videoUrl={videoUrl}
                  className="relative !inset-0"
                /> */}

                {isAdminContent && (
                  <>
                    {/* Hidden file input */}
                    <input
                      id="file-input"
                      type="file"
                      accept="video/*"
                      // onChange={handleVideoUpload}
                      className="hidden"
                    />
                    <Button
                      text={
                        loading ? (
                          <>
                            Uploading... <Spin />
                          </>
                        ) : (
                          "Upload Video"
                        )
                      }
                      className="text-nowrap btn-primary mx-auto"
                      onClick={() =>
                        document.getElementById("file-input").click()
                      }
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Howitwork;
