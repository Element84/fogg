export class BaseError extends Error {
  constructor (extraData, ...params) {
    super(...params);
    this.data = Object.assign({}, extraData);
  }
}
