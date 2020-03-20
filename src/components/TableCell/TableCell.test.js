import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';

import TableCell from './';

const Cell = ({ cell: { value } } = {}) => <strong>{value}</strong>;

Cell.propTypes = {
  cell: PropTypes.object
};

const cellWithValue = {
  value: 'undefined Cell, string value'
};

const cellWithComponentValueText = 'undefined Cell, component value';

const cellWithComponentValue = {
  value: <em>{cellWithComponentValueText}</em>
};

const cellWithCellRendererText = 'component Cell, string value';

const cellWithCellRenderer = {
  Cell,
  value: <em>{cellWithCellRendererText}</em>
};

describe('TableCell', () => {
  describe('Render', () => {
    it('should render a TableCell with a string value', () => {
      const component = shallow(<TableCell cell={cellWithValue} />);
      const componentDive = component.dive();
      expect(componentDive.text()).toEqual(cellWithValue.value);
    });

    it('should render a TableCell with a string value', () => {
      const component = shallow(<TableCell cell={cellWithComponentValue} />);
      expect(component.text()).toEqual(cellWithComponentValueText);
    });

    it('should render a TableCell with a string value', () => {
      const component = shallow(<TableCell cell={cellWithCellRenderer} />);
      const componentCell = component.find('Cell');

      expect(componentCell.length).toEqual(1);

      const componentCellDive = componentCell.dive();
      expect(componentCellDive.text()).toEqual(cellWithCellRendererText);
    });
  });
});
