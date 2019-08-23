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

  // Update validate with the latest and greatest rules
  // Note: this was previously removed, was this causing issues? We need
  // this to prevent overwriting between page renders

  validate.updateRules(rules);

  /**
   * handleSubmit
   * @description Manages event handler for submit type events on the form
   */

  function handleSubmit (event) {
    event.persist();
    event.preventDefault();

    const fieldsValidity = validate.bySet(fields, true);

    if (fieldsValidity.length > 0) {
      updateValidity(fieldsValidity);
      return;
    }

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

    const validateRules = validate.rules[name];
    const { dependencies = [] } = validateRules || {};

    setFields(fields => {
      const fieldDependencies = dependencies.map(dependency => {
        return {
          ...dependency,
          ...fields[dependency.field]
        };
      });

      const fieldAttributes = Object.assign({}, fields[name], {
        value,
        isValid: validate.byField(name, value, fieldDependencies),
        dependencies: fieldDependencies
      });

      const { isValid } = fieldAttributes;

      if (
        isValid &&
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
