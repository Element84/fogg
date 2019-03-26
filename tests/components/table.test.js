import React from 'react';
import { shallow } from 'enzyme';

import Table from 'components/Table';

describe('Table', () => {
  describe('Render', () => {
    const table = shallow(<Table />);
    it('should render a table', () => {
      expect(table.find('div').hasClass('table')).toEqual(true);
    });
  });
});
