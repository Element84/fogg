import React from 'react';
import { shallow } from 'enzyme';

import TableCellHeader from './';

const cellSorted = {
  Header: 'First Name',
  columnId: 'firstName',
  isSorted: true,
  sortType: 'none',
  isHeader: true,
  Cell: undefined,
  columnIndex: 0,
  rowIndex: 0,
  value: undefined
};

const cellNoteSorted = {
  Header: 'Last Name',
  columnId: 'lastName',
  isHeader: true,
  Cell: undefined,
  columnIndex: 1,
  rowIndex: 0,
  value: undefined
};

const cellEmpty = {
  columnId: 'actions',
  Header: false,
  align: 'right',
  type: 'action',
  widthRatio: 1,
  isHeader: true,
  Cell: undefined,
  columnIndex: 2,
  rowIndex: 0,
  value: undefined
};

const sortAvailable = {
  sortType: 'none',
  canSort: true,
  onSort: handleOnSort
};

const sortNone = {
  sortType: undefined,
  canSort: false,
  onSort: undefined
};

function handleOnSort (cell) {
  return cell;
}

describe('TableHeaderCell', () => {
  describe('Render', () => {
    it('should render a sortable column header cell', () => {
      const Component = (
        <TableCellHeader cell={cellSorted} sort={sortAvailable} />
      );
      const ComponentShallow = shallow(Component);
      expect(ComponentShallow.length).toEqual(1);
    });

    it('should render a column header cell without sort', () => {
      const Component = (
        <TableCellHeader cell={cellNoteSorted} sort={sortNone} />
      );
      const ComponentShallow = shallow(Component);
      expect(ComponentShallow.length).toEqual(1);
    });

    it('should not render a cell', () => {
      const Component = <TableCellHeader cell={cellEmpty} sort={sortNone} />;
      const ComponentShallow = shallow(Component);
      expect(ComponentShallow.length).toEqual(1);
    });
  });
});
