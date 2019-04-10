import { useState } from 'react';

const useRepeater = () => {
  const [checked, setChecked] = useState(false);

  function handleChange (event) {
    setChecked(event.target.checked);
  }

  return {
    checked,
    handleChange
  };
};

export default useRepeater;
