import React from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

function HeroSection() {
  return (
    <div className="hero-container">
      <img
        className="hero_img"
        src="/images/herosection.jpg"
        alt="Abstract dark portfolio hero background for Christos Michalopoulos"
      />
      <div className="hero-noise" />

      <div className="hero-content">
        <p className="hero-kicker">Full Stack Engineer / Patras, Greece</p>
        <h1>
          <span>Where</span>
          <span>Design Meets</span>
          <span>Engineering</span>
        </h1>
        <p className="hero-subtitle">
          Full Stack Engineer specializing in React, TypeScript, scalable web
          applications, and API-driven product experiences.
        </p>
        <p className="hero-copy">
          I design and build clean, responsive, and maintainable web
          applications with a strong focus on user experience, architecture,
          performance, and real business value.
        </p>
        <div className="hero-actions">
          <Link className="hero-action hero-action--primary" to="/work">
            View Work
          </Link>
          <Link className="hero-action hero-action--ghost" to="/contact">
            Start Project
          </Link>
        </div>
      </div>

      <div className="hero-panel" aria-hidden="true">
        <span className="hero-panel__line" />
        <span className="hero-panel__dot" />
        <span className="hero-panel__code">CM / 2026</span>
      </div>

      <div className="hero-marquee" aria-hidden="true">
        <span>React</span>
        <span>TypeScript</span>
        <span>APIs</span>
        <span>Product Systems</span>
      </div>
    </div>
  );
}

export default HeroSection;
