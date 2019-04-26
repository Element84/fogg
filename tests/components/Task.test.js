import React from 'react';
import { shallow } from 'enzyme';

import TaskList from 'components/TaskList';

describe('Task', () => {
  const data = [
    {
      id: 1,
      name: 'Put nickles in Dwights phone',
      windowOpen: '04/04/2019',
      windowClose: '04/04/2019',
      status: 'Completed'
    },
    {
      id: 2,
      name: 'Defeat Dwight in a snowball fight',
      windowOpen: '04/04/2019',
      windowClose: '04/04/2019',
      status: 'Anomaly'
    },
    {
      id: 3,
      name: 'Put more nickles in Dwights phone',
      windowOpen: '04/04/2019',
      windowClose: '04/05/2019',
      status: 'Pending'
    },
    {
      id: 4,
      name: 'Yet more nickles',
      windowOpen: '04/04/2019',
      windowClose: '04/08/2019',
      status: 'Pending'
    },
    {
      id: 5,
      name: 'Remove nickles so he smacks himself in the face',
      windowOpen: '04/04/2019',
      windowClose: '04/09/2019',
      status: 'Partially Completed'
    }
  ];

  const defaultColumns = ['Name', 'Window Open', 'Window Close', 'Status'];

  const customColumns = ['Task', 'Planned Date', 'Current Status'];

  describe('Render', () => {
    const taskList = shallow(<TaskList task={data} />);

    it('should render a table with default headers', () => {
      const propColumns = taskList.find('Table').prop('columns');
      expect(propColumns).toEqual(defaultColumns);
    });

    it('should render a table with the right row values', () => {
      const propRows = taskList.find('Table').prop('rows');
      const firstRow = propRows[0];
      expect(firstRow[0]).toEqual(data[0].name);
      expect(firstRow[1]).toEqual(data[0].windowOpen);
      expect(firstRow[2]).toEqual(data[0].windowClose);
      expect(firstRow[3]).toEqual(data[0].status);
    });

    it('should render a button in the last cell', () => {
      const propRows = taskList.find('Table').prop('rows');
      const lastColumn = propRows[0][propRows[0].length - 1];
      const button = shallow(lastColumn);
      expect(button.hasClass('button')).toEqual(true);
    });
  });

  describe('Custom Headers', () => {
    const taskList = shallow(<TaskList headers={customColumns} task={data} />);

    it('should render a table with custom headers', () => {
      const propColumns = taskList.find('Table').prop('columns');
      expect(propColumns).toEqual(customColumns);
    });
  });
});
