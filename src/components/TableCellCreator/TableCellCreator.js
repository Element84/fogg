import React from 'react';
import PropTypes from 'prop-types';

import TableCell from '../TableCell';
import TableHeaderCell from '../TableHeaderCell';

import ClassName from '../../models/classname';

// NOTE: this is not a standard component. The export here is a simple function that
// is used to render a cell within the Table component via react-window

/**
 * TableCellCreator
 * @description Creates a Cell component for the table
 */

function TableCellCreator ({
  rows = [],
  columns = [],
  onCellClick,
  onCellMouseOver,
  onCellMouseOut,
  onCellMouseEnter,
  onCellMouseLeave,
  onSort
} = {}) {
  const numberOfRows = rows.length;
  const numberOfColumns = columns.length;

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const componentClass = new ClassName('table-cell');

    const cellId = `${rowIndex}_${columnIndex}`;
    const column = columns[columnIndex] || {};
    const row = rows[rowIndex] || [];
    const cell = row[columnIndex] || {};
    const cellStyle = { ...style };

    const hasSortFunction = typeof onSort === 'function';

    const {
      columnId,
      align = 'left',
      canSort = !!hasSortFunction,
      sortType
    } = column;

    const { value, isHeader } = cell;

    const sortOptions = {
      sortType,
      canSort,
      onSort
    };

    const isFullRow = typeof row.Cell === 'function';
    const isFirstRow = rowIndex === 0;
    const isFirstColumn = columnIndex === 0;
    const isLastRow = numberOfRows - 1 === rowIndex;
    const isLastColumn = numberOfColumns - 1 === columnIndex;

    let { Cell, type = [] } = column;

    componentClass.addIf('table-cell-header', isHeader);
    componentClass.addIf(`table-cell-column-${columnId}`, columnId);
    componentClass.addIf('table-row-first', isFirstRow);
    componentClass.addIf('table-column-first', isFirstColumn);
    componentClass.addIf('table-row-last', isLastRow);
    componentClass.addIf('table-row-full', isFullRow);
    componentClass.addIf('table-column-last', isLastColumn || isFullRow);
    componentClass.add(`table-cell-align-${align}`);

    if (typeof type === 'string') {
      type = [type];
    }

    type.forEach((t) => componentClass.add(`table-cell-type-${t}`));

    const cellArgs = {
      ...cell,
      Cell,
      columnIndex,
      rowIndex,
      value,
      columnId,
      cellId
    };

    if (isFullRow) {
      cellStyle.width = '100%';
    }

    function handleOnCellClick (e) {
      e.persist();
      if (typeof onCellClick === 'function') {
        onCellClick(cellArgs, e);
      }
    }

    function handleOnCellMouseOver (e) {
      if (typeof onCellMouseOver === 'function') {
        e.persist();
        onCellMouseOver(cellArgs, e);
      }
    }

    function handleOnCellMouseOut (e) {
      if (typeof onCellMouseOut === 'function') {
        e.persist();
        onCellMouseOut(cellArgs, e);
      }
    }

    function handleOnCellMouseEnter (e) {
      if (typeof onCellMouseEnter === 'function') {
        e.persist();
        onCellMouseEnter(cellArgs, e);
      }
    }

    function handleOnCellMouseLeave (e) {
      if (typeof onCellMouseLeave === 'function') {
        e.persist();
        onCellMouseLeave(cellArgs, e);
      }
    }

    if (isFullRow && !isFirstColumn) {
      return null;
    }

    return (
      <div
        data-cell-id={cellId}
        className={componentClass.string}
        style={cellStyle}
        onClick={handleOnCellClick}
        onMouseOver={handleOnCellMouseOver}
        onMouseOut={handleOnCellMouseOut}
        onMouseEnter={handleOnCellMouseEnter}
        onMouseLeave={handleOnCellMouseLeave}
      >
        {isHeader && <TableHeaderCell cell={cellArgs} sort={sortOptions} />}
        {!isHeader && !isFullRow && <TableCell cell={cellArgs} />}
        {!isHeader && isFullRow && <row.Cell />}
      </div>
    );
  };

  Cell.propTypes = {
    columnIndex: PropTypes.number,
    rowIndex: PropTypes.number,
    style: PropTypes.object
  };

  return Cell;
}

export default TableCellCreator;
