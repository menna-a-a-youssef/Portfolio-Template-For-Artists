import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import HeaderCSS from "../css/Header.module.css";
import data from "../Data";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("waspacial-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const handleLinkClick = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const browserTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const followBrowserTheme = (event) => {
      if (!localStorage.getItem("waspacial-theme-explicit")) {
        setTheme(event.matches ? "dark" : "light");
      }
    };

    browserTheme.addEventListener("change", followBrowserTheme);
    return () => browserTheme.removeEventListener("change", followBrowserTheme);
  }, []);

  useEffect(() => {
    const closeMenuOnWideScreen = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    window.addEventListener("resize", closeMenuOnWideScreen);
    return () => window.removeEventListener("resize", closeMenuOnWideScreen);
  }, []);

  const navLinkClass = ({ isActive }) =>
    isActive ? `${HeaderCSS.navLink} ${HeaderCSS.activeNavLink}` : HeaderCSS.navLink;

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("waspacial-theme", nextTheme);
    localStorage.setItem("waspacial-theme-explicit", "true");
    setTheme(nextTheme);
  };

  return (
    <header className={HeaderCSS.container}>
      <Link
        to="/"
        className={HeaderCSS.brand}
        onClick={handleLinkClick}
        aria-label="Waspacial Art home"
      >
        <img
          className={HeaderCSS.logo}
          src={theme === "light" ? "/favicon-light.svg" : "/favicon-dark.svg"}
          alt=""
        />
        <span className={HeaderCSS.brandName}>{data.HeaderTitle}</span>
      </Link>

      <div className={HeaderCSS.headerActions}>
        <button
          type="button"
          className={HeaderCSS.themeToggle}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          aria-pressed={theme === "dark"}
          onClick={toggleTheme}
        >
          <span aria-hidden="true">{theme === "dark" ? "☀️" : "🌙"}</span>
        </button>
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
            color={theme === "dark" ? "#eee8f7" : "#2d2638"}
          />
        </button>
      </div>

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
