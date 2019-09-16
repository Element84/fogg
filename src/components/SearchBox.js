import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

import Form from './Form';
import FormInput from './FormInput';
import Button from './Button';
import SearchDate from './SearchDate';

const SearchBox = ({
  onInput,
  onSearch,
  placeholder = 'Search',
  searchInput = '',
  defaultDate = {}
}) => {
  const [query, setQuery] = useState('');

  const [date, setDate] = useState({});
  const [dateIsOpen, setDateIsOpen] = useState(false);

  useEffect(() => {
    setQuery(searchInput);
  }, [searchInput]);

  /**
   * handleSearchInput
   * @description Fires onInput of search field and fires onInput if available
   */

  function handleSearchInput (e = {}) {
    const { target } = e;
    setQuery(target.value);
    if (typeof onInput === 'function') {
      onInput(e, date);
    }
  }

  /**
   * handleSearchClick
   * @description Fires when the search button is clicked
   */

  function handleSearchClick (e) {
    handleSearch(date);
    setDateIsOpen(false);
  }

  /**
   * handleSearch
   * @description Handles performing search and firing onSearch callback with query
   */

  function handleSearch (searchDate = date) {
    if (
      typeof onSearch === 'function' &&
      typeof query === 'string' &&
      query.length > 0
    ) {
      onSearch(query, searchDate);
      setDate(searchDate);
    }
  }

  /**
   * handleFormSubmit
   * @description
   */

  function handleFormSubmit () {
    handleSearchClick();
    return false;
  }

  return (
    <div className="search-box">
      <Form onSubmit={handleFormSubmit} autoComplete="off">
        <FormInput
          id="search-box-input"
          className="search-box-input"
          placeholder={placeholder}
          onInput={handleSearchInput}
          value={query}
        />
      </Form>
      <div className="search-box-controls">
        <SearchDate
          onSearch={handleSearch}
          dateIsOpen={dateIsOpen}
          defaultDate={defaultDate}
          classPrefix={'search-box-controls'}
        />
        <div className="search-box-controls-search">
          <Button
            className="search-box-controls-control"
            onClick={handleSearchClick}
          >
            <FaSearch />
          </Button>
        </div>
      </div>
    </div>
  );
};

SearchBox.propTypes = {
  onInput: PropTypes.func,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  searchInput: PropTypes.string,
  defaultDate: PropTypes.object
};

export default SearchBox;
