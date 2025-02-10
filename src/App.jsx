import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Component/LandingPage/LandingPage";
import SignUp from "./Component/SignUp/SignUp";
import SignIn from "./Component/SignIn/SignIn";
import Search from "./Component/Search/Search";
import ResultPage from "./Component/ResultPage/ResultPage";
import Quiz from "./Component/Quiz/Quiz";
import ScoreBoard from "./Component/ScoreBoard/ScoreBoard";
import LeaderBoard from "./Component/LeaderBoard/LeaderBoard"; // Import Leaderboard Component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/search" element={<Search />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/scoreboard" element={<ScoreBoard />} /> {/* Route for Scoreboard */}
        <Route path="/leaderboard" element={<LeaderBoard />} /> {/* Route for Leaderboard */}
      </Routes>
    </Router>
  );
}

export default App;
