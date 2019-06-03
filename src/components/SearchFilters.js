import React from 'react';
import PropTypes from 'prop-types';
import { FaCheck, FaTimes } from 'react-icons/fa';

import Panel from './Panel';
import InputButton from './InputButton';
import Button from './Button';

import { findFilterById } from '../lib/filters';

const ALL_VALUES_ITEM = 'All Values';

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

  function handleFilterChange ({ target = {}, ...rest } = {}) {
    const id = target.name;
    const activeFilter = findFilterById(filters, id);
    let value = target.value || target.checked;

    if (typeof value === 'string' && activeFilter.type === 'checklist') {
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
                  {(type === 'checklist' || type === 'radiolist') && (
                    <SearchFiltersList
                      id={id}
                      label={label}
                      list={list}
                      activeValues={value || []}
                      type={type}
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
  activeValues = [],
  type = 'checklist'
}) => {
  let inputType;
  let filtersList = [...list];
  let noActiveValues =
    typeof activeValues === 'undefined' || activeValues.length === 0;

  if (type === 'radiolist') {
    inputType = 'radio';
  } else if (type === 'checklist') {
    inputType = 'checkbox';
  }

  function handleChange (e) {
    if (typeof onChange === 'function') {
      onChange(e);
    }
  }

  filtersList.push(ALL_VALUES_ITEM);

  Array.isArray(filtersList) && filtersList.sort();

  return (
    <>
      {label && (
        <strong className="search-filters-available-label">{label}</strong>
      )}
      {Array.isArray(filtersList) && (
        <ul className="search-filters-available-list">
          {filtersList.map((item, index) => {
            let isChecked = false;
            if (Array.isArray(activeValues) && activeValues.includes(item)) {
              isChecked = true;
            } else if (activeValues === item) {
              isChecked = true;
            } else if (noActiveValues && item === ALL_VALUES_ITEM) {
              isChecked = true;
            }
            return (
              <li key={`SearchFiltersList-Item-${index}`}>
                <InputButton
                  type={inputType}
                  name={id}
                  label={item}
                  id={`filter-${id}-${item}`}
                  value={item}
                  onChange={handleChange}
                  isChecked={isChecked}
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
  activeValues: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  type: PropTypes.string
};
