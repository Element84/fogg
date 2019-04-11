import React from 'react';
import { shallow } from 'enzyme';

import TaskStatus from 'components/TaskStatus';

describe('Task Status', () => {
  const data = [
    {
      id: 221,
      name: 'Make Dwight Smack Himself in the Face',
      windowOpen: 1554416208102,
      windowClose: 1554782400000,
      status: 'Partially Completed'
    }
  ]

  const headers = ['Window Open', 'Window Close']

  describe('Render', () => {
    const taskStatus = shallow(<TaskStatus task={data} />)
    // console.log('Task Status', shallow(<TaskStatus task={data} />).html())
    // const windows = taskStatus.find('div').find('div').find('section').find('div').find('p').html()
    it('should render the correct headers', () => {
      const propColumns = taskStatus.find('div').prop('headers')
      expect(propColumns).toEqual(headers)
    })

    it('should render the correct values', () => {
      const propColumns = taskStatus.find('div').find('div').find('section').find('div').find('p').dive('status-info-window-open').props('headers')
      expect(propColumns).toEqual('Window Open')
    })
  })
})