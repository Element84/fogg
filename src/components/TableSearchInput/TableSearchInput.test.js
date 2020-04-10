import React from 'react';
import { shallow } from 'enzyme';

import TableSearchInput from './';

function handleOnChange ({ currentTarget = {} } = {}) {
  const { value } = currentTarget;
  return value;
}

function handleOnClear () {
  return 'CLEAR';
}

describe('TableSearchInput', () => {
  describe('Render', () => {
    const props = {
      value: 'test',
      onChange: handleOnChange,
      onClear: handleOnClear
    };
    const component = shallow(<TableSearchInput {...props} />);

    it('should render TableSearchInput', () => {
      expect(component.hasClass('table-search-input')).toBeTruthy();
    });
  });
});
