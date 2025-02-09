import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import search from "../../assets/search.png";
import "./Search.css";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate("/result", { state: { searchQuery, difficulty } });
    } else {
      alert("Please enter a topic to search!");
    }
  };

  return (
    <div className="search-page">
      <header className="header-search">
        <img src={logo} alt="QuizFizz Logo" className="logo-search" />
      </header>
      <main className="main-content-search">
        <div className="image-container">
          <img src={search} alt="Illustration" className="search-img" />
        </div>
        <div className="text-container-search">
          <h2>SEARCH THE TOPIC HERE</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className="difficulty-container">
            <h3>Select Difficulty Level:</h3>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;
