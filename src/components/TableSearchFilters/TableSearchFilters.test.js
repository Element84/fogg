import React from 'react';
import { shallow } from 'enzyme';

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
    firstName: 'Gary',
    lastName: 'Godspeed',
    role: ['user', 'cool-guy']
  },
  {
    firstName: 'Quinn',
    lastName: 'Airgon',
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
    firstName: 'Abraham',
    lastName: 'Lincoln',
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
    }
    const component = shallow(<TableSearchFilters {...props} />);

    it('should render TableSearchFilters', () => {
      expect(component.hasClass('table-search-filters')).toBeTruthy();
    });
  });
});
