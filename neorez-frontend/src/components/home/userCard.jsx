import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const UserCard = ({ data }) => {
  return (
    <div className="userReviewCard flex flex-col gap-1 justify-center xs:justify-start items-center xs:items-start xs:flex-row ">
      <div className="leftArea">
        <img
          src={data.userImg}
          alt={data.userName}
          className="w-full h-full max-w-[96%] object-cover"
        />
      </div>
      <div className="rightArea flex flex-col gap-3 text-center mt-2 xs:mt-0 xs:text-start font-OpenSan">
        <div className="userName">
          <h3 className="font-semibold">{data.userName}</h3>
          <p className="para-text font-semibold">{data.designation}</p>
          <div className="flex">
            <Icon
              icon="material-symbols:star-rounded"
              width="16"
              height="16"
              style={{ color: "#ffe133" }}
            />
            <Icon
              icon="material-symbols:star-rounded"
              width="16"
              height="16"
              style={{ color: "#ffe133" }}
            />
            <Icon
              icon="material-symbols:star-rounded"
              width="16"
              height="16"
              style={{ color: "#ffe133" }}
            />
            <Icon
              icon="material-symbols:star-rounded"
              width="16"
              height="16"
              style={{ color: "#ffe133" }}
            />
            <Icon
              icon="material-symbols:star-rounded"
              width="16"
              height="16"
              style={{ color: "#ffe133" }}
            />
          </div>
        </div>
        <div className="userDesc">
          <p className="para-text font-normal">{data.details}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
