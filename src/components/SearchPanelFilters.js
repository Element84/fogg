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
  onCancelFilterChanges
}) => {
  const { active, isOpen, available } = filters;

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
      isVisible: isOpen
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
    }

    return [label, value];
  }

  return (
    <Panel
      className="panel-clean search-panel-filters"
      header="Filters"
      actions={<PanelActions actions={filterActions} />}
    >
      {active.length > 0 && <Table rows={active.map(mapActiveFiltersToRow)} />}
    </Panel>
  );
};

SearchPanelFilters.propTypes = {
  filters: PropTypes.object,
  onOpenFilters: PropTypes.func,
  onSaveFiltersChanges: PropTypes.func,
  onCancelFilterChanges: PropTypes.func
};

export default SearchPanelFilters;
