import React, { useRef, useState } from "react";
import randomVideo from "../../assets/videos/random.mp4";
import playBtn from "../../assets/icons/playBtn.svg";
// import playBtn from "../../assets/icons/playBtn.svg";
import pauseBtn from "../../assets/icons/dashboard/heroicons--play-20-solid.svg";
import stopBtn from "../../assets/icons/dashboard/material-symbols--pause-rounded.svg";
import { Progress } from "antd";

const CustomVideoPlayer = ({ videoUrl, src, width = 827, className = "" }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const currentProgress =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(currentProgress);
  };

  const handleSeek = (e) => {
    const seekTime = (e / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
    setProgress(e);
  };

  console.log("videoUrl", videoUrl);

  return (
    <div
      className={`video-container absolute top-[32px] left-[10px] ${className}`}
    >
      <div className="relative">
        <video
          src={videoUrl ? videoUrl : randomVideo}
          ref={videoRef}
          className="rounded-[20px] w-[98%] lg:w-full"
          width={width}
          onTimeUpdate={handleTimeUpdate}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="controls">
          <img
            className="playBtn p-2 cursor-pointer"
            // src={playBtn}
            // alt={isPlaying ? "Pause" : "Play"}
            src={isPlaying ? stopBtn : pauseBtn} // Use pause icon if playing, otherwise play icon
            alt={isPlaying ? "Pause" : "Play"}
            onClick={handlePlayPause}
            style={{ bottom: "5%", left: "1%",top:"423px" }}
          />
          <div>
            <Progress
              percent={progress}
              showInfo={false}
              strokeLinecap={"square"}
              trailColor="#D9D9D9"
              strokeColor="#2A9DF4"
              className="absolute bottom-9 lg:left-10"
              onClick={(e) => {
                const rect = e.target.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newProgress = (clickX / rect.width) * 100;
                handleSeek(newProgress);
              }}
              size={[undefined, 4]}
              style={{ width: "90%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
