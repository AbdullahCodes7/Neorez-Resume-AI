import React, { useState, useEffect } from "react";
import { Modal, Table, Button } from "antd"; // Using Ant Design for table and modal

const SavedResumeModal = ({ isOpen, onClose }) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch resumes when the modal is opened
  useEffect(() => {
    if (isOpen) {
      fetchResumes();
    }
  }, [isOpen]);

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/resumes"); // Update with your API endpoint
      const data = await response.json();
      setResumes(data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
    setLoading(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "sections",
      key: "name",
      render: (sections) => sections.find((s) => s.type === "profile")?.name,
    },
    {
      title: "Email",
      dataIndex: "sections",
      key: "email",
      render: (sections) => sections.find((s) => s.type === "profile")?.email,
    },
    {
      title: "Contact Number",
      dataIndex: "sections",
      key: "contactNumber",
      render: (sections) =>
        sections.find((s) => s.type === "profile")?.contactNumber,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button onClick={() => handleViewResume(record)} type="primary">
          View
        </Button>
      ),
    },
  ];

  const handleViewResume = (resume) => {
    // Display full resume details in another modal or page
    // console.log("Selected Resume:", resume);
  };

  return (
    <Modal
      title="Saved Resumes"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={800}
    >
      <Table
        dataSource={resumes}
        columns={columns}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </Modal>
  );
};

export default SavedResumeModal;
