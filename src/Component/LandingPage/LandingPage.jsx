import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./LandingPage.css";
import { useState } from "react";

function LandingPage() {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <div className="landing-container">
      {/* Sidebar Navigation */}
      <div className={`sidenav ${navOpen ? "open" : ""}`}>
        <button className="closebtn" onClick={toggleNav}>
          &times;
        </button>
        <Link to="/about">About</Link>
        <Link to="/account">Account</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </div>

      <div className="container">
        {/* Header Section */}
        <div className="header">
          <span className="menu-icon" onClick={toggleNav}>
            &#9776;
          </span>

          <div className="auth-buttons">
            <Link to="/signin" className="btn">
              Sign In
            </Link>
            <Link to="/signup" className="btn">
              Sign Up
            </Link>
          </div>
        </div>

        {/* Logo Section */}
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>

        {/* Main Content Section */}
        <div className="main-content">
          <h1>AI QUIZ MAKER</h1>
          <p>Experience the Power of AI-Powered Quizzes</p>
        </div>

        {/* Steps Section */}
        <div className="steps">
          <h2>
            Here&apos;s <span>how it works</span>
          </h2>
          <p>
            <strong>Step 1:</strong> Click <span>&quot;Try the AI Quiz&quot;</span> to get started.
          </p>
          <p>
            <strong>Step 2:</strong> Describe the type of quiz you want.
          </p>
          <p>
            <strong>Step 3:</strong> That&apos;s it! Now AI will generate the quiz.
          </p>
        </div>

        {/* Call to Action Section */}
        <div className="cta">
          <Link to="/signin" className="cta-btn">
            Try the AI Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
