/**
 * arrayFilter
 * @description Fuction for filtering with array filter values
 */

function arrayFilter (rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    if (Array.isArray(filterValue) && filterValue.length > 0) {
      for (const value of filterValue) {
        if (rowValue.includes(value)) {
          return true;
        }
      }
      return false;
    }
    return true;
  });
}

module.exports.arrayFilter = arrayFilter;

/**
 * setArrayFilterValue
 * @description Function for setting the filter value of an array field
 */

function setArrayFilterValue (checkedOptions) {
  return checkedOptions.map((option) => option.value);
}

module.exports.setArrayFilterValue = setArrayFilterValue;

/**
 * availableValuesByColumnId
 */

function availableValuesByColumnId (data = [], columnId) {
  if (!Array.isArray(data)) return [];
  const columnValues = data.map((row) => row[columnId]);
  const values = new Set();
  columnValues.forEach((value) => {
    if (!Array.isArray(value)) value = [value];
    value.forEach((v) => values.add(v));
  });
  return [...values.values()];
}

module.exports.availableValuesByColumnId = availableValuesByColumnId;
