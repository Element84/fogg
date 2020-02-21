import React from 'react';
import PropTypes from 'prop-types';
import { FaCheck, FaTimes } from 'react-icons/fa';

import { findFilterById } from '../../lib/filters';

import Panel from '../Panel';
import Form from '../Form';
import InputButton from '../InputButton';
import Button from '../Button';
import SearchFiltersList from '../SearchFiltersList';
import SearchFiltersRange from '../SearchFiltersRange';

const SearchFilters = ({
  className,
  filters = [],
  onSaveChanges,
  onCancelChanges,
  onUpdateChanges,
  hasFilterCancel = true
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
        <Form>
          <div className="search-filters-header">
            <div className="search-filters-header-content">
              <ul className="search-filters-actions">
                <li>
                  <Button type="text" onClick={onSaveChanges}>
                    <span className="visually-hidden">Save</span>
                    <FaCheck />
                  </Button>
                </li>
                {hasFilterCancel && (
                  <li className="search-filters-actions-cancel">
                    <Button type="text" onClick={onCancelChanges}>
                      <span className="visually-hidden">Cancel</span>
                      <FaTimes />
                    </Button>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <ul className="search-filters-available">
            {filters.map((filter = {}, index) => {
              const {
                label,
                id,
                type = 'default',
                value,
                defaultValue
              } = filter;
              return (
                <li key={`SearchFilters-Available-${index}`}>
                  {(type === 'checklist' || type === 'radiolist') &&
                    (() => {
                      const { list } = filter;
                      return (
                        <SearchFiltersList
                          id={id}
                          label={label}
                          list={list}
                          activeValues={value || []}
                          type={type}
                          onChange={handleFilterChange}
                        />
                      );
                    })()}

                  {type === 'range' &&
                    (() => {
                      const { range } = filter;
                      return (
                        <SearchFiltersRange
                          id={id}
                          label={label}
                          value={value || defaultValue}
                          range={range}
                          onChange={handleFilterChange}
                        />
                      );
                    })()}

                  {(!type || type === 'default') &&
                    (() => {
                      return (
                        <InputButton
                          type="checkbox"
                          name={id}
                          label={label}
                          id={`filter-${label}`}
                          onChange={handleFilterChange}
                          isChecked={value === true}
                        />
                      );
                    })()}
                </li>
              );
            })}
          </ul>
          <div className="search-filters-footer">
            <ul className="search-filters-actions">
              <li>
                <Button type={['text', 'icon-before']} onClick={onSaveChanges}>
                  <FaCheck /> Save
                </Button>
              </li>
              {hasFilterCancel && (
                <li className="search-filters-actions-cancel">
                  <Button
                    type={['text', 'icon-before']}
                    onClick={onCancelChanges}
                  >
                    <FaTimes />
                    Cancel
                  </Button>
                </li>
              )}
            </ul>
          </div>
        </Form>
      </Panel>
    </div>
  );
};

SearchFilters.propTypes = {
  className: PropTypes.string,
  filters: PropTypes.array,
  onSaveChanges: PropTypes.func,
  onCancelChanges: PropTypes.func,
  onUpdateChanges: PropTypes.func,
  hasFilterCancel: PropTypes.bool
};

export default SearchFilters;
