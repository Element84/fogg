import React from 'react';
import { shallow } from 'enzyme';

import SearchFiltersMinMax from './';

describe('SearchFiltersMinMax', () => {
  const notice = 'Values outside of limits will default to min and max.';
  it('renders a SearchFiltersMinMax', () => {
    const Range = shallow(<SearchFiltersMinMax />);

    expect(Range.find('div.search-filters-minmax-input').exists()).toEqual(true);
    expect(Range.find('span.error').exists()).toEqual(true);
    expect(Range.find('p.search-filters-range-note').text()).toEqual(notice);
  });
});
