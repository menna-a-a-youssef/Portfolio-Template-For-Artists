import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import notFoundImage from "../assets/others/404.svg";

function NotFound() {
  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.content}>
        <img src={notFoundImage} alt="Not Found" style={styles.image} />
        <h1 style={styles.title}>Page Not Found</h1>
        <p style={styles.message}>
          Oops! The page you are looking for does not exist. It might have been
          moved or deleted.
        </p>
        <Link to="/" style={styles.homeLink}>
          Go back to Home
        </Link>
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    textAlign: "center",
    padding: "0px",
  },
  image: {
    maxWidth: "100%",
    height: "200px",
  },
  title: {
    fontSize: "var(--font-size-2xl)",
    margin: "var(--space-5) 0",
    color: "var(--color-text)",
  },
  message: {
    fontSize: "var(--font-size-md)",
    color: "var(--color-text-muted)",
    marginBottom: "var(--space-5)",
  },
  homeLink: {
    textDecoration: "none",
    color: "var(--color-primary-hover)",
    fontSize: "var(--font-size-md)",
    fontWeight: "bold",
    marginTop: "var(--space-5)",
  },
};

export default NotFound;
