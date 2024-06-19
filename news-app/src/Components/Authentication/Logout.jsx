import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  function handleLogout() {
    console.log("fuction called");
    window.localStorage.removeItem("userEmail");
    console.log("Removed useremail from local storage");
    window.location.reload();
    navigate("/login");
  }

  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => {
        handleLogout();
      }}
    >
      Logout
    </div>
  );
};

export default Logout;
