import React from 'react';
import PropTypes from 'prop-types';

import { useLens } from '../../hooks';

import SearchPanelFilters from '../SearchPanelFilters';

const LensSearchPanelFilters = ({ hideGeometryFilter = false, additionalFilterItems = [], ...props }) => {
  const { map = {}, geoSearch = {}, geoFilters = {} } = useLens();
  const { queryParams: { date, geoJson } = {}, updateSearch } = geoSearch;
  const {
    filters = {},
    openFilters,
    cancelFilterChanges,
    saveFilterChanges,
    removeSingleFilter
  } = geoFilters;

  function handleSaveFilters () {
    const { active } = saveFilterChanges({
      closeFilters: true
    });
    updateSearch({
      filters: active
    });
  }

  function handleRemoveFilter (filterId) {
    const { active } = removeSingleFilter(filterId);
    updateSearch({
      filters: active
    });
  }

  additionalFilterItems = additionalFilterItems.map(({ onClickParams, ...rest }) => ({
    ...rest,
    onClick: onClickParams && (() => {
      map.clearLayers();
      updateSearch(onClickParams);
    })
  }));

  if (!hideGeometryFilter && geoJson && geoJson.features && geoJson.features[0]) {
    additionalFilterItems.push({
      label: 'Geometry',
      value: geoJson.features[0].geometry.type === 'Point' ? 'POINT' : 'POLYGON',
      onClick: () => {
        map.clearLayers();
        updateSearch({ geoJson: {} });
      }
    });
  }

  if (date && (date.start || date.end)) {
    additionalFilterItems.push({
      label: 'Datetime',
      value: `${(date.start && new Date(date.start).toISOString()) || 'Any'} to ${(date.end && new Date(date.end).toISOString()) || 'Any'}`,
      onClick: () => {
        map.clearLayers();
        updateSearch({ date: {} });
      }
    });
  }

  return (
    <SearchPanelFilters
      filters={filters}
      onOpenFilters={openFilters}
      onCancelFilterChanges={cancelFilterChanges}
      onSaveFiltersChanges={handleSaveFilters}
      handleRemoveClick={handleRemoveFilter}
      additionalFilterItems={additionalFilterItems}
      {...props}
    />
  );
};

LensSearchPanelFilters.propTypes = {
  hideGeometryFilter: PropTypes.bool,
  additionalFilterItems: PropTypes.array
};

export default LensSearchPanelFilters;
