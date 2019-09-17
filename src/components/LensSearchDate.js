import React, { useContext } from 'react';
import { LensContext } from '../context';

import SearchDate from './SearchDate';

const LensSearchDate = () => {
  const { lens = {} } = useContext(LensContext) || {};
  const { handlers: lensHandlers = {}, date } = lens;
  const { handleDateChange } = lensHandlers;

  return (
    <SearchDate
      onChange={handleDateChange}
      defaultDate={date}
      classPrefix={'search-box-controls'}
    />
  );
};

export default LensSearchDate;
