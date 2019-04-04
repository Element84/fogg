import React from 'react';
import { shallow } from 'enzyme';

import Task from 'components/Task';

describe('Task', () => {
  const data = [
    {
      id: 1,
      name: 'Put nickles in Dwights phone',
      date: 'today',
      status: 'Completed'
    },
    {
      id: 2,
      name: 'Defeat Dwight in a snowball fight',
      date: 'today',
      status: 'Anomaly'
    },
    {
      id: 3,
      name: 'Put more nickles in Dwights phone',
      date: 'tomorrow',
      status: 'Pending'
    },
    {
      id: 4,
      name: 'Yet more nickles',
      date: 'monday',
      status: 'Pending'
    },
    {
      id: 5,
      name: 'Remove nickles so he smacks himself in the face',
      date: 'Tuesday',
      status: 'Partially Completed'
    }
  ];

  const defaultColumns = ['Name', 'Date', 'Status'];

  const customColumns = ['Task', 'Planned Date', 'Current Status'];

  describe('Render', () => {
    const task = shallow(<Task task={data} />);

    it('should render a table with default headers', () => {
      const propColumns = task.find('Table').prop('columns');
      expect(propColumns).toEqual(defaultColumns);
    });

    it('should render a table with the right row values', () => {
      const propRows = task.find('Table').prop('rows');
      const firstRow = propRows[0];
      expect(firstRow[0]).toEqual(data[0].name);
      expect(firstRow[1]).toEqual(data[0].date);
      expect(firstRow[2]).toEqual(data[0].status);
    });

    it('should render a button in the last cell', () => {
      const propRows = task.find('Table').prop('rows');
      const lastColumn = propRows[0][propRows[0].length - 1];
      const button = shallow(lastColumn);
      expect(button.hasClass('button')).toEqual(true);
    });
  });

  describe('Custom Headers', () => {
    const task = shallow(<Task headers={customColumns} task={data} />);

    it('should render a table with custom headers', () => {
      const propColumns = task.find('Table').prop('columns');
      expect(propColumns).toEqual(customColumns);
    });
  });
});
