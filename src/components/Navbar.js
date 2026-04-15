import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const navLinkClass = ({ isActive }) =>
  isActive ? "nav-links active" : "nav-links";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    setButton(window.innerWidth > 960);
  };

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
    return () => window.removeEventListener("resize", showButton);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <span className="navbar-logo__glitch">MD-MA☍</span>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                end
                to="/"
                className={navLinkClass}
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/work"
                className={navLinkClass}
                onClick={closeMobileMenu}
              >
                Work
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className={navLinkClass}
                onClick={closeMobileMenu}
              >
                About Me
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Contact
              </NavLink>
            </li>
          </ul>
          {button && <Button buttonStyle="btn--outline">Contact</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
