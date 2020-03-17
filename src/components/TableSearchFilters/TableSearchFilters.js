import React from 'react';
import PropTypes from 'prop-types';

import ClassName from '../../models/classname';
import { availableValuesByColumnId } from '../../lib/table';

import InputButtonList from '../InputButtonList';

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
    if (typeof onChange === 'function') {
      onChange(
        {
          columnId,
          selectedOptions
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
          const valueOptions = values.map(value => {
            return {
              label: value,
              value,
              columnId
            };
          });
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
