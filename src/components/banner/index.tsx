// Banner.jsx
import React from "react";
import styles from "./style.module.scss";

const Banner = () => {
  return (
    <div className="discount-container">
      <div className="info">
        <div className="discount-heading">Massive Sale</div>
        <div className="discount-subheading">up to 75% off</div>
      </div>

      <div className="countdown-timer">
        <div className="group">
          <div className="value days">00</div>
          <div className="unit">Days</div>
        </div>

        <div className="group">
          <div className="value hours">00</div>
          <div className="unit">Hrs</div>
        </div>

        <div className="group">
          <div className="value minutes">00</div>
          <div className="unit">Min</div>
        </div>

        <div className="group">
          <div className="value seconds">00</div>
          <div className="unit">Sec</div>
        </div>
      </div>

      <a href="#" className="discount-btn">
        Learn More
      </a>

      <div className="close-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
};

export default Banner;
