import React from 'react';
import PropTypes from 'prop-types';

import { FaTimes, FaCheckDouble, FaMinus } from 'react-icons/fa';

import InputButton from '../InputButton';
import Button from '../Button';
import { ALL_VALUES_ITEM } from '../../data/search-filters';

/**
 * @template {string[]} FilterItemValues
 * @param {object} param0
 * @param {string} param0.id
 * @param {string} [param0.label]
 * @param {string} [param0.subLabel]
 * @param {FilterItemValues} [param0.list=[]] List of input values, e.g. ['value1', 'value2', ...]
 * @param {{[x in FilterItemValues]: string}} [param0.displayList={}] Dictionary style object for adding friendly display names.
 *                                               Keys should match a value in param0.list, and the value is the friendly display name,
 *                                               e.g. { value1: 'Display Value 1', value2: 'Display Value 2', ... }
 * @param {Function} [param0.onChange]
 * @param {Function} [param0.onClearChecklist]
 * @param {StringValue[]} [activeValues=[]]
 * @param {'checklist'|'radiolist'} [param0.type='checklist']
 * @returns {React.Component}
 */
const SearchFiltersList = ({
  id,
  label,
  subLabel,
  list = [],
  displayList = {},
  onChange,
  onClearChecklist,
  onToggleChecklist,
  toggleChecklistValue,
  activeValues = [],
  type = 'checklist',
  showAllValuesListItem = true
}) => {
  let inputType;
  const filtersList = [...list];
  const noActiveValues =
    typeof activeValues === 'undefined' ||
    activeValues.length === 0 ||
    activeValues.includes(ALL_VALUES_ITEM);

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

  // sort the array before pushing the all values item to the front
  if (Array.isArray(filtersList)) {
    filtersList.sort();
    filtersList.unshift(ALL_VALUES_ITEM);
  }

  const SelectAllButton = () => (
    <Button
      onClick={onToggleChecklist}
      type="text"
      className="button-icon-before"
      name={id}
    >
      {toggleChecklistValue
        ? (<><FaMinus /> Select None</>)
        : (<><FaCheckDouble /> Select All</>)}
    </Button>
  );

  const ClearButton = () => (
    <Button
      disabled={noActiveValues}
      onClick={onClearChecklist}
      type="text"
      className="button-icon-before"
      name={id}
    >
      <FaTimes className="icon-times" />
      Clear
    </Button>
  );

  return (
    <>
      {type === 'checklist'
        ? (
          <div className="search-filters-available-header">
            {(label || subLabel) && (
              <div className="search-filters-available-label">
                {label && <strong>{label}</strong>}
                {subLabel && (
                  <div className="search-filters-available-sublabel">
                    {subLabel}
                  </div>
                )}
              </div>
            )}

            {typeof onToggleChecklist === 'function' && (
              <SelectAllButton/>
            )}
            {typeof onToggleChecklist !== 'function' && typeof onClearChecklist === 'function' && (
              <ClearButton/>
            )}
          </div>
          )
        : (
            (label || subLabel) && (
              <div className="search-filters-available-label">
                {label && <strong>{label}</strong>}
                {subLabel && (
                  <div className="search-filters-available-sublabel">
                    {subLabel}
                  </div>
                )}
              </div>
            )
          )}
      {Array.isArray(filtersList) && (
        <ul className="search-filters-available-list">
          {filtersList
            .filter((value) => {
              if (value === ALL_VALUES_ITEM && showAllValuesListItem === false) {
                return false;
              }
              return true;
            })
            .map((value, index) => {
              let isChecked = false;
              if (Array.isArray(activeValues) && activeValues.includes(value)) {
                isChecked = true;
              } else if (activeValues === value) {
                isChecked = true;
              } else if (noActiveValues && value === ALL_VALUES_ITEM) {
                isChecked = true;
              }

              return (
                <li key={`SearchFiltersList-Item-${index}`}>
                  <InputButton
                    type={inputType}
                    name={id}
                    label={displayList[value] || value}
                    id={`filter-${id}-${value}`}
                    value={value}
                    onChange={handleChange}
                    isChecked={isChecked}
                    controlChecked={true}
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
  subLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  list: PropTypes.array,
  displayList: PropTypes.object,
  onChange: PropTypes.func,
  onClearChecklist: PropTypes.func,
  onToggleChecklist: PropTypes.func,
  toggleChecklistValue: PropTypes.bool,
  activeValues: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  type: PropTypes.string,
  showAllValuesListItem: PropTypes.bool
};

export default SearchFiltersList;
