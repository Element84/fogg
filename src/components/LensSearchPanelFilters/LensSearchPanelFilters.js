import React from 'react';

import { useLens } from '../../hooks';

import SearchPanelFilters from '../SearchPanelFilters';

const LensSearchPanelFilters = (props) => {
  const { geoSearch = {}, geoFilters = {} } = useLens();
  const { updateSearch } = geoSearch;
  const {
    filters = {},
    openFilters,
    cancelFilterChanges,
    saveFilterChanges
  } = geoFilters;

  function handleSaveFilters () {
    const { active } = saveFilterChanges({
      closeFilters: true
    });
    updateSearch({
      filters: active
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
