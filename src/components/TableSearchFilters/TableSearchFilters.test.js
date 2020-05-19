import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

import TableSearchFilters from './';

const FILTER_MENU_OPTIONS = [
  {
    columnId: 'role',
    type: 'checkbox',
    Header: 'Role'
  }
];

const tableData = [
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    role: ['user', 'cool-guy']
  },
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    role: ['user', 'hero'],
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
    lastName: faker.name.lastName(),
    role: ['user', 'emancipator']
  }
];

function handleOnChange (args) {
  return args;
}

describe('TableSearchFilters', () => {
  describe('Render', () => {
    const props = {
      options: FILTER_MENU_OPTIONS,
      defaultTableData: tableData,
      onChange: handleOnChange
    };
    const component = shallow(<TableSearchFilters {...props} />);

    it('should render TableSearchFilters', () => {
      expect(component.hasClass('table-search-filters')).toBeTruthy();
    });
  });
});
