import React, { useState } from "react";
import "../Authentication.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    const value = e.target.value;
    setUserData({
      ...userData,
      [e.target.name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("user Data: ", JSON.stringify(userData));
    if (userData.password === userData.confirmPassword) {
      axios
        .post(
          "http://localhost:3000/register",
          {
            name: userData.name,
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
            // Registration successful, display a success message
            alert(res.data.message);
          }
        })
        .catch((error) => {
          if (error.response.status === 409) {
            // User already exists, display an error message
            alert(error.response.data.message);
          } else {
            // Generic error, display an error message
            alert("An error occurred while processing the request.");
          }
        });
    } else {
      alert("Password does not match.");
    }
  }

  return (
    <div className="AuthticationMainDiv">
      <div className="form signup">
        <div className="form-content">
          <header>Register</header>
          <form action="#">
            <div className="field input-field">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="field input-field">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="field input-field">
              <input
                type="password"
                placeholder="Create password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="password"
              />
            </div>
            <div className="field input-field">
              <input
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
                className="password"
              />
              <i className="bx bx-hide eye-icon"></i>
            </div>
            <div className="field button-field">
              <button onClick={handleSubmit}>Signup</button>
            </div>
          </form>
          <div className="form-link">
            <span>
              Already have an account?{" "}
              <Link to="/login" className="link login-link">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
