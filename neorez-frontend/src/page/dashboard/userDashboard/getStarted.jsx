import React, { useEffect, useState } from "react";
import CustomVideoPlayer from "../../../components/home/video";
import resumeVideo from "../../../assets/images/home/bg-work.png";
import dots from "../../../assets/icons/dashboard/dots.svg";
import Faq from "../../../components/home/faq";
import Howitwork from "../../../components/home/howitwork";
import axios from "axios";

const GetStarted = () => {
  const [videoUrl, setVideoUrl] = useState(resumeVideo);
   const [getVideoLoading, setGetVideoLoading] = useState(false);
   const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;
   
  //  const handleGetVideo = async () => {
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
  //  useEffect(() => {
  //     handleGetVideo();
  //   }, []);
  return (
    <>
      <div className="flex flex-col gap-10 ">
        <div className="h-auto pb-10 bg-white   rounded-2xl hidden">
          {/* Heading */}
          {/* <div className="pt-7  sm:mb-[47px] ">
            <h2 className="text-center darkGray font-light font-OpenSan">
              Getting
              <span className="font-bold"> Started</span>
            </h2>
          </div> */}

          <div className="items-center  flex justify-center started">
            <div className=" uploadingVideo mt-4 relative ">
              <div className="relative">
                {/* <img
                  src={resumeVideo}
                  alt=""
                  className="max-h-[211px] xs:max-h-[230px] sm:max-h-[311px]  lg:max-h-[520px]  max-w-[570px] xl:max-w-[845px] "
                /> */}
                <img src={dots} alt="" className="absolute top-4 left-4" />
                <CustomVideoPlayer
                  videoUrl={videoUrl}
                  className="relative !inset-0"
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-white   rounded-2xl mb-[45px]">
          <div className="mt-5 mb-[56px]">
            <Faq isStartedPage={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GetStarted;
