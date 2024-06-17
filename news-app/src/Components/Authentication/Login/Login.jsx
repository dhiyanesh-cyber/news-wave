import React, { useContext, useState } from "react";
import "../Authentication.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../AuthProvider";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [userData, setUserData] = useState({});

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
          console.log();
          login(userData.name, userData.email);
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          alert(error.response.data.message);
        } else {
          alert("An error occurred while processing the request.");
        }
      });
  }

  return (
    <div className="AuthticationMainDiv">
      <div className="form login">
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
    </div>
  );
};

export default Login;
