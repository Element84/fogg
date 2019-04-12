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
  rules = {}
}) => {
  let formClassName = 'form';

  const formHook = {
    onSubmit,
    onChange,
    rules
  };

  const {
    updateField,
    handleChange,
    handleSubmit,
    invalidFields = []
  } = useForm(formHook);

  if (typeof className === 'string') {
    formClassName = `${formClassName} ${className}`;
  }

  if (Array.isArray(invalidFields) && invalidFields.length > 0) {
    formClassName = `${formClassName} form-not-valid`;
  }

  return (
    <FormContext.Provider value={{ invalidFields, updateField }}>
      <form
        className={formClassName}
        name={name}
        action=""
        onSubmit={handleSubmit}
        onChange={handleChange}
        noValidate={true}
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
  onChange: PropTypes.func,
  rules: PropTypes.object
};

export default Form;
