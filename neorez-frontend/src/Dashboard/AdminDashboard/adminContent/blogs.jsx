import React from 'react'
import Blog from '../../../components/home/blog'
import Button from '../../../components/shared/button'

const Blogs = () => {
  return (
    <div>
       <div className="pb-7">
          {/* Heading */}
          <div className="pt-7  mb-[47px]">
            <h2 className="text-center darkGray font-light font-OpenSan">
              Blogs
              <span className="font-bold"> Section</span>
            </h2>
          </div>
          <div className="bg-white rounded-2xl py-[30px] px-0 sm:px-[30px]">
            <div className="flex flex-col items-center justify-center gap-[80px]">
              <Blog isAdminContent={true} />
              <div className="mt-5 flex items-center gap-2 justify-center ">
                <Button
                  text="Discard"
                  className="btn-outline !h-[41px]"
                  minWidth={108}
                  // minHeight={36}
                />
                <Button
                  text="Save Changes"
                  className="btn-primary"
                  minWidth={145}
                  minHeight={36}
                />
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Blogs
