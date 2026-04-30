import React, { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

const LONG_PRESS_DURATION = 1200;

function isTouchLikeDevice() {
  if (typeof window === "undefined") {
    return false;
  }

  const coarsePointer = window.matchMedia
    ? window.matchMedia("(hover: none) and (pointer: coarse)").matches
    : false;

  return coarsePointer || navigator.maxTouchPoints > 0;
}

function HeroSection() {
  const panelClickTimesRef = useRef([]);
  const longPressTimerRef = useRef(null);
  const suppressNextClickRef = useRef(false);

  const clearLongPressTimer = useCallback(() => {
    if (longPressTimerRef.current) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  const handleSecretPanelClick = (event) => {
    if (suppressNextClickRef.current) {
      suppressNextClickRef.current = false;
      event.preventDefault();
      return;
    }

    if (isTouchLikeDevice()) {
      return;
    }

    const now = Date.now();

    panelClickTimesRef.current = [...panelClickTimesRef.current, now].filter(
      (clickTime) => now - clickTime <= 3000
    );

    if (panelClickTimesRef.current.length >= 5) {
      panelClickTimesRef.current = [];
      window.dispatchEvent(new CustomEvent("cm:terminal-mode"));
    }
  };

  const handleSecretPanelPointerDown = (event) => {
    if (!isTouchLikeDevice() || event.pointerType === "mouse") {
      return;
    }

    clearLongPressTimer();

    longPressTimerRef.current = window.setTimeout(() => {
      suppressNextClickRef.current = true;
      window.dispatchEvent(new CustomEvent("cm:mobile-mode"));
      clearLongPressTimer();
    }, LONG_PRESS_DURATION);
  };

  const cancelSecretPanelLongPress = () => {
    clearLongPressTimer();
  };

  useEffect(() => {
    const handleScroll = () => {
      clearLongPressTimer();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearLongPressTimer();
    };
  }, [clearLongPressTimer]);

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
          onPointerDown={handleSecretPanelPointerDown}
          onPointerUp={cancelSecretPanelLongPress}
          onPointerCancel={cancelSecretPanelLongPress}
          onPointerLeave={cancelSecretPanelLongPress}
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
