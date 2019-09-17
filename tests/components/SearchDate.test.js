import React from 'react';
import { shallow } from 'enzyme';

import { SearchDate } from '../../ui';

describe('SearchDate', () => {
  it('renders a SearchDate', () => {
    const searchDate = shallow(<SearchDate />);
    expect(searchDate.prop('className')).toEqual('search-date');
    expect(searchDate.find('Button').exists()).toEqual(true);
    expect(searchDate.find('DatetimeRange').exists()).toEqual(true);
  });
});
