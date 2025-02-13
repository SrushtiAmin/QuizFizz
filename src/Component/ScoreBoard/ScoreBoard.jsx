import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Scoreboard.css";
import logo from "../../assets/logo.png";
import scoreImage from "../../assets/ScoreImage.png";

const Scoreboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve answers from location.state or sessionStorage
  const storedAnswers = sessionStorage.getItem("quizAnswers");
  const answers = location.state?.answers || (storedAnswers ? JSON.parse(storedAnswers) : []);
  
  // This is the total number of questions that were in the quiz
  const totalQuestions = answers.length;

  // Count only the correct answers
  const correctAnswers = answers.filter(
    (answer) => answer.selectedOption !== undefined && answer.isCorrect
  ).length;

  // Count attempted questions (for display purposes)
  const attemptedQuestions = answers.filter(
    (answer) => answer.selectedOption !== undefined
  ).length;

  // Store answers in sessionStorage for persistence
  useEffect(() => {
    if (answers.length > 0) {
      sessionStorage.setItem("quizAnswers", JSON.stringify(answers));
    }
  }, [answers]);

  // Handle Back Navigation (Redirect to Search Page only once)
  useEffect(() => {
    const handleBackButton = () => {
      navigate("/search", { replace: true });
    };
    window.history.replaceState({ redirected: true }, "");
    window.addEventListener("popstate", handleBackButton);
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);

  return (
    <div className="scoreboard-page">
      <header className="scoreboard-header">
        <img src={logo} alt="quiz-logo" className="scoreboard-logo" />
      </header>
      <main className="scoreboard-content">
        <div className="score-container">
          <div className="illustration-section">
            <img src={scoreImage} alt="achievement illustration" className="small-score-image" />
          </div>
          <div className="score-section">
            <h2>SCORE</h2>
            <div className="score-circle">
              <p>{correctAnswers} / {totalQuestions}</p>
            </div>
            <p className="answered-text">Attempted: {attemptedQuestions} / {totalQuestions}</p>
            <div className="button-container">
              <button className="home-button" onClick={() => navigate("/", { replace: true })}>
                Go to Home
              </button>
              <button className="leaderboard-button" onClick={() => navigate("/leaderboard")}>
                Leaderboard
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Scoreboard;