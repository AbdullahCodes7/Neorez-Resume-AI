import React, { useEffect, useRef, useState } from "react";
import Button from "../../shared/button";
import tickIcon from "../../../assets/icons/tickIcon.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import arrowRight from "../../../assets/icons/arrowRight.svg";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Pricingcard = ({ isAdminPage }) => {
  const [activeSection, setActiveSection] = useState("Weekly");
  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;
  const [loading, setLoading] = useState(false);
  const [planData, setPlanData] = useState([]);
  const [checkoutData, setCheckoutData] = useState(null);
  const queryParams = new URLSearchParams(location.search);
  const checkoutid = queryParams.get("checkoutid");
  const userData = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const navigate = useNavigate();
  const toggleContent = (section) => {
    setActiveSection(section);
  };

  // const testiRef = useRef(null);
  // const [currentSlide, setCurrentSlide] = useState(0);

  // const handleNext = () => {
  //   testiRef.current.slickNext();
  // };

  // const handlePrev = () => {
  //   testiRef.current.slickPrev();
  // };

  // const settings = {
  //   dots: true,
  //   customPaging: (i) => (
  //     <div
  //       className={`sm:w-5 w-3 h-3 sm:h-5 rounded-full  ${
  //         i === currentSlide ? "primaryBg" : "slickDotOutline"
  //       }`}
  //     />
  //   ),
  //   appendDots: (dots) => (
  //     <div>
  //       <ul className="flex justify-center mt-4 gap-0 sm:gap-1 ">{dots}</ul>
  //     </div>
  //   ),
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   centerMode: true,
  //   beforeChange: (oldIndex, newIndex) => {
  //     setCurrentSlide(newIndex);
  //   },
  //   afterChange: (current) => setCurrentSlide(current),
  //   responsive: [
  //     {
  //       breakpoint: 1500,
  //       settings: {
  //         slidesToShow: isAdminPage ? 2.3 : 3,
  //         slidesToScroll: 1,
  //         infinite: true,
  //       },
  //     },
  //     {
  //       breakpoint: 1320,
  //       settings: {
  //         slidesToShow: isAdminPage ? 2.3 : 3,
  //         slidesToScroll: 1,
  //         infinite: true,
  //       },
  //     },
  //     {
  //       breakpoint: 1280,
  //       settings: {
  //         slidesToShow: isAdminPage ? 1 : 2.3,
  //         centerPadding: isAdminPage ? "150px" : "0px",
  //         slidesToScroll: 1,
  //         infinite: true,
  //       },
  //     },
  //     {
  //       breakpoint: 992,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         centerPadding: isAdminPage ? "30px" : "150px",
  //         infinite: true,
  //       },
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         centerPadding: isAdminPage ? "100px" : "150px",
  //         infinite: true,
  //       },
  //     },
  //     {
  //       breakpoint: 640,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         centerPadding: "80px",
  //       },
  //     },
  //     {
  //       breakpoint: 500,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         centerPadding: "30px",
  //       },
  //     },
  //   ],
  // };

  const handlePricingFunc = async () => {
    try {
      const response = await axios.get(`${ApiUrl}/pricing-plan/`);
      // console.log("response: ", response);
      // Handle both array and object responses from the API
      const data = Array.isArray(response.data) 
        ? response.data 
        : (response.data?.data || response.data?.plans || []);
      setPlanData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      setPlanData([]);
    }
  };

  const fetchCheckoutSession = async (checkoutid) => {
    try {
      const response = await axios.get(
        `${ApiUrl}/StripePayment/checkout-session/${checkoutid}`
      );
      if (response.status) {
        toast.success(response.data.message);
        const userData = localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user"))
          : null;

        const result = await axios.get(
          `${ApiUrl}/user/${userData.data._id}`
        );
        console.log(result)
        if (result.status) {
          const updatedUserData = {
            ...userData,
            data: result.data,
          };
          localStorage.setItem("user", JSON.stringify(updatedUserData));
        }
      }
      // setCheckoutData(response.data);
      setLoading(false);
      
    } catch (error) {
      console.error("Error fetching checkout session:", error);
      setLoading(false);
    }
  };

  // const handleGetStarted = (planId) => {
  //   setLoading(true);
  //   if (planId === "Trial Period") {
  //     window.location.href = "https://buy.stripe.com/8wM3ep0dM6MYfiU7ss";
  //   }
  //   else if (planId === "Weekly Plan") {
  //     window.location.href = "https://buy.stripe.com/8wM3ep0dM6MYfiU7ss";
  //   } else if (planId === "Monthly Plan") {
  //     window.location.href = "https://buy.stripe.com/eVa8yJ3pY5IU4Eg001";
  //   }
  //   else{
  //     window.location.href = "https://buy.stripe.com/fZe7uF5y67R2gmY4gi";
  //   }
  // };

  const handleGetStarted = (planId) => {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      localStorage.setItem("redirectAfterLogin", planId);
      navigate("/signin");
      return;
    }

    let stripeLink = "";

    if (planId === "Trial Period") {
      stripeLink = "https://buy.stripe.com/8wM3ep0dM6MYfiU7ss";
    } else if (planId === "Weekly Plan") {
      stripeLink = "https://buy.stripe.com/8wM3ep0dM6MYfiU7ss";
    } else if (planId === "Monthly Plan") {
      stripeLink = "https://buy.stripe.com/eVa8yJ3pY5IU4Eg001";
    } else {
      stripeLink = "https://buy.stripe.com/fZe7uF5y67R2gmY4gi";
    }
    window.location.href = stripeLink;
  };

  const pricing = [
    {
      id: 1,
      heading: "Monthly",
      dollar: "$29",
      month: "/Month",
      features: [
        "Lorem ipsum dolor sit amet consectetur. Eros vulputate integer.",
        "Lorem ipsum dolor sit amet consectetur. Eros vulputate integer.",
        "Lorem ipsum dolor sit amet consectetur. Eros vulputate integer.",
      ],
    },
    {
      id: 2,
      heading: "Weekly",
      dollar: "$14.99",
      month: "/Weekly",
      features: [
        "Lorem ipsum dolor sit amet consectetur. Eros vulputate integer.",
        "Lorem ipsum dolor sit amet consectetur. Eros vulputate integer.",
        "Lorem ipsum dolor sit amet consectetur. Eros vulputate integer.",
      ],
    },

    {
      id: 3,
      heading: "Trial Period",
      dollar: "$7.99",
      month: "/14-Days Trial",
      features: [
        "Lorem ipsum dolor sit amet consectetur. Eros vulputate integer.",
        "Lorem ipsum dolor sit amet consectetur. Eros vulputate integer.",
        "Lorem ipsum dolor sit amet consectetur. Eros vulputate integer.",
      ],
    },
    {
      id: 4,
      heading: "Quarterly",
      dollar: "$65",
      month: "/Qtr",
      features: [
        "Lorem ipsum dolor sit amet consectetur. Eros vulputate integer.",
        "Lorem ipsum dolor sit amet consectetur. Eros vulputate integer.",
        "Lorem ipsum dolor sit amet consectetur. Eros vulputate integer.",
      ],
    },
    {
      id: 5,
      heading: "Semi-Annual",
      dollar: "$135",
      month: "/Semi-Annual",
      features: [
        "Lorem ipsum dolor sit amet consectetur. Eros vulputate integer.",
        "Lorem ipsum dolor sit amet consectetur. Eros vulputate integer.",
        "Lorem ipsum dolor sit amet consectetur. Eros vulputate integer.",
      ],
    },
    {
      id: 6,
      heading: "Annual",
      dollar: "$225",
      month: "/Annual",
      features: [
        "Lorem ipsum dolor sit amet consectetur. Eros vulputate integer.",
        // "Lorem ipsum dolor sit amet consectetur. Eros vulputate integer.",
        // "Lorem ipsum dolor sit amet consectetur. Eros vulputate integer.",
      ],
    },
  ];

  // Filter the pricing data based on the selected section (e.g., Monthly, Weekly, etc.)
  const isSubscribed =
    userData &&
    (userData?.data.subscriptionStatus === "active" ||
      userData?.data.subscription?.length > 0); 
  console.log("User subscription status:", isSubscribed);
  const filteredPlans = planData.filter((plan) => {
    if (activeSection === "Trial" && plan.duration.includes("7 days")) {
      return true;
    } else if (activeSection === "Weekly" && plan.duration.includes("week")) {
      return true;
    } else if (activeSection === "Monthly" && plan.duration.includes("month")) {
      return true;
    } else if (activeSection === "Annual" && plan.duration.includes("year")) {
      return true;
    }
    return false;
  });
  const plansToShow = isSubscribed
    ? filteredPlans.filter((plan) => plan.heading !== "Trial Period")
    : filteredPlans;

  useEffect(() => {
    handlePricingFunc();
  }, []);

  // useEffect(() => {
  //   if (checkoutid) {
  //     fetchCheckoutSession(checkoutid);
  //   }
  // }, [checkoutid]);

  return (
    <>
      <div className="pricing">
        <div className={`pricingtab `}>
          <div className="containers">
            <div className="pricingtabs">
              <div className="pricingtabcontent">
                <div className="setingHeader">
                  <div className="settinghContent w-full">
                    <div className="toogle-outer">
                      <div className="toggle-container">
                        <button
                          className={`toggle-button ${
                            activeSection === "Trial" ? "active" : ""
                          }`}
                          onClick={() => toggleContent("Trial")}
                          style={{ display: isSubscribed ? "none" : "inline" }}
                        >
                          {"Trial"}
                        </button>
                        <button
                          className={`toggle-button ${
                            activeSection === "Weekly" ? "active" : ""
                          }`}
                          onClick={() => toggleContent("Weekly")}
                        >
                          {"Weekly"}
                        </button>
                        <button
                          className={`toggle-button ${
                            activeSection === "Monthly" ? "active" : ""
                          }`}
                          onClick={() => toggleContent("Monthly")}
                        >
                          {"Monthly"}
                        </button>
                        <button
                          className={`toggle-button ${
                            activeSection === "Annual" ? "active" : ""
                          }`}
                          onClick={() => toggleContent("Annual")}
                        >
                          {"Annual"}
                        </button>
                        {/* <button
                          className={`toggle-button ${
                            activeSection === "Quarterly" ? "active" : ""
                          }`}
                          onClick={() => toggleContent("Quarterly")}
                        >
                          {"Quarterly"}
                        </button>
                        <button
                          className={`toggle-button ${
                            activeSection === "Yearly" ? "active" : ""
                          }`}
                          onClick={() => toggleContent("Yearly")}
                        >
                          {"Yearly(20% saved)"}
                        </button> */}
                      </div>
                    </div>
                    {plansToShow.map((plan) => (
                      <div
                        key={plan._id}
                        className="price-card flex justify-center items-center w-full"
                      >
                        <div className="card-content">
                          <div className="first-card">
                            <div className="card-title">
                              <span>{plan.planTitle}</span>
                            </div>
                            <div className="card-month mb-8">
                              <div className="month-heading">
                                <span className="dollar">{`$${plan.price}`}</span>
                                <span className="month">{plan.duration}</span>
                              </div>
                            </div>
                            {/* <div className="card-bottom">
                              {plan.description.map((feature, index) => (
                                <div className="bottom-primary" key={index}>
                                  <div className="left">
                                    <Icon
                                      icon="mdi:tick-circle"
                                      width="20"
                                      height="20"
                                      style={{ color: "#2A9DF4" }}
                                    />
                                  </div>
                                  <div className="right">
                                    <span>{feature}</span>
                                  </div>
                                </div>
                              ))}
                            </div> */}
                            <div className="card-button">
                              <button
                                onClick={() => handleGetStarted(plan.planTitle)}
                                disabled={
                                  userData &&
                                  userData?.data.subscriptionStatus ===
                                    plan.planTitle
                                }
                                className={`${
                                  loading
                                    ? "bg-gray-500 cursor-not-allowed"
                                    : userData?.data.subscriptionStatus ===
                                      plan.planTitle
                                    ? "bg-green-500 cursor-not-allowed"
                                    : "bg-primary"
                                } text-white w-full h-[50px] rounded-[10px] text-[16px] md:text-[24px]`}
                              >
                                {loading
                                  ? "Processing..."
                                  : userData?.data.subscriptionStatus ===
                                    plan.planTitle
                                  ? "Subscribed"
                                  : !userData?.data.subscriptionStatus
                                  ? "Get Plan"
                                  : "Get Started"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricingcard;
