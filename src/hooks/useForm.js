import { useState } from 'react';

import { FormContext } from '../context';

const useForm = ({ onSubmit, onChange, rules }) => {

  const [fields, setFields] = useState({});

  /**
   * handleSubmit
   * @description Manages event handler for submit type events on the form
   */

  function handleSubmit (event) {

    event.persist();
    event.preventDefault();

    // event.target.submit();

    // Returning the passed in function here allows us to return false
    // from the handler, preventing the form from submitting

    if (typeof onSubmit === 'function') {
      return onSubmit(event);
    }

  }

  /**
   * handleChange
   * @description Manages event handler for change type events on the form
   */

  function handleChange (event) {

    event.persist();

    if (typeof onChange === 'function') {
      onChange(event);
    }

  }

  /**
   * handleChange
   * @description Manages event handler for change type events on the form
   */

  function updateField(field = {}) {

    setFields(fields => {

      const fieldName = event.target.name;
      let fieldAttributes = fields[fieldName] || {};

      fieldAttributes = Object.assign(fieldAttributes, {
        value: field
      });

      return {
        ...fields,
        [fieldName]: fieldAttributes,
      }

    })

  }

  return {
    fields,
    updateField,
    handleSubmit,
    handleChange,
  }

};

export default useForm;
