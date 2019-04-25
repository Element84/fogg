import { BaseError } from './base';

export class HttpError extends BaseError {
  constructor (data, message) {
    super(data, `Http Error: ${message}`);
  }
}
