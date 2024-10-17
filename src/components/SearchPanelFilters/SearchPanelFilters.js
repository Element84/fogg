import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus, FaCheck, FaTimes, FaEdit } from 'react-icons/fa';

import { findFilterById } from '../../lib/filters';
import { sortByKey } from '../../lib/util';

import Button from '../Button';
import Panel from '../Panel';
import PanelActions from '../PanelActions';
import { ALL_VALUES_ITEM } from '../../data/search-filters';

const SearchPanelFilters = ({
  filters = {},
  onOpenFilters,
  onSaveFiltersChanges,
  onCancelFilterChanges,
  hasFilterCancel = true,
  additionalFilterItems = [],
  handleRemoveClick
}) => {
  const { active, isOpen, available } = filters;

  let panelFilters = isOpen ? available : active;

  // We don't want to show multiple matches of an ID. This shouldn't necessarily
  // happen, but there are instances where we'll an ID with 2 property names, where
  // we'll want them to be the same value, but as 1 active ID to filter on

  panelFilters = dedupeFiltersById(panelFilters);

  // map through the filters and make sure that we're associating the full informtation
  // from an available filter to the filter itself. This should really only do anything
  // in the event that via the above, the filters being used are active and may not
  // have the entire dataset

  panelFilters = panelFilters.map((filter) => {
    const availableFilter = available && findFilterById(available, filter.id);
    return {
      ...availableFilter,
      ...filter
    };
  });

  // Sort the filters so they remain consistent through each render

  panelFilters = sortByKey(panelFilters, 'label');

  const filterActions = [
    {
      label: 'Add Filter',
      icon: <FaPlus />,
      onClick: onOpenFilters,
      isVisible: !isOpen && active.length === 0
    },
    {
      label: 'Edit Filters',
      icon: <FaEdit />,
      onClick: onOpenFilters,
      isVisible: !isOpen && active.length > 0
    },
    {
      label: 'Save Filter Changes',
      icon: <FaCheck />,
      onClick: onSaveFiltersChanges,
      isVisible: isOpen
    },
    {
      label: 'Cancel Filter Changes',
      icon: <FaTimes />,
      onClick: onCancelFilterChanges,
      isVisible: hasFilterCancel && isOpen
    }
  ];

  /**
   * mapActiveFiltersToRow
   * @description Map function to turn filters into table rows
   */

  function mapActiveFiltersToRow ({ id } = {}, index) {
    const activeFilter = active && findFilterById(active, id);
    const availableFilter = available && findFilterById(available, id);

    const filter = {
      ...availableFilter,
      ...activeFilter
    };

    const { label, value: filterValue, type } = filter;

    let value = filterValue;

    if (Array.isArray(value)) {
      // Display comma list of active filters, unless "All Values" is selected
      if (type === 'checklist' && value.includes(ALL_VALUES_ITEM)) {
        return undefined;
      } else value = value.join(', ');
    } else if (typeof value === 'object' && value.constructor === Object) {
      value = Object.keys(value)
        .map((key) => {
          return `${key}: ${value[key]}`;
        })
        .join(', ');
    }

    value = `${value}`;

    return {
      id,
      label,
      value
    };
  }

  /**
   * dedupeFiltersById
   * @description Remove any excessive instance of a filter ID
   */

  function dedupeFiltersById (filters) {
    const deduped = {};
    filters.forEach((filter) => {
      if (!filter.id) return;
      if (!deduped[filter.id]) {
        deduped[filter.id] = filter;
      }
    });
    return Object.keys(deduped).map((key) => {
      return deduped[key];
    });
  }

  /**
   * hasActiveFilters
   * @description
   */

  function hasActiveFilters (filters) {
    const availableValues = filters.map(({ value } = {}) => value);
    return (availableValues.filter((value) => valueIsValid(value)).length > 0 || additionalFilterItems.length > 0);
  }

  const panelFiltersMapped = additionalFilterItems.concat(
    (panelFilters || [])
      .filter(filterActiveFiltersNoValue)
      .filter(({ type } = {}) => type !== 'hidden')
      .map(mapActiveFiltersToRow)
  );

  return (
    <Panel
      className="search-panel-filters"
      header="Filters"
      actions={<PanelActions actions={filterActions} />}
    >
      {hasActiveFilters(panelFilters) && (
        <div className="table-grid search-panel-filters-list">
          {panelFiltersMapped.map((filter, i) => !!filter && (
            <div className="search-panel-filters-list-item" key={i}>
              <div className="table-cell table-cell-column-label table-row-first table-column-first table-cell-align-left column-label">
                <span>{filter.label}</span>
              </div>
              <div className="table-cell table-row-first table-column-first table-cell-align-right column-value">
                <span style={{ verticalAlign: 'middle' }}>{filter.value}</span>
              </div>
              {(handleRemoveClick || filter.onClick) && (
                <div className="table-cell" style={{ width: 'auto' }}>
                  <Button
                    className="search-panel-filters-list-item-remove"
                    onClick={() => {
                      if (filter.onClick) {
                        filter.onClick();
                      } else {
                        handleRemoveClick(filter.id);
                      }
                    }}
                  >
                    <span className="visually-hidden">Remove Filter</span>
                    <FaTimes />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
};

SearchPanelFilters.propTypes = {
  filters: PropTypes.object,
  onOpenFilters: PropTypes.func,
  onSaveFiltersChanges: PropTypes.func,
  onCancelFilterChanges: PropTypes.func,
  hasFilterCancel: PropTypes.bool,
  additionalFilterItems: PropTypes.array,
  handleRemoveClick: PropTypes.func
};

export default SearchPanelFilters;

/**
 * valueIsValid
 */

function valueIsValid (value) {
  if (!value) return false;
  if (Array.isArray(value) && value.length === 0) return false;
  return true;
}

/**
 * filterActiveFiltersNoValue
 * @description
 */

function filterActiveFiltersNoValue ({ value } = {}) {
  return valueIsValid(value);
}
