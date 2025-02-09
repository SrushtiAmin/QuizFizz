import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import google from "../../assets/google.png";
import logo from "../../assets/logo.png";
import signup from "../../assets/signup.png";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { setDoc, doc } from "firebase/firestore";
import { app, db } from '../../Firebase'; // Ensure db is imported from Firebase config
import './SignUp.css';

const auth = getAuth(app);
const googleprovider = new GoogleAuthProvider();

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const createUser = async (event) => {
        event.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;

            console.log(user);

            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    firstName: name,
                });
            }
            alert("User created successfully!");
            navigate("/search");
        } catch (error) {
            alert(error.message);
        }
    };

    const signupWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleprovider);
            const user = auth.currentUser;

            console.log(user);

            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    firstName: user.displayName || "Unknown",
                });
            }
            alert("Signed up with Google successfully!");
            navigate("/search");
        } catch (error) {
            alert(error.message);
        }
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
