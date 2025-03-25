import React from 'react';
import { shallow } from 'enzyme';

import SearchFiltersMinMax from './';

describe('SearchFiltersMinMax', () => {
  const notice = 'Values outside of limits will default to min and max.';
  it('renders a SearchFiltersMinMax', () => {
    const MinMax = shallow(<SearchFiltersMinMax />);

    expect(MinMax.find('div.search-filters-minmax-input').exists()).toEqual(true);
    expect(MinMax.find('span.error').exists()).toEqual(true);
    expect(MinMax.find('p.search-filters-minmax-note').text()).toEqual(notice);
  });

  it('displays an error when min is out of range', () => {
    const limits = {
      min: {
        min: 0,
        max: 25
      },
      max: {
        min: 0,
        max: 50
      }
    };

    const MinMax = shallow(<SearchFiltersMinMax id="test" limits={limits} />);
    MinMax.find('#test-minmax-min').simulate('change', { target: { id: 'test-minmax-min', value: '30' } });
    MinMax.update();

    expect(MinMax.findWhere(node => node.text() === 'Invalid Min Value').exists()).toEqual(true);
  });

  it('displays an error when max is out of range', () => {
    const limits = {
      min: {
        min: 0,
        max: 25
      },
      max: {
        min: 0,
        max: 50
      }
    };

    const MinMax = shallow(<SearchFiltersMinMax id="test" limits={limits} />);
    MinMax.find('#test-minmax-max').simulate('change', { target: { id: 'test-minmax-max', value: '55' } });
    MinMax.update();

    expect(MinMax.findWhere(node => node.text() === 'Invalid Max Value').exists()).toEqual(true);
  });
});
