import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import AiWriteButton from "../../UserDashboard/aiWriteButton";
import add from "../../../assets/icons/dashboard/add.svg";


const CustomToolbar = () => {

  return (
    <>
      <div className="flex justify-center items-center absolute w-48 left-56 top-1 gap-2">
    <div className=" h-6 w-[0.7px] bg-[#C9C9C9]"></div>
    <div>
      <img src={add} alt="add icon" className="cursor-pointer" />
    </div>
    <div className="h-6 w-[0.7px] bg-[#C9C9C9]"></div>

    <div>
      <Icon
        icon="material-symbols:delete-outline"
        width="30px"
        height="30px"
        style={{ color: "black" }}
        className="cursor-pointer"
      />
    </div>
    <div className="h-6 w-[0.7px] bg-[#C9C9C9]"></div>
    <div>
      <AiWriteButton/>
    </div>
  </div>
      
    </>
  )
}

export default CustomToolbar
