import React from 'react';
import PropTypes from 'prop-types';

import ClassName from '../../models/classname';
import { availableValuesByColumnId } from '../../lib/table';

import InputButtonList from '../InputButtonList';

const OPTION_ALL = {
  label: 'All',
  value: 'all'
};

const TableSearchFilters = ({
  options = [],
  defaultTableData = [],
  isLoading,
  onChange
}) => {
  const componentClass = new ClassName('table-search-filters');
  const hasOptions = Array.isArray(options) && options.length > 0;

  if (!hasOptions) return null;

  if (isLoading) {
    defaultTableData = [];
  }

  /**
   * handleOnChange
   */

  function handleOnChange (e, selectedOptions) {
    const columnIdSet = new Set(
      selectedOptions.map(({ columnId } = {}) => columnId)
    );
    const columnId = [...columnIdSet.values()][0];

    // If we have an "all" option, which is most likely a radio list,
    // we want to be able that option to be able to clear all radios and
    // provide all values. So if we find an all option, we'll first strip
    // it out of the options list as it's not part of the native data
    // and uncheck all the other options

    const all = selectedOptions.find(optionIsAll);
    let options = selectedOptions.filter((option) => !optionIsAll(option));

    if (all && all.isChecked) {
      options = options.map((option) => {
        return {
          ...option,
          isChecked: false
        };
      });
    }

    if (typeof onChange === 'function') {
      onChange(
        {
          columnId,
          selectedOptions: options
        },
        e
      );
    }
  }

  return (
    <div className={componentClass.string}>
      <ul className={componentClass.childString('menu')}>
        {options.map(({ Header, columnId, type } = {}, index) => {
          const values = availableValuesByColumnId(defaultTableData, columnId);
          const hasValues = Array.isArray(values) && values.length > 0;
          const valueOptions = values.map((value) => {
            return {
              label: value,
              value,
              columnId
            };
          });

          if (type === 'radio') {
            valueOptions.unshift({
              columnId,
              ...OPTION_ALL
            });
          }

          return (
            <li
              key={`TableSearchFilter-${index}`}
              className={componentClass.childString('filter')}
            >
              {hasValues && (
                <ul className={componentClass.childString('filter-list')}>
                  <InputButtonList
                    label={Header}
                    name={columnId}
                    type={type}
                    options={valueOptions}
                    onChange={handleOnChange}
                  />
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

TableSearchFilters.propTypes = {
  options: PropTypes.array,
  defaultTableData: PropTypes.array,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func
};

export default TableSearchFilters;

/**
 * optionIsAll
 */

function optionIsAll ({ label, value } = {}) {
  return label === OPTION_ALL.label && value === OPTION_ALL.value;
}
