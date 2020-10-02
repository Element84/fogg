import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { VariableSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { v1 as uuidv1 } from 'uuid';

import ClassName from '../../models/classname';
import { CELL_ORIGINAL_VALUE_POSTFIX } from '../../hooks/useTableData';

import {
  calculateGridHeightMemo,
  mapColumnRatiosMemo,
  calculateColumnRatiosTotalMemo,
  calculateSingleColumnWidthMemo,
  calculateColumnWidthsMemo
} from './table-util';

import TableCellCreator from '../TableCellCreator';

const defaultTableKey = uuidv1();

const Table = ({
  children,
  className,
  fixHeightToContent = false,
  defaultHeight = 300,
  rowHeight = 80,
  headerHeight = 50,
  footerHeight = 0,
  displayHeader = true,
  frozenHeader = true,
  columns = [],
  data = [],
  extraRows = [],
  rowAttributes = [],
  onCellClick,
  onCellMouseOver,
  onCellMouseOut,
  onCellMouseEnter,
  onCellMouseLeave,
  onSort
}) => {
  const ref = useRef();
  const gridRef = useRef();
  const [tableKey, setTableKey] = useState(defaultTableKey);

  const componentClass = new ClassName('table');

  componentClass.addIf(className, className);
  componentClass.addIf(
    componentClass.childString('frozen-header'),
    displayHeader && frozenHeader
  );

  if (!displayHeader) {
    headerHeight = 0;
  }

  const extrasHeight = headerHeight + footerHeight;

  const activeColumns = columns.filter(
    ({ includeColumn = true } = {}) => !!includeColumn
  );

  const columnIds = activeColumns.map(({ columnId } = {}) => columnId);

  // Map through the data and create a new array including just the value
  // and the origina lvalue for each cell. The original value refers to
  // what the value might have been before a cell transform

  let rows = data.map((row) => {
    return columnIds.map((columnId) => {
      const valueOrig = row[`${columnId}${CELL_ORIGINAL_VALUE_POSTFIX}`];
      return {
        value: row[columnId],
        valueOrig: valueOrig || row[columnId]
      };
    });
  });

  // Apply any extra rows that were passed in from the table instance

  if (Array.isArray(extraRows)) {
    rows = [...rows, ...extraRows];
  }

  // If the table wants to include headers, map through and create an array
  // to configure the header row

  const headers =
    displayHeader &&
    activeColumns.map((column = {}) => {
      return {
        ...column,
        isHeader: true
      };
    });

  // If we're not trying to add frozen headers, add the headers to the top of the rows list

  if (displayHeader && !frozenHeader) {
    rows.unshift(headers);
  }

  const rowsCount = rows.length;
  const columnsCount = activeColumns.length;

  if (fixHeightToContent) {
    const contentHeight = rowsCount * rowHeight;
    defaultHeight = contentHeight + extrasHeight;
  }

  const containerStyles = {
    height: defaultHeight
  };

  // When our data object changes, try invalidating the size
  // to make sure our tables are always in the correct state

  useEffect(() => {
    setTableKey(uuidv1());
    handleOnResize();
  }, [data]);

  /**
   * handleOnResize
   */

  function handleOnResize () {
    if (!gridRef.current) return;
    gridRef.current.resetAfterColumnIndex(0);
  }

  return (
    <div className={componentClass.string} ref={ref}>
      <div
        className={componentClass.childString('container')}
        style={containerStyles}
      >
        <AutoSizer key={tableKey} onResize={handleOnResize}>
          {({ height, width }) => {
            const gridHeight = calculateGridHeightMemo(height, extrasHeight);

            const widthRatios = activeColumns.map(mapColumnRatiosMemo);
            const widthRatiosTotal = calculateColumnRatiosTotalMemo(
              widthRatios
            );
            const singleColumnWidth = calculateSingleColumnWidthMemo(
              width,
              widthRatiosTotal
            );
            const columnWidths = calculateColumnWidthsMemo(
              widthRatios,
              singleColumnWidth
            );

            // If we want frozen headers, we need to separate out the components into their
            // own contained row in order to escape the react-window style and positioning

            let HeaderCells;

            if (displayHeader && frozenHeader) {
              HeaderCells = headers.map((header, index) => {
                const HeaderComponent = TableCellCreator({
                  rows: [headers],
                  columns: activeColumns,
                  rowAttributes,
                  onCellClick,
                  onCellMouseOver,
                  onCellMouseOut,
                  onCellMouseEnter,
                  onCellMouseLeave,
                  onSort
                });
                return (
                  <HeaderComponent
                    key={`TableHeader-${index}`}
                    columnIndex={index}
                    rowIndex={0}
                    style={{
                      width: columnWidths[index],
                      height: headerHeight
                    }}
                  />
                );
              });
            }

            return (
              <>
                {HeaderCells && (
                  <div
                    className={componentClass.childString('header')}
                    style={{
                      width,
                      height: headerHeight
                    }}
                  >
                    {HeaderCells}
                  </div>
                )}
                <div
                  className={componentClass.childString('grid')}
                  style={{
                    width,
                    height: gridHeight
                  }}
                >
                  <Grid
                    ref={gridRef}
                    columnCount={columnsCount}
                    columnWidth={(index) => columnWidths[index]}
                    height={gridHeight}
                    rowCount={rowsCount}
                    rowHeight={() => rowHeight}
                    width={width}
                  >
                    {TableCellCreator({
                      rows,
                      columns: activeColumns,
                      rowAttributes,
                      onCellClick,
                      onCellMouseOver,
                      onCellMouseOut,
                      onCellMouseEnter,
                      onCellMouseLeave
                    })}
                  </Grid>
                </div>
                {children && (
                  <div
                    className={componentClass.childString('footer')}
                    style={{
                      width,
                      height: footerHeight
                    }}
                  >
                    {children}
                  </div>
                )}
              </>
            );
          }}
        </AutoSizer>
      </div>
    </div>
  );
};

Table.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string,
  fixHeightToContent: PropTypes.bool,
  defaultHeight: PropTypes.number,
  rowHeight: PropTypes.number,
  headerHeight: PropTypes.number,
  footerHeight: PropTypes.number,
  displayHeader: PropTypes.bool,
  frozenHeader: PropTypes.bool,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  extraRows: PropTypes.array,
  rowAttributes: PropTypes.array,
  onCellClick: PropTypes.func,
  onCellMouseOver: PropTypes.func,
  onCellMouseOut: PropTypes.func,
  onCellMouseEnter: PropTypes.func,
  onCellMouseLeave: PropTypes.func,
  onSort: PropTypes.func
};

export default Table;
