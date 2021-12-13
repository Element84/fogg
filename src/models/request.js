import axios from 'axios';
import { addParamsToUrl } from '../lib/location';
import { HttpError } from '../errors/http';

/**
 * Request
 * @description Creates an Request class to manage and fetch request data
 */

export default class Request {
  constructor (baseUrl, RequestError) {
    this.url = baseUrl;
    this.data = null;
    this.options = {};
    this.RequestError = RequestError || HttpError;
  }

  /**
   * setParams
   * @description Adds query parameters to the request URI
   * @param {object} params
   */

  setParams (params) {
    if (typeof params !== 'object') return this.url;
    this.url = addParamsToUrl(this.url, params);
    return this.url;
  }

  /**
   * setData
   * @description Adds a data object to the request instance
   * @param {object} data
   */

  setData (data) {
    if (typeof data !== 'object') return this.data;
    this.data = Object.assign({}, data);
    return this.data;
  }

  /**
   * setOptions
   * @description Adds a options object to the request instance
   * @param {object} options
   */

  setOptions (options) {
    if (typeof options !== 'object') return this.options;
    this.options = Object.assign({}, options);
    return this.options;
  }

  /**
   * validate
   * @description Checks that we have a valid request config before making it
   */
  validate () {
    if (!this.url) {
      return Promise.reject(
        new HttpError(Object.assign({}, this), 'MISSING_URL')
      );
    }
    return Promise.resolve(true);
  }

  /**
   * fetch
   * @description Makes the request given the current state of the class URL
   * @param {object} options
   */

  fetch () {
    return this.validate().then(() => {
      return axios
        .get(this.url, this.options)
        .catch((error) => {
          throw new this.RequestError(error, error.message);
        })
        .then((response) => {
          return response;
        });
    });
  }

  /**
   * post
   * @description Makes the request given the current state of the class URL and data
   * @param {object} options
   */

  post () {
    return this.validate().then(() => {
      return axios.post(this.url, this.data, this.options).catch((error) => {
        if (error) error.config = null;
        if (error && error.response) error.response.config = null;
        throw new this.RequestError(error, error.message);
      });
    });
  }
}
