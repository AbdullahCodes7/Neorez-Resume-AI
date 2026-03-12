import React, { useEffect, useState } from "react";
import Contact from "../components/contact";
import Header from "../components/header";
import LetterBody from "../components/letterBody";
import FooterCV from "../components/footer";
import Profile from "../components/profile";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchCoverLetterData } from "../../../redux/actions/fetchCoverLetter";
import Cookies from "js-cookie";
import {
  setCoverLetter,
  updateCoverLetter,
  updateCoverLetterUid,
} from "../../../redux/coverLetterSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Spin } from "antd";

const CoverletterMain = ({ style, coverLetterRef, data }) => {
  const userInfo = useSelector((state) => state.userData);
  const uid = useSelector((state) => state.resume.uid);
  const uidParams = useParams();
  const coverleter = data || useSelector((state) => state.coverLetter);
  const LocationData = useLocation();
  const [loading, setLoading] = useState(false);
  // console.log("coverLetterData coverleter", coverleter);
  // console.log("coverLetterData coverleter", coverleter);
  const dispatch = useDispatch();
  // const {id,uid}=useParams()
  // useEffect(() => {
  //   if (uidParams.uid) {
  //     dispatch(updateUid(uidParams.uid));
  //   }
  // }, []);
  const { fromTemplatePage } = location?.state || {};
  const navigate = useNavigate();
  const design =
    data?.design || useSelector((state) => state.coverLetter.design);
  const { fontSize, color, margin, lineHeight, fontFamily } = design || {};

  // console.log("style", style);

  const headingStyle = {
    fontSize: `${fontSize * 1.5}px`,
    // marginBottom: `${margin}px`,
    lineHeight: `${lineHeight}`,
  };

  const bodyTextStyle = {
    fontSize: `${fontSize}px`,
    // marginBottom: `${margin * 0.5}px`,
    lineHeight: `${lineHeight}`,
  };

  useEffect(() => {
    if (coverleter.designation !== "") {
      const timeoutId = setTimeout(() => {
        setLoading(true);
      }, 2000);

      return () => clearTimeout(timeoutId);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const currentUid = uid || uidParams?.uid;

    // Check if UID exists and dispatch fetchCoverLetterData
    if (fromTemplatePage == true) {
      navigate(location.pathname, { replace: true, state: {} }); // Reset `location.state` to avoid persisting
    } else if (currentUid) {
      // console.log("first");
      dispatch(fetchCoverLetterData(currentUid));

      // setLoading(false);
    } else if (userInfo) {
      // console.log("start");
      const isFirstTimeFromAI =
        LocationData?.state?.from === "AI" &&
        !sessionStorage?.getItem("visitedFromAI");

      if (isFirstTimeFromAI) {
        // Mark as visited for subsequent actions
        sessionStorage?.setItem("visitedFromAI", "true");
        return; // Skip dispatch on the first time from "AI"
      }
      // Dispatch only if not dispatched yet OR if refreshed (cookie cleared)
      // console.log("after");

      dispatch(
        setCoverLetter({
          userId: userInfo?.id || null,
          name: userInfo?.name,
          phone: userInfo?.contactNumber,
          email: userInfo?.email,
          location: userInfo?.address,
          jobTitle: userInfo?.desiredJobTitle,
          company: userInfo?.currentCompany || "",
          designation: userInfo?.currentDesignation || "",
          linkedIn: userInfo?.linkedIn || "",
        })
      );
    }
  }, [dispatch, uid, uidParams, userInfo, LocationData]);
  useEffect(() => {
    // Remove the session storage key on URL change
    sessionStorage.removeItem("visitedFromAI");
  }, [LocationData]);
  // console.log("coverLetterData coverleter 2", coverleter);

  function hexToRgb(hex) {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, "");

    // Parse r, g, b values
    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);

    // Return in "r,g,b" format
    return `${r},${g},${b}`;
  }

  return (
    <section ref={coverLetterRef} id="printableResume">
      <div className={`coverletterWrap ${style}`} style={{ margin: margin }}>
        {/* {loading ? (
          <Spin />
        ) : (
          <> */}
        {style == "coverletter9" && (
          <div
            className="letter7"
            style={
              ["coverletter9"].includes(style) ? { backgroundColor: color } : {}
            }
          ></div>
        )}
        <div>
          <div
            className={`headerContent ${style}`}
            style={{
              ...(["coverletter6"].includes(style)
                ? { backgroundColor: color }
                : {}),
              ...(style === "coverletter7"
                ? { backgroundColor: `rgba(${hexToRgb(color)}, 0.5)` }
                : {}),
            }}
            // style={{ backgroundColor: color }}
          >
            <div
              className="headerTop"
              style={
                ["coverletter1", "coverletter3", "coverletter8"].includes(style)
                  ? { backgroundColor: color }
                  : {}
              }
            ></div>

            <div className={`headerWrap ${style}`}>
              <Profile
                data={data}
                headingStyle={headingStyle}
                bodyTextStyle={bodyTextStyle}
                color={color}
                style={style}
                fontFamily={fontFamily}
              />
              <Contact
                data={data}
                headingStyle={headingStyle}
                bodyTextStyle={bodyTextStyle}
                color={color}
                style={style}
                fontFamily={fontFamily}
              />
            </div>
            <div
              className="seperateSection"
              style={{ backgroundColor: color }}
            ></div>
          </div>
          <div className="px-10 pt-8 pb-16 flex flex-col gap-5 relative">
            <Header
              data={data}
              headingStyle={headingStyle}
              bodyTextStyle={bodyTextStyle}
              color={color}
              style={style}
              fontFamily={fontFamily}
            />
            <LetterBody
              data={data}
              headingStyle={headingStyle}
              bodyTextStyle={bodyTextStyle}
              color={color}
              style={style}
              fontFamily={fontFamily}
            />
            <div
              className="seperateFooter"
              style={{ backgroundColor: color }}
            ></div>

            <FooterCV
              data={data}
              headingStyle={headingStyle}
              bodyTextStyle={bodyTextStyle}
              color={color}
              style={style}
              fontFamily={fontFamily}
            />
            {style == "coverletter9" && (
              <div
                className="letter27"
                style={
                  ["coverletter9"].includes(style)
                    ? { backgroundColor: color }
                    : {}
                }
              ></div>
            )}
          </div>
        </div>
        {/* </>
        )} */}
      </div>
    </section>
  );
};

export default CoverletterMain;
