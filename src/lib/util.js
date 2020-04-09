/**
 * parseNumber
 * @description Attempts to retrieve a number value from the given input
 */

export function parseNumber (value) {
  const defaultValue = undefined;
  let calculatedValue;

  if (typeof value === 'undefined') return defaultValue;
  if (typeof value === 'number') return value;

  // Try to be forgiving and parse a number from a string

  if (typeof value === 'string') {
    calculatedValue = parseInt(value);
    if (!isNaN(calculatedValue)) return calculatedValue;
  }

  return defaultValue;
}

/**
 * getRegex
 * @description Caches regex creation to avoid additional resources used each validation check
 */

const regexCache = {};

export function getRegex (pattern, flags = '') {
  const cacheKey = `${pattern}${flags}`;

  if (regexCache[cacheKey]) {
    return regexCache[cacheKey];
  }

  regexCache[cacheKey] = new RegExp(pattern, flags);

  return regexCache[cacheKey];
}

/**
 * valueStartsWith
 * @description
 */

export function valueStartsWith (value, search) {
  const regex = getRegex(`^${search}`);
  return regex.test(value);
}

/**
 * copyKeysToEmptyObject
 * @description Create a clone of the top level of an object without values unless a default provided
 */

export function copyKeysToEmptyObject (objectToCopy = {}, defaultValue) {
  const newObject = {};

  for (const key in objectToCopy) {
    if (!Object.prototype.hasOwnProperty.call(objectToCopy, key)) continue;
    newObject[key] = defaultValue;
  }

  return newObject;
}

/**
 * filterObject
 * @description Given an object and evaluator function, return a filtered copy of an object
 */

export function filterObject (object, evaluator) {
  if (typeof evaluator !== 'function') {
    throw new Error('filterObject: 2nd argument is not a function');
  }

  const newObject = {};

  for (const key in object) {
    if (!Object.prototype.hasOwnProperty.call(object, key)) continue;
    if (evaluator(key, object[key])) {
      newObject[key] = object[key];
    }
  }

  return newObject;
}

/**
 * filterObjectByKeys
 * @description Removes any property that doesnt exist in the allowed keys array
 */

export function filterObjectByAllowedKeys (object = {}, allowedKeys = []) {
  if (typeof object !== 'object') return {};
  if (!Array.isArray(allowedKeys)) return object;

  const newObject = {};

  for (const key in object) {
    if (!Object.prototype.hasOwnProperty.call(object, key)) continue;
    if (!allowedKeys.includes(key)) continue;
    newObject[key] = object[key];
  }

  return newObject;
}

/**
 * chompFloat
 * @description
 */

export function chompFloat (floatToChomp, maxFix = 0) {
  let updatedFloat = floatToChomp;

  if (typeof floatToChomp !== 'number') {
    updatedFloat = parseFloat(floatToChomp);
  }

  // If parsing the float didn't work out, return zero

  if (isNaN(updatedFloat)) {
    throw new Error(`Invalid value passed to fixFloat ${floatToChomp}`);
  }

  updatedFloat = updatedFloat.toFixed(maxFix);

  return parseFloat(updatedFloat);
}

/**
 * isEmptyObject
 * @description Checks if an object is empty
 */

export function isEmptyObject (obj) {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
}

/**
 * sortByKey
 * @description Sort the given array by the object key
 */

export function sortByKey (array = [], key, type = 'asc') {
  function compare (a, b) {
    let keyA = a[key];
    let keyB = b[key];

    if (typeof keyA === 'string') {
      keyA = keyA.toLowerCase();
    }

    if (typeof keyB === 'string') {
      keyB = keyB.toLowerCase();
    }

    if (keyA < keyB) {
      return -1;
    }

    if (keyA > keyB) {
      return 1;
    }

    return 0;
  }

  let newArray = [...array];

  if (typeof key !== 'string') return newArray;

  newArray = newArray.sort(compare)

  if ( type === 'desc' ) {
    return newArray.reverse();
  }

  return newArray;
}
