import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"; 
import signin from "../../assets/signin.png"; 
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app, db } from "../../Firebase";
import { getDoc, doc } from "firebase/firestore";
import google from "../../assets/google.png"; 
import './SignIn.css';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to handle user sign-in
  const signinUser = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🔍 Check Firestore if the user exists but DO NOT modify data
      const userDoc = await getDoc(doc(db, "Users", user.uid));

      if (!userDoc.exists()) {
        alert("User not found. Please sign up first.");
        return;
      }

      alert("User signed in successfully!");
      navigate("/search");

    } catch (err) {
      console.log(err);
      alert("Login failed. Please check your credentials.");
    }
  };

  // Function to sign in with Google
  const signinWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      // 🔍 Just check if the user exists, do not overwrite details
      const userRef = doc(db, "Users", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        alert("User not found. Please sign up first.");
        return;
      }

      alert("Signed in with Google successfully");
      navigate("/search");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="signin-container">
      <div className="top-left-circle"></div>
      <div className="top-right-circle"></div>
      
      <div className="signin-header">
        <img src={logo} alt="QuizFizz Logo" className="signin-logo" />
      </div>

      <div className="signin-main">
        <div className="signin-illustration">
          <img src={signin} alt="Illustration" className="illustration-img-signin" />
        </div>

        <div className="signin-form">
          <h2>Sign In</h2>
          {error && <p className="error-message">{error}</p>}
          
          <form onSubmit={signinUser}>
            <div className="form-group-signin">
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
            
            <div className="form-group-signin">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                id="password"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div className="forgot-password">
              <a href="#">Forgot password?</a>
            </div>
            
            <button type="submit" className="signin-btn">Login</button>
            <div className="signup-link">
                Not yet a member? <Link to="/signup">Sign up now</Link>
            </div>
          </form>
          
          <div className="or-section">
            <span>OR</span>
          </div>
          
          <button onClick={signinWithGoogle} className="google-signin-btn">
            <img src={google} alt="Google Icon" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
