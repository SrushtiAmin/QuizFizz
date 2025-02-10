import { useLocation, useNavigate } from "react-router-dom";
import Result from "../../assets/Result.png"; // Quiz illustration image
import Logo from "../../assets/Logo.png"; // Logo image
import './ResultPage.css';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { searchQuery, difficulty } = location.state || {};

  if (!searchQuery || !difficulty) {
    navigate("/", { replace: true });
    return null;
  }

  const handleStartQuiz = () => {
    // Navigate to QuizPage with searchQuery and difficulty
    navigate("/quiz", { state: { searchQuery, difficulty } });
  };

  return (
    <div className="result-page">
      <header className="header-search-result">
        <img src={Logo} alt="Logo" className="logo-result" />
      </header>
      <main className="main-content-result">
        <div className="content-wrapper">
          <img src={Result} alt="Quiz Illustration" className="result-illustration" />

          <div className="quiz-info">
            <h2 className="result-title">SEARCH THE TOPIC HERE</h2>
            <p className="quiz-text">
              You want quiz for: <strong>{searchQuery}</strong>
            </p>
            <p className="quiz-text">
              Difficulty Level: <strong>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</strong>
            </p>
            <p className="quiz-text">Then click on the Start Quiz button!</p>
            <div className="btn-result">
              <button className="start-quiz-button" onClick={handleStartQuiz}>
                Start Quiz
              </button>
              <button className="back-button" onClick={() => navigate(-1)}>
                Back to Search
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultPage;
