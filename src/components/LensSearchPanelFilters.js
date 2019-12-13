import React, { useContext } from 'react';
import { LensContext } from '../context';

import { useLens } from '../hooks';

import SearchPanelFilters from './SearchPanelFilters';

const LensSearchPanelFilters = props => {
  const { geoSearch = {} } = useLens();
  const { search } = geoSearch;


  const { filters = {} } = useContext(LensContext) || {};
  const { handlers: filtersHandlers = {} } = filters;
  const { openFilters, cancelFilterChanges } = filtersHandlers;

  function handleSaveFilters () {
    search({
      saveUnsavedFilters: true
    });
  }

  return (
    <SearchPanelFilters
      filters={filters}
      onOpenFilters={openFilters}
      onCancelFilterChanges={cancelFilterChanges}
      onSaveFiltersChanges={handleSaveFilters}
      {...props}
    />
  );
};

export default LensSearchPanelFilters;
