import { parseNumber, getRegex } from '../lib/util';

class Validation {
  constructor (rules = {}) {
    this.rules = { ...rules };
  }

  updateRules (rules = {}) {
    this.rules = {
      ...this.rules,
      ...rules
    };
  }

  updateRulesByField (name, rules) {
    this.rules[name] = {
      ...(this.rules[name] || {}),
      ...rules
    };
  }

  byField (fieldName, value, dependencies) {
    const field = this.rules[fieldName];

    // By default, if there are no validation rules, we should not
    // validate it and consider it valid input
    if (!field) return true;

    return validate(field, value, dependencies);
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

function validate (rules = {}, value, dependencies = []) {
  const minLength = parseNumber(rules.minLength);
  const maxLength = parseNumber(rules.maxLength);
  const isRequired = !!rules.required;
  const isList = Array.isArray(value);
  const isStringOrList = typeof value === 'string' || isList;
  const isFalseyNonZero = !value && value !== 0;
  const valueLength = isStringOrList && value.length;
  const hasNoValue = isFalseyNonZero || valueLength === 0;

  let hasInvalidDependencies = false;

  // If we don't have a value but it's not required,

  if (hasNoValue && isRequired) return false;
  if (hasNoValue && !isRequired) return true;

  // Input that isn't a string, number, or list isn't valid, so if
  // thats what we have and it's required, it fails

  if (!isValidType(value) && isRequired) return false;

  // If we don't have a length because it's undefined or if we have no
  // length but it's required and it's a string, it's not valid

  if (isStringOrList && !valueLength && isRequired) return false;

  // If we have a list and any of it's values are not
  // a valid type, it's not valid

  if (isList && value.filter(v => !isValidType(v)).length > 0 && isRequired) {
    return false;
  }

  if (minLength && valueLength < minLength) return false;
  if (maxLength && valueLength > maxLength) return false;

  if (rules.regex && !getRegex(rules.regex, 'i').test(value)) return false;

  if (dependencies.length > 0) {
    hasInvalidDependencies =
      dependencies.filter(dependency => {
        if (!dependency.isValid) return true;
        if (dependency.exactMatch && value !== dependency.value) return true;
        return false;
      }).length > 0;
  }

  if (hasInvalidDependencies) {
    return false;
  }

  if (typeof rules.isValid === 'function') {
    return rules.isValid(value, {
      ...rules
    });
  }

  return true;
}

function isValidType (value) {
  if (!value && value !== 0) return false;
  const isString = typeof value === 'string';
  const isNumber = !isNaN(value);
  const isList = Array.isArray(value);
  if (!isString && !isNumber && !isList) return false;
  return true;
}

function validateSet (rules, set) {
  let validatedSet = {};
  for (let key in set) {
    if (!set.hasOwnProperty(key)) continue;
    validatedSet[key] = Object.assign({}, set[key], {
      isValid: validate(rules[key], set[key].value, set[key].dependencies)
    });
  }

  return validatedSet;
}
