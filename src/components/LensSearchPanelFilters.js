import React, { useContext } from 'react';
import { LensContext } from '../context';

import SearchPanelFilters from './SearchPanelFilters';

const LensSearchPanelFilters = props => {
  const { filters = {}, lens = {} } = useContext(LensContext) || {};

  const { handlers: lensHandlers = {} } = lens;
  const { search } = lensHandlers;

  const { handlers: filtersHandlers = {} } = filters;
  const { openFilters, cancelFilterChanges } = filtersHandlers;

  function handleUpdateSearchParams () {
    search({
      saveUnsavedFilters: true
    });
  }

  return (
    <SearchPanelFilters
      filters={filters}
      onOpenFilters={openFilters}
      onCancelFilterChanges={cancelFilterChanges}
      onSaveFiltersChanges={handleUpdateSearchParams}
      {...props}
    />
  );
};

export default LensSearchPanelFilters;
