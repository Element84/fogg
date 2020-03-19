import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { VariableSizeGrid as Grid } from 'react-window';
import memoizee from 'memoizee';

import { useEventListener } from '../../hooks';
import ClassName from '../../models/classname';

import TableCellCreator from '../TableCellCreator';

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

  if (displayHeader && frozenHeader) {
    componentClass.add(componentClass.childString('frozen-header'));
  }

  if (!displayHeader) {
    headerHeight = 0;
  }

  const [dimensions, setDimensions] = useState({
    width: defaultWidth,
    height: isEmpty ? headerHeight : defaultHeight
  });

  // Use an event listener to determine when the window resizes so that we
  // can use it to set the width dynamically for our Table

  useEventListener({
    target: window,
    event: 'resize',
    onEvent: handleOnResize,
    debounceOnEvent: true,
    fireOnLoad: true
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
   * handleOnResize
   * @description Manages and sets the size state of the current ref when resize occurs
   */

  function handleOnResize () {
    if (!fitContainer) return;

    const { current: currentTable } = ref;
    const { current: currentGrid } = gridRef;
    const tableHeight = isEmpty ? headerHeight : height;

    if (!currentTable) return;

    const { offsetWidth, offsetHeight } = currentTable;

    const isDiffWidth = offsetWidth !== width;
    const isDiffHeight = offsetHeight !== tableHeight;

    if (!isDiffWidth && !isDiffHeight) return;

    setDimensions(prev => {
      return {
        ...prev,
        width: offsetWidth,
        height: isEmpty ? headerHeight : offsetHeight
      };
    });

    currentGrid.resetAfterColumnIndex(0);
  }

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
    width,
    height
  };

  return (
    <div className={componentClass.string} ref={ref}>
      <div style={containerStyles}>
        {displayHeader && frozenHeader && (
          <div className={componentClass.childString('header')}>
            {HeaderCells}
          </div>
        )}
        <div className={componentClass.childString('grid')}>
          <Grid
            ref={gridRef}
            columnCount={columnsCount}
            columnWidth={index => columnWidths[index]}
            height={height}
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
