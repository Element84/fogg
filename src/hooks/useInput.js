import { filterObject } from '../lib/util';

const INPUT_PROPS_WHITELIST = [
  'id',
  'name',
  'type',
  'placeholder',
  'autoComplete',
  'autoCorrect',
  'autoCapitalize',
  'minLength',
  'maxLength',
  'pattern',
  'disabled',
  'required',
  'inputMode',
  'defaultValue',
  'value'
];

const useInput = ({ props = {} }) => {
  const { label, required } = props;
  const inputRules = {};

  // Only include the input props that we know for sure we want to have in the DOM

  const inputProps = filterObject(props, key =>
    INPUT_PROPS_WHITELIST.includes(key)
  );

  // If we didn't supply a name, default to the ID

  if (!inputProps.name) {
    inputProps.name = inputProps.id;
  }

  // Patch in any local rules passed directly to the input

  if (required) {
    inputRules.required = true;
  }

  return {
    id: inputProps.id,
    name: inputProps.name,
    options: props.options,
    type: inputProps.type,
    label,
    inputProps,
    inputRules
  };
};

export default useInput;
