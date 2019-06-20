import { useState } from 'react';

import { copyKeysToEmptyObject } from '../lib/util';

import Validation from '../models/validation';

let validate;

const useForm = ({ onSubmit, onChange, rules = {} }) => {
  const [fields, setFields] = useState(copyKeysToEmptyObject(rules, {}));
  const [invalidFields, updateValidity] = useState([]);
  console.log(validate);
  console.log(fields);

  if (!validate) {
    validate = new Validation(rules);
  } else {
    validate.updateRules(rules);
  }

  /**
   * handleSubmit
   * @description Manages event handler for submit type events on the form
   */

  function handleSubmit (event) {
    event.persist();
    event.preventDefault();

    const fieldsValidity = validate.bySet(fields, true);

    if (fieldsValidity.length > 0) {
      setFields(fields => fields);
      updateValidity(fieldsValidity);
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

  function updateField (name, value, rules) {
    if (rules) {
      validate.updateRulesByField(name, rules);
    }

    // If we're passing in undefined, we probably don't want to update it
    // in the first place, but most likely this is intentionally passing it
    // as undefined to solely update the rules above

    if (typeof value === 'undefined') return;

    setFields(fields => {
      let fieldAttributes = fields[name] || {};

      fieldAttributes = Object.assign({}, fieldAttributes, {
        value,
        isValid: validate.byField(name, value)
      });

      if (
        fieldAttributes.isValid &&
        Array.isArray(invalidFields) &&
        invalidFields.includes(name)
      ) {
        updateValidity(invalidFields.filter(field => field !== name));
      }

      return {
        ...fields,
        [name]: fieldAttributes
      };
    });
  }

  return {
    fields,
    invalidFields,
    updateField,
    handleSubmit,
    handleChange
  };
};

export default useForm;
