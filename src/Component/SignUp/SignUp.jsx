import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import google from "../../assets/google.png";
import logo from "../../assets/logo.png";
import signup from "../../assets/signup.png";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../../Firebase'; // Ensure app is imported from your Firebase config
import './SignUp.css';

const auth = getAuth(app);
const googleprovider = new GoogleAuthProvider();

const SignUp = () => {
    const [name, setName] = useState("");  // Default value is ""
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Define navigate using useNavigate hook
    
    const createUser = (event) => {
        event.preventDefault();  // Prevents page reload
    
        createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
              alert("User created successfully");
              navigate("/search"); // Redirect to search page
          })
          .catch((error) => {
              alert(error.message); // Proper error handling
          });
    };

    const signupWithGoogle = () => {
        signInWithPopup(auth, googleprovider)
        .then(() => {
            alert("Signed up with Google successfully");
            navigate("/search"); // Redirect to search page
        })
        .catch((error) => {
            alert(error.message); // Error handling for Google sign-up
        });
    };

    return (
        <div className="signup-container">
            {/* Semicircles */}
            <div className="top-left-circle"></div>
            <div className="top-right-circle"></div>
            
            {/* Logo Section */}
            <div className="signup-header">
                <img src={logo} alt="QuizFizz Logo" className="logo-image" />
            </div>

            {/* Main Content */}
            <div className="signup-main">
                {/* Left Side: Signup Form */}
                <div className="signup-form">
                    <h2>Sign Up</h2>
                    <form onSubmit={createUser}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input 
                                onChange={(e) => setName(e.target.value)} 
                                value={name} 
                                type="text" 
                                id="name" 
                                placeholder="Enter your name" 
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input 
                                onChange={(e) => setEmail(e.target.value)} 
                                value={email} 
                                type="email" 
                                id="email" 
                                placeholder="Enter your email" 
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input  
                                onChange={(e) => setPassword(e.target.value)} 
                                value={password} 
                                type="password" 
                                id="password" 
                                placeholder="Enter your password" 
                                required
                                minLength={6}
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
                    <button onClick={signupWithGoogle} className="google-signup-btn">
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
};

export default SignUp;
