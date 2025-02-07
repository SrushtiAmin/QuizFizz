import  { useState } from "react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Generate dynamic results based on the input query
      const results = Array.from({ length: 5 }, (_, i) => `${searchQuery} Result ${i + 1}`);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div>
      {/* Logo Section */}
      <header>
        <h1>
          Quiz<span>Fizz</span>
        </h1>
      </header>

      {/* Main Content */}
      <main>
        {/* Search Section */}
        <h2>SEARCH THE TOPIC HERE</h2>
        <div>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* Display Search Results */}
        {searchResults.length > 0 && (
          <div>
            <h3>Search Results:</h3>
            <ul>
              {searchResults.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Difficulty Level Section */}
        <div>
          <h3>Select Difficulty Level:</h3>
          <select>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </main>
    </div>
  );
};

export default Search;
