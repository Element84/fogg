import React from 'react';
import { shallow } from 'enzyme';

import { TableRow } from '../../ui';

describe('TableRow', () => {
  const rowClassName = 'row-test';

  const cells = [
    {
      render: function (item) {
        return this[item];
      },
      Cell: 'Gary'
    },
    {
      render: function (item) {
        return this[item];
      },
      Cell: 'Godspeed'
    }
  ];

  describe('Render', () => {
    const tableRow = shallow(
      <TableRow className={rowClassName} cells={cells} />
    );

    it('should render a tr with the cell values', () => {
      expect(
        tableRow
          .find('tr')
          .find('td')
          .first()
          .text()
      ).toEqual('Gary');
      expect(
        tableRow
          .find('tr')
          .find('td')
          .last()
          .text()
      ).toEqual('Godspeed');
    });

    it('should have an updated className', () => {
      expect(tableRow.find('tr').hasClass(rowClassName)).toEqual(true);
    });
  });
});
