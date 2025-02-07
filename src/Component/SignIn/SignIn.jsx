import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"; 
import signin from "../../assets/signin.png"; 
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../Firebase";
import './SignIn.css';

const auth = getAuth(app);

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Initialize navigate

  const signinUser = (event) => {
    event.preventDefault();  // Prevent default form submission behavior

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('Signin successful');
        navigate("/search"); // Redirect to the search page after successful login
      })
      .catch((error) => {
        console.log(error);
        alert('Login failed. Please check your credentials.');
      });
  };

  return (
    <div className="signin-container">
      {/* Semicircles */}
      <div className="top-left-circle"></div>
      <div className="top-right-circle"></div>
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
          <form onSubmit={signinUser}>
            <div className="form-group-signin">
              <label htmlFor="email">Email Address</label>
              <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="form-group-signin">
              <label htmlFor="password">Password</label>
              <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" id="password" placeholder="Enter your password" />
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
  )
};

export default SignIn;
