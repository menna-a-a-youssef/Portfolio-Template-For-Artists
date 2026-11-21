import React from "react";
import FooterCSS from "../css/Footer.module.css";
import data from "../Data";

function Footer() {
  const socialLinks = Object.entries(data.SocialLinks || {}).filter(
    ([, url]) => typeof url === "string" && url.trim() !== "",
  );

  return (
    <footer className={FooterCSS.footer}>
      <div className={FooterCSS.container}>
        {socialLinks.length > 0 && (
          <nav className={FooterCSS.socialLinks} aria-label="Social media">
            {socialLinks.map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {platform}
              </a>
            ))}
          </nav>
        )}
        <p>{data.FooterText}</p>
        {/* <p style={{ marginTop: "5px", fontSize: "12px" }}>
          Designed and developed by{" "}
          <a
            href="https://github.com/rakshixh"
            style={{ textDecoration: "none", color: "#F4A261" }}
          >
            rakshixh
          </a>
        </p> */}
      </div>
    </footer>
  );
}

export default Footer;
