import { useState, useContext, useEffect } from 'react';
import { ModFormContext } from '../context';

const useModValue = props => {
  const { inputName, defaultValue, onSave, allowEmpty } = props;

  const [isChangeable, updateChangeable] = useState(false);
  const [originalValue, updateOriginalValue] = useState(defaultValue);
  const [value, updateValue] = useState(originalValue);

  const { updateField, isFormEditable, isAllFieldsEditable, shouldSaveForm } =
    useContext(ModFormContext) || {};

  useEffect(() => {
    updateOriginalValue(defaultValue);
    updateValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (typeof updateField === 'function') {
      updateField(inputName, isChangeable);
    }
  }, [inputName, isChangeable]);

  useEffect(() => {
    if (isFormEditable && isAllFieldsEditable) {
      // if all fields are editable, we can set isChangeable
      // to true for all fields
      updateChangeable(true);
    }
    if (!isFormEditable) {
      updateChangeable(false);
      // if the form isn't editable, then not fields should have
      // isChangeable set to true. we want to save the fields that
      // should be saved and clear the changes if not
      if (shouldSaveForm) {
        handleOnModSave();
      } else {
        updateValue(originalValue);
      }
    }
  }, [isFormEditable, isAllFieldsEditable]);

  /**
   * handleOnModSave
   * @description Manages save events. Updates "original" value and triggers onSave
   */

  function handleOnModSave () {
    const newValueIsEmpty = !value || value === '';

    if (newValueIsEmpty && !allowEmpty) {
      updateValue(originalValue);
      return;
    }

    updateOriginalValue(value);

    if (typeof onSave === 'function') {
      onSave(value, inputName);
    }
  }

  return {
    isChangeable,
    updateChangeable,
    originalValue,
    updateOriginalValue,
    value,
    updateValue,
    handlers: {
      handleOnModSave
    }
  };
};

export default useModValue;
