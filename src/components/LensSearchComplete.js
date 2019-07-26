import React, { useContext } from 'react';
import { LensContext } from '../context';

import SearchComplete from './SearchComplete';

const LensSearchComplete = (props) => {

  const { lens = {} } = useContext(LensContext) || {}

  const { handlers: lensHandlers = {}, clearSearchInput, mapConfig = {} } = lens;
  const { handleOnSearch, resolveLensAutocomplete } = lensHandlers;
  const { textInput, date } = mapConfig;

  return (
    <SearchComplete
      defaultValue={textInput}
      defaultDate={date}
      onSearch={handleOnSearch}
      resolveQueryComplete={resolveLensAutocomplete}
      clearSearchInput={clearSearchInput}
      {...props}
    />
  );
};

export default LensSearchComplete;

