import React from 'react';
import PropTypes from 'prop-types';

/**
 * Form
 * @description Default form component
 */

const Form = ({
  children,
  className,
  name = 'theform',
  onSubmit,
  onInput,
  onChange
}) => {
  let formClassName = 'form';

  if (typeof className === 'string') {
    formClassName = `${formClassName} ${className}`;
  }

  /**
   * handleSubmit
   * @description Manages event handler for submit type events on the form
   */

  function handleSubmit (event) {
    if (typeof onSubmit === 'function') {
      onSubmit(event);
    }
  }

  /**
   * handleInput
   * @description Manages event handler for input type events on the form
   */

  function handleInput (event) {
    if (typeof onInput === 'function') {
      onInput(event);
    }
  }

  /**
   * handleChange
   * @description Manages event handler for change type events on the form
   */

  function handleChange (event) {
    if (typeof onChange === 'function') {
      onChange(event);
    }
  }

  return (
    <form
      className={formClassName}
      name={name}
      action=""
      onSubmit={handleSubmit}
      onInput={handleInput}
      onChange={handleChange}
    >
      {children}
    </form>
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
  onInput: PropTypes.func,
  onChange: PropTypes.func
};

export default Form;
