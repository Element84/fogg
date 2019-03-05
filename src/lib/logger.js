class Logger {
  constructor (namespace) {
    this.namespace = namespace;
  }

  isVerbose () {
    return process.env.gatsby_log_level === 'verbose';
  }

  log (message) {
    if (!this.isVerbose()) return;

    // eslint-disable-next-line no-console
    console.log(`[${this.namespace}] ${message}`);
  }

  error (message) {
    // eslint-disable-next-line no-console
    console.log(`[${this.namespace}] ${message}`);
  }
}

module.exports = Logger;
