import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';
import '../styles/SearchPopup.css';

const SearchPopup = ({ isOpen, onClose, onSearch, results, title, placeholder, filters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState(filters[0].value);

  const handleSearch = useCallback(() => {
    onSearch(searchTerm, searchType);
  }, [searchTerm, searchType, onSearch]);

  useEffect(() => {
  if (!isOpen) return;

  if (searchTerm.trim() === '') {
    onSearch('', searchType);  // This should clear results in parent
  } else {
    handleSearch();
  }
}, [searchTerm, searchType, isOpen, handleSearch, onSearch]);

  if (!isOpen) return null;

  return (
    <div className="search-popup-overlay">
      <div className="search-popup">
        <div className="popup-header">
          <h4>{title}</h4>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="filter-options">
          {filters.map((filter) => (
            <label key={filter.value} className="filter-radio">
              <input
                type="radio"
                name="searchType"
                value={filter.value}
                checked={searchType === filter.value}
                onChange={() => setSearchType(filter.value)}
              />
              {filter.label}
            </label>
          ))}
        </div>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Show results ONLY when there is input */}
{searchTerm.trim() !== '' && (
  <ul className="results-list">
    {results.length > 0 ? (
      results.map((item) => <li key={item.id}>{item.name}</li>)
    ) : (
      <li className="no-result">No results found</li>
    )}
  </ul>
)}
      </div>
    </div>
  );
};

SearchPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  filters: PropTypes.array
};

SearchPopup.defaultProps = {
  title: 'Search',
  placeholder: 'Type to search...',
  filters: [{ label: 'General', value: 'general' }]
};

export default SearchPopup;
