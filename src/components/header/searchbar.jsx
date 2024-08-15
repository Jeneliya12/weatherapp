import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      onSearch({ query: trimmedQuery });
    } else {
      console.warn("Search query is empty");
    }
  };

  return (
    <div className="flex justify-center w-full max-w-lg mx-auto relative z-20">
      <form onSubmit={handleSubmit} className="flex w-80">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search..."
          className="p-3 border border-gray-300 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 rounded-r-none"
        />
        <button
          type="submit"
          className="p-3 bg-blue-500 text-white border border-gray-300 rounded-r-lg hover:bg-blue-600 rounded-l-none"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
