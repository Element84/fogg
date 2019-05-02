import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { Table } from '../../ui';

describe('Table', () => {
  const columns = ['First Name', 'Last Name', null];

  const rows = [
    ['Gary', 'Godspeed', <button key={'row-1-button'}>View</button>],
    [
      'Quinn',
      'Airgon',
      <div key={'row-2-buttons'}>
        <button>View</button>
        <button>Edit</button>
      </div>
    ]
  ];

  describe('Render', () => {
    const table = shallow(<Table columns={columns} rows={rows} />);

    it('should render a table header', () => {
      expect(
        table
          .find('thead')
          .find('TableRow')
          .props().cells
      ).toEqual(columns);
    });

    it('should render a table row', () => {
      expect(
        table
          .find('tbody')
          .find('TableRow')
          .first()
          .props().cells
      ).toEqual(rows[0]);
    });
  });

  describe('Invalid', () => {
    const invalidTableConfigError =
      '[Table] Invalid table configuration, trying to fix';

    it('should try to fix a table row with an uneven number of columns', () => {
      let consoleStub = sinon.stub(console, 'warn');

      const invalidColumns = columns.map(column => column);

      invalidColumns.push('Test');

      const table = shallow(<Table columns={invalidColumns} rows={rows} />);

      expect(
        table
          .find('tbody')
          .find('TableRow')
          .first()
          .dive()
          .find('td')
      ).toHaveLength(invalidColumns.length);

      expect(consoleStub.calledWithMatch(invalidTableConfigError)).toEqual(
        true
      );

      console.warn.restore();
    });

    it('should not render a table with more row columns than header columns', () => {
      let consoleStub = sinon.stub(console, 'warn');

      const invalidRows = rows.map(row => Array.from(row));

      invalidRows[0].push('Test');

      const table = shallow(<Table columns={columns} rows={invalidRows} />);

      expect(
        table
          .find('thead')
          .find('TableRow')
          .dive()
          .find('td')
      ).toHaveLength(invalidRows[0].length);

      expect(consoleStub.calledWithMatch(invalidTableConfigError)).toEqual(
        true
      );

      console.warn.restore();
    });
  });
});
