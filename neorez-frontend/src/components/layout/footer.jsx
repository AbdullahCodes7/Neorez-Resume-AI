import React from "react";
import logo from "../../assets/icons/logo.svg";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="footer-wrap">
        <div className="container">
          <div className="footer wrap">
            <div className="footer-content justify-between">
              <div className="gap-2 lg:gap-6 flex flex-col items-center justify-center sm:justify-start sm:items-start">
                <img src={logo} alt="" className="w-[120px] lg:w-[140px]" />
                <div>
                  <ul className="flex flex-wrap items-center lg:flex-row lg:items-center cursor-pointer gap-2 text-nowrap">
                    <Link to="/privacy-policy">
                      <li className="mb-0 lg:mb-auto para-small primary">
                        Privacy Policy
                      </li>
                    </Link>
                    <Link to="/terms-service">
                      <li className="mb-0 lg:mb-auto para-small primary">
                        Terms of Services
                      </li>
                    </Link>
                    <Link to="/contact">
                      <li className="mb-0 lg:mb-auto para-small primary">
                        Contact
                      </li>
                    </Link>
                  </ul>
                </div>
                <div>
                  <p className="darkGray para-small">
                    @{currentYear} NEOREZ. All Rights Reserved
                  </p>
                  <p className="darkGray para-small">
                    NEOREZ is a subsidiary of Comprehensive Search P.O. Box 2388
                    LaGrange, GA 30241 USA
                  </p>
                </div>
              </div>

              <hr className="block sm:hidden border-t border-gray-300 w-full " />
              <div className="max-w-[300px] md:max-w-[418.65px] flex flex-col justify-center items-center sm:justify-start sm:items-start">
                {/* <p className="text-center sm:text-left para-small darkGray leading-[30px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris lacus leo, feugiat id faucibus in, rhoncus eu nisi
                  consectetur adipiscing elit. Mauris lacus leo, feugiat id
                  faucibus in, rhoncus eu nisi
                </p> */}
                <div className="flex mt-4 gap-4">
                  <Icon
                    icon="ic:twotone-discord"
                    width="35px"
                    height="35px"
                    style={{ color: "#2A9DF4" }}
                  />
                  <Link to="https://www.linkedin.com/company/neorez" target="_blank">

                  <Icon
                    icon="mingcute:linkedin-fill"
                    width="35px"
                    height="35px"
                    style={{ color: "#2A9DF4" }}
                  />

</Link>
                  <Link to="https://www.youtube.com/@NeoRezAI" target="_blank">

                  <Icon
                    icon="line-md:youtube-filled"
                    width="35px"
                    height="35px"
                    style={{ color: "#2A9DF4" }}
                  />

</Link>


                  <Link to="https://www.instagram.com/neorez.ai" target="_blank">

                  <Icon
                    icon="uil:instagram"
                    width="35px"
                    height="35px"
                    style={{ color: "#2A9DF4" }}
                  />
                  </Link>
                  <Link to="https://www.facebook.com/neorezai" target="_blank">
                  <Icon
                    icon="ic:twotone-facebook"
                    width="35px"
                    height="35px"
                    style={{ color: "#2A9DF4" }}
                    
                  />
                  
                  </Link>
                  {/* <Link to="https://www.facebook.com/neorezai" target="_blank">

                  <Icon
                    icon="hugeicons:new-twitter"
                    width="35px"
                    height="35px"
                    style={{ color: "#2A9DF4" }}
                  /> */}
                </div>
              </div>
              <hr className="block sm:hidden border-t border-gray-300 w-full " />
              <div className="flex flex-col justify-center items-center sm:justify-start sm:items-start">
                <h3 className="darkGray font-semibold mb-5 ">Resources</h3>
                <ul className="flex flex-col justify-center items-center sm:justify-start sm:items-start">
                  <Link to="/resume">
                    <li className="para-small primary cursor-pointer mb-3">
                      Resume Links
                    </li>
                  </Link>
                  <Link to="/cover-letter">
                    <li className="para-small primary cursor-pointer mb-3 text-nowrap">
                      Cover Letter Links
                    </li>
                  </Link>
                  <Link to="/interview">
                    <li className="para-small primary cursor-pointer mb-3">
                      Interview Tips
                    </li>
                  </Link>
                  {/* <Link to="/my-jobs">
                    <li className="para-small primary cursor-pointer mb-3">
                      My Jobs
                    </li>
                  </Link> */}
                  {/* <Link to="/my-resume">
                    <li className="para-small primary cursor-pointer mb-3">
                      My Resumes
                    </li>
                  </Link> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
