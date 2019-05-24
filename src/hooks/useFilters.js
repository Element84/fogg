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
    const updatedFilterState = {
      ...filters,
      unsaved: changes
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

  return {
    filters: {
      ...filters,
      available: concatFilters(
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
    });
  });

  return allFilters;
}
