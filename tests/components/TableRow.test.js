import React from 'react';
import { shallow } from 'enzyme';

import { TableRow } from '../../';

describe('TableRow', () => {
  const rowClassName = 'row-test';
  const rowTextOne = 'Gary';
  const rowTextTwo = 'Godspeed';
  const buttonText = 'View';

  const row = [
    rowTextOne,
    <span key={'cell-1-span'}>{rowTextTwo}</span>,
    <button key={'cell-2-button'}>{buttonText}</button>
  ];

  describe('Render', () => {
    const tableRow = shallow(<TableRow className={rowClassName} cells={row} />);

    it('should render a tr with a button in it', () => {
      expect(
        tableRow
          .find('tr')
          .find('button')
          .text()
      ).toEqual(buttonText);
    });

    it('should render a string wrapped with a p tag', () => {
      expect(
        tableRow
          .find('tr')
          .find('td')
          .first()
          .find('p')
          .text()
      ).toEqual(rowTextOne);
    });

    it('should not wrap a string in a p tag if its already a component', () => {
      expect(
        tableRow
          .find('tr')
          .find('td')
          .at(1)
          .find('p')
          .exists()
      ).toEqual(false);
      expect(
        tableRow
          .find('tr')
          .find('td')
          .at(1)
          .find('span')
          .text()
      ).toEqual(rowTextTwo);
    });

    it('should have an updated className', () => {
      expect(tableRow.find('tr').hasClass(rowClassName)).toEqual(true);
    });
  });
});
