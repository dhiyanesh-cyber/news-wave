import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [accClicked, setAccClicked] = useState(false);

  return (
    <div className="NavBarOuter">
      <div className="NavBar">
        <div className="NavItems">
          <Link to="/">Home</Link>
        </div>
        <div className="NavBrand">News Wave</div>
        <div className="NavAccount">
          <div className="userImgContainer">
            <img
              onClick={() => {
                setAccClicked(!accClicked);
                console.log(accClicked);
              }}
              className="userImg"
              src={accClicked ? "/user-blue.png" : "/user.png"}
              alt=""
            />
            <div className={`authDiv ${accClicked ? "show" : "hide"}`}>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
