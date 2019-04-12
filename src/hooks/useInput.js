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
  const { label } = props;

  // Only include the input props that we know for sure we want to have in the DOM

  const inputProps = filterObject(props, key =>
    INPUT_PROPS_WHITELIST.includes(key)
  );

  // If we didn't supply a name, default to the ID

  if (!inputProps.name) {
    inputProps.name = inputProps.id;
  }

  return {
    id: inputProps.id,
    name: inputProps.name,
    options: props.options,
    type: inputProps.type,
    label,
    inputProps
  };
};

export default useInput;
