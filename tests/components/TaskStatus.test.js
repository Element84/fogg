import React from 'react';
import { shallow } from 'enzyme';

import TaskStatus from 'components/TaskStatus';

describe('Task Status', () => {
  const data = {
    id: 221,
    name: 'Make Dwight Smack Himself in the Face',
    windowOpen: 1554416208102,
    windowClose: 1554782400000,
    status: 'Partially Completed'
  };

  const headers = ['Window Open', 'Window Close'];

  describe('Render', () => {
    const taskStatus = shallow(<TaskStatus headers={headers} task={data} />);

    it('should render the correct headers', () => {
      const windowOpen = taskStatus
        .find('.task-status-info-window-open')
        .text();
      const windowClose = taskStatus
        .find('.task-status-info-window-close')
        .text();
      expect(windowOpen).toEqual(headers[0]);
      expect(windowClose).toEqual(headers[1]);
    });

    it('should render the correct dates', () => {
      const correctOpenDate = taskStatus
        .find('.task-status-info-window-open + .task-status-date')
        .text();
      const correctCloseDate = taskStatus
        .find('.task-status-info-window-close + .task-status-date')
        .text();
      expect(correctOpenDate).toEqual('04/04/2019');
      expect(correctCloseDate).toEqual('04/09/2019');
    });
  });
});
