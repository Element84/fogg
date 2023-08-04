import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Logger from '../../lib/logger';
import { updateCheckedSelections, findIsCheckedIds } from '../../lib/input';

import InputButton from '../InputButton';

const logger = new Logger('InputButtonList', {
  isBrowser: true
});

const InputButtonList = ({
  id,
  name,
  label,
  options = [],
  type,
  required,
  disabled,
  controlChecked,
  onChange
}) => {
  const selectionOptions = options.map((option, index) => {
    return {
      ...option,
      id: `${name}-${index}`,
      isChecked: !!option.isChecked
    };
  });

  const defaultSelections = findIsCheckedIds(selectionOptions);

  const [selections, updateSelections] = useState(defaultSelections);

  // If we're controlling our input from the outside, sync up any changes
  // with the local state. This is particularly useful for ModInputButtonList
  // that allows a user to cancel an editable state from outside of this
  // component instance

  // As our depenencies, we need to make sure to use options instead of defaultSelections
  // because defaultSelections returns a new array each render, meaning it will never
  // be the same and cause endless firing

  useEffect(() => {
    if (controlChecked) {
      updateSelections(defaultSelections);
    }
  }, [controlChecked, options]);

  if (!name) {
    logger.warn('Missing input name');
  }

  function handleOnChange (e = {}) {
    const { target = {} } = e;
    const { id: targetId } = target;
    let newSelections = [];
    switch (type) {
      case 'radio':
        newSelections.push(targetId);
        break;
      default:
        newSelections = updateCheckedSelections(selections, {
          id: targetId,
          isChecked: !!target.checked
        });
    }

    const selectedOptions = selectionOptions.map((selection) => {
      const isSelected = newSelections.find(
        (option) => option === selection.id
      );
      return {
        ...selection,
        isChecked: !!isSelected
      };
    });

    updateSelections(newSelections);

    if (typeof onChange === 'function') {
      onChange(e, selectedOptions);
    }
  }

  return (
    <div className="form-input input-button-list">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      {Array.isArray(selectionOptions) &&
        selectionOptions.map((option, index) => {
          return (
            <InputButton
              {...option}
              key={`InputButtonList-${id}-${index}`}
              name={name}
              type={type}
              required={required}
              disabled={disabled || option.disabled}
              onChange={handleOnChange}
              controlChecked={controlChecked}
            />
          );
        })}
    </div>
  );
};

InputButtonList.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  type: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  controlChecked: PropTypes.bool,
  onChange: PropTypes.func
};

export default InputButtonList;
