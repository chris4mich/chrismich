import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <div className="footer-container">
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              <img
                className="social-logo__img"
                src="/images/logo.png"
                alt="Christos Michalopoulos CM logo"
              />
            </Link>
          </div>
          <small className="website-rights">
            Chris Mich (c) {getCurrentYear()}
          </small>
          <div className="social-icons">
            <a
              className="social-icon-link"
              href="mailto:chrs.mich@gmail.com"
              aria-label="Email"
            >
              <i className="fas fa-envelope" />
            </a>
            <a
              className="social-icon-link"
              href="https://www.linkedin.com/in/christos4michalopoulos/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin" />
            </a>
            <a
              className="social-icon-link"
              href="https://github.com/chris4mich"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <i className="fab fa-github" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
