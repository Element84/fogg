import sinon from 'sinon';

import Logger from 'lib/logger';

describe('Logger', () => {
  const loggerNamespace = 'LoggerTest';
  const logger = new Logger(loggerNamespace);
  const sandbox = sinon.createSandbox();

  let consoleStub;

  describe('log', () => {
    it('should not log if not verbose', () => {
      const loggerMessage = 'Testing a log';

      consoleStub = sinon.stub(console, 'log');

      logger.log(loggerMessage);

      expect(consoleStub.callCount).toEqual(0);

      consoleStub.reset();
      console.log.restore();
    });

    it('should log if verbose', () => {
      const loggerMessage = 'Testing a log';

      sandbox.stub(process, 'env').value({
        gatsby_log_level: 'verbose'
      });
      consoleStub = sinon.stub(console, 'log');

      logger.log(loggerMessage);

      expect(consoleStub.callCount).toEqual(1);

      consoleStub.reset();
      console.log.restore();
      sandbox.restore();
    });
  });

  describe('error', () => {
    it('should return true for an internal link', () => {
      const loggerMessage = 'Testing an error';

      consoleStub = sinon.stub(console, 'log');

      logger.error(loggerMessage);

      expect(consoleStub.callCount).toEqual(1);
      expect(
        consoleStub.calledWithMatch(`[${loggerNamespace}] ${loggerMessage}`)
      ).toEqual(true);

      consoleStub.reset();
      console.log.restore();
    });
  });
});
