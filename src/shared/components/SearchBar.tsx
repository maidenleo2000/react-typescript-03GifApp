import { useState } from "react";

// import React from 'react'
interface Props {
  placeholder?: string;
  onQuery: (query: string) => void;
}

export const SearchBar = ({ placeholder = "Buscar Gifs", onQuery }: Props) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onQuery(query);
    setQuery("");
  };
  const handleeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleeyDown}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};
