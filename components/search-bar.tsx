"use client";

import { BiSearch } from 'react-icons/bi';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      router.push(`/search/${query}`);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <div className="flex items-center bg-gray-100 p-2 rounded-full max-md:hidden">
        <button
          disabled={query === ""}
          onClick={handleSearch}
        >
          <BiSearch size={20} className="opacity-50" />
        </button>
        <input
          value={query}
          onKeyDown={handleKeyPress}
          onChange={(e) => setQuery(e.target.value)}
          className="outline-none bg-transparent ml-2 caret-blue-500 placeholder:font-light placeholder:text-gray-600 text-[12px]"
          placeholder="Search"
          autoComplete="false"
        />
      </div>
    </div>
  );
};

export default SearchBar;