import React, { useEffect, useState } from "react";
import Button from "../../components/shared/button";
import { Modal } from "antd";
import remove from "../../assets/icons/dashboard/remove.svg";
import tickIcon from "../../assets/icons/tickIcon.svg";
import { useNavigate } from "react-router-dom";
const Subscription = () => {
  const [isRemoveSubModalOpen, setIsRemoveSubModalOpen] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState("inactive");
  const [subscription, setSubscription] = useState([]);
  const navigate = useNavigate();
  const handleRemoveSub = () => {
    setIsRemoveSubModalOpen(!isRemoveSubModalOpen);
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.data?.subscriptionStatus) {
      setSubscriptionStatus(user.data.subscriptionStatus);
    }
    if (user?.data?.subscription) {
      setSubscription(user.data.subscription);
    }
  }, []);
  const handleSubscribeNow = () => {
    navigate("/upgrade-plan");
  };
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <div>
          <div className=" flex  pricing subscription ">
            <div className=" m-auto card1 w-[381px] ">
              <div className="text-center">
                <h2 className="font-semibold primary mb-4 font-OpenSan" style={{ textTransform: "capitalize" }}>
                  {subscriptionStatus}
                </h2>
                {subscriptionStatus !== "inactive" && subscription[0] && (
                  <>
                    <h2 className="gray font-OpenSan">${subscription[0].amount}</h2>
                    <p className="para-small gray-shade font-OpenSan">{`/${subscription[0].month}`}</p>
                  </>
                )}
              </div>
              {/* <div className="mt-7 sm:mt-[38px]">
              <ul>
                <li className="flex gap-4 items-center mb-3">
                  <img src={tickIcon} alt="tick icon" />
                  <p className="para-small darkGray GrayOpacity font-OpenSan">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                </li>
                <li className="flex gap-4 items-center mb-3">
                  <img src={tickIcon} alt="tick icon" />
                  <p className="para-small darkGray GrayOpacity font-OpenSan">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                </li>
                <li className="flex gap-4 items-center mb-3">
                  <img src={tickIcon} alt="tick icon" />
                  <p className="para-small darkGray GrayOpacity font-OpenSan">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                </li>
              </ul>
            </div> */}
            </div>
          </div>
        </div>
        
        <h3 className="font-OpenSan font-normal darkGray text-center">
          {subscriptionStatus === "inactive"
            ? "You have Not Purchased Any Subscription Plan"
            : "You Have Purchased a Subscription Plan"}
        </h3>
        {subscriptionStatus === "inactive" ? (
          <Button
            text="Subscribe Now"
            className="btn-primary h-[40px] sm:h-[50px] "
            onClick={handleSubscribeNow}
          />
        ) : (
          <Button
            text="Remove Subscription"
            className="btn-primary h-[40px] sm:h-[50px]"
            onClick={handleRemoveSub}
          />
        )}
      </div>

      {/* Remove Subscription */}
      <Modal
        open={isRemoveSubModalOpen}
        onCancel={handleRemoveSub}
        footer={null}
        centered
        // width="484px"
      >
        <div className="py-[10px] sm:py-[51px] px-[50px] modal-wrap flex flex-col items-center justify-center gap-[30px]">
          <img src={remove} alt="" />
          <div>
            <h2 className="text-center font-bold darkGray  font-OpenSan mb-2">
              Remove
              <span className="font-light"> Subscription</span>
            </h2>
            <p className="text-center para-small darkGray font-OpenSan font-semibold opacity-40 ">
              You sure you want to remove?
            </p>
          </div>
          <div className="flex justify-center gap-[6px]">
            <Button
              text="Cancel"
              className="primaryBg white font-OpenSan para-text py-2 font-normal w-[105px]"
              onClick={handleRemoveSub}
            />
            <Button
              text="Remove"
              className="redBg white font-OpenSan para-text py-2 font-normal w-[105px]"
              onClick={handleRemoveSub}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Subscription;
