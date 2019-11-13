/**
 * isSmallDevice
 */

function isSmallDevice () {
  if (!isDomAvailable()) return;

  // TODO: base this off of a configurable variable along with SCSS settings

  return window.innerWidth < 1024;
}

module.exports.isSmallDevice = isSmallDevice;

/**
 * throttle
 * Via https://remysharp.com/2010/07/21/throttling-function-calls
 */

function throttle (fn, threshhold, scope) {
  threshhold || (threshhold = 250);

  let last;
  let deferTimer;

  return function () {
    // Check to see if we're working with an event as the first argument (standard)

    if (arguments[0] && arguments[0].target) {
      // Check if persist exists as a function. React handles events synthetically
      // and nullifys them through a pooling process. Adding persist keeps this from
      // happening until standard garbage collection so we can retain the event
      // information through the callback
      // More info: https://facebook.github.io/react/docs/events.html#event-pooling

      if (typeof arguments[0].persist === 'function') {
        arguments[0].persist();
      }
    }

    const context = scope || this;
    const now = +new Date();
    const args = arguments;

    if (last && now < last + threshhold) {
      // hold on to it

      clearTimeout(deferTimer);

      deferTimer = setTimeout(function () {
        last = now;

        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;

      fn.apply(context, args);
    }
  };
}

module.exports.throttle = throttle;

/**
 * routeIsInternal
 */

function routeIsInternal (route) {
  return route.charAt(0) === '/';
}

module.exports.routeIsInternal = routeIsInternal;

/**
 * parseNumber
 * @description Attempts to retrieve a number value from the given input
 */

function parseNumber (value) {
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

module.exports.parseNumber = parseNumber;

/**
 * getRegex
 * @description Caches regex creation to avoid additional resources used each validation check
 */

const regexCache = {};

function getRegex (pattern, flags = '') {
  const cacheKey = `${pattern}${flags}`;

  if (regexCache[cacheKey]) {
    return regexCache[cacheKey];
  }

  regexCache[cacheKey] = new RegExp(pattern, flags);

  return regexCache[cacheKey];
}

module.exports.getRegex = getRegex;

/**
 * valueStartsWith
 * @description
 */

function valueStartsWith (value, search) {
  const regex = getRegex(`^${search}`);
  return regex.test(value);
}

module.exports.valueStartsWith = valueStartsWith;

/**
 * copyKeysToEmptyObject
 * @description Create a clone of the top level of an object without values unless a default provided
 */

function copyKeysToEmptyObject (objectToCopy = {}, defaultValue) {
  const newObject = {};

  for (const key in objectToCopy) {
    if (!objectToCopy.hasOwnProperty(key)) continue;
    newObject[key] = defaultValue;
  }

  return newObject;
}

module.exports.copyKeysToEmptyObject = copyKeysToEmptyObject;

/**
 * filterObject
 * @description Given an object and evaluator function, return a filtered copy of an object
 */

function filterObject (object, evaluator) {
  if (typeof evaluator !== 'function') {
    throw new Error('filterObject: 2nd argument is not a function');
  }

  const newObject = {};

  for (const key in object) {
    if (!object.hasOwnProperty(key)) continue;
    if (evaluator(key, object[key])) {
      newObject[key] = object[key];
    }
  }

  return newObject;
}

module.exports.filterObject = filterObject;

/**
 * filterObjectByKeys
 * @description Removes any property that doesnt exist in the allowed keys array
 */

function filterObjectByAllowedKeys (object = {}, allowedKeys = []) {
  if (typeof object !== 'object') return {};
  if (!Array.isArray(allowedKeys)) return object;

  const newObject = {};

  for (const key in object) {
    if (!object.hasOwnProperty(key)) continue;
    if (!allowedKeys.includes(key)) continue;
    newObject[key] = object[key];
  }

  return newObject;
}

module.exports.filterObjectByAllowedKeys = filterObjectByAllowedKeys;

/**
 * queryParamsToObject
 * @description Takes the URL param string and turns it into an oobject
 */

function queryParamsToObject (string) {
  if (typeof string !== 'string') return null;

  const queryString = string.replace('?', '');
  const queryObject = {};

  if (!queryString || queryString === '') {
    return queryObject;
  }

  const querySplit = queryString.split('&');

  for (let i = 0, len = querySplit.length; i < len; i++) {
    const currentSplit = querySplit[i].split('=');
    queryObject[decodeURIComponent(currentSplit[0])] = decodeURIComponent(
      currentSplit[1]
    );
  }

  return queryObject;
}

module.exports.queryParamsToObject = queryParamsToObject;

/**
 * addParamsToUrl
 * @description takes a url and query param object and adds the params to the url
 */

function addParamsToUrl (url, object, encodeComponents) {
  if (typeof url !== 'string' || typeof object !== 'object') return url;

  if (typeof encodeComponents === 'undefined') encodeComponents = true;

  const urlSplit = url.split('?');
  const urlBase = urlSplit[0];
  const urlSearch = urlSplit[1];
  let urlSearchObject = urlSearch ? queryParamsToObject(urlSearch) : {};
  const objectParams = {};

  for (const key in object) {
    if (!object.hasOwnProperty(key)) continue;
    if (typeof object[key] === 'undefined' || object[key] === null) continue;

    objectParams[key] = object[key];
  }

  urlSearchObject = Object.assign(urlSearchObject, objectParams);

  // If we don't have any url params, just pass back the URL as is

  if (Object.keys(urlSearchObject).length === 0) {
    return urlBase;
  }

  // Take the keys and map them into key value pairs into the string form

  return `${urlBase}?${objectToQueryString(urlSearchObject)}`;
}

module.exports.addParamsToUrl = addParamsToUrl;

/**
 * objectToQueryString
 * @description takes an object of key / values and returns a url param string
 */

function objectToQueryString (
  object,
  { encodeKey = true, encodeValues = true } = {}
) {
  const keys = Object.keys(object);

  const params = keys.map(key => {
    let value = object[key];
    if (encodeValues) {
      value = encodeURIComponent(value);
    }
    if (encodeKey) {
      key = encodeURIComponent(key);
    }
    return `${key}=${value}`;
  });

  return params.join('&');
}

module.exports.objectToQueryString = objectToQueryString;

/**
 * isDomAvailable
 * @description Checks to see if the DOM is available by checking the existence of the window and document
 * @see https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/ExecutionEnvironment.js#L12
 */

function isDomAvailable () {
  return (
    typeof window !== 'undefined' &&
    !!window.document &&
    !!window.document.createElement
  );
}

module.exports.isDomAvailable = isDomAvailable;

/**
 * normalizePathname
 * @description
 */

function normalizePathname (string) {
  let pathname = string;

  if (typeof pathname !== 'string') return pathname;

  if (pathname.substr(-1) !== '/') {
    pathname = `${pathname}/`;
  }

  return pathname;
}

module.exports.normalizePathname = normalizePathname;

/**
 * updateCheckedSelections
 * @description
 */

function updateCheckedSelections (selections, { id, isChecked }) {
  let newSelections = [...selections];

  if (isChecked && !newSelections.includes(id)) {
    newSelections.push(id);
  } else if (!isChecked && newSelections.includes(id)) {
    newSelections = newSelections.filter(selection => selection !== id);
  }

  return newSelections;
}

module.exports.updateCheckedSelections = updateCheckedSelections;

/**
 * filterIsChecked
 * @description
 */

function filterIsChecked (options) {
  if (!Array.isArray(options)) return [];
  return options.filter(option => !!option.isChecked);
}

module.exports.filterIsChecked = filterIsChecked;

/**
 * findIsCheckedIds
 * @description
 */

function findIsCheckedIds (options) {
  const isChecked = filterIsChecked(options);
  return isChecked.map(({ id }) => id);
}

module.exports.findIsCheckedIds = findIsCheckedIds;

/**
 * chompFloat
 * @description
 */

function chompFloat (floatToChomp, maxFix = 0) {
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

module.exports.chompFloat = chompFloat;

/**
 * isEmptyObject
 * @description Checks if an object is empty
 */

function isEmptyObject (obj) {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
}

module.exports.isEmptyObject = isEmptyObject;
