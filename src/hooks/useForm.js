import { useState } from 'react';

import { copyKeysToEmptyObject } from '../lib/util';

import Validation from '../models/validation';

let validate;

const useForm = ({ onSubmit, onChange, rules = {} }) => {
  const [fields, setFields] = useState(copyKeysToEmptyObject(rules, {}));
  const [invalidFields, updateValidity] = useState([]);

  if (!validate) {
    validate = new Validation(rules);
  }

  /**
   * handleSubmit
   * @description Manages event handler for submit type events on the form
   */

  function handleSubmit (event) {
    event.persist();
    event.preventDefault();

    const setValidity = validate.bySet(fields, true);

    if (setValidity.length > 0) {
      setFields(fields => fields);
      updateValidity(setValidity);
      return;
    }

    updateValidity(true);

    // Returning the passed in function here allows us to return false
    // from the handler, preventing the form from submitting

    if (typeof onSubmit === 'function') {
      return onSubmit(event, fields);
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
   * updateField
   * @description Manages event handler for change type events on the form
   */

  function updateField (name, value) {
    setFields(fields => {
      let fieldAttributes = fields[name] || {};

      fieldAttributes = Object.assign({}, fieldAttributes, {
        value,
        isValid: validate.byField(name, value)
      });

      if (fieldAttributes.isValid && invalidFields.includes(name)) {
        updateValidity(invalidFields.filter(field => field !== name));
      }

      return {
        ...fields,
        [name]: fieldAttributes
      };
    });
  }

  return {
    invalidFields,
    updateField,
    handleSubmit,
    handleChange
  };
};

export default useForm;
