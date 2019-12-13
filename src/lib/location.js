/**
 * queryParamsToObject
 * @description Takes the URL param string and turns it into an oobject
 */

export function queryParamsToObject(string) {
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


/**
 * addParamsToUrl
 * @description takes a url and query param object and adds the params to the url
 */

export function addParamsToUrl(url, object, encodeComponents) {
  if (typeof url !== 'string' || typeof object !== 'object') return url;

  if (typeof encodeComponents === 'undefined') encodeComponents = true;

  const urlSplit = url.split('?');
  const urlBase = urlSplit[0];
  const urlSearch = urlSplit[1];
  let urlSearchObject = urlSearch ? queryParamsToObject(urlSearch) : {};
  const objectParams = {};

  for (const key in object) {
    if (!Object.prototype.hasOwnProperty.call(object, key)) continue;
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

/**
 * objectToQueryString
 * @description takes an object of key / values and returns a url param string
 */

export function objectToQueryString(
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

/**
 * normalizePathname
 * @description
 */

export function normalizePathname(string) {
  let pathname = string;

  if (typeof pathname !== 'string') return pathname;

  if (pathname.substr(-1) !== '/') {
    pathname = `${pathname}/`;
  }

  return pathname;
}