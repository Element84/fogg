import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { useLens } from '../../hooks';

import SearchFilters from '../SearchFilters';

const LensSearchFilters = ({
  searchOnSave = false,
  searchOnChange = true,
  ...props
}) => {
  const { geoSearch = {}, geoFilters = {} } = useLens();
  const { updateSearch } = geoSearch;
  const {
    filters = {},
    cancelFilterChanges,
    saveFilterChanges,
    addActiveFilters
  } = geoFilters;

  const { available } = filters;

  const ref = useRef(null);

  const handleEscapeButton = (event) => {
    if (event.key === 'Escape') {
      handleSaveFilters();
    }
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      handleSaveFilters();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeButton, true);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleEscapeButton, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [available]);

  /**
   * handleSaveFilters
   */

  function handleSaveFilters () {
    const { active } = saveFilterChanges({
      closeFilters: true
    });
    if (searchOnSave) {
      updateSearch({
        filters: active,
        resetPage: true
      });
    }
  }

  /**
   * handleStoreFilterChanges
   */

  function handleStoreFilterChanges (changes) {
    const { active } = addActiveFilters(changes, {
      closeFilters: false
    });
    if (searchOnChange) {
      updateSearch({
        filters: active,
        resetPage: true
      });
    }
  }

  return (
    <SearchFilters
      ref={ref}
      className="lens-search-filters"
      filters={available}
      onCancelChanges={cancelFilterChanges}
      onSaveChanges={handleSaveFilters}
      onUpdateChanges={handleStoreFilterChanges}
      {...props}
    />
  );
};

LensSearchFilters.propTypes = {
  searchOnSave: PropTypes.func,
  searchOnChange: PropTypes.func
};

export default LensSearchFilters;
