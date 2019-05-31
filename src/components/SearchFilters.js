import React from 'react';
import PropTypes from 'prop-types';
import { FaCheck, FaTimes } from 'react-icons/fa';

import Panel from './Panel';
import InputButton from './InputButton';
import Button from './Button';

import { findFilterById } from '../lib/filters';

const SearchFilters = ({
  className,
  filters = [],
  onSaveChanges,
  onCancelChanges,
  onUpdateChanges
}) => {
  if (!Array.isArray(filters) || filters.length === 0) {
    return null;
  }

  /**
   * handleFilterChange
   * @descriptioon Triggers when a filter change is detected
   */

  function handleFilterChange ({ target = {} } = {}) {
    const id = target.name;
    const activeFilter = findFilterById(filters, id);
    let value = target.value || target.checked;

    if (typeof value === 'string' && activeFilter.type === 'list') {
      if (!Array.isArray(activeFilter.value)) {
        value = [value];
      } else if (activeFilter.value.includes(value)) {
        value = activeFilter.value.filter(val => val !== value);
      } else {
        value = activeFilter.value.concat([value]);
      }
    }

    if (typeof onUpdateChanges === 'function') {
      onUpdateChanges([
        {
          id,
          value
        }
      ]);
    }
  }

  return (
    <div className={`search-filters ${className || ''}`}>
      <Panel>
        <ul className="search-filters-available">
          {filters.map(
            ({ label, id, type = 'default', list, value } = {}, index) => {
              return (
                <li key={`SearchFilters-Available-${index}`}>
                  {type === 'list' && (
                    <SearchFiltersList
                      id={id}
                      label={label}
                      list={list}
                      activeValues={value || []}
                      onChange={handleFilterChange}
                    />
                  )}

                  {(!type || type === 'default') && (
                    <InputButton
                      type="checkbox"
                      name={id}
                      label={label}
                      id={`filter-${label}`}
                      onChange={handleFilterChange}
                      isChecked={value === true}
                    />
                  )}
                </li>
              );
            }
          )}
        </ul>
        <ul className="search-filters-actions">
          <li>
            <Button type={['text', 'icon-before']} onClick={onSaveChanges}>
              <FaCheck /> Save
            </Button>
          </li>
          <li>
            <Button type={['text', 'icon-before']} onClick={onCancelChanges}>
              <FaTimes />
              Cancel
            </Button>
          </li>
        </ul>
      </Panel>
    </div>
  );
};

SearchFilters.propTypes = {
  className: PropTypes.string,
  filters: PropTypes.array,
  onSaveChanges: PropTypes.func,
  onCancelChanges: PropTypes.func,
  onUpdateChanges: PropTypes.func
};

export default SearchFilters;

const SearchFiltersList = ({
  id,
  label,
  list = [],
  onChange,
  activeValues = []
}) => {
  function handleChange (e) {
    if (typeof onChange === 'function') {
      onChange(e);
    }
  }

  return (
    <>
      {label && (
        <strong className="search-filters-available-label">{label}</strong>
      )}
      {Array.isArray(list) && (
        <ul className="search-filters-available-list">
          {list.map((item, index) => {
            return (
              <li key={`SearchFiltersList-Item-${index}`}>
                <InputButton
                  type="checkbox"
                  name={id}
                  label={item}
                  id={`filter-${id}-${item}`}
                  value={item}
                  onChange={handleChange}
                  isChecked={
                    Array.isArray(activeValues) && activeValues.includes(item)
                  }
                />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

SearchFiltersList.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  list: PropTypes.array,
  onChange: PropTypes.func,
  activeValues: PropTypes.array
};
