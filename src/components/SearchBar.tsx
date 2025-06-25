import React, { useState } from "react";
import "../css/SearchBar.css";
import searchIcon from "../assets/searchIcon.png";
import { useTranslation } from "react-i18next";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [input, setInput] = useState<string>("");
  const { t } = useTranslation();

  const handleSearch = () => {
    onSearch(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={"container-search"}>
      <input
        className={"search-box"}
        type="text"
        placeholder={t('search')}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button className={"search-button"} onClick={handleSearch}>
        <img src={searchIcon} alt="search icon" />
      </button>
    </div>
  );
};

export default SearchBar;
