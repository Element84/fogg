import React from 'react';
import { shallow, mount } from 'enzyme';

import DatetimeRange from './';

describe('DatetimeRange', () => {
  it('renders a DatetimeRange', () => {
    const datetimerange = shallow(<DatetimeRange />);
    expect(
      datetimerange
        .find('.datetime-range-selection')
        .first()
        .find('strong')
        .text()
    ).toEqual('Start Date');
    expect(
      datetimerange
        .find('.datetime-range-selection')
        .last()
        .find('strong')
        .text()
    ).toEqual('End Date');
  });

  describe('Events', () => {
    it('should set a start date and trigger onChange when saved', () => {
      const datetimerange = mount(<DatetimeRange onChange={handleOnChange} />);

      let startDate = null;

      function handleOnChange ({ start }) {
        startDate = start;
      }

      const startPicker = datetimerange.find('.datetime-range-selection').first();
      const body = startPicker.find('tbody');
      const firstrow = body.find('tr').first();
      const firstday = firstrow.find('td').first();
      const save = datetimerange.find(
        '.datetime-range-actions-save .button button'
      );

      firstday.simulate('click');
      save.simulate('click');

      expect(typeof startDate).toEqual('number');
    });

    it('should set an end date and trigger onChange when saved', () => {
      const datetimerange = mount(<DatetimeRange onChange={handleOnChange} />);

      let endDate = null;

      function handleOnChange ({ end }) {
        endDate = end;
      }

      const endPicker = datetimerange.find('.datetime-range-selection').last();
      const body = endPicker.find('tbody');
      const firstrow = body.find('tr').first();
      const firstday = firstrow.find('td').first();
      const save = datetimerange.find(
        '.datetime-range-actions-save .button button'
      );

      firstday.simulate('click');
      save.simulate('click');

      expect(typeof endDate).toEqual('number');
    });
  });
});
