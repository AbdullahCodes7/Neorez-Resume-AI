import React from "react";
import { Modal, Button } from "antd";
import html2pdf from "html2pdf.js";
import ReactToPrint from "react-to-print";

const Download = ({
  isModalOpen,
  handleCancel,
  setIsDownloadCoverModalOpen,
  coverLetterRef,
}) => {
  const handleDownloadPdf = () => {
    const input = coverLetterRef.current;

    if (!input) {
      console.error("coverLetterRef is not available.");
      return;
    }

    // Define options for the PDF generation
    const options = {
      margin: 0.5,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 1.0 }, // High-quality rendering
      html2canvas: {
        scale: 3, // Higher scale for sharp rendering
        useCORS: true, // Ensure cross-origin images load properly
      },
      jsPDF: {
        unit: "in",
        format: "letter", // Standard letter (A4 can be used too)
        orientation: "portrait", // Force portrait mode
      },
    };

    // Generate the PDF and save it
    html2pdf()
      .from(input)
      .set(options)
      .outputPdf("blob") // Output as a blob
      .then((pdfBlob) => {
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl); // Open the PDF in a new tab
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
    handleCancel();
  };

  const handleDownload = () => {
    // Close the modal first

    // Use a slight delay to ensure the modal is closed before ReactToPrint executes
    setTimeout(() => {
      const printTrigger = document.getElementById(
        "download-coverletter-trigger"
      );
      if (printTrigger) {
        printTrigger.click(); // Programmatically click the hidden ReactToPrint trigger
      }
      setIsDownloadCoverModalOpen(false);
    }, 100);
  };

  return (
    <Modal
      centered
      title="Download Cover Letter in Portrait Format"
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
          Download Cover Letter
        </Button>,
        // <Button key="download" type="primary" onClick={handleDownloadPdf}>
        //   Download PDF
        // </Button>,

        <ReactToPrint
          trigger={() => (
            <button
              id="download-coverletter-trigger"
              style={{ display: "none" }} // Hidden trigger button
            />
          )}
          content={() => coverLetterRef.current}
        />,

        // <ReactToPrint
        //   trigger={() => (
        //     <Button key="print" type="primary">
        //       Download
        //     </Button>
        //   )}
        //   content={() => coverLetterRef.current}
        //   onClick={handleCancel}
        // />,
      ]}
      width={800}
    >
      <p>
        Click the button to download your Cover Letter as a PDF in portrait
        format.
      </p>
    </Modal>
  );
};

export default Download;
