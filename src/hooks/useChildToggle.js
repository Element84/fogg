import { useState } from 'react';

const useChildToggle = defaultChecked => {
  const [checked, setChecked] = useState(defaultChecked);

  function handleChange (event) {
    const isChecked = !!event.target.checked;
    setChecked(isChecked);
    return isChecked;
  }

  return {
    checked,
    handleChange
  };
};

export default useChildToggle;
