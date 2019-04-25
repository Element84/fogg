import {
  routeIsInternal,
  parseNumber,
  copyKeysToEmptyObject,
  filterObject
} from 'lib/util';

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

  describe('copyKeysToEmptyObject', () => {
    const object = {
      one: 'Chookity',
      two: {
        wubbalubba: 'dubdub'
      },
      three: {
        look: {
          at: 'me'
        },
        im: ['mister', 'meseeks']
      }
    };

    it('should copy the top level of an object with undefined properties', () => {
      const expected = {
        one: undefined,
        two: undefined,
        three: undefined
      };
      expect(copyKeysToEmptyObject(object)).toEqual(expected);
    });

    it('should copy the top level of an object with the default value', () => {
      const expected = {
        one: {},
        two: {},
        three: {}
      };
      expect(copyKeysToEmptyObject(object, {})).toEqual(expected);
    });
  });

  describe('filterObject', () => {
    const whitelist = ['pizza', 'delivery'];

    const expected = {
      pizza: 'yum'
    };

    const object = {
      ...expected,
      pickup: 'nope'
    };

    it('should return an object with properties listed in the whitelist', () => {
      expect(filterObject(object, key => whitelist.includes(key))).toEqual(
        expected
      );
    });
  });
});
