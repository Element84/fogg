import { parseNumber, getRegex } from 'lib/util';

// Note: these are not used by default, these are intended to be
// conveniently available and accessed via the getRegex method

const FIELD_REGEX = {
  email: '.+@.+\\..+'
};

class Validation {
  constructor (rules = {}) {
    for (let key in rules) {
      if (!rules.hasOwnProperty(key)) continue;
      this[key] = rules[key];
    }
  }

  byField (fieldName, value) {
    const field = this[fieldName];

    if (!field) return false;

    return validate(field, value);
  }
}

export default Validation;

/*
 * validate
 * @description Given a set of rules, validate the given value
 */

function validate (rules = {}, value) {
  const minLength = parseNumber(rules.minLength);
  const maxLength = parseNumber(rules.maxLength);
  const isRequired = !!rules.required;
  const valueLength = typeof value === 'string' && value.length;

  // If we don't have a value but it's not required,

  if (typeof value === 'undefined' && !isRequired) return true;

  // Input that isn't a string isn't valid, so if thats what we have and
  // it's required, it fails

  if (typeof value !== 'string' && isRequired) return false;

  // If we don't have a length because it's undefined or if we have no
  // length but it's required, it's not valid

  if (isRequired && ( !valueLength || valueLength === 0) ) return false;

  if (minLength && valueLength < minLength) return false;
  if (maxLength && valueLength > maxLength) return false;

  if (rules.regex && !getRegex(rules.regex, 'i').test(value)) return false;

  return true;
}

/*
 * regexByFieldName
 * @description
 */

export function regexByFieldName (fieldName) {
  return FIELD_REGEX[fieldName];
}
