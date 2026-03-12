import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useSelector, useDispatch } from "react-redux";
import PopoverToolbar from "./popover";
import { Popover } from "antd";
import { updateSection } from "../../../redux/resumeSlice2";

const Contact = ({
  bodyTextStyle,
  fontFamily,
  headingStyle,
  userInfo,
  style,
  color,
  section,
}) => {
  const modules = {
    toolbar: {
      container: [["bold", "italic", "underline"]],
    },
  };
  // console.log("section", section);

  const formats = ["bold", "italic", "underline", "list", "bullet", "link"];
  const content = <PopoverToolbar />;
  const quillRefs = useRef({});
  const resume = useSelector((state) => state.resume);
  const profile =
    section || resume.sections.find((section) => section.type === "profile");
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverTarget, setPopoverTarget] = useState(null);
  // console.log("profile: contact", profile);

  const dispatch = useDispatch();

  const [localFields, setLocalFields] = useState({
    email: profile?.email || "john.doe@gmail.com",
    contactNumber: profile?.contactNumber || "+202-555-1066",
    address: profile?.address || "XYZ 123 Street, City, State 12345",
    links:
      profile?.links && profile?.links.length > 0
        ? profile.links
        : ["linkedin.com/in/example-1"], // Ensure at least one default link
  });

  // Keep userInfo and localFields in sync
  useEffect(() => {
    setLocalFields({
      email: profile?.email || "",
      contactNumber: profile?.contactNumber || "",
      address: profile?.address || "",
      links:
        profile?.links && profile?.links.length > 0
          ? profile.links
          : ["linkedin.com/in/example-1"], // Ensure at least one default link
    });
  }, [userInfo, profile]);

  const [activeEditor, setActiveEditor] = useState("");

  // const handleEditorClick = (editorType, index = null, event) => {
  //   const key = index !== null ? `links-${index}` : editorType;
  //   setActiveEditor(key);
  //   openPopover(event); // Open the popover on click
  //   setTimeout(() => {
  //     if (index !== null && quillRefs.current[`links-${index}`]) {
  //       quillRefs.current[`links-${index}`].getEditor().focus();
  //     } else if (quillRefs.current[editorType]) {
  //       quillRefs.current[editorType].getEditor().focus();
  //     }
  //   }, 100);
  // };

  const handleEditorClick = (editorType, event) => {
    const key = editorType;
    setActiveEditor(key);
    setPopoverVisible(true);
    setPopoverTarget(event?.currentTarget); // Set the clicked target for Popover
    setTimeout(() => {
      if (quillRefs.current[key]) {
        quillRefs?.current[key]?.getEditor()?.focus();
      }
    }, 100);
  };

  const handleChange = (field, value, index = null) => {
    if (field === "links" && index !== null) {
      const updatedLinks = [...localFields.links];
      updatedLinks[index] = value;
      setLocalFields({ ...localFields, links: updatedLinks });
    } else {
      setLocalFields({ ...localFields, [field]: value });
    }
  };

  const handleBlur = (field, index = null) => {
    if (field === "links" && index !== null) {
      dispatch(
        updateSection({ type: "profile", data: { [field]: localFields.links } })
      );
      // setActiveEditor(null);
    } else {
      dispatch(
        updateSection({
          type: "profile",
          data: { [field]: localFields[field] },
        })
      );
      // setActiveEditor(null);
    }
    // setActiveEditor(null);
  };

  const textColor =
    profile?.column === "right" ? color || "#00396F" : style?.color || color; // Otherwise, use the style color or fallback color

  return (
    <div
      className={`resume-section resume-section-break resume-contact   ${style?.style}`}
    >
      {/* Contact Section */}
      <div className={`sections-title ${style?.style}`}>
        <Icon
          icon="pepicons-pop:line-x"
          width="22px"
          height="20px"
          className="iconLine"
          style={{ color: color }}
        />
        <Icon
          icon="teenyicons:contact-solid"
          width="20px"
          height="20px"
          className="iconTitle"
          style={{ color: color }}
        />
        <h2
          style={{
            ...headingStyle,
            fontFamily: fontFamily,
            color: ["resumeTemp4", "resumeTemp5"].some((temp) =>
              style?.includes(temp)
            )
              ? textColor
              : color,
          }}
        >
          Contact
        </h2>
      </div>
      <div className="seperateHeading"></div>
      <Popover
        content={<PopoverToolbar activeEditor={activeEditor} />}
        trigger="click"
        placement="left"
        visible={popoverVisible}
        onVisibleChange={(visible) => setPopoverVisible(visible)}
        getPopupContainer={() => popoverTarget || document.body}
      />
      {/* <Popover content={content} trigger="click"> */}
      <div className=" p-2">
        <div className="contact-content">
          {/* Email */}
          {profile?.visibility?.email && (
            <div
              onClick={(event) => handleEditorClick("email", event)}
              className="contact-column"
            >
              <Icon icon="ic:round-mail" width="12px" height="12px" />
              {activeEditor === "email" ? (
                <div className="relative">
                  <ReactQuill
                    ref={(el) => (quillRefs.current["email"] = el)}
                    value={localFields.email || "john.doe@gmail.com"}
                    onChange={(value) => handleChange("email", value)}
                    modules={modules}
                    formats={formats}
                    theme="bubble"
                    className="phone-wrap"
                    placeholder="Enter your email here..."
                    onBlur={() => handleBlur("email")}
                  />
                </div>
              ) : (
                <div
                  style={{ ...bodyTextStyle, fontFamily: fontFamily }}
                  className={`contact-details phone-wrap ${style?.style}`}
                  dangerouslySetInnerHTML={{
                    __html: localFields.email || "john.doe@gmail.com",
                  }}
                ></div>
              )}
            </div>
          )}

          {/* Phone */}
          {profile?.visibility?.contactNumber && (
            <div
              onClick={(event) => handleEditorClick("phone", event)}
              className="contact-column"
            >
              <Icon icon="clarity:mobile-solid" width="12px" height="12px" />
              {activeEditor === "phone" ? (
                <div className="relative">
                  <ReactQuill
                    ref={(el) => (quillRefs.current["phone"] = el)}
                    value={localFields.contactNumber || "+202-555-0166"}
                    onChange={(value) => handleChange("contactNumber", value)}
                    modules={modules}
                    formats={formats}
                    theme="bubble"
                    className="phone-wrap"
                    placeholder="Enter your phone number here..."
                    onBlur={() => handleBlur("contactNumber")}
                  />
                </div>
              ) : (
                <div
                  style={{ ...bodyTextStyle, fontFamily: fontFamily }}
                  className={`contact-details phone-wrap ${style?.style}`}
                  dangerouslySetInnerHTML={{
                    __html: localFields.contactNumber || "202-555-0166",
                  }}
                ></div>
              )}
            </div>
          )}

          {/* Location */}
          {profile?.visibility?.address && localFields?.address && (
            <div
              onClick={(event) => handleEditorClick("location", event)}
              className="contact-column"
            >
              <Icon icon="carbon:location-filled" width="12px" height="12px" />
              {activeEditor === "location" ? (
                <div className="relative">
                  <ReactQuill
                    ref={(el) => (quillRefs.current["location"] = el)}
                    value={localFields.address || "XYZ address"}
                    onChange={(value) => handleChange("address", value)}
                    modules={modules}
                    formats={formats}
                    className="phone-wrap"
                    theme="bubble"
                    placeholder="Enter your location here..."
                    onBlur={() => handleBlur("address")}
                  />
                </div>
              ) : (
                <div
                  style={{ ...bodyTextStyle, fontFamily: fontFamily }}
                  className={`contact-details phone-wrap ${style?.style}`}
                  dangerouslySetInnerHTML={{
                    __html: localFields.address || "XYZ address",
                  }}
                ></div>
              )}
            </div>
          )}
          {/* LinkedIn */}
          {/* {localFields.links.length > 0 && (
            <div className="contact-column">
              {localFields.links.map((link, index) => (
                <>
                  <Icon icon="websymbol:link" width="12px" height="12px" />
                  {activeEditor === `links-${index}` ? (
                    <div className="relative">
                      <ReactQuill
                        ref={(el) => (quillRefs.current[`links-${index}`] = el)}
                        value={link || `linkedin.com/in/example-${index + 1}`} // Ensure default is shown in editor
                        onChange={(value) =>
                          handleChange("links", value, index)
                        }
                        modules={modules}
                        theme="bubble"
                        formats={formats}
                        placeholder="Enter LinkedIn profile here..."
                        onBlur={() => handleBlur("links", index)}
                      />
                    </div>
                  ) : (
                    <>
                      <div
                        style={{ ...bodyTextStyle, fontFamily: fontFamily }}
                        className={`contact-details ${style?.style}`}
                        onClick={() => handleEditorClick(`linkedIn-${index}`)}
                        dangerouslySetInnerHTML={{
                          __html:
                            link || `linkedin.com/in/example-${index + 1}`, // Ensure default value is shown
                        }}
                      ></div>
                    </>
                  )}
                </>
              ))}
            </div>
          )} */}

          {/* LinkedIn Links */}
          {profile?.visibility?.links &&
            //   profile?.links?.length > 0 &&
            localFields?.links?.map((link, index) => (
              <div key={index} className="contact-column">
                <Icon icon="websymbol:link" width="12px" height="12px" />
                {activeEditor === "links" ? (
                  <div className="relative">
                    <ReactQuill
                      ref={(el) => (quillRefs.current["links"] = el)}
                      value={link}
                      onChange={(value) => handleChange("links", value, index)}
                      modules={modules}
                      formats={formats}
                      theme="bubble"
                      className="phone-wrap"
                      placeholder="Enter LinkedIn profile here..."
                      onBlur={() => handleBlur("links", index)}
                    />
                  </div>
                ) : (
                  <div
                    style={{ ...bodyTextStyle, fontFamily: fontFamily }}
                    className="contact-details phone-wrap !text-wrap"
                    onClick={() => handleEditorClick("links", index)}
                    // onClick={(event) => {
                    //   // openPopover(event); // Open Popover
                    //   handleEditorClick("links", event); // Open the editor for the clicked link
                    // }}
                    dangerouslySetInnerHTML={{ __html: link }}
                  ></div>
                )}
              </div>
            ))}
        </div>
      </div>
      {/* </Popover> */}
    </div>
  );
};

export default Contact;
