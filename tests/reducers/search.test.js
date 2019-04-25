import search from '../../src/reducers/search';

import searchResults from '../fixtures/sat-api/search-results';

describe('reducers > search', () => {
  it('should return default state', () => {
    expect(search(undefined, {})).toEqual({});
  });

  describe('UPDATE_SEARCH_RESULTS', () => {
    it('should return the search results', () => {
      let defaultState = {
        results: {}
      };

      let updatedState = search(defaultState, {
        type: 'UPDATE_SEARCH_RESULTS',
        data: searchResults
      });

      expect(updatedState.results).toEqual(searchResults);
    });
  });
});
