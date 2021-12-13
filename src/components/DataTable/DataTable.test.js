import React from 'react';
import { shallow } from 'enzyme';

import { useTableData } from '../../../hooks';

import DataTable from './';

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

describe('DataTable', () => {
  describe('Render', () => {
    const ComponentWithHook = () => {
      const { columns, data } = useTableData({
        columns: tableColumns,
        data: tableData
      });

      return <DataTable label="test" columns={columns} data={data} />;
    };

    const componentShallow = shallow(<ComponentWithHook />);
    const componentProps = componentShallow.props();
    const tableComponent = componentShallow.dive().find('Table');

    it('should render a Table component', () => {
      expect(tableComponent.length).toEqual(1);
    });

    const tableComponentProps = tableComponent.props();
    const tableComponentData = tableComponentProps.data;
    const tableComponentColumns = tableComponentProps.columns;

    it('should pass data and columns to the Table', () => {
      expect(componentProps.data).toEqual(tableComponentData);
      expect(componentProps.columns).toEqual(tableComponentColumns);
    });
  });
});
