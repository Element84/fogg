import React from 'react';
import PropTypes from 'prop-types';

import { chompFloat } from '../lib/util';

import FormInputDebounced from './FormInputDebounced';
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

  /**
   * handleInputChange
   * @description When the text inputs change, fire away
   */

  function handleInputChange ({ target = {} } = {}) {
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

  /**
   * handleInputChange
   * @description When the slider changes, fire away
   */

  function handleOnSliderChange (updatedValue) {
    handleOnChange(updatedValue);
  }

  /**
   * handleOnChange
   * @description Manages all changes to bubble up to the parent component
   */

  function handleOnChange ({ min, max } = {}) {
    // Before we update, we want to normalize the values to fix
    // them to a maximum of 2 decimal places

    const updatedValue = {
      min: typeof min === 'number' ? chompFloat(min, 2) : min,
      max: typeof max === 'number' ? chompFloat(max, 2) : max
    };

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
          <FormInputDebounced
            id={`${namePrefix}-min`}
            label="Min"
            value={valueMin}
            onChange={handleInputChange}
          />
          <FormInputDebounced
            id={`${namePrefix}-max`}
            label="Max"
            value={valueMax}
            onChange={handleInputChange}
          />
        </div>
        <div className="search-filters-range-slider">
          <InputRange
            minValue={rangeMin}
            maxValue={rangeMax}
            step={0.01}
            value={value}
            onChangeComplete={handleOnSliderChange}
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
