import { Modal } from "antd";
import React, { useState } from "react";
import Button from "../../../components/shared/button";
import { useDispatch } from "react-redux";
// import { addCustomSection } from "../../../redux/resumeSlice";
import { useSelector } from "react-redux";

const AddSectionCoverletter = ({
  isClSectionModalOpen,
  setIsClSectionModalOpen,
}) => {
  // const resume = useSelector((state) => state.resume);
  // const [isClSectionModalOpen, setIsClSectionModalOpen] = useState(false);
  const handleSectionModal = () => {
    setIsClSectionModalOpen(!isClSectionModalOpen);
  };
  const addSection = [
    {
      id: 1,
      header: "Summary",
      content:
        "Lorem ipsum dolor sit amet consectetur. Quis facilisi justo integer malesuada. Augue quis mauris vitae amet adipiscing semper suspendisse velit. Volutpat morbi et lacus nec,  Augue quis",
      footer: "Summary",
    },
    {
      id: 2,
      header: "Custom Title",
      content:
        "Lorem ipsum dolor sit amet consectetur. Quis facilisi justo integer malesuada. Augue quis mauris vitae amet adipiscing semper suspendisse velit. Volutpat morbi et lacus nec,  Augue quis",
      footer: "Custom",
    },
    {
      id: 3,
      header: "Training/Courses",
      content:
        "Lorem ipsum dolor sit amet consectetur. Quis facilisi justo integer malesuada. Augue quis mauris vitae amet adipiscing semper suspendisse velit. Volutpat morbi et lacus nec,  Augue quis",
      footer: "Training Courses",
    },
    {
      id: 4,
      header: "Projects",
      content:
        "Lorem ipsum dolor sit amet consectetur. Quis facilisi justo integer malesuada. Augue quis mauris vitae amet adipiscing semper suspendisse velit. Volutpat morbi et lacus nec,  Augue quis",
      footer: "Projects",
    },
    {
      id: 5,
      header: "Strengths",
      content:
        "Lorem ipsum dolor sit amet consectetur. Quis facilisi justo integer malesuada. Augue quis mauris vitae amet adipiscing semper suspendisse velit. Volutpat morbi et lacus nec,  Augue quis",
      footer: "Strengths",
    },
    {
      id: 6,
      header: "Volunteering",
      content:
        "Lorem ipsum dolor sit amet consectetur. Quis facilisi justo integer malesuada. Augue quis mauris vitae amet adipiscing semper suspendisse velit. Volutpat morbi et lacus nec,  Augue quis",
      footer: "Volunteering",
    },
    {
      id: 7,
      header: "Industry Expertise",
      content:
        "Lorem ipsum dolor sit amet consectetur. Quis facilisi justo integer malesuada. Augue quis mauris vitae amet adipiscing semper suspendisse velit. Volutpat morbi et lacus nec,  Augue quis",
      footer: "Industry Expertise",
    },
    {
      id: 8,
      header: "Passion",
      content:
        "Lorem ipsum dolor sit amet consectetur. Quis facilisi justo integer malesuada. Augue quis mauris vitae amet adipiscing semper suspendisse velit. Volutpat morbi et lacus nec,  Augue quis",
      footer: "Passion",
    },
    {
      id: 9,
      header: "My Time",
      content:
        "Lorem ipsum dolor sit amet consectetur. Quis facilisi justo integer malesuada. Augue quis mauris vitae amet adipiscing semper suspendisse velit. Volutpat morbi et lacus nec,  Augue quis",
      footer: "My Time",
    },
    {
      id: 10,
      header: "Find me Online",
      content:
        "Lorem ipsum dolor sit amet consectetur. Quis facilisi justo integer malesuada. Augue quis mauris vitae amet adipiscing semper suspendisse velit. Volutpat morbi et lacus nec,  Augue quis",
      footer: "Find me Online",
    },
    {
      id: 11,
      header: "Certification",
      content:
        "Lorem ipsum dolor sit amet consectetur. Quis facilisi justo integer malesuada. Augue quis mauris vitae amet adipiscing semper suspendisse velit. Volutpat morbi et lacus nec,  Augue quis",
      footer: "Certification",
    },
    {
      id: 12,
      header: "Awards",
      content:
        "Lorem ipsum dolor sit amet consectetur. Quis facilisi justo integer malesuada. Augue quis mauris vitae amet adipiscing semper suspendisse velit. Volutpat morbi et lacus nec,  Augue quis",
      footer: "Awards",
    },
    {
      id: 13,
      header: "References",
      content:
        "Lorem ipsum dolor sit amet consectetur. Quis facilisi justo integer malesuada. Augue quis mauris vitae amet adipiscing semper suspendisse velit. Volutpat morbi et lacus nec,  Augue quis",
      footer: "References",
    },
    {
      id: 14,
      header: "Publications",
      content:
        "Lorem ipsum dolor sit amet consectetur. Quis facilisi justo integer malesuada. Augue quis mauris vitae amet adipiscing semper suspendisse velit. Volutpat morbi et lacus nec,  Augue quis",
      footer: "Publications",
    },
    {
      id: 15,
      header: "Additional Skills",
      content:
        "Lorem ipsum dolor sit amet consectetur. Quis facilisi justo integer malesuada. Augue quis mauris vitae amet adipiscing semper suspendisse velit. Volutpat morbi et lacus nec,  Augue quis",
      footer: "Additional Skills",
    },
  ];

  const dispatch = useDispatch(); // Add this to use Redux

  const handleAddSection = (section) => {
    // console.log("section", section);
    // dispatch(addCustomSection(section)); // Dispatch the action to add the section
    // setIsClSectionModalOpen(false); // Close modal after adding the section
  };
  // console.log(resume);
  return (
    <>
      <div>
        {/* Add section modal */}
        <Modal
          open={isClSectionModalOpen}
          onCancel={handleSectionModal}
          footer={null}
          centered
          width="100%"
        >
          <div className=" py-4">
            <p className="text-center para-large font-OpenSan font-semibold darkGray mb-[34px]">
              Add new <span className="primary">section</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4 items-center">
              {addSection.map((add, index) => (
                <>
                  {/* {console.log(add)} */}
                  <div className="flex flex-col gap-2 w-[359px] addSection">
                    <div className="relative group overflow-hidden rounded-md">
                      <div className="sectionBox opacity-1 px-[10px] py-5 ">
                        <p className="font-OpenSan darkBlack para-small font-semibold">
                          {add.header}
                        </p>
                        <p className="font-OpenSan mediumGray para-small">
                          {add.content}
                        </p>
                        <Button
                          className="absolute w-[60%] btn-primary opacity-0 group-hover:opacity-100 group-hover:block 
                    left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out hidden"
                          text="Add section"
                          minHeight={41}
                          // onClick={() => handleAddSection(add)}
                        />
                      </div>
                    </div>
                    <p className="font-OpenSan  para-small text-center font-semibold darkBlue">
                      {add.footer}
                    </p>
                  </div>
                </>
              ))}
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AddSectionCoverletter;
