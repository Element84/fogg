import React from 'react';
import { shallow } from 'enzyme';

import { useTableData } from '../../../hooks';

import Table from './';

const tableColumns = [
  {
    Header: 'First Name',
    columnId: 'firstName'
  },
  {
    Header: 'Last Name',
    columnId: 'lastName'
  },
  {
    columnId: 'actions',
    Header: false,
    align: 'right',
    type: 'action',
    widthRatio: 1
  }
];

const tableData = [
  {
    firstName: 'Gary',
    lastName: 'Godspeed'
  },
  {
    firstName: 'Quinn',
    lastName: 'Airgon',
    actions: [
      {
        to: '#',
        label: 'View'
      },
      {
        to: '#',
        label: 'Edit'
      }
    ]
  },
  {
    firstName: 'Abraham',
    lastName: 'Lincoln'
  }
];

describe('Table', () => {
  describe('Render', () => {
    const ComponentWithHook = () => {
      const { columns, data } = useTableData({
        columns: tableColumns,
        data: tableData
      });

      return <Table label="test" columns={columns} data={data} />;
    };

    const componentShallow = shallow(<ComponentWithHook />);
    const tableComponent = componentShallow.dive();

    it('should render a table', () => {
      expect(tableComponent.hasClass('table')).toBeTruthy();
    });

    const tableComponentAutoSizer = tableComponent.find('AutoSizer');

    it('should render a Grid', () => {
      expect(tableComponentAutoSizer.length).toEqual(1);
    });
  });
});
