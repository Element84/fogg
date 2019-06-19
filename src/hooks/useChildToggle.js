import { useState } from 'react';

const useChildToggle = defaultValue => {
  const [checked, setChecked] = useState(defaultValue);

  function handleChange (event) {
    setChecked(event.target.checked);
  }

  return {
    checked,
    handleChange
  };
};

export default useChildToggle;
