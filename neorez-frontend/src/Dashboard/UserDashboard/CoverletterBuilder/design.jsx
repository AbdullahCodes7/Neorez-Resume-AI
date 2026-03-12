import { Button, Modal, Select, Slider, Typography } from "antd";
import React, { useEffect, useState } from "react";
import RadioButton from "../../../components/shared/radioButton";
import tick from "../../../assets/icons/dashboard/checkIcon.svg";
import { useDispatch } from "react-redux";
import {
  resetDesignDefaults,
  updateColor,
  updateCoverLetter,
  updateFontFamily,
  updateFontSize,
  updateLineHeight,
  updateMargin,
} from "../../../redux/coverLetterSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { saveCoverLetterData } from "../../../redux/actions/SaveCoverLEtter";
import { SketchPicker } from "react-color";
import { Icon } from "@iconify/react/dist/iconify.js";

const DesignFontCoverletter = ({ setActiveTab }) => {
  const [stepsCount, setStepsCount] = useState(5);
  const [stepsCountOne, setStepsCountOne] = useState(4);
  const [stepsCountTwo, setStepsCountTwo] = useState(3);

  //RADIO BUTTONS
  const [selectedRadio, setSelectedRadio] = useState("primary");

  const designCoverLetter = useSelector((state) => state.coverLetter.design);
  const [customColor, setCustomColor] = useState(
    designCoverLetter.color || "#ffffff"
  );

  useEffect(() => {
    if (designCoverLetter.color) {
      setCustomColor(designCoverLetter.color);
    }
  }, [designCoverLetter]);

  const currentFontFamily = designCoverLetter.fontFamily || "Poppins";

  const colorMap = {
    primary1: "#2A9DF4",
    orange1: "#F96B07",
    green1: "#3cb371",
    gray1: "#6f7878",
    purple1: "#951dc4",
    blue1: "#3c6df0",
    lightBlue1: "#56acf2",
    orange2_1: "#cb4335",
    brown1: "#7c5711",
    lightGreen1: "#47B4B6",
    green2: "#27AE60", // Darker Green
    gray2: "#BFC9CA", // Light Gray
    primary2: "#F39C12", // Vibrant Yellow-Orange
    lightGreen2: "#7DCEA0", // Soft Green
    orange2: "#FF6347", // Tomato
    blue2: "#1E90FF", // Dodger Blue
    purple2: "#9370DB", // Medium Purple
    lightBlue2: "#87CEFA", // Sky Blue
    brown2: "#8B4513", // Saddle Brown
    orange2_2: "#FF7F50", // Coral
    primary3: "#DC143C", // Crimson
    green3: "#32CD32", // Lime Green
    orange3: "#FF8C00", // Dark Orange
    blue3: "#4682B4", // Steel Blue
    purple3: "#BA55D3", // Medium Orchid
    gray3: "#BEBEBE", // Gainsboro
    brown3: "#D2691E", // Chocolate
    lightBlue3: "#B0E0E6", // Powder Blue
    orange2_3: "#FF4500", // Orange-Red
    lightGreen3: "#98FB98", // Pale Green
  };

  // console.log(designCoverLetter);
  const handleRadioChange = (event) => {
    // console.log("event", event.target.id);
    const selectedColorId = event.target.id;
    setSelectedRadio(selectedColorId);

    const selectedColor = colorMap[selectedColorId];
    // console.log("Selected color:", selectedColor); // Debugging color
    dispatch(updateColor(selectedColor));
  };

  useEffect(() => {
    const matchedRadioId = Object.keys(colorMap).find(
      (key) => colorMap[key] === designCoverLetter.color
    );
    if (matchedRadioId) {
      setSelectedRadio(matchedRadioId);
    } else {
      setSelectedRadio(""); // If no match, deselect any radio
    }
  }, [designCoverLetter.color]);

  const radioButtons = [
    { id: "primary1", className: "primaryRadio" },
    { id: "orange1", className: "orangeRadio" },
    { id: "green1", className: "greenRadio" },
    { id: "gray1", className: "grayRadio" },
    { id: "purple1", className: "purpleRadio" },
    { id: "blue1", className: "blueRadio" },
    { id: "lightBlue1", className: "lightBlueRadio" },
    { id: "orange2_1", className: "orangeRadio2" },
    { id: "brown1", className: "brownRadio" },
    { id: "lightGreen1", className: "lightGreenRadio" },
    { id: "green2", className: "greenRadio2" },
    { id: "gray2", className: "grayRadio2" },
    { id: "primary2", className: "primaryRadio2" },
    { id: "lightGreen2", className: "lightGreenRadio2" },
    { id: "orange2", className: "orangeRadio2" },
    { id: "blue2", className: "blueRadio2" },
    { id: "purple2", className: "purpleRadio2" },
    { id: "lightBlue2", className: "lightBlueRadio2" },
    { id: "brown2", className: "brownRadio2" },
    { id: "orange2_2", className: "orangeRadio2_2" },
    { id: "primary3", className: "primaryRadio3" },
    { id: "green3", className: "greenRadio3" },
    { id: "orange3", className: "orangeRadio3" },
    { id: "blue3", className: "blueRadio3" },
    { id: "purple3", className: "purpleRadio3" },
    { id: "gray3", className: "grayRadio3" },
    { id: "brown3", className: "brownRadio3" },
    { id: "lightBlue3", className: "lightBlueRadio3" },
    { id: "orange2_3", className: "orangeRadio2_3" },
    { id: "lightGreen3", className: "lightGreenRadio3" },
  ];

  // Marks for the slider (showing only defined sizes)
  const marks = {
    12: "Small",
    16: "Medium",
    20: "Large",
    24: "Extra Large",
  };

  // Function to dynamically determine the label based on the current font size
  const getFontSizeLabel = (fontSize) => {
    if (fontSize <= 13) return "Small";
    if (fontSize <= 18) return "Medium";
    if (fontSize <= 22) return "Large";
    return "Extra Large";
  };
  // Current font size and corresponding label
  const currentFontSize = designCoverLetter.fontSize || 16; // Default to 16px if no value
  const currentFontSizeLabel = getFontSizeLabel(currentFontSize);

  // Design Modal
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
  };

  const dispatch = useDispatch();

  // Font Size slider
  const handleFontSizeChange = (value) => {
    dispatch(updateFontSize(value));
  };

  const handleMarginChange = (value) => {
    dispatch(updateMargin(value));
  };

  const handleLineHeightChange = (value) => {
    dispatch(updateLineHeight(value));
  };
  const handleFontFamilyChange = (value) => {
    dispatch(updateFontFamily(value));
    // dispatch(updateSection({ type: "design", data: { fontFamily: value } }));
  };

  // Handle Save Button Click
  // Handle Save Button Click
  const handleSave = async () => {
    // Collect the current design settings
    const designSettings = {
      fontSize: designCoverLetter.fontSize,
      margin: designCoverLetter.margin,
      lineHeight: designCoverLetter.lineHeight,
      fontFamily: designCoverLetter.fontFamily,
      color: designCoverLetter.color,
    };

    // Dispatch the update action with collected settings
    // Use the saveCoverLetterData function to save the design settings
    await saveCoverLetterData("design", designSettings);

    // Show success message
    toast.success("Design settings saved successfully!");
  };

  // New reset function
  const handleResetDefaults = () => {
    setSelectedRadio("");
    dispatch(resetDesignDefaults()); // Dispatch action to reset to default values
    toast.success("Design settings reset to defaults");
  };

  const handleColorChange = (color) => {
    setCustomColor(color.hex); // Update local color state
    dispatch(updateColor(color.hex)); // Dispatch to update Redux store
  };

  return (
    <>
      {/*Design and Font modal */}

      <div className=" pt-4 px-3 xl:px-10 pb-40 left-Area">
        <div className="flex justify-end items-center cursor-pointer mt-2">
          <Icon
            icon="radix-icons:cross-2"
            width="20px"
            height="20px"
            className="text-black hover:text-blue-500"
            onClick={() => setActiveTab(null)}
          />
        </div>
        <p className="text-center para-large font-OpenSan font-semibold primary mb-[34px]">
          Design <span className="darkGray"> &</span> Font
        </p>

        <div className="bg-[#F2F2F2] rounded-md  py-6 px-10 sliderDesign">
          {/* <div>
            <p className="font-OpenSan para-text darkBlack font-semibold">
              Page Margins: {designCoverLetter.margin || 5}
            </p>
            <div>
              <Typography.Title level={5} />
              <Slider
                min={4}
                max={20}
                steps={2}
                value={designCoverLetter.margin}
                onChange={handleMarginChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="font-OpenSan para-small font-light mediumGray">
                Narrow
              </p>
              <p className="font-OpenSan para-small font-light mediumGray">
                Wide
              </p>
            </div>
          </div> */}

          <div className="mt-4">
            <p className="font-OpenSan para-text darkBlack font-semibold">
              Section Spacing: {designCoverLetter.lineHeight || 1.4}
            </p>
            <div>
              <Typography.Title level={5} />
              <Slider
                min={1}
                max={2}
                step="0.1"
                value={designCoverLetter.lineHeight}
                onChange={handleLineHeightChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="font-OpenSan para-small font-light mediumGray">
                Compact
              </p>
              <p className="font-OpenSan para-small font-light mediumGray">
                More space
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="font-OpenSan para-text darkBlack font-semibold">
              Font Size: {currentFontSizeLabel}
            </p>
            <div>
              <Typography.Title />
              <Slider
                min={12}
                max={24}
                marks={marks} // Show the marks for sizes
                step={null}
                // step={1}
                value={currentFontSize}
                onChange={handleFontSizeChange}
                tooltipVisible={false}
              />
            </div>
            {/* <div className="flex items-center justify-between">
              <p className="font-OpenSan para-small font-light mediumGray">
                -A
              </p>
              <p className="font-OpenSan para-small font-light mediumGray">
                +A
              </p>
            </div> */}
          </div>

          <div className="mt-4">
            <p className="font-OpenSan para-text darkBlack font-semibold mb-5">
              Font Style
            </p>
            <Select
              value={currentFontFamily || "Poppins"}
              style={{
                width: "100%",
              }}
              onChange={handleFontFamilyChange}
              options={[
                {
                  label: (
                    <span
                      className=" grayShade6 text-[14px] font-normal"
                      style={{ fontFamily: "Arial" }}
                    >
                      Arial
                    </span>
                  ),
                  value: "Arial",
                },
                {
                  label: (
                    <span
                      className="text-[14px] font-normal"
                      style={{ fontFamily: "Poppins" }}
                    >
                      Poppins
                    </span>
                  ),
                  value: "Poppins",
                },
                // {
                //   label: (
                //     <span
                //       className="text-[14px] font-normal"
                //       style={{ fontFamily: "Courier New" }}
                //     >
                //       Courier New
                //     </span>
                //   ),
                //   value: "Courier New",
                // },
                {
                  label: (
                    <span
                      className="text-[14px] font-normal"
                      style={{ fontFamily: "Inter" }}
                    >
                      Inter
                    </span>
                  ),
                  value: "Inter",
                },
                {
                  label: (
                    <span
                      className="text-[14px] font-normal"
                      style={{ fontFamily: "Montserrat" }}
                    >
                      Montserrat
                    </span>
                  ),
                  value: "Montserrat",
                },
                // {
                //   label: (
                //     <span
                //       className="text-[14px] font-normal"
                //       style={{ fontFamily: "Times New Roman" }}
                //     >
                //       Times New Roman
                //     </span>
                //   ),
                //   value: "Times New Roman",
                // },
                {
                  label: (
                    <span
                      className="text-[14px] font-normal"
                      style={{ fontFamily: "Roboto" }}
                    >
                      Roboto
                    </span>
                  ),
                  value: "Roboto",
                },
                {
                  label: (
                    <span
                      className="text-[14px] font-normal"
                      style={{ fontFamily: "Rubik" }}
                    >
                      Rubik
                    </span>
                  ),
                  value: "Rubik",
                },
                {
                  label: (
                    <span
                      className="text-[14px] font-normal"
                      style={{ fontFamily: "Georgia" }}
                    >
                      Georgia
                    </span>
                  ),
                  value: "Georgia",
                },
                {
                  label: (
                    <span
                      className="text-[14px] font-normal"
                      style={{ fontFamily: "Lato" }}
                    >
                      Lato
                    </span>
                  ),
                  value: "Lato",
                },
              ]}
            />
          </div>

          <div className="mt-4">
            <p className="font-OpenSan para-text darkBlack font-semibold">
              Colors
            </p>
            <div className="flex flex-wrap items-center mt-4 mb-4 gap-y-2">
              {radioButtons.map((radio, index) => (
                <div key={index} className={`${radio.className} relative`}>
                  <RadioButton
                    id={radio.id}
                    name="radio-group"
                    checked={selectedRadio === radio.id}
                    onChange={handleRadioChange}
                  />
                  {selectedRadio === radio.id && (
                    <img
                      src={tick}
                      alt="tick icon"
                      className="absolute top-0 left-[1px]"
                    />
                  )}
                </div>
              ))}
            </div>
            <div>
              <p className="font-OpenSan para-small font-light mediumGray">
                Use custom color
              </p>
              <SketchPicker
                color={customColor} // Set the color of the picker
                onChangeComplete={handleColorChange} // Update color on change
              />
            </div>
            <div className="mt-8 text-center">
              <Button type="primary" onClick={handleSave}>
                Save
              </Button>
              <Button
                type="default"
                onClick={handleResetDefaults}
                className="ml-2"
              >
                Reset to Default
              </Button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignFontCoverletter;
