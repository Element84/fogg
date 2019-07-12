import React from 'react';
import PropTypes from 'prop-types';

import { useInput } from '../hooks';

const Input = ({
  className,
  props,
  value,
  onChange,
  onInput,
  onKeyDown,
  onFocus,
  dataList
}) => {
  const { type = 'text', inputProps } = useInput({ props });

  const componentProps = {
    className: `input ${className}`,
    type,
    onChange,
    onInput,
    onKeyDown,
    onFocus,
    ...inputProps
  };

  let dataListId;

  // Only set this if it's actually defined, as we don't want to have issues with
  // switching between controlled vs uncontrolled components

  if (typeof value !== 'undefined') {
    componentProps.value = value;
  }

  if (Array.isArray(dataList)) {
    dataListId = `${componentProps.name}-datalist`;
    componentProps.list = dataListId;
  }

  return (
    <>
      <input {...componentProps} />
      {dataListId && (
        <datalist id={dataListId}>
          {dataList.map((item, index) => (
            <option key={`${dataListId}-${index}`} value={item} />
          ))}
        </datalist>
      )}
    </>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  props: PropTypes.object,
  value: PropTypes.string,
  dataList: PropTypes.array,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  onKeyDown: PropTypes.func,
  onFocus: PropTypes.func
};

export default Input;
