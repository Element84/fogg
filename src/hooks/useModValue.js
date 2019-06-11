import { useState } from 'react';

const useModValue = (defaultValue, forceReset) => {
  const [isChangeable, updateChangeable] = useState(!forceReset);
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
