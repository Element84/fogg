import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

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
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName()
  },
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
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
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName()
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
