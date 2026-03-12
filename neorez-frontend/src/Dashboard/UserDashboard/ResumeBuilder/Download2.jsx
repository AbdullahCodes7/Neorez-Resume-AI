import React, { useEffect, useRef, useState } from "react";
import { Modal, Button } from "antd";
import { useSelector } from "react-redux";
import ReactToPrint from "react-to-print";
import html2pdf from "html2pdf.js";

const Download2 = ({
  isModalOpen,
  setIsDownloadModalOpen,
  handleCancel,
  resumeRef,
}) => {
  const resume = useSelector((state) => state.resume.sections);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [pdfBlob, setPdfBlob] = useState(null); // Store the generated blob for download

  // Function to handle page breaks
  const handlePageBreaks = () => {
    const sections = resumeRef.current.querySelectorAll(".resume-section");
    let currentHeight = 0;
    const pageHeight = 1120; // A4 page height in px

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      currentHeight += sectionHeight;

      // Reset currentHeight and insert a page break if the total height exceeds pageHeight
      if (currentHeight > pageHeight) {
        section.classList.add("resume-section-break");
        currentHeight = sectionHeight; // Start a new page after the current section
      } else {
        section.classList.remove("resume-section-break");
      }
    });
    handleCancel();
  };

  const handleDownload = () => {
    // Close the modal first
    handlePageBreaks();
    // Use a slight delay to ensure the modal is closed before ReactToPrint executes
    setTimeout(() => {
      const printTrigger = document.getElementById("download-resume-trigger");
      if (printTrigger) {
        printTrigger.click(); // Programmatically click the hidden ReactToPrint trigger
      }
      setIsDownloadModalOpen(false);
    }, 100);
  };

  return (
    <>
      <Modal
        centered
        title="Download Resume as PDF 2"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="download"
            type="primary"
            onClick={handleDownload} // Trigger the modal close and print
          >
            Download Resume
          </Button>,
          <ReactToPrint
            trigger={() => (
              <button
                id="download-resume-trigger"
                style={{ display: "none" }} // Hidden trigger button
              />
            )}
            content={() => resumeRef.current}
          />,
        ]}
        width={800}
      >
        {previewUrl && (
          <div style={{ textAlign: "center" }}>
            <img src={previewUrl} alt="PDF Preview" style={{ width: "100%" }} />
          </div>
        )}
      </Modal>
    </>
  );
};

export default Download2;
