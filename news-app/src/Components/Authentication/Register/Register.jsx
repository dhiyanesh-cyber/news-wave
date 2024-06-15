import React, { useState } from "react";
import "../Authentication.css";
import { Link } from "react-router-dom";
import axios from "axios";
import validator from "validator";

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
    if (
      !userData.name ||
      !userData.email ||
      !userData.password ||
      !userData.confirmPassword
    ) {
      alert("Details not entered !!");
    } else if (!validateEmail()) {
      alert("Please enter a valid email address.");
    } else if (!validatePassword()) {
      alert(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
      );
    } else if (userData.password !== userData.confirmPassword) {
      alert("Password does not match.");
    } else {
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
    }
  }

  function validateEmail() {
    if (!validator.isEmail(userData.email)) {
      return false;
    }
    return true;
  }

  function validatePassword() {
    const password = userData.password;
    if (password.length < 8) {
      return false;
    }
    if (!/[a-z]/.test(password)) {
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      return false;
    }
    if (!/\d/.test(password)) {
      return false;
    }
    return true;
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
