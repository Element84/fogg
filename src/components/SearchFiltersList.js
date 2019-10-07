import React from 'react';
import PropTypes from 'prop-types';

import InputButton from './InputButton';

const ALL_VALUES_ITEM = 'All Values';

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

export default SearchFiltersList;
