import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useSelector } from "react-redux";
import { updateProfile } from "../../../redux/resumeSlice";
import { useDispatch } from "react-redux";
import PopoverToolbar from "./popover";
import { Popover } from "antd";

const Follow = ({ bodyTextStyle, headingStyle, style, color }) => {
  // Quill modules
  const modules = {
    toolbar: {
      container: [["bold", "italic", "underline"]],
    },
  };
  // Quill Formats
  const formats = ["bold", "italic", "underline", "list", "bullet", "link"];
  const content = (
    <div>
      <PopoverToolbar />
    </div>
  );
  // LinkedIn, Email, Phone
  const [linkedIn, setLinkedIn] = useState("linkedin.com/in/example-0");
  const [facebook, setFacebook] = useState("facebook.com//Adam.maxw");
  const [twitter, setTwitter] = useState("twitter.com/Adam.maxw");
  const [pinterest, setPinteret] = useState("pinterest.com/Adam.maxw");

  const resume = useSelector((state) => state.resume);
  const profile = resume.sections[0];
  const dispatch = useDispatch();

  // console.log("profile", profile);
  // Track the currently active editor
  const [activeEditor, setActiveEditor] = useState("");
  // Handle editor click
  const handleEditorClick = (editorType) => {
    setActiveEditor(editorType);
  };

  //Redux Code

  const handleProfileLinkChange = (index, value) => {
    const updatedLinks = [...profile.links];
    updatedLinks[index] = value;
    handleProfileChange("links", updatedLinks);
  };

  const handleProfileChange = (field, value) => {
    dispatch(updateProfile({ [field]: value }));
  };

  return (
    <>
      <div className={`resume-follow ${style?.style}`}>
        {/*Follow Section */}
        <div className={`sections-title ${style?.style}`}>
          <Icon
            icon="pepicons-pop:line-x"
            width="22px"
            height="20px"
            className="iconLine"
          />
          <h2 style={headingStyle}>Follow</h2>
        </div>
        <div className="seperateHeading"></div>
        <Popover content={content} trigger="click">
          <div className="borderClick p-2">
            <div className="flex flex-col gap-3">
             
                {/* Facebook */}
                <div onClick={() => handleEditorClick("facebook")} className="flex flex-col gap-2">
                  <h4 className="follow-subheading">Facebook</h4>
                  {profile.links?.map((link, index) =>
                    activeEditor === "facebook" ? (
                      <>
                        <div className="relative  ">
                          <div key={index}>
                            <ReactQuill
                              value={link || "facebook.com"}
                              onChange={(value) =>
                                handleProfileLinkChange(index, value)
                              }
                              modules={modules}
                              theme="bubble"
                              formats={formats}
                              placeholder="Enter facebook profile ..."
                              onBlur={() => setActiveEditor(null)}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className={`follow-details ${style?.style}`}
                          dangerouslySetInnerHTML={{
                            __html: link ? link : facebook,
                          }}
                        ></div>
                      </>
                    )
                  )}
                </div>
                {/* LinkedIn */}
                <div onClick={() => handleEditorClick("linkedIn")} className="flex flex-col gap-2">
                  <h4 className="follow-subheading">Linkedin</h4>

                  {profile.links?.map((link, index) =>
                    activeEditor === "linkedIn" ? (
                      <>
                        <div className="relative  ">
                          <div key={index}>
                            {/* {console.log("kuch link", link)} */}
                            <ReactQuill
                              value={link || `linkedin.com/in/example-${index}`}
                              onChange={(value) =>
                                handleProfileLinkChange(index, value)
                              }
                              modules={modules}
                              theme="bubble"
                              formats={formats}
                              placeholder="Enter linkedin profile ..."
                              onBlur={() => setActiveEditor(null)}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className={`follow-details ${style?.style}`}
                          dangerouslySetInnerHTML={{
                            __html: link ? link : linkedIn,
                          }}
                        ></div>
                      </>
                    )
                  )}
                </div>
             
                {/* Twitter */}
                <div onClick={() => handleEditorClick("twitter")} className="flex flex-col gap-2">
                  <h4 className="follow-subheading">Twitter</h4>
                  {profile.links?.map((link, index) =>
                    activeEditor === "twitter" ? (
                      <>
                        <div className="relative  ">
                          <div key={index}>
                            {/* {console.log("kuch link", link)} */}
                            <ReactQuill
                              value={link || `twitter.com`}
                              onChange={(value) =>
                                handleProfileLinkChange(index, value)
                              }
                              modules={modules}
                              theme="bubble"
                              formats={formats}
                              placeholder="Enter Twitter profile ..."
                              onBlur={() => setActiveEditor(null)}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className={`follow-details ${style?.style}`}
                          dangerouslySetInnerHTML={{
                            __html: link ? link : twitter,
                          }}
                        ></div>
                      </>
                    )
                  )}
                </div>
                {/* Pinterets */}
                <div onClick={() => handleEditorClick("linkedIn")} className="flex flex-col gap-2">
                  <h4 className="follow-subheading">Pinterest</h4>

                  {profile.links?.map((link, index) =>
                    activeEditor === "pinterest" ? (
                      <>
                        <div className="relative  ">
                          <div key={index}>
                            {/* {console.log("kuch link", link)} */}
                            <ReactQuill
                              value={link || "pinterest.com"}
                              onChange={(value) =>
                                handleProfileLinkChange(index, value)
                              }
                              modules={modules}
                              theme="bubble"
                              formats={formats}
                              placeholder="Enter Pinterest profile ..."
                              onBlur={() => setActiveEditor(null)}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className={`follow-details ${style?.style}`}
                          dangerouslySetInnerHTML={{
                            __html: link ? link : pinterest,
                          }}
                        ></div>
                      </>
                    )
                  )}
                </div>
              
            </div>
          </div>
        </Popover>
      </div>
    </>
  );
};
export default Follow;
