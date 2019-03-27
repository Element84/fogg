import React from 'react';
import { shallow } from 'enzyme';

import Table from 'components/Table';

describe('Table', () => {
  const columns = ['First Name', 'Last Name', null];

  const rows = [
    [
      'Gary',
      'Godspeed',
      <button key={'row-1-button'}>View</button>
    ],
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
    it('should not render a table with more header columns than row columns', () => {
      const invalidColumns = columns.map(column => column);

      invalidColumns.push('Test');

      const table = shallow(<Table columns={invalidColumns} rows={rows} />);

      expect(table.html()).toEqual(null);
    });

    it('should not render a table with more row columns than header columns', () => {
      const invalidRows = rows.map(row => Array.from(row));

      invalidRows[0].push('Test');

      const table = shallow(<Table columns={columns} rows={invalidRows} />);

      expect(table.html()).toEqual(null);
    });
  });
});
