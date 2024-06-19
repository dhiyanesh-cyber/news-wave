import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logout from "../Authentication/Logout";

const Navbar = () => {
  return (
    <div className="NavBarOuter">
      <div className="NavBar">
        <div className="NavItems">
          <Link to="/">Home</Link>
        </div>
        <div className="NavBrand">News Wave</div>
        <div className="NavAccount">
          <div className="userImgContainer">
            <img className="userImg" src={"/user.png"} alt="" />
            <div className={`authDiv`}>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <Logout />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
