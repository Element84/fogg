import React, { useState } from 'react';

import { FaSearch, FaCalendarAlt } from 'react-icons/fa';

import FormInput from './FormInput';
import Button from './Button';

const SearchBox = ({onInput, onDateSelect, onSearch}) => {

  const [ query, setQuery ] = useState('');

  const [ date, setDate ] = useState({
    isOpen: false,
    date: null,
  });

  function handleSearchInput(e) {
    const { target } = e;
    setQuery(target.value);
    if ( typeof onInput === 'function' ) {
      onInput(e);
    }
  }

  function handleDateClick() {
    setDate({
      ...date,
      isOpen: !(date.isOpen),
    });
  }

  function handleSearchClick(e) {
    handleSearch(query);
  }

  function handleSearch(query) {
    if ( typeof onSearch === 'function' ) {
      onSearch(query)
    }
  }

  return (
    <div className="search-box">
      <FormInput className="search-box-input" placeholder="Search" onInput={handleSearchInput} />
      <div className="search-box-controls">
        <div className="search-box-controls-date" data-is-open={date.isOpen}>
          <Button onClick={handleDateClick}>
            <FaCalendarAlt />
          </Button>
          <div className="search-box-controls-date-picker">
            PICKER!
          </div>
        </div>
        <div className="search-box-controls-search">
          <Button onClick={handleSearchClick}>
            <FaSearch />
          </Button>
        </div>
      </div>
    </div>
  );

}

export default SearchBox;