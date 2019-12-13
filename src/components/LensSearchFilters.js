import React, { useContext } from 'react';
import { LensContext } from '../context';

import { useLens } from '../hooks';

import SearchFilters from './SearchFilters';

const LensSearchFilters = props => {
  const { geoSearch = {} } = useLens();
  const { updateSearch } = geoSearch;

  const { filters = {} } = useContext(LensContext) || {};

  const { handlers: filtersHandlers = {}, available } = filters;
  const { storeFilterChanges, cancelFilterChanges } = filtersHandlers;

  return (
    <SearchFilters
      className="lens-search-filters"
      filters={available}
      onCancelChanges={cancelFilterChanges}
      onSaveChanges={updateSearch}
      onUpdateChanges={storeFilterChanges}
      {...props}
    />
  );
};

export default LensSearchFilters;
