import { useContext, useEffect } from 'react';

import { FormContext, FormNoContext } from '../context';

import { filterObject } from '../lib/util';
import Logger from '../lib/logger';

function getFormListValuesByName (form, name) {
  if (!form || !form.elements) return [];
  const list = Array.from(form.elements).filter(input => input.name === name);
  const checked = list.filter(input => !!input.checked);
  const values = checked.map(input => input.value);
  return values;
}

function isReactSelect (argumentsObject) {
  const hasLengthOfTwo = argumentsObject.length === 2;
  const hasOwnProperty =
    hasLengthOfTwo &&
    Object.prototype.hasOwnProperty.call(argumentsObject[1], 'action');
  return hasLengthOfTwo && hasOwnProperty;
}

const INPUT_PROPS_WHITELIST = [
  'autoCapitalize',
  'autoComplete',
  'autoCorrect',
  'clearable',
  'defaultValue',
  'disabled',
  'id',
  'inputMode',
  'maxLength',
  'minLength',
  'name',
  'options',
  'pattern',
  'placeholder',
  'required',
  'searchable',
  'type',
  'value',
  'isMulti'
];

const INPUT_LIST_TYPES = ['radio', 'checkbox'];

const logger = new Logger('useInput', {
  isBrowser: true
});

const useInput = ({ inputRef = {}, props = {} }) => {
  const { invalidFields = [], updateField } =
    useContext(FormContext) || FormNoContext;

  const { type, label, required, onInput, onChange, isField = true } = props;
  const inputRules = {};
  let isInvalid = false;

  // Only include the input props that we know for sure we want to have in the DOM

  const inputProps = filterObject(props, key =>
    INPUT_PROPS_WHITELIST.includes(key)
  );

  // If we didn't supply a name, default to the ID

  if (!inputProps.name && !!isField) {
    inputProps.name = inputProps.id;
  }

  // Missing name prevents form functionality from working so warn about it

  if (!inputProps.name && !!isField) {
    logger.warn(`Missing input name: ${JSON.stringify(inputProps)}`);
  }

  // Check if our input is invalid from a form level

  if (Array.isArray(invalidFields) && invalidFields.includes(inputProps.name)) {
    isInvalid = true;
  }

  // Patch in any local rules passed directly to the input

  if (required) {
    inputRules.required = true;
  }

  useEffect(() => {
    const { current } = inputRef;
    let value = inputProps.value || inputProps.defaultValue;
    if (type === 'radio' || type === 'checkbox') {
      value = getFormListValuesByName(current.form, inputProps.name);
    }
    // Update the field immediately with any local rules for validation and default value
    updateField(inputProps.name, value, inputRules);
  }, []);

  inputProps.onInput = function (event) {
    if (!INPUT_LIST_TYPES.includes(type)) {
      updateField(event.target.name, event.target.value);
    }

    if (typeof onInput === 'function') {
      onInput(event);
    }
  };

  inputProps.onChange = function (event, selectEvent) {
    // React-select does not surface the original event when
    // onChange is called. It passes the selected option(s) as
    // the first argument. Its second argument is an object
    // with the action, name, and selected option(s).
    if (isReactSelect(arguments)) {
      let value;
      if (selectEvent.action === 'clear') {
        value = [];
      } else {
        const selections = Array.isArray(event) ? event : [event];
        value = selections.map(selection => selection.value);
      }
      updateField(selectEvent.name, value);
      if (typeof onChange === 'function') {
        onChange(event, selectEvent);
      }
      return;
    }

    const type = event.target.type;
    const name = event.target.name;
    let value = event.target.value;

    if (INPUT_LIST_TYPES.includes(type)) {
      value = getFormListValuesByName(event.target.form, name);
      updateField(event.target.name, [...value]);
    }

    if (typeof onChange === 'function') {
      onChange(event);
    }
  };

  return {
    id: inputProps.id,
    name: inputProps.name,
    options: props.options,
    type: inputProps.type,
    label,
    inputProps,
    inputRules,
    isInvalid
  };
};

export default useInput;
