import React, { useEffect, useState } from "react";
import "../../style/introScreen.css";

const IntroScreen = ({ onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const brandName = "Badam Mart";

  useEffect(() => {
    // Start fade out sequence at 5 seconds
    const fadeTimeout = setTimeout(() => {
      setIsFadingOut(true);
    }, 5000);

    // Call onComplete after the fade out transition completes (800ms)
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 5800);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 400); // Faster skip fade out
  };

  return (
    <div className={`intro-overlay ${isFadingOut ? "fade-out" : ""}`}>
      {/* Subtle particle background elements for depth */}
      <div className="intro-particles">
        <div className="particle p1"></div>
        <div className="particle p2"></div>
        <div className="particle p3"></div>
      </div>

      <div className="intro-content">
        <div className="logo-wrapper">
          <div className="logo-glow"></div>
          <img src="./logo-new.png" alt="Sudheer Mart" className="intro-logo" />
        </div>

        <h1 className="intro-brand">
          {brandName.split("").map((char, index) => (
            <span
              key={index}
              className="intro-letter"
              style={{ "--index": index }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <p className="intro-subtitle">PREMIUM ORGANIC GROCERY</p>

        {/* Dot loading indicator */}
        <div className="dot-loader">
          <span className="dot" style={{ "--i": 0 }}></span>
          <span className="dot" style={{ "--i": 1 }}></span>
          <span className="dot" style={{ "--i": 2 }}></span>
          <span className="dot" style={{ "--i": 3 }}></span>
          <span className="dot" style={{ "--i": 4 }}></span>
        </div>

        {/* FSSAI Certification Badge — below dot loader */}
        <div className="intro-fssai-badge">
          <span className="intro-fssai-label">Certified By</span>
          <img
            src="./Screenshot 2026-06-05 165026.png"
            alt="FSSAI Certified"
            className="intro-fssai-img"
          />
        </div>
      </div>

      {/* Skip Intro button with clean design */}
      <button className="skip-btn" onClick={handleSkip}>
        Skip Intro
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="skip-icon"
        >
          <path d="M5 4l10 8-10 8V4z"></path>
          <path d="M19 5v14"></path>
        </svg>
      </button>

    </div>
  );
};

export default IntroScreen;
