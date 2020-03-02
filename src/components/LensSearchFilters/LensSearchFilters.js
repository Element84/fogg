import React from 'react';
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

  /**
   * handleSaveFilters
   */

  function handleSaveFilters () {
    const { active } = saveFilterChanges({
      closeFilters: true
    });
    if (searchOnSave) {
      updateSearch({
        filters: active
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
        filters: active
      });
    }
  }

  return (
    <SearchFilters
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
