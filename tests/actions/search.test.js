import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { getSearchResults } from '../../src/actions';

import searchResults from '../fixtures/sat-api/search-results';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions > search', () => {
  describe('getSearchResults', () => {
    let actions;

    beforeAll(done => {
      actions = null;

      moxios.install();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: searchResults
        });
      });

      const store = mockStore({});

      return store.dispatch(getSearchResults()).then(() => {
        actions = store.getActions();
        done();
      });
    });
    afterAll(() => {
      moxios.uninstall();
    });

    it('should update the results with the response', () => {
      expect(actions[0].type).toEqual('UPDATE_SEARCH_RESULTS');
      expect(actions[0].data.data).toEqual(searchResults);
    });
  });
});
