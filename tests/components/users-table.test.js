import React from 'react';
import { shallow } from 'enzyme';

import UsersTable from 'components/UsersTable';

describe('Users Table', () => {
  const userData = [
    {
      id: 1,
      firstName: 'Michael',
      lastName: 'Scott',
      address: {
        street: '1725 Slough Avenue suite 100',
        city: 'Scranton',
        state: 'PA',
        zip: 18505
      },
      organization: 'Michael Scott Paper Company',
      role: 'Admin'
    },
    {
      id: 2,
      firstName: 'Dwight',
      lastName: 'Schrute',
      address: {
        street: '1725 Slough Avenue suite 200',
        city: 'Scranton',
        state: 'PA',
        zip: 18505
      },
      organization: 'Dunder Mifflin',
      role: 'Premium'
    },
    {
      id: 3,
      firstName: 'Bob',
      lastName: 'Vance',
      address: {
        street: '1725 Slough Avenue suite 210',
        city: 'Scranton',
        state: 'PA',
        zip: 18505
      },
      organization: 'Vance Refridgeration',
      role: 'Admin'
    }
  ];

  const defaultColumns = ['Last Name', 'First Name', 'Organization', 'Role'];

  const customColumns = [
    'Last of Her Name',
    'First Men',
    'Order',
    'Roller Coaster'
  ];

  describe('Render', () => {
    const usersTable = shallow(<UsersTable users={userData} />);

    it('should render a table with default headers', () => {
      const propColumns = usersTable.find('Table').prop('columns');
      expect(propColumns).toEqual(defaultColumns);
    });

    it('should render a table with the right row values', () => {
      const propRows = usersTable.find('Table').prop('rows');
      const firstRow = propRows[0];
      expect(firstRow[0]).toEqual(userData[0].lastName);
      expect(firstRow[1]).toEqual(userData[0].firstName);
      expect(firstRow[2]).toEqual(userData[0].organization);
      expect(firstRow[3]).toEqual(userData[0].role);
    });

    it('should render a button in the last cell', () => {
      const propRows = usersTable.find('Table').prop('rows');
      const lastColumn = propRows[0][propRows[0].length - 1];
      const button = shallow(lastColumn);
      expect(button.hasClass('button')).toEqual(true);
    });
  });

  describe('Custom Headers', () => {
    const usersTable = shallow(
      <UsersTable headers={customColumns} users={userData} />
    );

    it('should render a table with default headers', () => {
      const propColumns = usersTable.find('Table').prop('columns');
      expect(propColumns).toEqual(customColumns);
    });
  });
});
