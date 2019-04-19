import { parseNumber, getRegex } from '../lib/util';

// Note: these are not used by default, these are intended to be
// conveniently available and accessed via the getRegex method

const FIELD_REGEX = {
  email: '.+@.+\\..+'
};

class Validation {
  constructor (rules = {}) {
    this.rules = {};
    for (let key in rules) {
      if (!rules.hasOwnProperty(key)) continue;
      this.rules[key] = rules[key];
    }
  }

  updateRulesByField (name, rules) {
    if (!this.rules[name]) return;
    this.rules[name] = {
      ...this.rules[name],
      ...rules
    };
  }

  byField (fieldName, value) {
    const field = this.rules[fieldName];

    // By default, if there are no validation rules, we should not
    // validate it and consider it valid input
    if (!field) return true;

    return validate(field, value);
  }

  bySet (set = {}, returnErrors = false) {
    const validatedSet = validateSet(this.rules, set);

    // Checks through all fields and returns true if there are no invalid fields
    const invalidFields = Object.keys(validatedSet).filter(
      key => !validatedSet[key].isValid
    );

    if (returnErrors) {
      return invalidFields;
    }

    return invalidFields.length === 0;
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

  if (isRequired && (!valueLength || valueLength === 0)) return false;

  if (minLength && valueLength < minLength) return false;
  if (maxLength && valueLength > maxLength) return false;

  if (rules.regex && !getRegex(rules.regex, 'i').test(value)) return false;

  return true;
}

function validateSet (rules, set) {
  let validatedSet = {};

  for (let key in set) {
    if (!set.hasOwnProperty(key)) continue;
    validatedSet[key] = Object.assign({}, set[key], {
      isValid: validate(rules[key], set[key].value)
    });
  }

  return validatedSet;
}

/*
 * regexByFieldName
 * @description
 */

export function regexByFieldName (fieldName) {
  return FIELD_REGEX[fieldName];
}
