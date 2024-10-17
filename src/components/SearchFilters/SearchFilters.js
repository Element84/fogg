import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { findFilterById } from '../../lib/filters';

import Panel from '../Panel';
import Form from '../Form';
import InputButton from '../InputButton';
import Button from '../Button';
import SearchFiltersList from '../SearchFiltersList';
import SearchFiltersRange from '../SearchFiltersRange';
import { ALL_VALUES_ITEM } from '../../data/search-filters';

const SearchFilters = ({
  className,
  filters = [],
  onSaveChanges,
  onCancelChanges,
  onUpdateChanges,
  hasFilterCancel = true
}) => {
  const [toggleState, setToggleState] = useState({});

  if (!Array.isArray(filters) || filters.length === 0) {
    return null;
  }

  /**
   * handleFilterChange
   * @description Triggers when a filter change is detected
   */

  function handleFilterChange ({ target = {}, ...rest } = {}) {
    const id = target.name;
    const activeFilter = findFilterById(filters, id);
    let value = target.value || target.checked;

    // Unique Logic for checkbox filters
    if (typeof value === 'string' && activeFilter.type === 'checklist') {
      // Initial load, no filters selected yet
      if (!Array.isArray(activeFilter.value)) {
        value = [value];
      } else if (target.value === ALL_VALUES_ITEM) {
        // If selecting "All Values", deselect all active filters
        value = [target.value];
      } else if (activeFilter.value.includes(value)) {
        // Remove filter on click if already checked
        value = activeFilter.value.filter(val => val !== value);
      } else {
        // Default behavior, add item to current filters
        value = activeFilter.value.concat([value]);
        // De-select "All Values" if selecting anything other than it
        if (activeFilter.value.includes(ALL_VALUES_ITEM) && target.value !== ALL_VALUES_ITEM) {
          value = value.filter(val => val !== ALL_VALUES_ITEM);
        }
      }
    }

    if (typeof onUpdateChanges === 'function') {
      onUpdateChanges([
        {
          id,
          value
        }
      ]);
      const toToggle = value.length >= activeFilter.list.length;
      setToggleState((prevState) => {
        return {
          ...prevState,
          [id]: toToggle
        };
      });
    }
  }

  /**
   * handleChecklistClear
   * @description Triggers when a filter checklist clear button is clicked
   */

  function handleChecklistClear ({ target = {} }) {
    if (typeof onUpdateChanges === 'function') {
      onUpdateChanges([
        {
          id: target.name,
          value: []
        }
      ]);
    }
  }

  function handleCheckListToggle ({ target = {} }) {
    if (typeof onUpdateChanges === 'function') {
      const id = target.name;
      const toToggle = !toggleState[id];
      const activeFilter = findFilterById(filters, id);
      onUpdateChanges([{
        id,
        value: toToggle ? activeFilter.list : []
      }]);
      setToggleState((prevState) => ({
        ...prevState,
        [id]: toToggle
      }));
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
                subLabel,
                id,
                type = 'default',
                value,
                defaultValue = [],
                shouldToggleItems = false,
                showAllValuesListItem = true
              } = filter;
              return (
                <li key={`SearchFilters-Available-${index}`}>
                  {(type === 'checklist' || type === 'radiolist') &&
                    (() => {
                      const { list, displayList } = filter;
                      return (
                        <SearchFiltersList
                          id={id}
                          label={label}
                          subLabel={subLabel}
                          list={list}
                          displayList={displayList}
                          activeValues={value || defaultValue}
                          type={type}
                          onChange={handleFilterChange}
                          onClearChecklist={handleChecklistClear}
                          onToggleChecklist={shouldToggleItems ? handleCheckListToggle : undefined}
                          toggleChecklistValue={toggleState[id]}
                          showAllValuesListItem={showAllValuesListItem}
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
                          subLabel={subLabel}
                          value={value || defaultValue || range}
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
