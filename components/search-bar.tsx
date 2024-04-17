"use client";

import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import axios from 'axios'; // Import axios for making HTTP requests

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState(''); // State to manage the user input

  const [searchResults, setSearchResults] = useState<any[]>([]); // State to store search results

  // Function to handle user input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Function to handle form submission (search)
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.get(`/api/search?q=${query}`); // Send GET request to backend API
      setSearchResults(response.data); // Update search results state with response data
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className="flex items-center bg-gray-100 p-2 rounded-full max-md:hidden">
          <button type="submit">
            <BiSearch size={20} className="opacity-50" />
          </button>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            className="outline-none bg-transparent ml-2 caret-blue-500 placeholder:font-light placeholder:text-gray-600 text-[12px]"
            placeholder="Search"
            autoComplete="off"
          />
        </div>
      </form>
      {/* Display search results */}
      <div>
        {searchResults.map((result) => (
          <div key={result.id}>
            {/* Display each search result */}
            <p>{result.name}</p>
            {/* Add additional UI components to display more information about the search result */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
