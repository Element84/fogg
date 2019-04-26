import Request from '../models/request';
import { filterObjectByAllowedKeys } from '../lib/util';
import { HttpError } from '../errors/http';

const ALLOWED_PARAMS = ['bbox', 'time', 'limit', 'query', 'sort'];

export const getSearchResults = params => {
  return dispatch => {
    // TODO: this url is from https://github.com/sat-utils/sat-api/
    // we'll probably need to change it
    const request = new Request(
      'https://sat-api.developmentseed.org/stac/search'
    );

    const filteredParams = filterObjectByAllowedKeys(params, ALLOWED_PARAMS);

    request.setParams(filteredParams);

    request.setOptions({
      headers: {
        Accept: 'application/geo+json'
      }
    });

    return request
      .fetch()
      .then(response => {
        dispatch(updateSearchResults(response));
        return response;
      })
      .catch(error => {
        throw new HttpError(error);
      });
  };
};

/**
 * updateSearchResults
 * @description Set the search results
 */

export const updateSearchResults = data => {
  return {
    type: 'UPDATE_SEARCH_RESULTS',
    data: data
  };
};
