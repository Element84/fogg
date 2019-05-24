import React from 'react';
import { shallow } from 'enzyme';

import { TaskList } from '../../ui';

describe('Task List', () => {
  const data = [
    {
      id: 1,
      properties: {
        name: 'Put nickles in Dwights phone',
        windowOpen: '04/04/2019',
        windowClose: '04/04/2019',
        status: 'Completed'
      }
    },
    {
      id: 2,
      properties: {
        name: 'Defeat Dwight in a snowball fight',
        windowOpen: '04/04/2019',
        windowClose: '04/04/2019',
        status: 'Anomaly'
      }
    },
    {
      id: 3,
      properties: {
        name: 'Put more nickles in Dwights phone',
        windowOpen: '04/04/2019',
        windowClose: '04/05/2019',
        status: 'Pending'
      }
    },
    {
      id: 4,
      properties: {
        name: 'Yet more nickles',
        windowOpen: '04/04/2019',
        windowClose: '04/08/2019',
        status: 'Pending'
      }
    },
    {
      id: 5,
      properties: {
        name: 'Remove nickles so he smacks himself in the face',
        windowOpen: '04/04/2019',
        windowClose: '04/09/2019',
        status: 'Partially Completed'
      }
    }
  ];

  const defaultColumns = [
    'Name',
    'Window Open',
    'Window Close',
    'Status',
    null
  ];

  const customColumns = ['Task', 'Planned Date', 'Current Status'];

  describe('Render', () => {
    const taskList = shallow(<TaskList tasks={data} />);

    it('should render a table with default headers', () => {
      const propColumns = taskList.find('Table').prop('columns');
      expect(propColumns).toEqual(defaultColumns);
    });

    it('should render a table with the right row values', () => {
      const propRows = taskList.find('Table').prop('rows');
      const firstRow = propRows[0];
      expect(firstRow[0]).toEqual(data[0].properties.name);
      expect(firstRow[1]).toEqual(data[0].properties.windowOpen);
      expect(firstRow[2]).toEqual(data[0].properties.windowClose);
      expect(firstRow[3]).toEqual(data[0].properties.status);
    });

    it('should render a ListItemButton in the last cell', () => {
      const propRows = taskList.find('Table').prop('rows');
      const lastColumn = propRows[0][propRows[0].length - 1];
      const listItemButton = shallow(lastColumn);
      expect(listItemButton.find('Button')).toHaveLength(1);
      expect(
        listItemButton
          .find('Button')
          .findWhere(n => n.prop('to') === '/tasks/1')
          .exists()
      ).toEqual(true);
    });
  });

  describe('Custom Headers', () => {
    const taskList = shallow(<TaskList headers={customColumns} tasks={data} />);

    it('should render a table with custom headers', () => {
      const propColumns = taskList.find('Table').prop('columns');
      expect(propColumns).toEqual(customColumns);
    });
  });
});
