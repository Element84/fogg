import React from 'react';
import { shallow, mount } from 'enzyme';

import DatetimeRange from 'components/DatetimeRange';

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
    it('should trigger onChange event with updated start date', () => {
      const datetimerange = mount(<DatetimeRange onChange={handleOnChange} />);

      let startDate = null;

      function handleOnChange ({ start }) {
        startDate = start;
      }

      const startPicker = datetimerange.find('DateTime').first();
      const body = startPicker.find('tbody');
      const firstrow = body.find('tr').first();
      const firstday = firstrow.find('td').first();

      firstday.simulate('click');

      expect(typeof startDate).toEqual('string');
    });

    it('should trigger onChange event with updated end date', () => {
      const datetimerange = mount(<DatetimeRange onChange={handleOnChange} />);

      let endDate = null;

      function handleOnChange ({ end }) {
        endDate = end;
      }

      const endPicker = datetimerange.find('DateTime').last();
      const body = endPicker.find('tbody');
      const firstrow = body.find('tr').first();
      const firstday = firstrow.find('td').first();

      firstday.simulate('click');

      expect(typeof endDate).toEqual('string');
    });
  });
});
