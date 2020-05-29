import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { VariableSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import ClassName from '../../models/classname';

import {
  calculateGridHeightMemo,
  mapColumnRatiosMemo,
  calculateColumnRatiosTotalMemo,
  calculateSingleColumnWidthMemo,
  calculateColumnWidthsMemo
} from './table-util';

import TableCellCreator from '../TableCellCreator';

const Table = ({
  children,
  className,
  defaultHeight = 300,
  rowHeight = 80,
  headerHeight = 50,
  displayHeader = true,
  frozenHeader = true,
  columns = [],
  data = [],
  onCellClick,
  onSort
}) => {
  const ref = useRef();
  const gridRef = useRef();

  const componentClass = new ClassName('table');

  componentClass.addIf(className, className);
  componentClass.addIf(
    componentClass.childString('frozen-header'),
    displayHeader && frozenHeader
  );

  if (!displayHeader) {
    headerHeight = 0;
  }

  const activeColumns = columns.filter(
    ({ includeColumn = true } = {}) => !!includeColumn
  );

  const columnIds = activeColumns.map(({ columnId } = {}) => columnId);

  const rows = data.map(row => {
    return columnIds.map(columnId => {
      return {
        value: row[columnId]
      };
    });
  });

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

  /**
   * handleOnCellClick
   */

  function handleOnCellClick (cell, e) {
    if (typeof onCellClick === 'function') {
      onCellClick(cell, e);
    }
  }

  const containerStyles = {
    flexBasis: defaultHeight
  };

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
        <AutoSizer onResize={handleOnResize}>
          {({ height, width }) => {
            const gridHeight = calculateGridHeightMemo(
              height,
              displayHeader && headerHeight
            );
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
                  onCellClick: handleOnCellClick,
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
                    columnWidth={index => columnWidths[index]}
                    height={gridHeight}
                    rowCount={rowsCount}
                    rowHeight={() => rowHeight}
                    width={width}
                  >
                    {TableCellCreator({
                      rows,
                      columns: activeColumns,
                      onCellClick: handleOnCellClick
                    })}
                  </Grid>
                </div>
              </>
            );
          }}
        </AutoSizer>
      </div>
      {children}
    </div>
  );
};

Table.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string,
  defaultWidth: PropTypes.number,
  defaultHeight: PropTypes.number,
  rowHeight: PropTypes.number,
  headerHeight: PropTypes.number,
  displayHeader: PropTypes.bool,
  frozenHeader: PropTypes.bool,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onCellClick: PropTypes.func,
  onSort: PropTypes.func
};

export default Table;
