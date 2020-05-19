// Note: these are not used by default, these are intended to be
// conveniently available and accessed via the getRegex method

const FIELD_REGEX = {
  email: '.+@.+\\..+'
};

/**
 * regexByFieldName
 * @description
 */

export function regexByFieldName (fieldName) {
  return FIELD_REGEX[fieldName];
}

/**
 * updateCheckedSelections
 * @description
 */

export function updateCheckedSelections (selections, { id, isChecked }) {
  let newSelections = [...selections];

  if (isChecked && !newSelections.includes(id)) {
    newSelections.push(id);
  } else if (!isChecked && newSelections.includes(id)) {
    newSelections = newSelections.filter((selection) => selection !== id);
  }

  return newSelections;
}

/**
 * filterIsChecked
 * @description
 */

export function filterIsChecked (options) {
  if (!Array.isArray(options)) return [];
  return options.filter((option) => !!option.isChecked);
}

/**
 * findIsCheckedIds
 * @description
 */

export function findIsCheckedIds (options) {
  const isChecked = filterIsChecked(options);
  return isChecked.map(({ id }) => id);
}
