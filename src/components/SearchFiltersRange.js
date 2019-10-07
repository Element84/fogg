import React from 'react';
import PropTypes from 'prop-types';

import FormInput from './FormInput';
import InputRange from './InputRange';

const SearchFiltersRange = ({
  id,
  label,
  onChange,
  value = {},
  range = {}
}) => {
  const { min: valueMin, max: valueMax } = value;
  const { min: rangeMin, max: rangeMax } = range;

  const namePrefix = `${id}-range`;

  function handleChange ({ target = {} } = {}) {
    const { id: targetId, value: targetValue } = target;
    const rangeLimit = targetId.replace(`${namePrefix}-`, '');
    const isCompleteFloat = targetValue && targetValue.substr(-1) !== '.';

    let floatValue = isCompleteFloat && parseFloat(targetValue);

    // If we dont have an actual number, reset back to the value so we can
    // avoid overwriting WIP numbers such as 0.

    if (typeof floatValue !== 'number') {
      floatValue = targetValue;
    }

    handleOnChange({
      ...value,
      [rangeLimit]: floatValue
    });
  }

  function handleOnSliderChange (updatedValue) {
    handleOnChange(updatedValue);
  }

  function handleOnChange (updatedValue) {
    if (typeof onChange === 'function') {
      onChange({
        target: {
          name: id,
          value: updatedValue
        }
      });
    }
  }

  return (
    <>
      {label && (
        <strong className="search-filters-available-label">{label}</strong>
      )}
      <div className="search-filters-range">
        <div className="search-filters-range-input">
          <FormInput
            id={`${namePrefix}-min`}
            label="Min"
            value={valueMin}
            onChange={handleChange}
          />
          <FormInput
            id={`${namePrefix}-max`}
            label="Max"
            value={valueMax}
            onChange={handleChange}
          />
        </div>
        <div className="search-filters-range-slider">
          <InputRange
            minValue={rangeMin}
            maxValue={rangeMax}
            step={0.01}
            value={value}
            onChange={handleOnSliderChange}
          />
        </div>
      </div>
    </>
  );
};

SearchFiltersRange.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.object,
  range: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  })
};

export default SearchFiltersRange;
