import { useState } from 'react';

const useModValue = (defaultValue, forceDisable) => {
  const [isChangeable, updateChangeable] = useState(!forceDisable);
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
