import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import HeaderCSS from "../css/Header.module.css";
import data from "../Data";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const closeMenuOnWideScreen = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    window.addEventListener("resize", closeMenuOnWideScreen);
    return () => window.removeEventListener("resize", closeMenuOnWideScreen);
  }, []);

  const navLinkClass = ({ isActive }) =>
    isActive ? `${HeaderCSS.navLink} ${HeaderCSS.activeNavLink}` : HeaderCSS.navLink;

  return (
    <header className={HeaderCSS.container}>
      <Link
        to="/"
        className={HeaderCSS.brand}
        onClick={handleLinkClick}
        aria-label="Waspacial Art home"
      >
        <picture>
          <source
            media="(prefers-color-scheme: light)"
            srcSet="/favicon-light.svg"
          />
          <img
            className={HeaderCSS.logo}
            src="/favicon-dark.svg"
            alt=""
          />
        </picture>
        <span className={HeaderCSS.brandName}>{data.HeaderTitle}</span>
      </Link>

      <button
        type="button"
        className={HeaderCSS.hamburger}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
      >
        <Hamburger
          toggled={menuOpen}
          toggle={setMenuOpen}
          size={24}
          color="#eee8f7"
        />
      </button>

      <nav
        id="primary-navigation"
        className={`${HeaderCSS.nav} ${menuOpen ? HeaderCSS.navOpen : ""}`}
        aria-label="Primary navigation"
      >
        <ul>
          <li>
            <NavLink to="/" end className={navLinkClass} onClick={handleLinkClick}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navLinkClass} onClick={handleLinkClick}>
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
