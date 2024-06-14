import React from "react";
import "./CardComponent.css";

const CardComponent = (props) => {
  const title = props.title;
  const description = props.description;
  return (
    <div className="Custom-card">
      <div className="container-card bg-blue-box">
        <defs>
          <linearGradient
            id="paint0_linear_1366_4565"
            x1="0"
            y1="0"
            x2="120"
            y2="120"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.7"></stop>
            <stop offset="0.505208" stopColor="white" stopOpacity="0"></stop>
            <stop offset="1" stopColor="white" stopOpacity="0.7"></stop>
          </linearGradient>
          <radialGradient
            id="paint1_radial_1366_4565"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(60 60) rotate(96.8574) scale(122.674 149.921)"
          >
            <stop stopColor="white"></stop>
            <stop offset="1" stopColor="#363437" stopOpacity="0.2"></stop>
          </radialGradient>
        </defs>
        <p className="card-title">{title}</p>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default CardComponent;
