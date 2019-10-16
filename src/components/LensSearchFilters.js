import React, { useContext } from 'react';
import { LensContext } from '../context';

import SearchFilters from './SearchFilters';

const LensSearchFilters = props => {
  const { filters = {}, lens = {} } = useContext(LensContext) || {};

  const { handlers: lensHandlers = {} } = lens;
  const { search } = lensHandlers;

  const { handlers: filtersHandlers = {}, available } = filters;
  const { storeFilterChanges, cancelFilterChanges } = filtersHandlers;

  function handleUpdateSearchParams () {
    search({
      saveUnsavedFilters: true
    });
  }

  return (
    <SearchFilters
      className="lens-search-filters"
      filters={available}
      onCancelChanges={cancelFilterChanges}
      onSaveChanges={handleUpdateSearchParams}
      onUpdateChanges={storeFilterChanges}
      {...props}
    />
  );
};

export default LensSearchFilters;
