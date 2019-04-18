import React, { useState } from 'react';

import SearchBox from './SearchBox';

const SearchComplete = ({onSearch, resolveQueryComplete}) => {

  const [ results, updateResults ] = useState([]);

  function handleSearch(query) {
    if ( typeof onSearch === 'function' ) {
      onSearch(query);
    }
    handleQuery(query);
  }

  async function handleQuery(query) {

    let results = [];

    if ( typeof resolveQueryComplete === 'function' ) {
      try {
        results = await resolveQueryComplete(query);
      } catch(e) {
        throw new Error(`Error fetching query: ${e}`);
      }
    }

    if ( Array.isArray(results) ) {
      updateResults(results);
    }
  }

  console.log('render results', results);

  return (
    <div className="search-complete">

      <SearchBox onSearch={handleSearch} />

      <div className="search-complete-results">
        <ul>
          { results.map(({ label } = {}) => {
            return <li>{ label }</li>
          })}
        </ul>
      </div>

    </div>
  );

}

export default SearchComplete;