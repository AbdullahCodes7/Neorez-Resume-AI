import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "antd";
import { updateSection } from "../../../redux/resumeSlice2";
import Button from "../../../components/shared/button";
// Extend dayjs with customParseFormat
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
// Utility function to parse dates
const parseDate = (dateString) => {
  const formats = ["MMM YYYY", "MMMM YYYY", "MM/YYYY", "YYYY"];
  if (!dateString) return null;
  const parsedDate = dayjs(dateString, formats, true);
  return parsedDate.isValid() ? parsedDate : null;
};

const DatePickerComponent = ({
  sectionType,
  sectionIndex,
  fontFamily,
  // textColor,
  color,
  style,
  ...props
}) => {
  const dispatch = useDispatch();

  // console.log("textColor", textColor);
  // console.log("style in datePicker", style);
  const section = useSelector((state) =>
    state?.resume?.sections.find((sec) => sec?.type === sectionType)
  );

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isPresent, setIsPresent] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); // Control DatePicker visibility

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent click event from propagating to parent
  };

  useEffect(() => {
    if (!section || !section?.items[sectionIndex]) return;

    const item = section.items[sectionIndex];
    const parsedStartDate = parseDate(item?.startDate);
    const parsedEndDate =
      item?.endDate?.toLowerCase() === "present"
        ? null
        : parseDate(item?.endDate);

    setStartDate(parsedStartDate);
    setEndDate(parsedEndDate);
    setIsPresent(item?.endDate?.toLowerCase() === "present");
  }, [section, sectionIndex]);

  const getFormat = () => "MMM YYYY";

  const updateDates = (start, end, present) => {
    setStartDate(start);
    setEndDate(end);
    setIsPresent(present);

    dispatch(
      updateSection({
        type: sectionType,
        index: sectionIndex,
        data: {
          startDate: start ? start.format(getFormat()) : null,
          endDate: present ? "Present" : end ? end.format(getFormat()) : null,
        },
      })
    );
  };

  const handleStartDateChange = (date) => updateDates(date, endDate, isPresent);
  const handleEndDateChange = (date) => updateDates(startDate, date, false);
  const handlePresentClick = () => updateDates(startDate, null, true);

  // Helper function to format endDate for display
  const formatDateForDisplay = (date) =>
    date ? dayjs(date).format("MMM YYYY") : "";

  // Check if the style includes specific templates
  const isTemplate4or5 = ["resumeTemp4", "resumeTemp5"].some((temp) =>
    style?.includes(temp)
  );

  // console.log("style", style);
  // console.log("isTemplate4or5", isTemplate4or5);

  // Final placeholder color logic
  const placeholderColor = isTemplate4or5
    ? "white" // Apply white color for templates 4 or 5
    : style?.color || color || "black"; // Fallback logic

  // Disable dates logic for start and end date
  const disableStartDate = (current) => {
    if (!current) return false;
    const currentDayjs = dayjs(current.$d); // Explicitly wrap as a dayjs object
    return (
      endDate && currentDayjs.isAfter(endDate, "month") // Disable dates after the selected end date
      // currentDayjs.isAfter(dayjs()) // Optional: Disable future dates
    );
  };

  const disableEndDate = (current) => {
    if (!current) return false;
    const currentDayjs = dayjs(current.$d); // Explicitly wrap as a dayjs object
    return (
      startDate && currentDayjs.isSameOrBefore(startDate, "month") // Disable dates before or equal to the selected start date
      // currentDayjs.isAfter(dayjs()) // Optional: Disable future dates
    );
  };

  return (
    <div>
      <div className="flex items-center gap-1 date-wrap " onClick={handleClick}>
        {/* Start Date Picker */}
        <DatePicker
          value={startDate}
          format={getFormat()}
          picker="month"
          className="resume-date-picker ml-auto custom-placeholder"
          popupClassName="date-picker-calendar"
          onChange={handleStartDateChange}
          // placeholder="Start Date"
          disabledDate={disableStartDate} // Apply disable logic for start date
          placeholder="Start Date"
          style={{
            fontFamily,
            color: ["resumeTemp4", "resumeTemp5"].some((temp) =>
              style?.includes(temp)
            )
              ? "white"
              : "black",
          }}
        />
        <style>
          {`
          .custom-placeholder .ant-picker-input input::placeholder {
            color: ${placeholderColor} !important;
            opacity: 1; /* Ensure placeholder visibility */
          }
        `}
        </style>
        <div
          className="font-medium"
          style={{
            fontFamily,
            color: ["resumeTemp4", "resumeTemp5"].some((temp) =>
              style?.includes(temp)
            )
              ? "white"
              : "black",
          }}
        >
          -
        </div>
        <div className="end-date" onClick={handleClick}>
          {/* End Date Picker */}
          <DatePicker
            open={isDatePickerOpen} // Control the open state
            onOpenChange={(open) => setIsDatePickerOpen(open)} // Sync state
            value={isPresent ? null : endDate} // Value for DatePicker
            format={getFormat()}
            style={{
              fontFamily,
              color: ["resumeTemp4", "resumeTemp5"].some((temp) =>
                style?.includes(temp)
              )
                ? "white"
                : "black",
            }}
            picker="month"
            disabledDate={disableEndDate} // Apply disable logic for end date
            className="resume-date-picker ml-auto custom-placeholder"
            placeholder="End Date"
            popupClassName="date-picker-calendar"
            onChange={(date) => {
              setIsDatePickerOpen(false);
              handleEndDateChange(date);
            }}
            inputRender={(props) => (
              <input
                {...props}
                value={isPresent ? "Present" : formatDateForDisplay(endDate)} // Show "Present" dynamically
                readOnly
                onClick={() => setIsDatePickerOpen(true)} // Open DatePicker on click
                // style={{
                //   fontFamily,
                //   textAlign: "center",
                //   padding: "6px 10px",
                //   border: "1px solid #d9d9d9",
                //   borderRadius: "4px",
                //   cursor: "pointer",
                // }}
              />
            )}
            renderExtraFooter={() => (
              <Button
                className="btn-primary w-full"
                onClick={() => {
                  handlePresentClick();
                  setIsDatePickerOpen(false);
                }}
                text="Set to Present"
              />
            )}
          />
        </div>
        <style>
          {`
          .custom-placeholder .ant-picker-input input::placeholder {
            color: ${placeholderColor} !important;
            opacity: 1; /* Ensure placeholder visibility */
          }
        `}
        </style>
      </div>
    </div>
  );
};

export default DatePickerComponent;
