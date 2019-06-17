import { useState } from 'react';

const useModValue = defaultValue => {
  const [isChangeable, updateChangeable] = useState(false);
  const [originalValue, updateOriginalValue] = useState(defaultValue);
  const [value, updateValue] = useState(originalValue);

  return {
    isChangeable,
    updateChangeable,
    originalValue,
    updateOriginalValue,
    value,
    updateValue
  };
};

export default useModValue;
