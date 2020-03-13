import React from 'react';
import PropTypes from 'prop-types';
import { FaPencilAlt, FaCheck, FaTimes } from 'react-icons/fa';

import { useModValue } from '../../hooks';

import FormInput from '../FormInput';
import Button from '../Button';

const ModInput = ({
  id,
  name,
  defaultValue = '',
  onSave,
  label,
  allowEmpty = false,
  onKeyDown
}) => {
  const inputName = name || id;

  const {
    isChangeable,
    updateChangeable,
    originalValue,
    value,
    updateValue,
    handlers
  } = useModValue({
    inputName,
    onSave,
    defaultValue,
    allowEmpty
  });

  const { handleOnModSave } = handlers;

  const icon = isChangeable ? <FaCheck /> : <FaPencilAlt />;

  /**
   * handleChangeClick
   * @description Fires when editable state change toggle is clicked. If the toggle state
   *     is going from changeable and is saving, it will trigger a save event
   */

  function handleChangeClick (e) {
    e.preventDefault();
    const shouldSave = !!isChangeable;
    updateChangeable(!isChangeable);
    if (shouldSave) {
      handleOnModSave();
    }
  }

  /**
   * handleCancelClick
   * @description Fires when the editable state is canceled. Reverts value to last saved value
   */

  function handleCancelClick () {
    updateValue(originalValue);
    updateChangeable(!isChangeable);
  }

  /**
   * handleOnInputchange
   * @description Fires when form input has been modified
   */

  function handleOnInputchange ({ target } = {}) {
    updateValue(target.value || '');
  }

  const formInputProps = {
    id,
    label,
    name: inputName,
    value: isChangeable ? value : originalValue,
    onChange: handleOnInputchange,
    onKeyDown,
    disabled: !isChangeable
  };

  return (
    <div className="mod-input" data-modinput-is-changeable={!!isChangeable}>
      <div className="mod-input-value">
        <FormInput {...formInputProps} />
      </div>
      <div className="mod-input-actions">
        {isChangeable && (
          <Button
            className="button-circle mod-input-cancel"
            onClick={handleCancelClick}
          >
            <FaTimes />
          </Button>
        )}
        <Button className="button-circle" onClick={handleChangeClick}>
          {icon}
        </Button>
      </div>
    </div>
  );
};

ModInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  onSave: PropTypes.func,
  onKeyDown: PropTypes.func,
  allowEmpty: PropTypes.bool
};

export default ModInput;
