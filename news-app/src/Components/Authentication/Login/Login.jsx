import React, { useContext, useState } from "react";
import "../Authentication.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../AuthProvider";
import EmailUnverifiedComp from "../EmailUnverifiedComp";

const Login = () => {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [showEmailVerificationPopup, setShowEmailVerificationPopup] = useState(false);

  function handleChange(e) {
    const value = e.target.value;
    setUserData({
      ...userData,
      [e.target.name]: value,
    });
  }

  function handleLogin(e) {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3000/login",
        {
          email: userData.email,
          password: userData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then((res) => {
        console.log("Res status: ", res.status);
        if (res.status === 201) {
          alert(res.data.message);
          navigate('/')
          console.log();
          login(userData.name, userData.email);
        }
      })
      .catch((error) => {
        if (error.response.status === 509) {
          setShowEmailVerificationPopup(true)
          document.getElementById('login').classList.add("blur")
          document.getElementById('nav').classList.add('blur')
        } else if (error.response.status === 409) {
          alert(error.response.data.message)
        } else {
          alert("An error occurred while processing the request.");
        }
      });
  }

  return (
    <div className="AuthticationMainDiv">

      <div id="login" className="form login">
        <div className="form-content">
          <header>Login</header>
          <form action="#">
            <div className="field input-field">
              <input
                type="email"
                placeholder="Email"
                className="input"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>
            <div className="field input-field">
              <input
                type="password"
                placeholder="Password"
                className="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
              <i className="bx bx-hide eye-icon"></i>
            </div>
            <div className="form-link">
              <a href="#" className="forgot-pass">
                Forgot password?
              </a>
            </div>
            <div className="field button-field">
              <button onClick={handleLogin}>Login</button>
            </div>
          </form>
          <div className="form-link">
            <span>
              Don't have an account?{" "}
              <Link to="/register" className="link signup-link">
                Signup
              </Link>
            </span>
          </div>
        </div>
      </div>
      {showEmailVerificationPopup && <EmailUnverifiedComp onClose={() => {
        setShowEmailVerificationPopup(false)
        document.getElementById('login').classList.remove("blur")
        document.getElementById('nav').classList.remove("blur")
      }} id='emailUnverified' message="Email unverified" userData={userData} />}

    </div>
  );
};

export default Login;
