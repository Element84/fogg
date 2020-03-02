import React from 'react';
import { shallow } from 'enzyme';

import SearchComplete from './';

// TODO: seems like some of these tests are difficult to set up without Enzyme having
// Hook support at this time. We should write tests when possible

describe('SearchComplete', () => {
  it('renders a SearchComplete', () => {
    const searchComplete = shallow(<SearchComplete />);
    expect(searchComplete.find('SearchBox').exists()).toEqual(true);
    expect(searchComplete.find('.search-complete-results').exists()).toEqual(
      true
    );
  });
});
