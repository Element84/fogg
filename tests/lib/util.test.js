import { routeIsInternal, parseNumber } from 'lib/util';

describe('Util', () => {
  describe('routeIsInternal', () => {
    it('should return true for an internal link', () => {
      expect(routeIsInternal('/path')).toEqual(true);
    });

    it('should return false for an external link', () => {
      expect(routeIsInternal('https://www.element84.com')).toEqual(false);
    });
  });
  describe('parseNumber', () => {
    it('should return a number given a number', () => {
      const number = 1234;
      expect(parseNumber(number)).toEqual(number);
    });
    it('should return a number given a number string', () => {
      const number = '1234';
      expect(parseNumber(number)).toEqual(parseFloat(number));
    });
    it('should return undefined given a text string', () => {
      const number = 'test';
      expect(parseNumber(number)).toEqual(undefined);
    });
  });
});
