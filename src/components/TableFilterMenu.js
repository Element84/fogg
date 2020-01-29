import React from 'react';
import PropTypes from 'prop-types';
import InputButtonList from './InputButtonList';

const TableFilterMenu = ({ options = {}, preFilteredRows, setFilter }) => {
  return (
    <div className="table-filter-menu">
      {options.map(({ columnId, type, header }, index) => {
        function onChange (e, selectedOptions) {
          const checkedOptions = selectedOptions.filter(
            option => option.isChecked
          );
          let filterValue = '';
          //  assumes column 'filter' option is set to 'includes'
          checkedOptions.map(option => (filterValue += option.value));
          setFilter(columnId, filterValue);
        }

        const options = React.useMemo(() => {
          const options = new Set();
          preFilteredRows.forEach(row => {
            options.add(row.values[columnId]);
          });
          return [...options.values()];
        }, [columnId, preFilteredRows]);

        const formattedOptions = options.map(option => {
          return {
            label: option,
            value: option
          };
        });
        return (
          <div className="table-filter-option" key={index}>
            <h3>{header}</h3>
            <InputButtonList
              name={columnId}
              type={type}
              options={formattedOptions}
              onChange={onChange}
            />
          </div>
        );
      })}
    </div>
  );
};

TableFilterMenu.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      columnId: PropTypes.string,
      type: PropTypes.string,
      header: PropTypes.string
    })
  ),
  preFilteredRows: PropTypes.array,
  setFilter: PropTypes.func
};

export default TableFilterMenu;
