import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { chompFloat } from '../../lib/util';

import FormInputDebounced from '../FormInputDebounced';

const SearchFiltersMinMax = ({
  id,
  label,
  subLabel,
  onChange,
  value = {},
  limits = {}
}) => {
  const { min: valueMin, max: valueMax } = value;
  const { min: limitsMin, max: limitsMax } = limits;

  const namePrefix = `${id}-minmax`;

  const [valueMinLocal, setValueMinLocal] = useState(valueMin);
  const [valueMaxLocal, setValueMaxLocal] = useState(valueMax);

  const [minError, updateMinErrorState] = useState(false);
  const [maxError, updateMaxErrorState] = useState(false);

  useEffect(() => {
    if (maxError === true) {
      handleInputChange({ target: { id: `${namePrefix}-max`, value: valueMaxLocal.toString() } });
    }
    if (minError === true) {
      handleInputChange({ target: { id: `${namePrefix}-min`, value: valueMinLocal.toString() } });
    }
  }, [valueMinLocal, valueMaxLocal]);

  useEffect(() => {
    const { min, max } = value;
    if (valueMinLocal !== min) {
      setValueMinLocal(min);
    }
    if (valueMaxLocal !== max) {
      setValueMaxLocal(max);
    }
  }, [value, valueMinLocal, valueMaxLocal]);

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

    const inputName = targetId.replace(`${namePrefix}-`, '');
    const isCompleteFloat = targetValue && targetValue.substr(-1) !== '.';

    let floatValue = isCompleteFloat && parseFloat(targetValue);

    // If we dont have an actual number, reset back to the value so we can
    // avoid overwriting WIP numbers such as 0.

    if (typeof floatValue !== 'number') {
      floatValue = targetValue;
    }

    setValueMaxLocal(valueMaxLocal);
    setValueMinLocal(valueMinLocal);

    switch (inputName) {
      case 'min':
        setValueMinLocal(floatValue);
        if (floatValue < limitsMin.min || floatValue > limitsMin.max) {
          updateMinErrorState(true);
          return;
        } else {
          updateMinErrorState(false);
        }
        break;
      case 'max':
        setValueMaxLocal(floatValue);
        if (floatValue > limitsMax.max || floatValue < limitsMax.min) {
          updateMaxErrorState(true);
          return;
        } else {
          updateMaxErrorState(false);
        }
        break;
      default:
    }

    handleOnChange({
      ...value,
      [inputName]: floatValue
    });
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

    // Make sure the min  value is normalized and not outside the limits

    if (updatedValue.min < limitsMin.min) {
      updatedValue.min = limitsMin.min;
    }

    if (updatedValue.min > limitsMin.max) {
      updatedValue.min = limitsMax.max;
    }

    // Make sure the max value is normalized and not outside the limits

    if (updatedValue.max < limitsMax.min) {
      updatedValue.max = limitsMax.min;
    }

    if (updatedValue.max > limitsMax.max) {
      updatedValue.max = limitsMax.max;
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
      <div className="search-filters-minmax">
        <div className={`search-filters-minmax-input ${minError ? 'min-error' : ''} ${maxError ? 'max-error' : ''}`}>
          <FormInputDebounced
            id={`${namePrefix}-min`}
            type="number"
            label="Min"
            value={Math.round(valueMinLocal * 100) / 100}
            onChange={handleInputChange}
          />
          <FormInputDebounced
            id={`${namePrefix}-max`}
            type="number"
            label="Max"
            value={Math.round(valueMaxLocal * 100) / 100}
            onChange={handleInputChange}
          />
          <span className="error">{`${minError ? 'Invalid Min Value' : ''}`}</span>
          <span className="error">{`${maxError ? 'Invalid Max Value' : ''}`}</span>
        </div>
        <p className="search-filters-minmax-note">
          Values outside of limits will default to min and max.
        </p>
      </div>
    </>
  );
};

SearchFiltersMinMax.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  subLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onChange: PropTypes.func,
  value: PropTypes.object,
  limits: PropTypes.shape({
    min: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number
    }),
    max: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number
    })
  })
};

export default SearchFiltersMinMax;
