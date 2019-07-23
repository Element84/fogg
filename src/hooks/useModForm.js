import { useState } from 'react';

const useModValue = () => {
  const [isFormEditable, setIsFormEditable] = useState(false);
  const [isAllFieldsEditable, setIsAllFieldsEditable] = useState(false);
  const [shouldSaveForm, setShouldSaveForm] = useState(false);
  return {
    isFormEditable,
    setIsFormEditable,
    isAllFieldsEditable,
    setIsAllFieldsEditable,
    shouldSaveForm,
    setShouldSaveForm
  };
};

export default useModValue;
