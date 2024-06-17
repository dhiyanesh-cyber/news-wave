import axios from "axios";
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const email = window.localStorage.getItem("userEmail");
    console.log(email);
    axios
      .get(`http://localhost:3000/getUser/${email}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("Response data: ", JSON.stringify(res.data.userData));
        setUser({
          name: res.data.userData.name,
          email: res.data.userData.email,
        });
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const isLoggedIn = window.localStorage.getItem("isLoggedIn");

  function login(name, email) {
    window.localStorage.setItem("userEmail", email);
    axios
      .get(`http://localhost:3000/getUser/${email}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("Response data: ", JSON.stringify(res.data.userData));
        setUser({
          name: res.data.userData.name,
          email: res.data.userData.email,
        });
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const logout = () => {
    setUser({ name: "", email: "" });
    window.localStorage.removeItem("userEmail");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
