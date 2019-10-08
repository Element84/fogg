import { useState } from 'react';

/**
 * useStoredValue
 * @description Provides a mechanism of retaining a temporary value that you can save or cancel
 */

export default function useStoredValue (defaultValue) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const [value, updateValue] = useState(defaultValue);
  const [tempValue, updateTempValue] = useState(value);

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
