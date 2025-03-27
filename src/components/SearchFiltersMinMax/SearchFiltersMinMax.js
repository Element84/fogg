import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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
    const inputName = targetId.replace(`${namePrefix}-`, '');

    if (!targetValue) {
      if (inputName === 'min') {
        updateMinErrorState(true);
      } else if (inputName === 'max') {
        updateMaxErrorState(true);
      }
      return;
    }

    const isCompleteFloat = targetValue && targetValue.substr(-1) !== '.';

    let floatValue = isCompleteFloat && parseFloat(targetValue);

    // If we dont have an actual number, reset back to the value so we can
    // avoid overwriting WIP numbers such as 0.

    if (typeof floatValue !== 'number') {
      floatValue = targetValue;
    }

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

    if (typeof onChange === 'function') {
      onChange({
        target: {
          name: id,
          value: floatValue
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
