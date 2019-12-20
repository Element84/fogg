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

  log (message, data = {}) {
    if (!this.shouldLog()) return;
    if (!this.isVerbose()) return;

    message = `[${this.namespace}] ${message}`;

    /* eslint-disable */
    console.log(`[${this.namespace}] ${message}`);
    /* eslint-enable */
  }

  info (message, data = {}) {
    if (!this.shouldLog()) return;

    message = `[${this.namespace}] ${message}`;

    /* eslint-disable */
    if (this.isBrowser) {
      console.info(message, data);
    } else {
      console.log(`INFO: ${message}`, data);
    }
    /* eslint-enable */
  }

  warn (message, data = {}) {
    if (!this.shouldLog()) return;
    message = `[${this.namespace}] ${message}`;
    /* eslint-disable */
    if (this.isBrowser) {
      console.warn(message, data);
    } else {
      console.log(`WARNING: ${message}`, data);
    }
    /* eslint-enable */
  }

  error (message, data = {}) {
    if (!this.shouldLog()) return;
    message = `[${this.namespace}] ${message}`;
    /* eslint-disable */
    if (this.isBrowser) {
      console.error(message, data);
    } else {
      console.log(`ERROR: ${message}`, data);
    }
    /* eslint-enable */
  }
}

module.exports = Logger;
