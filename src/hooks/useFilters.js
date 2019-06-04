import { useState } from 'react';

export default function useFilters (availableFilters) {
  const [filters, updateFilters] = useState({
    isOpen: false,
    unsaved: [],
    active: [],
    available: availableFilters || []
  });

  function openFilters () {
    const updatedFilterState = {
      ...filters,
      isOpen: true
    };
    updateFilters(updatedFilterState);
    return updatedFilterState;
  }

  function storeFilterChanges (changes = []) {
    const filterChanges = [...filters.unsaved];

    changes.forEach(filter => {
      const oldFilter = filterChanges.find(
        filterChange => filterChange.id === filter.id
      );
      if (!oldFilter) {
        filterChanges.push(filter);
      }
    });

    const updatedFilterState = {
      ...filters,
      unsaved: filterChanges.map(filterChange => {
        const newFilterChange =
          changes.find(filter => filter.id === filterChange.id) || {};
        return {
          ...filterChange,
          ...newFilterChange
        };
      })
    };
    updateFilters(updatedFilterState);
    return updatedFilterState;
  }

  function saveFilterChanges () {
    const updatedFilterState = {
      ...filters,
      isOpen: false,
      unsaved: [],
      active: concatFilters(filters.active, filters.unsaved)
    };

    updateFilters(updatedFilterState);

    return updatedFilterState;
  }

  function cancelFilterChanges () {
    const updatedFilterState = {
      ...filters,
      isOpen: false,
      unsaved: []
    };
    updateFilters(updatedFilterState);
    return updatedFilterState;
  }

  function clearActiveFilters () {
    const updatedFilterState = {
      ...filters,
      isOpen: false,
      unsaved: [],
      active: []
    };
    updateFilters(updatedFilterState);
    return updatedFilterState;
  }

  function buildAvailableFilters () {
    let filtersSet = concatFilters(
      filters.available.map(filter => ({ ...filter })),
      filters.active.map(filter => ({ ...filter }))
    );
    if (filters.isOpen) {
      filtersSet = concatFilters(
        filtersSet,
        filters.unsaved.map(filter => ({ ...filter }))
      );
    }
    return filtersSet;
  }

  return {
    filters: {
      ...filters,
      available: buildAvailableFilters()
    },
    openFilters,
    storeFilterChanges,
    saveFilterChanges,
    cancelFilterChanges,
    clearActiveFilters
  };
}

/**
 * concatFilters
 * @description Concats all arrays that are passed in and their values
 */

function concatFilters () {
  const currentArguments = Array.prototype.slice.call(arguments);
  const allFilters = [];

  currentArguments.forEach(filterSet => {
    filterSet.forEach(filter => {
      const existingIndex = allFilters.findIndex(
        existingFilter => existingFilter.id === filter.id
      );

      // If we can't find it, that means it doesn't exist in our array yet
      // so throw it on the end

      if (existingIndex === -1) {
        allFilters.push(filter);
        return;
      }

      // If the value equals false, that means the checkbox is unchecked so remove it

      if (filter.value === false) {
        allFilters.splice(existingIndex, 1);
        return;
      }

      allFilters[existingIndex].value = filter.value;

      if (allFilters[existingIndex].value === 'All Values') {
        allFilters[existingIndex].value = undefined;
      }
    });
  });

  return allFilters;
}
