const defaultState = {};

const search = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH_RESULTS':
      return Object.assign({}, state, {
        results: action.data
      });
    default:
      return state;
  }
};

export default search;
