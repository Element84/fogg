import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus, FaCheck, FaTimes, FaEdit } from 'react-icons/fa';

import Panel from './Panel';
import PanelActions from './PanelActions';
import Table from './Table';

import { findFilterById } from '../lib/filters';

const SearchPanelFilters = ({
  filters = {},
  onOpenFilters,
  onSaveFiltersChanges,
  onCancelFilterChanges,
  hasFilterCancel = true
}) => {
  const { active, isOpen, available } = filters;

  const panelFilters = isOpen ? available : active;

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
    const { label, value: filterValue } = findFilterById(available, id);

    let value = filterValue;

    if (Array.isArray(value)) {
      value = value.join(', ');
    } else if (typeof value === 'object' && value.constructor === Object) {
      value = Object.keys(value)
        .map(key => {
          return `${key}: ${value[key]}`;
        })
        .join(', ');
    }

    value = `${value}`;

    return {
      label,
      value
    };
  }

  /**
   * filterActiveFiltersNoValue
   * @description
   */

  function filterActiveFiltersNoValue ({ value } = {}) {
    return valueIsValid(value);
  }

  /**
   * hasActiveFilters
   * @description
   */

  function hasActiveFilters (filters) {
    const availableValues = filters.map(({ value } = {}) => value);
    return availableValues.filter(value => valueIsValid(value)).length > 0;
  }

  function valueIsValid (value) {
    if (!value) return false;
    if (Array.isArray(value) && value.length === 0) return false;
    return true;
  }

  return (
    <Panel
      className="panel-clean search-panel-filters"
      header="Filters"
      actions={<PanelActions actions={filterActions} />}
    >
      {hasActiveFilters(panelFilters) && (
        <Table
          columns={[
            {
              accessor: 'label'
            },
            {
              accessor: 'value'
            }
          ]}
          data={panelFilters
            .filter(filterActiveFiltersNoValue)
            .map(mapActiveFiltersToRow)}
        />
      )}
    </Panel>
  );
};

SearchPanelFilters.propTypes = {
  filters: PropTypes.object,
  onOpenFilters: PropTypes.func,
  onSaveFiltersChanges: PropTypes.func,
  onCancelFilterChanges: PropTypes.func,
  hasFilterCancel: PropTypes.bool
};

export default SearchPanelFilters;
