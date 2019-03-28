class Logger {
  constructor (namespace, { isBrowser = false } = {}) {
    this.namespace = namespace;
    this.isBrowser = isBrowser;
  }

  isVerbose () {
    return process.env.gatsby_log_level === 'verbose';
  }

  log (message) {
    if (!this.isVerbose()) return;

    message = `[${this.namespace}] ${message}`;

    /* eslint-disable */
    console.log(`[${this.namespace}] ${message}`);
    /* eslint-enable */
  }

  warn (message) {
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
