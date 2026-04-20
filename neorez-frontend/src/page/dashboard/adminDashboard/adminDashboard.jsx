import { Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import Button from "../../../components/shared/button";
import remove from "../../../assets/icons/dashboard/remove.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;
  const user = useSelector((state) => state.user.userInfo);
  // console.log(user?.data?.role);

  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [isRemoveSubModalOpen, setIsRemoveSubModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const handleRemoveSub = (id) => {
    // console.log("id", id);
    setUserIdToDelete(id);
    setIsRemoveSubModalOpen(!isRemoveSubModalOpen);
  };
  // console.log(tableData);

  const columns = [
    {
      title: "User Name",
      dataIndex: "name",
      key: "user",
      render: (name) => name || "Not Available", // Show "Not Available" if name is missing
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => role || "Not Available", // Show "Not Available" if role is missing
    },
    {
      title: "Emails",
      dataIndex: "email",
      key: "emails",
      render: (email) => email || "Not Available", // Show "Not Available" if email is missing
    },
    {
      title: "Generations",
      dataIndex: "generation",
      key: "generation",
      render: (generation) => generation || "Not Available", // Show "Not Available" if generation is missing
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      key: "subscription",
      render: (subscription) => {
        if (subscription && subscription.length > 0) {
          // Assuming that subscription is an array with a plan
          return subscription.map((sub, index) => (
            <div key={index}>{`${sub.month} - $${sub.amount}`}</div>
          ));
        } else {
          return "Not Available"; // Show "Not Available" if subscription is empty or missing
        }
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div className="flex justify-center">
          <Button
            text="Remove"
            className="bg-blue-500 hover:bg-blue-600 text-white h-[30px] py-2 px-4 para-ex-small"
            onClick={() => handleRemoveSub(record._id)}
          />
        </div>
      ),
    },
  ];
  
  
  const handleUserInfo = async (req, res) => {
    try {
      const response = await axios.get(
        `${ApiUrl}/pricing-plan/${user?.data?.role}`
      );
      // console.log(response.data);
      setTableData(response.data);
    } catch (error) {
      // console.log(error.response);
    }
  };

  useEffect(() => {
    handleUserInfo();
  }, []);

  const handleDeleteUser = async (req, res) => {
    try {
      const response = await axios.post(
        `${ApiUrl}/pricing-plan/${userIdToDelete}`,
        { role: user?.data?.role }
      );

      console.log(response.data);
      setTableData((prevData) =>
        prevData.filter((user) => user._id !== userIdToDelete)
      );
      toast.success("User Deleted Successfully");

      setIsRemoveSubModalOpen(false);
    } catch (error) {
      console.log(error.response);
    }
  };
  const data = [
    {
      key: "1",
      user: "Jordan",
      role: "User",
      emails: "email@gmail.com",
      generation: "54",
      subscription: "Basic",
    },
    {
      key: "2",
      user: "Jordan",
      role: "User",
      emails: "email@gmail.com",
      generation: "89",
      subscription: "Premium",
    },
    {
      key: "3",
      user: "Jordan",
      role: "User",
      emails: "email@gmail.com",
      generation: "54",
      subscription: "Basic",
    },
    {
      key: "4",
      user: "Jordan",
      role: "User",
      emails: "email@gmail.com",
      generation: "89",
      subscription: "Premium",
    },
    {
      key: "5",
      user: "Jordan",
      role: "User",
      emails: "email@gmail.com",
      generation: "54",
      subscription: "Basic",
    },
    {
      key: "6",
      user: "Jordan",
      role: "User",
      emails: "email@gmail.com",
      generation: "89",
      subscription: "Premium",
    },
    {
      key: "7",
      user: "Jordan",
      role: "User",
      emails: "email@gmail.com",
      generation: "54",
      subscription: "Basic",
    },
    {
      key: "8",
      user: "Jordan",
      role: "User",
      emails: "email@gmail.com",
      generation: "89",
      subscription: "Premium",
    },
    {
      key: "9",
      user: "Jordan",
      role: "User",
      emails: "email@gmail.com",
      generation: "54",
      subscription: "Basic",
    },
    {
      key: "10",
      user: "Jordan",
      role: "User",
      emails: "email@gmail.com",
      generation: "89",
      subscription: "Premium",
    },
    {
      key: "11",
      user: "Jordan",
      role: "User",
      emails: "email@gmail.com",
      generation: "54",
      subscription: "Basic",
    },
  ];
  return (
    <>
      <div className="mb-7">
        {/* Heading */}
        <div className="pt-7  mb-[47px]">
          <h2 className="text-center darkGray font-light font-OpenSan">
            User
            <span className="font-bold"> Management</span>
          </h2>
        </div>

        {/* Main Content */}

        <div className=" jobTable">
          <Table
            columns={columns}
            pagination={false}
            dataSource={tableData}
            rowHoverable={false}
            scroll={{
              // x: 400,
              // y: 608,
              x: 800,
              y: 608,
            }}
            rowKey="_id"
          />
        </div>
      </div>

      {/* Remove Subscription */}
      <Modal
        open={isRemoveSubModalOpen}
        onCancel={handleRemoveSub}
        footer={null}
        centered
        // width="484px"
      >
        <div className="py-[10px] sm:py-[51px] px-[50px] modal-wrap flex flex-col items-center justify-center gap-[30px]">
          <img src={remove} alt="" />
          <div>
            <h2 className="text-center font-bold darkGray  font-OpenSan mb-2">
              Remove
              <span className="font-light"> User</span>
            </h2>
            <p className="text-center para-small darkGray font-OpenSan font-semibold opacity-40 ">
              You sure you want to remove?
            </p>
          </div>
          <div className="flex justify-center gap-[6px]">
            <Button
              text="Cancel"
              className="primaryBg white font-OpenSan para-text py-2 font-normal w-[105px]"
              onClick={handleRemoveSub}
            />
            <Button
              text="Remove"
              className="redBg white font-OpenSan para-text py-2 font-normal w-[105px]"
              onClick={handleDeleteUser}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdminDashboard;
