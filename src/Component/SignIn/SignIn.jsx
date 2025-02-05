import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"; 
import signin from "../../assets/signin.png"; 
import './SignIn.css'

function SignIn() {
  return (
    <div className="signin-container">
      {/* Header Section */}
      <div className="signin-header">
        <img src={logo} alt="QuizFizz Logo" className="signin-logo" />
      </div>

      {/* Main Content */}
      <div className="signin-main">
        {/* Left Side: Illustration */}
        <div className="signin-illustration">
          <img
            src={signin}
            alt="Illustration"
            className="illustration-img-signin"
          />
        </div>

        {/* Right Side: Sign-In Form */}
        <div className="signin-form">
          <h2>Sign In</h2>
          <p>Sign in with your email and password.</p>
          <form>
            <div className="form-group-signin">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="form-group-signin">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="forgot-password">
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit" className="signin-btn">
              Login
            </button>
          </form>
          <div className="signup-link">
            Not yet a member? <Link to="/signup">Sign up now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
