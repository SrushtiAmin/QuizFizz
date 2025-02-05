import { Link } from "react-router-dom";
import google from "../../assets/google.png";
import logo from "../../assets/logo.png";
import signup from "../../assets/signup.png";
import './SignUp.css'

function SignUp() {
  return (
    <div className="signup-container">
      {/* Logo Section */}
      <div className="signup-header">
        <img src={logo} alt="QuizFizz Logo" className="logo-image" />
      </div>

      {/* Main Content */}
      <div className="signup-main">
        {/* Left Side: Signup Form */}
        <div className="signup-form">
          <h2>Sign Up</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>

          {/* Link to Sign In */}
          <div className="signin-link">
            <p>
              Already have an account? <Link to="/signin">Login</Link>
            </p>
          </div>

          {/* Or Section */}
          <div className="or-section">
            <span>OR</span>
          </div>

          {/* Google Sign-Up */}
          <button className="google-signup-btn">
            <img src={google} alt="Google Icon" />
            Sign up with Google
          </button>
        </div>

        {/* Right Side: Illustration */}
        <div className="signup-illustration">
          <img
            src={signup}
            alt="Illustration"
            className="illustration-img"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
