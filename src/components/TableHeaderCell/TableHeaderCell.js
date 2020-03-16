import React from 'react';
import PropTypes from 'prop-types';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const TableHeaderCell = ({ cell = {}, sort = {} }) => {
  const { Header } = cell;
  const { canSort, sortType, onSort } = sort;

  const HeaderComponents = [];

  HeaderComponents.push(
    <span key={'TableHeaderCell-Label'} className="table-header-label">
      {Header}
    </span>
  );

  let SortIcon = FaSort;

  if (sortType === 'asc') {
    SortIcon = FaSortUp;
  } else if (sortType === 'desc') {
    SortIcon = FaSortDown;
  }

  if (canSort) {
    HeaderComponents.push(
      <span key={'TableHeaderCell-Sort'} className="table-header-sort">
        <SortIcon
          onClick={handleOnSortClick}
          className="tabletable-cell-icon icon-sort"
        />
      </span>
    );
  }

  /**
   * handleOnSortClick
   */

  function handleOnSortClick () {
    if (typeof onSort === 'function') {
      onSort(cell);
    }
  }

  return <>{HeaderComponents}</>;
};

TableHeaderCell.propTypes = {
  cell: PropTypes.object,
  sort: PropTypes.object
};

export default TableHeaderCell;
