import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

import TableCellCreator from './';

const columns = [
  {
    Header: 'First Name',
    columnId: 'firstName',
    isSorted: true,
    sortType: 'none',
    isHeader: true
  },
  {
    Header: 'Last Name',
    columnId: 'lastName',
    isHeader: true
  },
  {
    columnId: 'actions',
    Header: false,
    align: 'right',
    type: 'action',
    widthRatio: 1,
    isHeader: true
  }
];

const rows = [
  [
    {
      Header: 'First Name',
      columnId: 'firstName',
      isSorted: true,
      sortType: 'none',
      isHeader: true
    },
    {
      Header: 'Last Name',
      columnId: 'lastName',
      isHeader: true
    },
    {
      columnId: 'actions',
      Header: false,
      align: 'right',
      type: 'action',
      widthRatio: 1,
      isHeader: true
    }
  ],
  [
    {
      value: faker.name.firstName()
    },
    {
      value: faker.name.lastName()
    },
    {
      value: []
    }
  ],
  [
    {
      value: faker.name.firstName()
    },
    {
      value: faker.name.lastName()
    },
    {
      value: [<button key="test-button">Test</button>]
    }
  ],
  [
    {
      value: faker.name.firstName()
    },
    {
      value: faker.name.lastName()
    },
    {
      value: []
    }
  ]
];

function handleOnCellClick (cellArgs, e) {
  return {
    cellArgs,
    e
  };
}

function handleOnSort (cellArgs, e) {
  return {
    cellArgs,
    e
  };
}

describe('TableCellCreator', () => {
  describe('Render', () => {
    const Cell = TableCellCreator({
      rows,
      columns,
      onCellClick: handleOnCellClick,
      onSort: handleOnSort
    });

    it('should render a header cell', () => {
      const component = shallow(<Cell columnIndex={0} rowIndex={0} />);
      expect(component.hasClass('table-cell')).toEqual(true);
      expect(component.hasClass('table-cell-header')).toEqual(true);
    });

    it('should render a standard cell', () => {
      const component = shallow(<Cell columnIndex={1} rowIndex={2} />);
      expect(component.hasClass('table-cell')).toEqual(true);
      expect(component.hasClass('table-cell-header')).toEqual(false);
    });

    it('should render a right aligned action', () => {
      const component = shallow(<Cell columnIndex={2} rowIndex={1} />);
      expect(component.hasClass('table-cell')).toEqual(true);
      expect(component.hasClass('table-cell-column-actions')).toEqual(true);
    });
  });
});
