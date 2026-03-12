import React, { useState } from "react";
import clTemplate from "../../assets/images/dashboard/cl-template.webp";
import line from "../../assets/icons/dashboard/line.svg";
import save from "../../assets/icons/dashboard/save.svg";
import edit from "../../assets/icons/dashboard/edit.svg";
import adjustEdit from "../../assets/icons/dashboard/adjustEdit.svg";
import copy from "../../assets/icons/dashboard/copy.svg";
import download from "../../assets/icons/dashboard/download.svg";
import check from "../../assets/icons/dashboard/check.svg";
import rectangle from "../../assets/icons/dashboard/rectangle.svg";
import bin from "../../assets/icons/dashboard/bin.svg";
import remove from "../../assets/icons/dashboard/remove.svg";
import { Modal, Popover } from "antd";
import Button from "../../components/shared/button";
import { useNavigate } from "react-router-dom";
import AiWriteButton from "../UserDashboard/aiWriteButton";

const CoverLetterDash = ({ isSavePage }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isCoverLetterModal, setIsCoverLetterModal] = useState(null);
  const [isViewModal, setIsViewModal] = useState(null);

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const handleCoverLetterModal = () => {
    setIsCoverLetterModal(!isCoverLetterModal);
  };
  const handleGenerateModal = () => {
    setIsGenerateModalOpen(!isGenerateModalOpen);
  };
  const handleSaveModal = () => {
    setIsSaveModalOpen(!isSaveModalOpen);
  };
  const handleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };
  const handleViewModal = () => {
    setIsViewModal(!isViewModal);
  };
  const handleNavigate = () => {
    navigate("/dashboard");
  };
  const handleUseTemplate = () => {
    navigate("/use-coverletter");
  };

  const contentSave = (
    <div>
      <p className="darkGray para-ex-small font-OpenSan font-bold px-3 py-2">
        Save
      </p>
    </div>
  );
  const contentEdit = (
    <div>
      <p className="darkGray para-ex-small font-OpenSan font-bold px-3 py-2">
        Adjust Edit
      </p>
    </div>
  );
  const contentDownload = (
    <div>
      <p className="darkGray para-ex-small font-OpenSan font-bold px-3 py-2">
        Download
      </p>
    </div>
  );
  const contentDelete = (
    <div>
      <p className="darkGray para-ex-small font-OpenSan font-bold px-3 py-2">
        Delete
      </p>
    </div>
  );
  const contentCopy = (
    <div>
      <p className="darkGray para-ex-small font-OpenSan font-bold px-3 py-2">
        Copied to Clipboard
      </p>
    </div>
  );
  const contentAi = (
    <div style={{inset:"auto auto 600px 605px !important"}}>
      <AiWriteButton />
    </div>
  );

  const coverLetter = [
    { id: 1, src: clTemplate },
    { id: 2, src: clTemplate },
    { id: 3, src: clTemplate },
    { id: 4, src: clTemplate },
    { id: 5, src: clTemplate },
    { id: 6, src: clTemplate },
    { id: 7, src: clTemplate },
    { id: 8, src: clTemplate },
    { id: 9, src: clTemplate },
    { id: 10, src: clTemplate },
    { id: 11, src: clTemplate },
    { id: 12, src: clTemplate },
  ];

  return (
    <>
      <div className=" pb-24">
        <div className="px-[37px] flex flex-wrap gap-[34px] justify-center">
          {coverLetter.map((coverLetter) => (
            <div
              key={coverLetter.id}
              className="relative group overflow-hidden rounded-md"
            >
              <img
                src={coverLetter.src}
                alt={`resume image ${coverLetter.id}`}
                className="opacity-1 w-[192px] h-[271px]"
              />
              <Button
                className="absolute w-32   bg-white primary translate-x-[32px]  opacity-0 group-hover:opacity-100 group-hover:translate-y-[-60px] group-hover:block transition-all  duration-300 ease-in-out"
                text="View Template"
                minHeight={50}
                onClick={isSavePage ? handleViewModal : handleCoverLetterModal}
              />
              {!isSavePage && (
                <Button
                  className="absolute w-32 btn-primary translate-x-[32px]  opacity-0 group-hover:opacity-100 group-hover:translate-y-[-115px] group-hover:block transition-all  duration-300 ease-in-out"
                  text="Use Template"
                  minHeight={50}
                  onClick={handleUseTemplate}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* View Template Modal 1*/}
      <Modal
        open={isCoverLetterModal}
        onCancel={handleCoverLetterModal}
        footer={null}
        centered
      >
        <div className="pt-[34px]  modal-wrap">
          <div className="generateModal">
            <div className="ml-9 mt-4 relative">
              <img src={line} alt="line image" />
              <img
                src={rectangle}
                alt="line image"
                className="absolute top-12"
              />

              <div className="absolute top-6 left-[20px]">
                <h3 className="font-OpenSans text-[27px] font-normal mediumBlack">
                  Nancel Camebert
                </h3>
                <p className="font-bold font-OpenSan para-ex-small mediumGray">
                  Web UX/UI Designer
                </p>
                <p className="font-normal font-OpenSan para-ex-small mediumGray w-[383px] ">
                  Lorem ipsum dolor sit amet consectetur. Quis facilisi justo
                  integer malesuada. Augue quis mauris vitae amet adipiscing
                  semper suspendisse velit. Volutpat morbi et lacus nec
                  dignissim neque. Dictum non elit sed lectus odio.{" "}
                </p>
              </div>
            </div>
            <p className="ml-9 mt-[100px] mb-3 font-normal font-OpenSan mediumBlack text-[10px] ">
              Dear, Mr. Daniel
            </p>
            <div className="generateBox ">
              <p className="font-normal font-OpenSan mediumGray para-ex-small ">
                Lorem ipsum dolor sit amet consectetur. Quis facilisi justo
                integer malesuada. Augue quis mauris vitae amet adipiscing
                semper suspendisse velit. Volutpat morbi et lacus nec dignissim
                neque. Dictum non elit sed lectus odio. Feugiat ac euismod
                feugiat eget. Etiam ullamcorper ligula sed in. Duis sed turpis
                enim aenean tincidunt pellentesque. Consequat id eu iaculis leo.
                Arcu bibendum suscipit diam sociis. Nibh eu dolor eget fermentum
                pretium a sit in.{" "}
              </p>
              <p className="font-normal font-OpenSan mediumGray para-ex-small ">
                Dolor ultrices eget orci nisi orci nibh. Sed eget volutpat
                facilisi quis blandit diam eu consequat ac. Nunc posuere
                dictumst morbi etiam suscipit. Posuere tellus tincidunt amet
                tortor vitae arcu ultricies. Turpis nunc id elementum fusce nibh
                magna mattis arcu aliquet. Purus id sit in sit ullamcorper elit.
                Ut gravida egestas ullamcorper amet amet. Enim facilisi est a
                consectetur molestie. Aliquam ornare vulputate posuere amet
                aenean fames.{" "}
              </p>
              <p className="font-normal font-OpenSan mediumGray para-ex-small ">
                Suspendisse pretium dui id vitae ornare turpis. Integer cras
                adipiscing orci lacus sagittis nibh tellus duis sit. At libero
                morbi vel cras gravida venenatis vel. Vestibulum quis elit et
                tellus in varius in in.{" "}
              </p>
            </div>
            <div>
              <p className=" font-normal font-OpenSan mediumBlack para-ex-small mt-2 ml-[74px]">
                {" "}
                Best regards
              </p>
              <div className="ml-[103px] mt-4">
                <p className=" font-normal font-OpenSan primary para-small">
                  Nancel Camebert
                </p>
                <p className=" font-normal font-OpenSan mediumGray para-ex-small">
                  Web UX/UI Designer
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <Button
              text="Use Template"
              className="btn-primary"
              onClick={handleGenerateModal}
            />
          </div>
        </div>
      </Modal>

      {/* View Template Modal 2*/}
      <Modal
        open={isViewModal}
        onCancel={handleViewModal}
        footer={null}
        centered
      >
        <div className="pt-[34px]  modal-wrap">
          <div className="relative">
            <div>
              <div className="generateModal">
                <div className="ml-9 mt-4 relative">
                  <img src={line} alt="line image" />
                  <img
                    src={rectangle}
                    alt="line image"
                    className="absolute top-12"
                  />
                  <div className="absolute top-6 left-[20px]">
                    <h3 className="font-OpenSans text-[27px] font-normal mediumBlack">
                      Nancel Camebert
                    </h3>
                    <p className="font-bold font-OpenSan para-ex-small mediumGray">
                      Web UX/UI Designer
                    </p>
                    <p className="font-normal font-OpenSan para-ex-small mediumGray w-[383px] ">
                      Lorem ipsum dolor sit amet consectetur. Quis facilisi
                      justo integer malesuada. Augue quis mauris vitae amet
                      adipiscing semper suspendisse velit. Volutpat morbi et
                      lacus nec dignissim neque. Dictum non elit sed lectus
                      odio.{" "}
                    </p>
                  </div>
                </div>
                <p className="ml-9 mt-[100px] mb-3 font-normal font-OpenSan mediumBlack text-[10px] ">
                  Dear, Mr. Daniel
                </p>
                <div className="generateBox ">
                  <p className="font-normal font-OpenSan mediumGray para-ex-small ">
                    Lorem ipsum dolor sit amet consectetur. Quis facilisi justo
                    integer malesuada. Augue quis mauris vitae amet adipiscing
                    semper suspendisse velit. Volutpat morbi et lacus nec
                    dignissim neque. Dictum non elit sed lectus odio. Feugiat ac
                    euismod feugiat eget. Etiam ullamcorper ligula sed in. Duis
                    sed turpis enim aenean tincidunt pellentesque. Consequat id
                    eu iaculis leo. Arcu bibendum suscipit diam sociis. Nibh eu
                    dolor eget fermentum pretium a sit in.{" "}
                  </p>
                  <p className="font-normal font-OpenSan mediumGray para-ex-small ">
                    Dolor ultrices eget orci nisi orci nibh. Sed eget volutpat
                    facilisi quis blandit diam eu consequat ac. Nunc posuere
                    dictumst morbi etiam suscipit. Posuere tellus tincidunt amet
                    tortor vitae arcu ultricies. Turpis nunc id elementum fusce
                    nibh magna mattis arcu aliquet. Purus id sit in sit
                    ullamcorper elit. Ut gravida egestas ullamcorper amet amet.
                    Enim facilisi est a consectetur molestie. Aliquam ornare
                    vulputate posuere amet aenean fames.{" "}
                  </p>
                  <p className="font-normal font-OpenSan mediumGray para-ex-small ">
                    Suspendisse pretium dui id vitae ornare turpis. Integer cras
                    adipiscing orci lacus sagittis nibh tellus duis sit. At
                    libero morbi vel cras gravida venenatis vel. Vestibulum quis
                    elit et tellus in varius in in.{" "}
                  </p>
                </div>
                <div>
                  <p className=" font-normal font-OpenSan mediumBlack para-ex-small mt-2 ml-[74px]">
                    {" "}
                    Best regards
                  </p>
                  <div className="ml-[103px] mt-4">
                    <p className=" font-normal font-OpenSan primary para-small">
                      Nancel Camebert
                    </p>
                    <p className=" font-normal font-OpenSan mediumGray para-ex-small">
                      Web UX/UI Designer
                    </p>
                  </div>
                </div>
              </div>
              <Popover content={contentAi} placement="top" >
                <div className="absolute top-[29%] right-4 ">
                  <img src={adjustEdit} alt="" />
                </div>
              </Popover>
            </div>
          </div>
          {/* ICONS */}
          <div>
            <div className="flex items-center justify-end gap-1 absolute top-[60px] right-[22px]">
              <div className="iconContainer">
                <Popover content={contentDelete}>
                  <img src={bin} alt="bin Icon" onClick={handleDeleteModal} />
                </Popover>
              </div>
              <div className="iconContainer">
                <Popover content={contentDownload}>
                  <img
                    src={download}
                    alt="Download Icon"
                    onClick={handleSaveModal}
                  />
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Use Template */}

      {/* Generate Modal */}
      <Modal
        open={isGenerateModalOpen}
        onCancel={handleGenerateModal}
        footer={null}
        centered
        // width="484px"
      >
        <div className="py-[34px]  modal-wrap">
          {/* Content */}

          <div className="relative">
            <div
              className="generateModal"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="ml-9 mt-4 relative">
                <img src={line} alt="line image" />
                <img
                  src={rectangle}
                  alt="line image"
                  className="absolute top-12"
                />
                <div className="absolute top-6 left-[20px]">
                  <h3 className="font-OpenSans text-[27px] font-normal mediumBlack">
                    Nancel Camebert
                  </h3>
                  <p className="font-bold font-OpenSan para-ex-small mediumGray">
                    Web UX/UI Designer
                  </p>
                  <p className="font-normal font-OpenSan para-ex-small mediumGray w-[383px] ">
                    Lorem ipsum dolor sit amet consectetur. Quis facilisi justo
                    integer malesuada. Augue quis mauris vitae amet adipiscing
                    semper suspendisse velit. Volutpat morbi et lacus nec
                    dignissim neque. Dictum non elit sed lectus odio.{" "}
                  </p>
                </div>
              </div>
              <p className="ml-9 mt-[100px] mb-3 font-normal font-OpenSan mediumBlack text-[10px] ">
                Dear, Mr. Daniel
              </p>
              <div className="generateBox relative">
                <img
                  src={adjustEdit}
                  alt="icon"
                  className="absolute top-[-40px] right-0"
                />
                <p className="font-normal font-OpenSan mediumGray para-ex-small ">
                  Lorem ipsum dolor sit amet consectetur. Quis facilisi justo
                  integer malesuada. Augue quis mauris vitae amet adipiscing
                  semper suspendisse velit. Volutpat morbi et lacus nec
                  dignissim neque. Dictum non elit sed lectus odio. Feugiat ac
                  euismod feugiat eget. Etiam ullamcorper ligula sed in. Duis
                  sed turpis enim aenean tincidunt pellentesque. Consequat id eu
                  iaculis leo. Arcu bibendum suscipit diam sociis. Nibh eu dolor
                  eget fermentum pretium a sit in.{" "}
                </p>
                <p className="font-normal font-OpenSan mediumGray para-ex-small ">
                  Dolor ultrices eget orci nisi orci nibh. Sed eget volutpat
                  facilisi quis blandit diam eu consequat ac. Nunc posuere
                  dictumst morbi etiam suscipit. Posuere tellus tincidunt amet
                  tortor vitae arcu ultricies. Turpis nunc id elementum fusce
                  nibh magna mattis arcu aliquet. Purus id sit in sit
                  ullamcorper elit. Ut gravida egestas ullamcorper amet amet.
                  Enim facilisi est a consectetur molestie. Aliquam ornare
                  vulputate posuere amet aenean fames.{" "}
                </p>
                <p className="font-normal font-OpenSan mediumGray para-ex-small ">
                  Suspendisse pretium dui id vitae ornare turpis. Integer cras
                  adipiscing orci lacus sagittis nibh tellus duis sit. At libero
                  morbi vel cras gravida venenatis vel. Vestibulum quis elit et
                  tellus in varius in in.{" "}
                </p>
              </div>
              <div>
                <p className=" font-normal font-OpenSan mediumBlack para-ex-small mt-2 ml-[74px]">
                  {" "}
                  Best regards
                </p>
                <div className="ml-[103px] mt-4">
                  <p className=" font-normal font-OpenSan primary para-small">
                    Nancel Camebert
                  </p>
                  <p className=" font-normal font-OpenSan mediumGray para-ex-small">
                    Web UX/UI Designer
                  </p>
                </div>
              </div>
            </div>
            {/* AI WRITER */}
            {isHovered && <AiWriteButton />}
          </div>

          {/* ICONS */}

          <div>
            <div className="flex items-center justify-end gap-1 absolute top-[60px] right-[22px]">
              <div className="iconContainer">
                <Popover content={contentCopy}>
                  <img src={copy} alt="copy Icon" onClick={handleSaveModal} />
                </Popover>
              </div>
              <div className="iconContainer">
                <Popover content={contentSave}>
                  <img src={save} alt="Save Icon" onClick={handleSaveModal} />
                </Popover>
              </div>

              <div className="iconContainer">
                <Popover content={contentDownload}>
                  <img
                    src={download}
                    alt="Download Icon"
                    onClick={handleSaveModal}
                  />
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Saved Successfully Modal*/}
      <Modal
        open={isSaveModalOpen}
        onCancel={handleSaveModal}
        footer={null}
        centered
        // width="484px"
      >
        <div className="py-[20px]  modal-wrap flex flex-col items-center justify-center gap-[42px]">
          <img src={check} alt="Icon" />

          <h3 className="font-OpenSan font-semibold ">Saved Successfully</h3>

          <Button
            text="Continue"
            className="btn-primary w-32"
            onClick={handleNavigate}
          />
        </div>
      </Modal>

      {/* delete Modal */}

      <Modal
        open={isDeleteModalOpen}
        onCancel={handleDeleteModal}
        footer={null}
        centered
        // width="484px"
      >
        <div className="py-[51px] px-[50px] modal-wrap flex flex-col items-center justify-center gap-[30px]">
          <img src={remove} alt="" />
          <div>
            <h2 className="text-center font-bold darkGray  font-OpenSan mb-2">
              Delete
              <span className="font-light"> Template</span>
            </h2>
            <p className="text-center para-small darkGray font-OpenSan font-semibold opacity-40 ">
              You sure you want to Delete?
            </p>
          </div>
          <div className="flex justify-center gap-[6px]">
            <Button
              text="Cancel"
              className="primaryBg white font-OpenSan para-text py-2 font-normal w-[105px]"
              onClick={handleDeleteModal}
            />
            <Button
              text="Delete"
              className="redBg white font-OpenSan para-text py-2 font-normal w-[105px]"
              onClick={handleDeleteModal}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CoverLetterDash;
