import React, { useState, useRef, useEffect } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';

const SearchWithFilter = ({ filterOptions, onFilterSave, onSearchChange }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedOption, setSelectedOption] = useState(filterOptions[0]);
  const [searchValue, setSearchValue] = useState('');

  const wrapperRef = useRef(null);

  const handleSave = () => {
    setShowFilter(false);
    onFilterSave(selectedOption);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange(value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search-wrapper" ref={wrapperRef}>
      <div className="search-bar">
        <span className="search-icon">
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>

      <div className="filter-icon-wrapper">
        <div className="filter-icon" onClick={() => setShowFilter(!showFilter)}>
          <FontAwesomeIcon icon={faFilter} color="#000" />
        </div>

        {showFilter && (
          <div className="filter-modal">
            <label>Filter</label>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              {filterOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button onClick={handleSave}>Save</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchWithFilter;
