import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { VariableSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import memoizee from 'memoizee';

import { useEventListener } from '../../hooks';
import ClassName from '../../models/classname';

import TableCellCreator from '../TableCellCreator';

function calculateGridHeight(tableHeight, headerHeight) {
  if ( headerHeight ) {
    return tableHeight - headerHeight;
  }
  return tableHeight;
}

const calculateGridHeightMemo = memoizee(calculateGridHeight);

const Table = ({
  children,
  className,
  fitContainer = false,
  defaultWidth = 500,
  defaultHeight = 300,
  rowHeight = 80,
  headerHeight = 50,
  displayHeader = true,
  frozenHeader = true,
  stretchHeightToContent = false,
  columns = [],
  data = [],
  onCellClick,
  onSort
}) => {
  const ref = useRef();
  const gridRef = useRef();

  const isEmpty = data.length === 0;

  const componentClass = new ClassName('table');

  componentClass.addIf(className, className);
  componentClass.addIf(
    componentClass.childString('frozen-header'),
    displayHeader && frozenHeader
  );
  componentClass.addIf(
    componentClass.childString('stretch-height'),
    stretchHeightToContent
  );
  componentClass.addIf(
    componentClass.childString('fit-container'),
    fitContainer
  );

  if (!displayHeader) {
    headerHeight = 0;
  }

  const [dimensions, setDimensions] = useState({
    width: defaultWidth,
    height: isEmpty ? headerHeight : defaultHeight
  });

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

  if (stretchHeightToContent) {
    dimensions.height = rowsCount * rowHeight;
  }

  const { width, height } = dimensions;

  const widthRatios = activeColumns.map(
    ({ widthRatio = 1 } = {}) => widthRatio
  );
  const widthRatiosTotal = widthRatios.reduce((a, b) => a + b, 0);
  const singleColumnWidth = width / widthRatiosTotal;
  const columnWidths = widthRatios.map(ratio => singleColumnWidth * ratio);



  /**
   * handleOnCellClick
   */

  function handleOnCellClick (cell, e) {
    if (typeof onCellClick === 'function') {
      onCellClick(cell, e);
    }
  }

  const TableCellCreatorMemo = memoizee(TableCellCreator);

  let HeaderCells;

  // If we want frozen headers, we need to separate out the components into their
  // own contained row in order to escape the react-window style and positioning

  if (displayHeader && frozenHeader) {
    const TableHeaderCreator = memoizee(TableCellCreator);
    HeaderCells = headers.map((header, index) => {
      const HeaderComponent = TableHeaderCreator({
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

  const containerStyles = {
    flexBasis: width,
    height
  };

  return (
    <div className={componentClass.string} ref={ref}>
      <div className={componentClass.childString('container')} style={containerStyles}>
        <AutoSizer>
          {({ height, width }) => {
            const gridHeight = calculateGridHeightMemo(height, displayHeader && headerHeight);

            return (
              <>
                {displayHeader && frozenHeader && (
                  <div className={componentClass.childString('header')} style={{
                    width,
                    height: headerHeight
                  }}>
                    {HeaderCells}
                  </div>
                )}
                <div className={componentClass.childString('grid')} style={{
                  width,
                  height: gridHeight
                }}>
                  <Grid
                    ref={gridRef}
                    columnCount={columnsCount}
                    columnWidth={index => columnWidths[index]}
                    height={gridHeight}
                    rowCount={rowsCount}
                    rowHeight={() => rowHeight}
                    width={width}
                  >
                    {TableCellCreatorMemo({
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
  fitContainer: PropTypes.bool,
  defaultWidth: PropTypes.number,
  defaultHeight: PropTypes.number,
  rowHeight: PropTypes.number,
  headerHeight: PropTypes.number,
  displayHeader: PropTypes.bool,
  frozenHeader: PropTypes.bool,
  stretchHeightToContent: PropTypes.bool,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onCellClick: PropTypes.func,
  onSort: PropTypes.func
};

export default Table;
