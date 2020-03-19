import React from 'react';
import { shallow } from 'enzyme';

import Table from './';

describe('Table', () => {
  const columns = [
    {
      Header: 'First Name',
      accessor: 'firstName'
    },
    {
      Header: 'Last Name',
      accessor: 'lastName'
    },
    {
      accessor: 'actions',
      disableSorting: true,
      disableFilters: true
    }
  ];

  const data = [
    {
      firstName: 'Gary',
      lastName: 'Godspeed',
      actions: <button key={'row-1-button'}>View</button>
    },
    {
      firstName: 'Quinn',
      lastName: 'Airgon',
      actions: (
        <div key={'row-2-buttons'}>
          <button>View</button>
          <button>Edit</button>
        </div>
      )
    },
    {
      firstName: 'Abraham',
      lastName: 'Lincoln'
    }
  ];

  describe('Render', () => {
    const table = shallow(<Table columns={columns} data={data} />);

    it('should render a table header', () => {
      expect(
        table
          .find('thead')
          .find('TableHead')
          .props().headers[0].id
      ).toEqual(columns[0].accessor);
    });

    it('should render a table row', () => {
      expect(
        table
          .find('tbody')
          .find('TableRow')
          .first()
          .props().cells[0].row.original
      ).toEqual(data[0]);
    });
  });
});
