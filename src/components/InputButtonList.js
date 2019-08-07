import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Logger from '../lib/logger';
import { updateCheckedSelections, findIsCheckedIds } from '../lib/util';

import InputButton from './InputButton';

const logger = new Logger('InputButtonList', {
  isBrowser: true
});

const InputButtonList = ({
  id,
  name,
  options = [],
  type,
  required,
  onChange
}) => {
  const selectionOptions = options.map((option, index) => {
    return {
      ...option,
      id: `${name}-${index}`
    };
  });

  const defaultSelections = findIsCheckedIds(selectionOptions);

  const [selections, updateSelections] = useState(defaultSelections);

  if (!name) {
    logger.warn(`Missing input name`);
  }

  function handleOnChange (e = {}) {
    const { target = {} } = e;
    const { id: targetId } = target;
    const newSelections = updateCheckedSelections(selections, {
      id: targetId,
      isChecked: target.checked
    });
    const selectedOptions = newSelections.map(selection => {
      return selectionOptions.find(option => option.id === selection);
    });

    updateSelections(newSelections);

    if (typeof onChange === 'function') {
      onChange(e, selectedOptions);
    }
  }

  return (
    <div className="input-button-list">
      {Array.isArray(selectionOptions) &&
        selectionOptions.map((option, index) => {
          return (
            <InputButton
              {...option}
              key={`InputButtonList-${id}-${index}`}
              name={name}
              type={type}
              required={required}
              onChange={handleOnChange}
            />
          );
        })}
    </div>
  );
};

InputButtonList.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  type: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func
};

export default InputButtonList;
