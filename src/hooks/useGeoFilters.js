import { useState, useEffect } from 'react';

import { sortByKey } from '../lib/util';
import { ALL_VALUES_ITEM } from '../data/search-filters';

const EMPTY_FILTERS = [];

export default function useGeoFilters (filterSettings) {
  const { available = EMPTY_FILTERS } = filterSettings;

  // Grab all the available filters with a defaultValue as the
  // default active

  const defaultActiveFilters = available.map((filter) => {
    return {
      id: filter.id,
      value: filter.value || filter.defaultValue
    };
  });

  const [filters, updateFilters] = useState({
    isOpen: false,
    unsaved: [],
    active: concatAndCleanFilters(defaultActiveFilters),
    available
  });

  useEffect(() => {
    const { active } = filters;
    const newActive = active.filter((activeFilter) => {
      const { id } = activeFilter;
      return available.find((af) => af.id === id);
    });

    updateFilters((prev) => {
      return {
        ...prev,
        available,
        active: newActive
      };
    });
  }, [available]);

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
    const unsavedFilters = applyFilterSetKeyToFilters(
      filters.unsaved,
      'available',
      'defaultValue'
    );

    const updatedFilterState = {
      ...filters,
      unsaved: concatFilters(unsavedFilters, changes)
    };

    updateFilters(updatedFilterState);

    return updatedFilterState;
  }

  /**
   * setActiveFilters
   * @description Applies any new changes to the active filters
   */

  function setActiveFilters (changes = [], { closeFilters = true } = {}) {
    const activeFilters = applyFilterSetKeyToFilters(
      filters.active,
      'available',
      'defaultValue'
    );
    const updatedFilters = changes.map((filter) => {
      const match = activeFilters.find(({ id } = {}) => id === filter.id);
      return {
        ...match,
        ...filter
      };
    });
    const updatedFilterState = {
      ...filters,
      isOpen: !closeFilters,
      unsaved: [],
      active: updatedFilters
    };
    updateFilters(updatedFilterState);
    return updatedFilterState;
  }

  /**
   * addActiveFilters
   * @description
   */

  function addActiveFilters (changes = [], options) {
    const newFilters = concatFilters(filters.active, changes);
    return setActiveFilters(newFilters, options);
  }

  /**
   * removeSingleFilter
   * @description Disables a single activated filter
   */

  function removeSingleFilter (filterId) {
    const updatedFilterState = {
      ...filters,
      active: filters.active.filter(({ id } = {}) => id !== filterId),
      unsaved: filters.unsaved.filter(({ id } = {}) => id !== filterId),
      available: filters.available.map(filterInstance => ({
        ...filterInstance,
        value: filterInstance.id === filterId ? undefined : filterInstance.value
      }))
    };

    updateFilters(updatedFilterState);

    return updatedFilterState;
  }

  /**
   * saveFilterChanges
   * @description Stores any new unsaved changes to active and clears unsaved
   */

  function saveFilterChanges ({ closeFilters = true } = {}) {
    const updatedFilterState = {
      ...filters,
      isOpen: !closeFilters,
      unsaved: [],
      active: concatAndCleanFilters(filters.active, filters.unsaved)
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
   * @param {object} param0
   * @param {boolean} [param0.resetToDefault=false] resets to the default active filters instead of clearing the filters
   */

  function clearActiveFilters ({
    resetToDefault = false
  } = {}) {
    const updatedFilterState = {
      ...filters,
      isOpen: false,
      unsaved: [],
      active: resetToDefault === true ? concatAndCleanFilters(defaultActiveFilters) : []
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
      filters.available.map((filter) => ({ ...filter })),
      filters.active.map((filter) => ({ ...filter }))
    );
    if (filters.isOpen) {
      filtersSet = concatFilters(
        filtersSet,
        filters.unsaved.map((filter) => ({ ...filter }))
      );
    }
    return filtersSet;
  }

  /**
   * applyFilterSetKeyToFilters
   * @description Given array of filters, applies the key of the filtesr in the given set
   * @summary Passing in (active, 'available', 'defaultValue') would apply all defaultValues to matching filters from available
   */

  function applyFilterSetKeyToFilters (filtersToUpdate = [], set, key) {
    if (!Array.isArray(filtersToUpdate)) return [];

    return filtersToUpdate.map((filter) => {
      const newKeys = {};
      const setFilter =
        filters[set] && filters[set].find((sf) => filter.id === sf.id);
      if (setFilter) {
        newKeys[key] = setFilter[key];
      }

      return {
        ...filter,
        ...newKeys
      };
    });
  }

  return {
    filters: {
      ...filters,
      active: sortByKey(filters.active, 'id'),
      available: buildAvailableFilters()
    },
    openFilters,
    storeFilterChanges,
    saveFilterChanges,
    setActiveFilters,
    addActiveFilters,
    removeSingleFilter,
    cancelFilterChanges,
    clearActiveFilters
  };
}

/**
 * concatAndCleanFilters
 * @description Applies the concatFilters function and removes any undefined values
 */

function concatAndCleanFilters () {
  const filters = concatFilters.apply(null, arguments);
  return filters.filter(({ value }) => typeof value !== 'undefined');
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

  currentArguments.forEach((filterSet) => {
    // Loop through each set of filters and overlay it into our main array
    filterSet.forEach((filter) => {
      const existingIndex = allFilters.findIndex(
        (existingFilter) => existingFilter.id === filter.id
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

      // preventing "All Values" from going to the search query
      if (allFilters[existingIndex].value === ALL_VALUES_ITEM) {
        delete allFilters[existingIndex].value;
      }

      // preventing ["All Values"] from going to the search query
      if (Array.isArray(allFilters[existingIndex].value) && allFilters[existingIndex].value.length) {
        if (allFilters[existingIndex].value.includes(ALL_VALUES_ITEM)) {
          allFilters[existingIndex].value.splice(allFilters[existingIndex].value.indexOf(ALL_VALUES_ITEM), 1);
          if (allFilters[existingIndex].value.length === 0) {
            delete allFilters[existingIndex].value;
          }
        }
      }
    });
  });

  return allFilters;
}
