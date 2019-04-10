import React from 'react';
import PropTypes from 'prop-types';

import { FormContext } from '../context';
import { useForm } from '../hooks';

/**
 * Form
 * @description Default form component
 */

const Form = ({
  children,
  className,
  name = 'theform',
  onSubmit,
  onChange,
  rules = {},
}) => {
  let formClassName = 'form';

  if (typeof className === 'string') {
    formClassName = `${formClassName} ${className}`;
  }

  const { fields, updateField, handleChange, handleSubmit } = useForm({
    onSubmit,
    onChange,
    rules,
  })

  return (
    <FormContext.Provider value={{fields, updateField}}>
      <form
        className={formClassName}
        name={name}
        action=""
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  className: PropTypes.string,
  name: PropTypes.string,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func
};

export default Form;
