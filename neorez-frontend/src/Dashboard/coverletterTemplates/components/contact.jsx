import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomToolbar from "./customToolbar";
import { saveCoverLetterData } from "../../../redux/actions/SaveCoverLEtter";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Popover } from "antd";
import PopoverToolbar from "../../ResumeTemps/components/popover";
import CoverLetterProfileSettingsPopover from "./coverLetterSetting";
const Contact = ({
  headingStyle,
  bodyTextStyle,
  style,
  color,
  fontFamily,
  data,
}) => {
  const dispatch = useDispatch();
  // Quill modules
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline"],
        // [
        //   { align: "" },
        //   { align: "center" },
        //   { align: "right" },
        //   { align: "justify" },
        // ],
      ],

      // handlers: {
      //   "ai-write": () => {
      //     console.log("AI Write button clicked!");
      //   },
      // },
    },
  };
  // Quill Formats
  const formats = [
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
    "align",
  ];

  const contactData = useSelector((state) => state.coverLetter);

  // LinkedIn, Email, Phone

  const [linkedIn, setLinkedIn] = useState(
    data?.linkedIn || contactData?.linkedIn || ""
  );
  const [email, setEmail] = useState(data?.email || contactData?.email || "");
  const [phone, setPhone] = useState(data?.phone || contactData?.phone || "");
  const [skype, setSkype] = useState(contactData?.skype || "");
  const [popoverVisible, setPopoverVisible] = useState(false);

  const [location, setLocation] = useState(
    data?.location || contactData?.location || ""
  );
  const quillRefs = useRef({}); // Array of refs for each ReactQuill instance
  // Update local state when Redux data changes (if it's updated elsewhere)
  useEffect(() => {
    setLinkedIn(data?.linkedIn || contactData?.linkedIn);
    setEmail(data?.email || contactData?.email);
    setPhone(data?.phone || contactData?.phone);
    setSkype(contactData?.skype);
    setLocation(data?.location || contactData?.location);
  }, [contactData]);

  // Track the currently active editor
  const [activeEditor, setActiveEditor] = useState("");
  // Handle editor click
  const handleEditorClick = (editorType) => {
    setActiveEditor(editorType);
    setPopoverVisible(true);

    // Focus the corresponding ReactQuill editor
    setTimeout(() => {
      if (quillRefs.current[editorType]) {
        quillRefs.current[editorType].focus();
      }
    }, 0); // Ensure ReactQuill is rendered before focusing
  };

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  // Function to handle save onBlur (this will call the global save function)
  const handleBlurSave = (field, currentValue) => {
    // Normalize: Strip HTML and trim spaces
    const previousPlainText = stripHtml(contactData[field] || "").trim();
    const currentPlainText = stripHtml(currentValue).trim();

    // console.log(`Previous (${field}):`, previousPlainText);
    // console.log(`Current (${field}):`, currentPlainText);

    // Update Redux only if the actual content has changed
    if (currentPlainText !== previousPlainText) {
      saveCoverLetterData(field, currentPlainText, dispatch);
    }
    setActiveEditor(null);
  };

  return (
    <>
      <div className={`cv-contact ${style?.style}`}>
        <Popover
          className="absolute right-10"
          trigger="click"
          placement="right"
          open={popoverVisible}
          onOpenChange={(visible) => setPopoverVisible(visible)}
          // key={index}
          content={
            <CoverLetterProfileSettingsPopover
              activeEditor={activeEditor}
              position="right"
              // activeIndex={activeIndex}
            />
          }
        />
        <div
          className={`contact-wrap ${style?.style}`}
          // style={{ backgroundColor: color }}
          style={
            ["coverletter4", "coverletter5"].includes(style)
              ? { backgroundColor: color }
              : {}
          }
        >
          {/* Email */}
          {/* {email && ( */}

          {contactData?.visibility?.email && (
            <div
              onClick={() => handleEditorClick("email")}
              className="flex items-center gap-2"
            >
              {[
                "coverletter3",
                "coverletter4",
                "coverletter5",
                "coverletter6",
                "coverletter8",
                "coverletter10",
              ].includes(style) && (
                <Icon
                  icon="ic:round-mail"
                  width="12px"
                  height="12px"
                  style={
                    [
                      "coverletter1",
                      "coverletter3",
                      "coverletter8",
                      "coverletter9",
                      "coverletter10",
                    ].includes(style)
                      ? { color: color }
                      : {}
                  }
                  // style={{ color: color }}
                />
              )}

              {activeEditor === "email" ? (
                <div className="relative ">
                  {/* <CustomToolbar /> */}
                  <ReactQuill
                    ref={(el) => (quillRefs.current["email"] = el)}
                    value={email || "john.doe@gmail.com"}
                    modules={modules}
                    formats={formats}
                    onChange={setEmail}
                    onBlur={() => handleBlurSave("email", email)}
                    theme="bubble"
                  />
                </div>
              ) : (
                <div
                  style={{ ...bodyTextStyle, fontFamily }}
                  className={`contact-details ${style?.style}`}
                  dangerouslySetInnerHTML={{
                    __html: email || "john.doe@gmail.com",
                  }}
                ></div>
              )}
              {["coverletter1", "coverletter7", "coverletter9"].includes(
                style
              ) && (
                <Icon
                  icon="ic:round-mail"
                  width="12px"
                  height="12px"
                  style={
                    [
                      "coverletter1",
                      "coverletter3",
                      "coverletter8",
                      "coverletter9",
                      "coverletter10",
                    ].includes(style)
                      ? { color: color }
                      : {}
                  }
                  // style={{ color: color }}
                />
              )}
            </div>
          )}
          {/* )} */}
          {/* Phone */}
          {contactData?.visibility?.phone && (
            <div
              onClick={() => handleEditorClick("phone")}
              className="flex  items-center gap-2"
            >
              {[
                "coverletter3",
                "coverletter4",
                "coverletter5",
                "coverletter6",
                "coverletter10",

                "coverletter8",
              ].includes(style) && (
                <Icon
                  icon="clarity:mobile-solid"
                  width="12px"
                  height="12px"
                  style={
                    [
                      "coverletter1",
                      "coverletter3",
                      "coverletter8",
                      "coverletter9",
                      "coverletter10",
                    ].includes(style)
                      ? { color: color }
                      : {}
                  }
                />
              )}
              {activeEditor === "phone" ? (
                <div className="relative  ">
                  {/* <CustomToolbar /> */}
                  <ReactQuill
                    ref={(el) => (quillRefs.current["phone"] = el)}
                    value={phone || "202-555-0166"}
                    modules={modules}
                    formats={formats}
                    // onChange={setPhone}
                    onChange={(value) => {
                      // Only allow numbers, dashes, and plus signs
                      const sanitizedValue = value.replace(/[^0-9+\-]/g, "");
                      setPhone(sanitizedValue);
                    }}
                    onBlur={() => handleBlurSave("phone", phone)}
                    theme="bubble"
                    onKeyDown={(e) => {
                      // Allow only numbers, +, -, Backspace, Delete, Arrow keys
                      if (
                        !/[0-9+\-]/.test(e.key) &&
                        ![
                          "Backspace",
                          "Delete",
                          "ArrowLeft",
                          "ArrowRight",
                        ].includes(e.key)
                      ) {
                        e.preventDefault();
                      }
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                      const text = (
                        e.clipboardData || window.clipboardData
                      ).getData("text");
                      const sanitizedText = text.replace(/[^0-9+\-]/g, "");
                      setPhone(sanitizedText);
                    }}
                    // placeholder="Enter your phone number here..."
                  />
                </div>
              ) : (
                <div
                  style={{ ...bodyTextStyle, fontFamily }}
                  className={`contact-details ${style?.style}`}
                  dangerouslySetInnerHTML={{
                    __html: phone || "202-555-0166",
                  }}
                ></div>
              )}
              {["coverletter1", "coverletter7", "coverletter9"].includes(
                style
              ) && (
                <Icon
                  icon="clarity:mobile-solid"
                  width="12px"
                  height="12px"
                  style={
                    [
                      "coverletter1",
                      "coverletter3",
                      "coverletter8",
                      "coverletter9",
                    ].includes(style)
                      ? { color: color }
                      : {}
                  }
                />
              )}
            </div>
          )}
          {/* Location */}

          {contactData?.visibility?.address && (
            <div
              onClick={() => handleEditorClick("location")}
              className="flex  items-center gap-2"
            >
              {[
                "coverletter3",
                "coverletter4",
                "coverletter5",
                "coverletter6",
                "coverletter8",
                "coverletter10",
              ].includes(style) && (
                <Icon
                  icon="carbon:location-filled"
                  width="12px"
                  height="12px"
                  style={
                    [
                      "coverletter1",
                      "coverletter3",
                      "coverletter8",
                      "coverletter9",
                      "coverletter10",
                    ].includes(style)
                      ? { color: color }
                      : {}
                  }
                />
              )}
              {activeEditor === "location" ? (
                <div className="relative  ">
                  {/* <CustomToolbar /> */}
                  <ReactQuill
                    ref={(el) => (quillRefs.current["location"] = el)}
                    value={location || "New York, USA"}
                    modules={modules}
                    formats={formats}
                    onChange={setLocation}
                    onBlur={() => handleBlurSave("location", location)}
                    theme="bubble"
                    placeholder="Enter your location here..."
                  />
                </div>
              ) : (
                <div
                  style={{ ...bodyTextStyle, fontFamily }}
                  className={`contact-details ${style?.style}`}
                  dangerouslySetInnerHTML={{
                    __html: location || "New York, USA",
                  }}
                ></div>
              )}
              {["coverletter1", "coverletter7", "coverletter9"].includes(
                style
              ) && (
                <Icon
                  icon="carbon:location-filled"
                  width="12px"
                  height="12px"
                  style={
                    [
                      "coverletter1",
                      "coverletter3",
                      "coverletter8",
                      "coverletter9",
                    ].includes(style)
                      ? { color: color }
                      : {}
                  }
                  // style={{ color: color }}
                />
              )}
            </div>
          )}

          {/* LinkedIn */}
          {contactData?.visibility?.links && (
            <div
              onClick={() => handleEditorClick("linkedIn")}
              className="flex gap-2 items-center"
            >
              {[
                "coverletter3",
                "coverletter4",
                "coverletter5",
                "coverletter6",
                "coverletter8",
                "coverletter10",
              ].includes(style) && (
                <Icon
                  icon="ri:linkedin-fill"
                  width="12px"
                  height="12px"
                  style={
                    [
                      "coverletter1",
                      "coverletter3",
                      "coverletter8",
                      "coverletter9",
                      "coverletter10",
                    ].includes(style)
                      ? { color: color }
                      : {}
                  }
                />
              )}
              {activeEditor === "linkedIn" ? (
                <div className="relative  ">
                  {/* <CustomToolbar /> */}
                  <ReactQuill
                    ref={(el) => (quillRefs.current["linkedIn"] = el)}
                    value={linkedIn || "linkedin.com/in/john.doe"}
                    modules={modules}
                    formats={formats}
                    onChange={setLinkedIn}
                    onBlur={() => handleBlurSave("linkedIn", linkedIn)}
                    theme="bubble"
                    // placeholder="Enter your LinkedIn profile here..."
                  />
                </div>
              ) : (
                <div
                  style={{ ...bodyTextStyle, fontFamily }}
                  className={`contact-details ${style?.style}`}
                  dangerouslySetInnerHTML={{
                    __html: linkedIn || "linkedin.com/in/john.doe",
                  }}
                ></div>
              )}
              {["coverletter1", "coverletter7", "coverletter9"].includes(
                style
              ) && (
                <Icon
                  icon="ri:linkedin-fill"
                  width="12px"
                  height="12px"
                  style={
                    [
                      "coverletter1",
                      "coverletter3",
                      "coverletter8",
                      "coverletter9",
                    ].includes(style)
                      ? { color: color }
                      : {}
                  }
                />
              )}
            </div>
          )}
          {/* Skype */}
          <div
            onClick={() => handleEditorClick("skype")}
            className="flex gap-2 items-center hidden"
          >
            {activeEditor === "skype" ? (
              <div className="relative  ">
                <CustomToolbar />
                <ReactQuill
                  value={skype}
                  modules={modules}
                  formats={formats}
                  // onChange={setSkype}
                  onBlur={() => handleBlurSave("skype", skype)}
                  placeholder="Enter your skype id here..."
                />
              </div>
            ) : (
              <div
                style={bodyTextStyle}
                className={`contact-details ${style?.style}`}
                dangerouslySetInnerHTML={{ __html: skype }}
              ></div>
            )}
            <Icon
              icon="uil:skype"
              width="12px"
              height="12px"
              style={
                [
                  "coverletter1",
                  "coverletter3",
                  "coverletter8",
                  "coverletter9",
                ].includes(style)
                  ? { color: color }
                  : {}
              }
            />
          </div>
        </div>
        {/* </Popover> */}
      </div>
    </>
  );
};
export default Contact;
