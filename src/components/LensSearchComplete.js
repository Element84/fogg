import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { LensContext } from '../context';

import SearchComplete from './SearchComplete';

const LensSearchComplete = ({ forwardedRef, ...props }) => {
  const { lens = {} } = useContext(LensContext) || {};

  const { handlers: lensHandlers = {}, mapConfig = {} } = lens;
  const { handleOnSearch, resolveLensAutocomplete } = lensHandlers;
  const { textInput, date } = mapConfig;

  return (
    <SearchComplete
      defaultValue={textInput}
      defaultDate={date}
      onSearch={handleOnSearch}
      resolveQueryComplete={resolveLensAutocomplete}
      forwardedRef={forwardedRef}
      {...props}
    />
  );
};

LensSearchComplete.propTypes = {
  forwardedRef: PropTypes.object
};

const LensSearchCompleteWithRefs = React.forwardRef(function lensMap (
  props,
  ref
) {
  return <LensSearchComplete {...props} forwardedRef={ref} />;
});

LensSearchCompleteWithRefs.displayName = 'LensSearchCompleteWithRefs';

export default LensSearchCompleteWithRefs;
