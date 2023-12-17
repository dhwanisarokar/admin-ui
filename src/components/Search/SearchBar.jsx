import React from "react";
import { ImSearch } from "react-icons/im";
import "./SearchBar.css";

export default function SearchBar({ value, onSearch }) {
  return (
    <div className="search-bar">
      <input
        className="search-field"
        name="search"
        onChange={onSearch}
        type="text"
        value={value}
        placeholder="Search by name, email or role..."
      />
      <ImSearch className="search-icon" />
    </div>
  );
}
