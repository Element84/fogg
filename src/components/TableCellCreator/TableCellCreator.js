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

function TableCellCreator ({ rows, columns, onCellClick, onSort } = {}) {
  const numberOfRows = rows.length;
  const numberOfColumns = columns.length;

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const componentClass = new ClassName('tabletable-cell');

    const column = columns[columnIndex];
    const row = rows[rowIndex];
    const cell = row[columnIndex];

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

    const isFirstRow = rowIndex === 0;
    const isFirstColumn = columnIndex === 0;
    const isLastRow = numberOfRows - 1 === rowIndex;
    const isLastColumn = numberOfColumns - 1 === columnIndex;

    let { Cell, type = [] } = column;

    componentClass.addIf('tabletable-cell-header', isHeader);
    componentClass.addIf(`tabletable-cell-column-${columnId}`, columnId);
    componentClass.addIf('tabletable-row-first', isFirstRow);
    componentClass.addIf('tabletable-column-first', isFirstColumn);
    componentClass.addIf('tabletable-row-last', isLastRow);
    componentClass.addIf('tabletable-column-last', isLastColumn);
    componentClass.add(`tabletable-cell-align-${align}`);

    if (typeof type === 'string') {
      type = [type];
    }

    type.forEach(t => componentClass.add(`tabletable-cell-type-${t}`));

    const cellArgs = {
      ...cell,
      Cell,
      columnIndex,
      rowIndex,
      value,
      columnId
    };

    function handleOnCellClick (e) {
      if (typeof onCellClick === 'function') {
        onCellClick(cellArgs, e);
      }
    }

    return (
      <div
        className={componentClass.string}
        style={style}
        onClick={handleOnCellClick}
      >
        {isHeader && <TableHeaderCell cell={cellArgs} sort={sortOptions} />}
        {!isHeader && <TableCell cell={cellArgs} />}
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
