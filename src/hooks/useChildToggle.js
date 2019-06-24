import { useState } from 'react';

const useChildToggle = defaultChecked => {
  const [checked, setChecked] = useState(defaultChecked);

  function handleChange (event) {
    setChecked(event.target.checked);
  }

  return {
    checked,
    handleChange
  };
};

export default useChildToggle;
