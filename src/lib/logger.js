class Logger {
  constructor (namespace, { isBrowser = false, production = false } = {}) {
    this.namespace = namespace;
    this.isBrowser = isBrowser;
    this.production = production;
  }

  shouldLog () {
    if (process.env.NODE_ENV === 'production' && !this.production) return false;
    return true;
  }

  isVerbose () {
    return process.env.gatsby_log_level === 'verbose';
  }

  log (message) {
    if (!this.shouldLog()) return;
    if (!this.isVerbose()) return;

    message = `[${this.namespace}] ${message}`;

    /* eslint-disable */
    console.log(`[${this.namespace}] ${message}`);
    /* eslint-enable */
  }

  warn (message) {
    if (!this.shouldLog()) return;
    message = `[${this.namespace}] ${message}`;
    /* eslint-disable */
    if (this.isBrowser) {
      console.warn(message);
    } else {
      console.log(message);
    }
    /* eslint-enable */
  }

  error (message) {
    if (!this.shouldLog()) return;
    message = `[${this.namespace}] ${message}`;
    /* eslint-disable */
    if (this.isBrowser) {
      console.error(message);
    } else {
      console.log(message);
    }
    /* eslint-enable */
  }
}

module.exports = Logger;
