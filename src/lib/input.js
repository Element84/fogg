// Note: these are not used by default, these are intended to be
// conveniently available and accessed via the getRegex method

const FIELD_REGEX = {
  email: '.+@.+\\..+'
};

/*
 * regexByFieldName
 * @description
 */

export function regexByFieldName (fieldName) {
  return FIELD_REGEX[fieldName];
}
