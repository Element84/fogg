import React from 'react';
import PropTypes from 'prop-types';

const TableRow = ({ className, cells }) => {
  return (
    <tr className={`table-row ${className || ''}`}>
      {cells.map((cell, index) => {
        return (
          <td key={`TableRow-Cell-${index}`} className="table-row-cell">
            {cell.render('Cell')}
          </td>
        );
      })}
    </tr>
  );
};

TableRow.propTypes = {
  className: PropTypes.string,
  cells: PropTypes.array
};

export default TableRow;
