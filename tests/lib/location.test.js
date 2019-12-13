import { location } from '../../lib';

const {
  queryParamsToObject
} = location;

describe('Location', () => {
  describe('queryParamsToObject', () => {
    it('should parse a query string to an object', () => {
      expect(queryParamsToObject('?test=true')).toEqual({
        test: 'true'
      });
      expect(queryParamsToObject('?one=1&2=two&three=free99')).toEqual({
        one: '1',
        2: 'two',
        three: 'free99'
      });
      expect(queryParamsToObject('?q=')).toEqual({
        q: ''
      });
    });
    it('should return an empty object when there are no query params', () => {
      expect(queryParamsToObject('')).toEqual({});
      expect(queryParamsToObject('?')).toEqual({});
    });
  });
});