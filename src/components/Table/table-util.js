import memoizee from 'memoizee';

/**
 * calculateGridHeight
 * @param {*} tableHeight
 * @param {*} additionalHeight
 */

function calculateGridHeight (tableHeight, additionalHeight) {
  if (additionalHeight) {
    return tableHeight - additionalHeight;
  }
  return tableHeight;
}

export const calculateGridHeightMemo = memoizee(calculateGridHeight);

/**
 * mapColumnRatios
 * @param {object} Column - Should have a property of widthRatio - defaults to 1
 */

function mapColumnRatios ({ widthRatio = 1 } = {}) {
  return widthRatio;
}

export const mapColumnRatiosMemo = memoizee(mapColumnRatios);

/**
 * calculateColumnRatiosTotal
 * @param {array} columnRatios - An array of the configured ratio of each column
 */

function calculateColumnRatiosTotal (columnRatios = []) {
  return columnRatios.reduce((a, b) => a + b, 0);
}

export const calculateColumnRatiosTotalMemo = memoizee(
  calculateColumnRatiosTotal
);

/**
 * calculateSingleColumnWidth
 * @param {number} tableWidth - Width of the given table
 * @param {number} ratioTotal - Total calculated ratio Ex: [1, 3, 2] = Total of 6
 */

function calculateSingleColumnWidth (tableWidth, ratioTotal) {
  return tableWidth / ratioTotal;
}

export const calculateSingleColumnWidthMemo = memoizee(
  calculateSingleColumnWidth
);

/**
 * calculateColumnWidths
 * @param {array} ratios - An array of the column ratios
 * @param {number} singleColumnWidth - Base width of a single table column
 */

function calculateColumnWidths (ratios, singleColumnWidth) {
  return ratios.map(ratio => singleColumnWidth * ratio);
}

export const calculateColumnWidthsMemo = memoizee(calculateColumnWidths);
