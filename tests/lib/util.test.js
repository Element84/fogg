import { routeIsInternal } from 'lib/util';

describe('Util', () => {
  describe('routeIsInternal', () => {
    it('should return true for an internal link', () => {
      expect(routeIsInternal('/path')).toEqual(true);
    });

    it('should return false for an external link', () => {
      expect(routeIsInternal('https://www.element84.com')).toEqual(false);
    });
  });
});
