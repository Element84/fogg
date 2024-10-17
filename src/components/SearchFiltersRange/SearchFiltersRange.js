import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { chompFloat } from '../../lib/util';

import FormInputDebounced from '../FormInputDebounced';
import InputRange from '../InputRange';

const SearchFiltersRange = ({
  id,
  label,
  subLabel,
  onChange,
  value = {},
  range = {}
}) => {
  const { min: valueMin, max: valueMax } = value;
  const { min: rangeMin, max: rangeMax } = range;

  const namePrefix = `${id}-range`;

  const [valueMinLocal, setValueMinLocal] = useState(valueMin);
  const [valueMaxLocal, setValueMaxLocal] = useState(valueMax);

  const [minError, updateMinErrorState] = useState(false);
  const [maxError, updateMaxErrorState] = useState(false);

  const [rangeValue, setRangeValue] = useState(value);

  useEffect(() => {
    if (maxError === true) {
      handleInputChange({ target: { id: 'incidence_angle-range-max', value: valueMaxLocal.toString() } });
    }
    if (minError === true) {
      handleInputChange({ target: { id: 'incidence_angle-range-min', value: valueMinLocal.toString() } });
    }
  }, [valueMinLocal, valueMaxLocal, rangeValue]);

  useEffect(() => {
    const { min, max } = value;
    if ((min && (rangeValue.min !== min)) || (max && (rangeValue.max !== max))) {
      setValueMinLocal(min);
      setValueMaxLocal(max);
      setRangeValue({ min, max });
    }
  }, [value]);

  /**
   * handleInputChange
   * @description When the text inputs change, fire away
   */

  function handleInputChange ({ target = {} } = {}) {
    const { id: targetId, value: targetValue } = target;

    if (!targetValue) {
      updateMinErrorState(true);
      return;
    }

    const rangeLimit = targetId.replace(`${namePrefix}-`, '');
    const isCompleteFloat = targetValue && targetValue.substr(-1) !== '.';

    let floatValue = isCompleteFloat && parseFloat(targetValue);

    // If we dont have an actual number, reset back to the value so we can
    // avoid overwriting WIP numbers such as 0.

    if (typeof floatValue !== 'number') {
      floatValue = targetValue;
    }

    setValueMaxLocal(valueMaxLocal);
    setValueMinLocal(valueMinLocal);

    switch (rangeLimit) {
      case 'min':
        setValueMinLocal(floatValue);
        if (floatValue < range.min || floatValue > range.max || floatValue > valueMaxLocal) {
          updateMinErrorState(true);
          return;
        } else {
          updateMinErrorState(false);
          setRangeValue({ min: floatValue, max: rangeValue.max });
        }
        break;
      case 'max':
        setValueMaxLocal(floatValue);
        if (floatValue > range.max || floatValue < range.min || floatValue < valueMinLocal) {
          updateMaxErrorState(true);
          return;
        } else {
          updateMaxErrorState(false);
          setRangeValue({ min: rangeValue.min, max: floatValue });
        }
        break;
      default:
    }

    handleOnChange({
      ...value,
      [rangeLimit]: floatValue
    });
  }

  /**
   * handleInputRangeChange
   * @description When the slider changes, fire away
   */

  function handleOnSliderChange (updatedValue) {
    handleOnChange(updatedValue);

    const cleanedValues = updatedValue;
    const { min, max } = cleanedValues;
    if (parseInt(min) % 1 !== 0) {
      cleanedValues.min = parseInt(parseFloat(cleanedValues.min).toFixed(2));
    }
    if (parseInt(max) % 1 !== 0) {
      cleanedValues.max = parseInt(parseFloat(cleanedValues.max).toFixed(2));
    }

    setValueMaxLocal(cleanedValues.max);
    setValueMinLocal(cleanedValues.min);
    setRangeValue(cleanedValues);

    if (cleanedValues.min < range.min || cleanedValues.min > range.max) {
      updateMinErrorState(true);
      return;
    } else {
      updateMinErrorState(false);
      setRangeValue(cleanedValues);
    }

    if (cleanedValues.max > range.max || cleanedValues.max < range.min) {
      updateMaxErrorState(true);
    } else {
      updateMaxErrorState(false);
      setRangeValue(cleanedValues);
    }
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

    // Make sure the min  value is normalized and not outside the range

    if (updatedValue.min < rangeMin) {
      updatedValue.min = rangeMin;
    }

    if (updatedValue.min > rangeMax) {
      updatedValue.min = rangeMax;
    }

    // Make sure the max value is normalized and not outside the range

    if (updatedValue.max < rangeMin) {
      updatedValue.max = rangeMin;
    }

    if (updatedValue.max > rangeMax) {
      updatedValue.max = rangeMax;
    }

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
      {(label || subLabel) && (
        <div className="search-filters-available-label">
          {label && <strong>{label}</strong>}
          {subLabel && (
            <div className="search-filters-available-sublabel">{subLabel}</div>
          )}
        </div>
      )}
      <div className="search-filters-range">
        <div className={`search-filters-range-input ${minError ? 'min-error' : ''} ${maxError ? 'max-error' : ''}`}>
          <FormInputDebounced
            id={`${namePrefix}-min`}
            type="number"
            label="Min"
            value={Math.round(rangeValue.min * 100) / 100}
            onChange={handleInputChange}
          />
          <FormInputDebounced
            id={`${namePrefix}-max`}
            type="number"
            label="Max"
            value={Math.round(rangeValue.max * 100) / 100}
            onChange={handleInputChange}
          />
          <span className="error">{`${minError ? 'Invalid Min Range' : ''}`}</span>
          <span className="error">{`${maxError ? 'Invalid Max Range' : ''}`}</span>
        </div>
        <div className="search-filters-range-slider">
          <InputRange
            minValue={rangeMin}
            maxValue={rangeMax}
            step={0.01}
            value={rangeValue}
            onChangeComplete={handleOnSliderChange}
          />
        </div>
        <p className="search-filters-range-note">
          Values outside of range will default to min and max.
        </p>
      </div>
    </>
  );
};

SearchFiltersRange.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  subLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onChange: PropTypes.func,
  value: PropTypes.object,
  range: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  })
};

export default SearchFiltersRange;
