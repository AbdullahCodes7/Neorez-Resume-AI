import React from "react";
import Navbar from "../components/layout/navbar";
import { Space, Table, Tag } from "antd";
import Footer from "../components/layout/footer";
import backline from "../assets/images/home/backLine.webp";

const Jobs = () => {
  const columns = [
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
    },
    {
      title: "Apply Method",
      dataIndex: "method",
      key: "method",
    },
  ];
  const data = [
    {
      key: "1",
      company: "Panelist",
      jobTitle: "Senior/Advanced Back End Developer Node.JS",
      method: "LinkedIn Easy Apply",
    },
    {
      key: "2",
      company: "Panelist",
      jobTitle: "Senior/Advanced Back End Developer Node.JS",
      method: "LinkedIn Easy Apply",
    },
    {
      key: "3",
      company: "Panelist",
      jobTitle: "Senior/Advanced Back End Developer Node.JS",
      method: "LinkedIn Easy Apply",
    },
    {
      key: "4",
      company: "Panelist",
      jobTitle: "Senior/Advanced Back End Developer Node.JS",
      method: "LinkedIn Easy Apply",
    },
    {
      key: "5",
      company: "Panelist",
      jobTitle: "Senior/Advanced Back End Developer Node.JS",
      method: "LinkedIn Easy Apply",
    },
    {
      key: "6",
      company: "Panelist",
      jobTitle: "Senior/Advanced Back End Developer Node.JS",
      method: "LinkedIn Easy Apply",
    },
    {
      key: "7",
      company: "Panelist",
      jobTitle: "Senior/Advanced Back End Developer Node.JS",
      method: "LinkedIn Easy Apply",
    },
  ];
  return (
    <>
      <div className="absolute top-1 -z-10">
        <img src={backline} alt="" />
      </div>
      <Navbar />
      {/* HEADING */}
      <div className="container">
        <div className="mb-[50px] md:mb-[100px] mt-7 md:mt-40">
          <h2 className="text-center darkGray font-bold font-OpenSan mb-2">
            My <span className="primary">Jobs</span>
          </h2>
        </div>
        <div className=" jobTable">
          <Table
            columns={columns}
            pagination={false}
            dataSource={data}
            rowHoverable={false}
            scroll={{
              x: 400,
            }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Jobs;
