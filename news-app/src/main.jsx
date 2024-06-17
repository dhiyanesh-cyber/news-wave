import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="mainDiv">
    <AuthProvider>
      <App />
    </AuthProvider>
  </div>,
);
