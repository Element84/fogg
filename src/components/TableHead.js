import React from 'react';
import PropTypes from 'prop-types';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const TableHead = ({ className, headers }) => {
  return (
    <tr className={`table-row ${className || ''}`}>
      {headers.map((column, index) => {
        const showHeader = !!column.Header;
        return (
          <th key={`TableRow-Cell-${index}`} className="table-row-cell">
            <div className="table-row-cell-inner">
              {showHeader && (
                <div
                  {...column.getHeaderProps({
                    ...column.getSortByToggleProps(),
                    className: 'column-header'
                  })}
                >
                  {column.render('Header')}
                  {column.canSort && (
                    <span>
                      {column.sorted ? (
                        column.sortedDesc ? (
                          <FaSortDown />
                        ) : (
                          <FaSortUp />
                        )
                      ) : (
                        <FaSort />
                      )}
                    </span>
                  )}
                </div>
              )}
              {column.canFilter && (
                <div className="filters">{column.render('Filter')}</div>
              )}
            </div>
          </th>
        );
      })}
    </tr>
  );
};

TableHead.propTypes = {
  className: PropTypes.string,
  headers: PropTypes.array
};

export default TableHead;
