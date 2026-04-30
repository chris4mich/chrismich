import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

function HeroSection() {
  const panelClickTimesRef = useRef([]);

  const handleSecretPanelClick = () => {
    const now = Date.now();

    panelClickTimesRef.current = [...panelClickTimesRef.current, now].filter(
      (clickTime) => now - clickTime <= 3000
    );

    if (panelClickTimesRef.current.length >= 5) {
      panelClickTimesRef.current = [];
      window.dispatchEvent(new CustomEvent("cm:terminal-mode"));
    }
  };

  return (
    <div className="hero-container">
      <picture className="hero-picture">
        <source
          media="(max-width: 768px)"
          srcSet="/images/herosection-mobile.jpg"
          type="image/jpeg"
        />
        <img
          className="hero_img"
          src="/images/herosection.jpg"
          alt="Abstract dark portfolio hero background for Christos Michalopoulos"
          aria-hidden="true"
          decoding="async"
          fetchPriority="high"
          loading="eager"
        />
      </picture>
      <div className="hero-noise" aria-hidden="true" />

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
        <span
          className="hero-panel__code"
          title="System access"
          onClick={handleSecretPanelClick}
        >
          CM / 2026
        </span>
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
