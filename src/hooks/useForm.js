import { useState } from 'react';
import clone from 'clone';

import { copyKeysToEmptyObject } from '../lib/util';

import Validation from '../models/validation';

let validate;

const useForm = ({ onSubmit, onChange, rules = {} }) => {
  const [attempts, updateAttempts] = useState(0);
  const [fields, setFields] = useState(copyKeysToEmptyObject(rules, {}));
  let invalidFields = Object.keys(fields).filter(key => !fields[key].isValid);

  // If we haven't submitted the form yet, we don't want to trigger the errors
  // within the UI

  if (attempts === 0) {
    invalidFields = [];
  }

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

    updateAttempts(attempts + 1);

    const failedFields = validate.bySet(fields, true);
    const updatedFields = clone(fields);

    if (failedFields.length > 0) {
      failedFields.forEach(key => {
        updatedFields[key].isValid = false;
      });
      setFields(updatedFields);
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

    const dependencies = validate.getDependenciesByName(name);

    setFields(fields => {
      const fieldsToUpdate = {};

      fieldsToUpdate[name] = updateFieldAttributes(name, value, dependencies);

      return {
        ...fields,
        ...fieldsToUpdate
      };
    });
  }

  function updateFieldAttributes (name, value, dependencies) {
    const fieldDependencies = dependencies.map(dependency => {
      return {
        ...dependency,
        ...fields[dependency.field]
      };
    });
    return {
      ...fields[name],
      value,
      isValid: validate.byField(name, value, fieldDependencies),
      dependencies: validate.getDependenciesByName(name)
    };
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
