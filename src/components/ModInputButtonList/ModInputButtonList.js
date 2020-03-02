import React from 'react';
import PropTypes from 'prop-types';
import { FaPencilAlt, FaCheck, FaTimes } from 'react-icons/fa';

import { useModValue } from '../../hooks';

import InputButtonList from '../InputButtonList';
import Button from '../Button';

const ModInputButtonList = ({
  id,
  name,
  type,
  label,
  required,
  onSave,
  options = []
}) => {
  const inputName = name || id;

  const {
    isChangeable,
    updateChangeable,
    originalValue,
    updateValue,
    handlers,
    value
  } = useModValue({
    defaultValue: options,
    inputName,
    onSave
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

  function handleOnInputchange (e, updatedValue) {
    updateValue(updatedValue || []);
  }

  const optionsMap = options.map(option => {
    const optionValue = value.find(val => val.value === option.value);
    return {
      ...option,
      isChecked: optionValue ? optionValue.isChecked : false
    };
  });

  const formInputProps = {
    id,
    label,
    name: inputName,
    options: optionsMap,
    type,
    required,
    onChange: handleOnInputchange,
    disabled: !isChangeable
  };

  return (
    <div
      className="mod-input mod-input-button-list"
      data-modinput-is-changeable={!!isChangeable}
    >
      <div className="mod-input-value">
        <InputButtonList
          {...formInputProps}
          disabled={!isChangeable}
          controlChecked={true}
        />
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

ModInputButtonList.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  onSave: PropTypes.func,
  options: PropTypes.array
};

export default ModInputButtonList;
