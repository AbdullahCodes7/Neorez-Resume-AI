import React, { useState } from "react";
import { Modal, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { updateResumeName } from "../../../redux/resumeSlice2";
import { useSelector } from "react-redux";

const RenameResumeModal = ({
  setIsRenameResumeModalOpen,
  isRenameResumeModalOpen,
}) => {
  const resumeRename = useSelector((state) => state?.resume?.resumeName);
  const [newName, setNewName] = useState(resumeRename);
  const dispatch = useDispatch();
  const handleRename = () => {
    if (!newName.trim()) {
      message.error("Resume name cannot be empty!");
      return;
    }
    message.success(`Resume renamed to: ${newName}`);

    dispatch(updateResumeName(newName));
    setIsRenameResumeModalOpen(false);

    // onClose(newName);
  };

  const handleCancel = () => {
    setNewName(resumeRename);
    setIsRenameResumeModalOpen(false);
  };

  return (
    <Modal
      title="Rename Resume"
      open={isRenameResumeModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="rename" type="primary" onClick={handleRename}>
          Rename
        </Button>,
      ]}
    >
      <Input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Enter new resume name"
      />
    </Modal>
  );
};

export default RenameResumeModal;
