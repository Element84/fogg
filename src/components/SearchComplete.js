import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SearchBox from './SearchBox';

const SearchComplete = ({ onSearch, resolveQueryComplete }) => {
  const [results, updateResults] = useState([]);

  function handleSearch (query) {
    if (typeof onSearch === 'function') {
      onSearch(query);
    }
    handleQuery(query);
  }

  async function handleQuery (query) {
    let results = [];

    if (typeof resolveQueryComplete === 'function') {
      try {
        results = await resolveQueryComplete(query);
      } catch (e) {
        throw new Error(`Error fetching query: ${e}`);
      }
    }

    if (Array.isArray(results)) {
      updateResults(results);
    }
  }

  console.log('render results', results);

  return (
    <div className="search-complete">
      <SearchBox onSearch={handleSearch} />

      <div className="search-complete-results">
        <ul>
          {results.map(({ label } = {}, index) => {
            return <li key={`SearchComplete-Result-Item-${index}`}>{label}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

SearchComplete.propTypes = {
  onSearch: PropTypes.func,
  resolveQueryComplete: PropTypes.func
};

export default SearchComplete;
