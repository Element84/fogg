import React from 'react';
import PropTypes from 'prop-types';

import { useInput } from '../../hooks';

const Textarea = ({ className, props, onChange, onInput }) => {
  const { inputProps } = useInput({ props });

  return (
    <textarea
      className={`textarea ${className}`}
      onChange={onChange}
      onInput={onInput}
      {...inputProps}
    />
  );
};

Textarea.propTypes = {
  className: PropTypes.string,
  props: PropTypes.object,
  onChange: PropTypes.func,
  onInput: PropTypes.func
};

export default Textarea;
