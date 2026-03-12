import React, { useEffect, useRef, useState } from "react";
import { Modal, Button } from "antd";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";
import html2pdf from "html2pdf.js";
import ReactToPrint from "react-to-print";
const Download = ({
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
    const pageHeight = 1120; // A4 page height in px (adjust as necessary)

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      currentHeight += sectionHeight;

      // If the total height exceeds the page height, insert a page break after this section
      if (currentHeight > pageHeight) {
        section.classList.add("resume-section-break");
        currentHeight = sectionHeight; // Reset the height for the new page
      } else {
        section.classList.remove("resume-section-break");
      }
    });
    handleCancel();
  };

  const closeAndPrint = () => {
    setIsDownloadModalOpen(false); // Close the modal
  };

  // Generate the PDF Blob for preview
  const handlePreviewPdf = () => {
    // Apply page breaks before preview
    handlePageBreaks();

    const input = resumeRef.current;

    if (input) {
      // Generate the PDF using html2pdf and output as a blob
      html2pdf()
        .from(input)
        .set({
          margin: 0.5,
          filename: "resume.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 3 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .outputPdf("blob")
        .then((pdfBlob) => {
          // Create a URL from the blob and store it for later
          const pdfUrl = URL.createObjectURL(pdfBlob);
          setPdfBlob(pdfBlob); // Store the blob for download

          // Open the PDF preview in a new window/tab
          const previewWindow = window.open(pdfUrl, "_blank");
          previewWindow.document.title = "Resume Preview";

          // Create a download link in the new window
          const downloadLink = previewWindow.document.createElement("a");
          downloadLink.href = pdfUrl;
          downloadLink.download = "resume.pdf"; // Set the download file name
          downloadLink.textContent = "Click here to download the PDF";
          previewWindow.document.body.appendChild(downloadLink);
        })
        .catch((error) => {
          console.error("Error generating PDF preview:", error);
        });
    }
    handleCancel();
  };

  // Handle downloading the PDF
  const handleDownloadPdf = () => {
    // Apply page breaks before generating the final PDF
    handlePageBreaks(); // Ensure page breaks are applied

    if (pdfBlob) {
      const link = document.createElement("a");
      const url = URL.createObjectURL(pdfBlob);
      link.href = url;
      link.download = "resume.pdf"; // Trigger the download
      link.click();
      URL.revokeObjectURL(url); // Clean up after download
    } else {
      console.error("PDF blob is not available for download.");
    }
    handleCancel();
  };
  const downloadPDF = () => {
    const input = resumeRef.current;

    // Define options for the PDF generation
    const options = {
      margin: 0.5,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Generate the PDF from the HTML content
    html2pdf().from(input).set(options).save();
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
        title="Download Resume as PDF"
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
          // <Button key="preview" type="primary" onClick={handlePreviewPdf}>
          //   Preview PDF
          // </Button>,
          // <Button key="download" type="primary" onClick={handleDownloadPdf}>
          //   Download PDF
          // </Button>,

          <ReactToPrint
            trigger={() => (
              <button
                id="download-resume-trigger"
                style={{ display: "none" }} // Hidden trigger button
              />
            )}
            content={() => resumeRef.current}
          />,

          // <Button
          //   key="download"
          //   type="primary"
          //   download
          //   // onClick={handleDownloadPdf}
          // >
          //   Download PDF
          // </Button>,
          // <button onClick={downloadPDF}>Download the PDF</button>,
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

export default Download;
