import React from 'react';
import { shallow } from 'enzyme';

import SearchFiltersRange from './';

describe('SearchFiltersRange', () => {
    const notice = 'Values outside of range will default to min and max.';
    it('renders a SearchFiltersRange', () => {
        const Range = shallow(<SearchFiltersRange />);

        expect(Range.find('div.search-filters-range-input').exists()).toEqual(true);
        expect(Range.find('div.search-filters-range-slider').exists()).toEqual(true);
        expect(Range.find('span.error').exists()).toEqual(true);
        expect(Range.find('p.search-filters-range-note').text()).toEqual(notice);
    });
});
