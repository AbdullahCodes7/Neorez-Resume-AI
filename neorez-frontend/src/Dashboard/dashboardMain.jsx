import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardMain = ({ resumeRef, coverLetterRef }) => {
  const [activeTab, setActiveTab] = useState("Analyse Resume");

  // useEffect(() => {
  //   if (resumeRef.current) {
  //     // Do something with resumeRef, for example:
  //     console.log("resumeRef is available:", resumeRef.current);
  //   }
  // }, [resumeRef]);

  return (
    <>
      <main className="flex bg-[#F4F4F4] overflow-auto">
        <div className="w-[0px]  flex  items-center justify-center  h-[100vh] xl:w-[270px]">
          <Sidebar
            resumeRef={resumeRef}
            coverLetterRef={coverLetterRef}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
        <div className="pt-24  md:m-0  xl:pt-12  ps-4  page-dom pe-4 xl:pe-0 relative">
          <Outlet context={{ activeTab, setActiveTab }} />
        </div>
      </main>
    </>
  );
};

export default DashboardMain;
