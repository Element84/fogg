import { useState } from 'react';

import { findFilterById } from '../lib/filters';

export default function useFilters (availableFilters) {
  const [filters, updateFilters] = useState({
    isOpen: false,
    unsaved: [],
    active: [],
    available: availableFilters || []
  });

  function openFilters () {
    updateFilters({
      ...filters,
      isOpen: true
    });
  }

  function storeFilterChanges (changes = []) {
    updateFilters({
      ...filters,
      unsaved: changes
    });
  }

  function saveFilterChanges () {
    updateFilters({
      ...filters,
      isOpen: false,
      unsaved: [],
      // TODO this needs to be fixed to dedup
      active: filters.active.concat(filters.unsaved)
    });
  }

  function cancelFilterChanges () {
    updateFilters({
      ...filters,
      isOpen: false,
      unsaved: []
    });
  }

  return {
    filters: {
      ...filters,
      available: combineFilters(
        filters.available,
        filters.active,
        filters.unsaved
      )
    },
    openFilters,
    storeFilterChanges,
    saveFilterChanges,
    cancelFilterChanges
  };
}

function combineFilters (available = [], active = [], unsaved = []) {
  return available.map(filter => {
    const { id, defaultValue } = filter;

    const activeFilter = findFilterById(active, id) || {};
    const unsavedFilter = findFilterById(unsaved, id) || {};

    return {
      ...filter,
      value: unsavedFilter.value || activeFilter.value || defaultValue
    };
  });
}
