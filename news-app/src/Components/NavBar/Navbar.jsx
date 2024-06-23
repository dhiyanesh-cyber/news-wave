import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logout from "../Authentication/Logout";
import { AuthContext } from "../../AuthProvider";

const Navbar = () => {

  const { user } = useContext(AuthContext);
  return (
    <div id="nav" className="NavBarOuter">
      <div className="NavBar">
        <div className="NavItems">
          <Link to="/">Home</Link>
        </div>
        <div className="NavBrand">News Wave</div>
        <div className="NavAccount">
          <div className="userImgContainer">
            <img onClick={() => { console.log(user); }} className="userImg" src={"/user.png"} alt="" />
            <div className={`authDiv`}>
              {user.name == "" ? <>
                <Link to="/login">Login</Link> <Link to="/register">Register</Link>
              </> : <Logout />}



            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
