import React, { useState } from "react";
import logo from "../../assets/icons/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../shared/button";
import { Drawer, Radio, Space } from "antd";
import cross2 from "../../assets/icons/icons8-cross-25.png";
import menu from "../../assets/icons/menu.png";
import { scroller } from "react-scroll";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigateToHomeSection = (section, offset) => {
    setOpen(false);
    setTimeout(() => {
      scroller.scrollTo(section, {
        duration: 800,
        delay: 0,
        smooth: "ease",
        offset: offset,
      });
    }, 100);
  };
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const navigate = useNavigate();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  const handleShow = () => {
    showDrawer();
  };
  const handleLoginButton = () => {
    navigate("/signin");
  };
  const handleSignupButton = () => {
    navigate("/signup");
  };
  const handleDashboardButton = () => {
    console.log("clicked");
    if (user?.data.role === "user") {
      navigate("/dashboard");
    } else if (user?.data.role === "Admin") {
      navigate("/admin-dashboard");
    }
  };

  return (
    <>
      <div className="navWrapper">
        <div className="container">
          <div className="navItems flex justify-between items-center">
            <div className="navbar-logo">
              <NavLink to="/">
                <img className="logo" src={logo} alt="" />
              </NavLink>
            </div>
            <div className="navbarList">
              <ul className="flex-center gap-x-3 lg10:gap-x-8 font-OpenSan para-small font-semibold darkGray">
                <NavLink>
                  <li onClick={() => navigateToHomeSection("feature", -100)}>
                    AI Resume Builder
                  </li>
                </NavLink>
                <NavLink>
                  <li
                    onClick={() => navigateToHomeSection("coverLetter", -100)}
                  >
                    Cover Letter Creator
                  </li>
                </NavLink>
                {user?.data?.role === "user" || !user ? (
                  <NavLink>
                    <li onClick={() => navigateToHomeSection("pricing", -100)}>
                      Pricing
                    </li>
                  </NavLink>
                ) : null}

                {/* <NavLink>
                  <li>Tools</li>
                </NavLink> */}
                <NavLink>
                  <li onClick={() => navigateToHomeSection("blog", -100)}>
                    Resources
                  </li>
                </NavLink>
              </ul>
            </div>
            <div className="navbar-btns flex gap-x-2">
              {!user ? (
                <>
                  <Button
                    className="button btn-primary min-w-[60px] lg10:w-[75px]"
                    minHeight={39}
                    text="Login"
                    onClick={handleLoginButton}
                  />
                </>
              ) : (
                <Button
                  className="button btn-primary  p-2"
                  minHeight={39}
                  text="Go To Dashboard"
                  onClick={handleDashboardButton}
                />
              )}
              <Button
                className="button btn-secondary min-w-[60px] lg10:w-[81px]"
                minHeight={39}
                text="Sign up"
                onClick={handleSignupButton}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-navbar">
        <NavLink className="d-flex" to="/">
          <img className="mobileLogo" src={logo} alt="" />
        </NavLink>
        <button onClick={handleShow} className="menu-btn">
          <img src={menu} alt="Menu" />
        </button>

        <Drawer
          placement={placement}
          closable={true}
          onClose={onClose}
          open={open}
          key={placement}
        >
          <div>
            <div className="navbar-logo mb-8">
              <img className="logo" src={logo} alt="" />
            </div>
            <div className="navbarList">
              <ul className="flex flex-col gap-y-2 font-OpenSan para-small font-semibold darkGray">
                <NavLink>
                  <li className="text-[16px]">AI Resume Builder</li>
                  <hr className="mt-2 " />
                </NavLink>
                <NavLink>
                  <li className="text-[16px]">Cover Letter Creator</li>
                  <hr className="mt-2 " />
                </NavLink>
                {user?.data?.role === "user" ? (
                  <NavLink>
                    <li onClick={() => navigateToHomeSection("pricing", -100)}>
                      Pricing
                    </li>
                  </NavLink>
                ) : null}

                <NavLink>
                  <li className="text-[16px]">Tools</li>
                  <hr className="mt-2 " />
                </NavLink>
                <NavLink>
                  <li className="text-[16px] ">Resources</li>
                  <hr className="mt-2 " />
                </NavLink>
              </ul>
            </div>
            <div className="navbar-btns flex flex-col gap-3 mt-4">
              <Button
                className="button btn-primary text-[16px]"
                minWidth={75}
                minHeight={39}
                text="Login"
                onClick={handleLoginButton}
              ></Button>
              <Button
                className="button btn-secondary text-[16px]"
                minWidth={81}
                minHeight={39}
                text="Sign up"
                onClick={handleSignupButton}
              ></Button>
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default Navbar;
