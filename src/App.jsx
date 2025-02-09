import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Component/LandingPage/LandingPage";
import SignUp from "./Component/SignUp/SignUp";
import SignIn from "./Component/SignIn/SignIn";
import Search from "./Component/Search/Search";
import ResultPage from './Component/ResultPage/ResultPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/search" element={<Search />} />
        <Route path="/result" element={<ResultPage />} /> {/* New Route */}
      </Routes>
    </Router>
  );
}

export default App;
