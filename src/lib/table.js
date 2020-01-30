/**
 * arrayFilter
 * @description Fuction for filtering with array filter values
 */

function arrayFilter (rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id];
    if (Array.isArray(filterValue)) {
      for (const value of filterValue) {
        if (!rowValue.includes(value)) {
          return false;
        }
      }
      return true;
    }
  });
}

module.exports.arrayFilter = arrayFilter;

/**
 * setArrayFilterValue
 * @description Function for setting the filter value of an array field
 */

function setArrayFilterValue (checkedOptions) {
  const filterValue = [];
  checkedOptions.map(option => filterValue.push(option.value));
  return filterValue;
}

module.exports.setArrayFilterValue = setArrayFilterValue;
