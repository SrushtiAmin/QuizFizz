import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo.png";
import signup from "../../assets/signup.png";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { setDoc, doc, getDocs, collection, query, where } from "firebase/firestore";
import { app, db } from "../../firebase";
import "./SignUp.css";

const auth = getAuth(app);

const SignUp = () => {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to validate email format
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const createUser = async (event) => {
    event.preventDefault();

    // ✅ Check if email is valid
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      // 🔍 Check Firestore for duplicate email, student ID, or phone number
      const usersRef = collection(db, "Users");
      const emailQuery = query(usersRef, where("email", "==", email));
      const idQuery = query(usersRef, where("studentId", "==", studentId));
      const phoneQuery = query(usersRef, where("phoneNumber", "==", phoneNumber));

      const emailSnapshot = await getDocs(emailQuery);
      const idSnapshot = await getDocs(idQuery);
      const phoneSnapshot = await getDocs(phoneQuery);

      if (!emailSnapshot.empty) {
        alert("This email is already in use with another account.");
        return;
      }
      if (!idSnapshot.empty) {
        alert("This Student ID is already taken.");
        return;
      }
      if (!phoneSnapshot.empty) {
        alert("This phone number is already registered.");
        return;
      }

      // ✅ If email, student ID & phone number are unique, create the user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          studentId,
          studentName,
          phoneNumber,
          email,
        });
        alert("User created successfully! Redirecting to Sign-In...");
        navigate("/signin");  // 🔥 Redirect to Sign-In page
      } else {
        alert("Error: User not found after signup.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="top-left-circle"></div>
      <div className="top-right-circle"></div>

      <div className="signup-header">
        <img src={logo} alt="QuizFizz Logo" className="logo-image" />
      </div>

      <div className="signup-main">
        <div className="signup-form">
          <h2>Sign Up</h2>
          <form onSubmit={createUser}>
            <div className="form-group">
              <label htmlFor="studentId">Student ID</label>
              <input
                onChange={(e) => setStudentId(e.target.value)}
                value={studentId}
                type="text"
                id="studentId"
                placeholder="Enter your Student ID"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="studentName">Student Name</label>
              <input
                onChange={(e) => setStudentName(e.target.value)}
                value={studentName}
                type="text"
                id="studentName"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                type="text"
                id="phoneNumber"
                placeholder="Enter your phone number"
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

          <div className="signin-link">
            <p>
              Already have an account? <Link to="/signin">Login</Link>
            </p>
          </div>
        </div>

        <div className="signup-illustration">
          <img src={signup} alt="Illustration" className="illustration-img" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
