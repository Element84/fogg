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

    for (let key in updatedFields) {
      if (!updatedFields.hasOwnProperty(key)) continue;
      updatedFields[key].isValid = !failedFields.includes(key);
    }

    setFields(updatedFields);

    if (failedFields.length > 0) {
      return;
    }

    // Returning the passed in function here allows us to return false
    // from the handler, preventing the form from submitting

    if (typeof onSubmit === 'function') {
      return onSubmit(event, updatedFields);
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
    const depdendentFields = getDependendentFieldsByName(name);

    setFields(fields => {
      const fieldsToUpdate = {
        ...fields
      };

      fieldsToUpdate[name] = updateFieldAttributes(name, value, dependencies);

      if (Array.isArray(depdendentFields)) {
        depdendentFields.forEach(fieldName => {
          const fieldValue = fields[fieldName].value;
          const fieldDependencies = validate.getDependenciesByName(fieldName);
          fieldsToUpdate[fieldName] = updateFieldAttributes(
            fieldName,
            fieldValue,
            fieldDependencies,
            fieldsToUpdate
          );
        });
      }

      return fieldsToUpdate;
    });
  }

  /**
   * getDependendentFieldsByName
   * @description Given the field name, finds all fields that has it as a dependency
   */

  function getDependendentFieldsByName (name) {
    if (!name || !fields[name]) return;
    let dependentFields = new Set();

    for (let key in fields) {
      if (!fields.hasOwnProperty(key)) continue;
      if (!Array.isArray(fields[key].dependencies)) continue;
      const depKeys = fields[key].dependencies.map(
        dependency => dependency.field
      );
      if (depKeys.includes(name)) dependentFields.add(key);
    }

    return Array.from(dependentFields);
  }

  /**
   * updateFieldAttributes
   * @description Performs updates and validation returning new object for given field
   */

  function updateFieldAttributes (
    name,
    value,
    dependencies = [],
    fieldSet = fields
  ) {
    let fieldDependencies = [];

    if (Array.isArray(dependencies)) {
      fieldDependencies = dependencies.map(dependency => {
        return {
          ...dependency,
          ...fieldSet[dependency.field]
        };
      });
    }

    return {
      ...fieldSet[name],
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
