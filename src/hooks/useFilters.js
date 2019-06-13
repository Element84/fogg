import { useState } from 'react';

export default function useFilters (availableFilters) {
  const [filters, updateFilters] = useState({
    isOpen: false,
    unsaved: [],
    active: [],
    available: availableFilters || []
  });

  /**
   * openFilters
   * @description Triggers a UI update to open the Filters pane
   */

  function openFilters () {
    const updatedFilterState = {
      ...filters,
      isOpen: true
    };
    updateFilters(updatedFilterState);
    return updatedFilterState;
  }

  /**
   * storeFilterChanges
   * @description Stores any temporary unsaved changes for the filter state
   */

  function storeFilterChanges (changes = []) {
    const updatedFilterState = {
      ...filters,
      unsaved: concatFilters(filters.unsaved, changes)
    };
    updateFilters(updatedFilterState);
    return updatedFilterState;
  }

  /**
   * setActiveFilters
   * @description Applies any new changes to the active filters
   */

  function setActiveFilters (changes = []) {
    const updatedFilterState = {
      ...filters,
      active: concatFilters(filters.active, changes)
    };
    updateFilters(updatedFilterState);
    return updatedFilterState;
  }

  /**
   * saveFilterChanges
   * @description Stores any new unsaved changes to active and clears unsaved
   */

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

  /**
   * cancelFilterChanges
   * @description Clears out any unsaved changes
   */

  function cancelFilterChanges () {
    const updatedFilterState = {
      ...filters,
      isOpen: false,
      unsaved: []
    };
    updateFilters(updatedFilterState);
    return updatedFilterState;
  }

  /**
   * clearActiveFilters
   * @description Clears out all active and unsaved filters
   */

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

  /**
   * buildAvailableFilters
   * @description Sets up a filters list of all available filters with their active state.
   *     If the UI is open, we also show the unsaved state to allow users to edit
   */

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
    setActiveFilters,
    cancelFilterChanges,
    clearActiveFilters
  };
}

/**
 * concatFilters
 * @description Concats all arrays that are passed in and their values
 *     Each ID uses the last available value in the argument arrays
 */

function concatFilters () {
  const currentArguments = Array.prototype.slice.call(arguments);
  const allFilters = [];

  // Loop through all args, allowing someone to pass in as many arrays
  // of filters as they wish

  currentArguments.forEach(filterSet => {
    // Loop through each set of filters and overlay it into our main array
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
