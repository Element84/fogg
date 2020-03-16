import React from 'react';
import PropTypes from 'prop-types';

const TableCell = ({ cell = {} }) => {
  const { Cell, value } = cell;

  if (!Cell && typeof value === 'string') {
    const CellRender = () => <span>{value}</span>;
    return <CellRender />;
  }

  if (!Cell) {
    return value;
  }

  return <Cell cell={cell} />;
};

TableCell.propTypes = {
  cell: PropTypes.object
};

export default TableCell;
