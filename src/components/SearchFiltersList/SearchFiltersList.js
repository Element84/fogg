import React from 'react';
import PropTypes from 'prop-types';

import { FaTimes } from 'react-icons/fa';

import InputButton from '../InputButton';
import Button from '../Button';

const ALL_VALUES_ITEM = 'All Values';

const SearchFiltersList = ({
  id,
  label,
  list = [],
  onChange,
  onClearChecklist,
  activeValues = [],
  type = 'checklist'
}) => {
  let inputType;
  const filtersList = [...list];
  const noActiveValues =
    typeof activeValues === 'undefined' || activeValues.length === 0;

  if (type === 'radiolist') {
    inputType = 'radio';
    filtersList.push(ALL_VALUES_ITEM);
  } else if (type === 'checklist') {
    inputType = 'checkbox';
  }

  function handleChange (e) {
    if (typeof onChange === 'function') {
      onChange(e);
    }
  }

  Array.isArray(filtersList) && filtersList.sort();

  return (
    <>
      {type === 'checklist'
        ? (
            <div className="search-filters-available-header">
              {label && (
                <strong className="search-filters-available-label">{label}</strong>
              )}
              <Button
                disabled={noActiveValues}
                onClick={onClearChecklist}
                type="text"
                className="button-icon-before"
                name={id}
              ><FaTimes className="icon-times" />Clear</Button>
            </div>
          )
        : (
          label && (
            <strong className="search-filters-available-label">{label}</strong>
          ))
      }
      

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
  list: PropTypes.array,
  onChange: PropTypes.func,
  onClearChecklist: PropTypes.func,
  activeValues: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  type: PropTypes.string
};

export default SearchFiltersList;
