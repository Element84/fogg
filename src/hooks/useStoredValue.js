import { useState, useEffect } from 'react';

/**
 * useStoredValue
 * @description Provides a mechanism of retaining a temporary value that you can save or cancel
 */

export default function useStoredValue (defaultValue) {
  const [value, updateValue] = useState(defaultValue);
  const [tempValue, updateTempValue] = useState(value);

  // If the default value changes, update the stored values to reflect it as
  // it's being controlled from the parent

  useEffect(() => {
    handleUpdateValue(defaultValue);
    handleSaveChanges();
  }, [defaultValue]);

  /**
   * handleUpdateValue
   */

  function handleUpdateValue (value) {
    updateTempValue(value);
  }

  /**
   * handleSaveChanges
   */

  function handleSaveChanges () {
    updateValue(tempValue);
  }

  /**
   * handleCancelChanges
   */

  function handleCancelChanges () {
    updateTempValue(value);
  }

  return {
    updateValue: handleUpdateValue,
    saveChanges: handleSaveChanges,
    cancelChanges: handleCancelChanges,
    value: tempValue
  };
}
