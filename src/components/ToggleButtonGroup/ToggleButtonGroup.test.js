import React from 'react';
import TestRenderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import ToggleButtonGroup from './';

describe('ToggleButtonGroup', () => {
  describe('Render', () => {
    it('should render with two buttons', () => {
      const buttonGroup = mount(
        <ToggleButtonGroup
          onChange={() => {}}
          options={[
            { label: 'Button 1', value: '1' },
            { label: 'Button 2', value: '2' }
          ]}
        />
      );
      expect(buttonGroup.find('.button').length).toBe(2);
    });

    it('should render with three buttons', () => {
      const buttonGroup = mount(
        <ToggleButtonGroup
          onChange={() => {}}
          options={[
            { label: 'Button 1', value: '1' },
            { label: 'Button 2', value: '2' },
            { label: 'Button 3', value: '3' }
          ]}
        />
      );

      expect(buttonGroup.find('.button').length).toBe(3);
    });

    it('should render with custom className', () => {
      const buttonGroup = shallow(
        <ToggleButtonGroup
          onChange={() => {}}
          className="testButton"
          options={[{ label: 'Button 1', value: '1' }]}
        />
      );

      expect(buttonGroup.find('.testButton').length).toBe(1);
    });

    it('should render and handle a click action', () => {
      const spy = jest.fn();

      const buttonGroup = mount(
        <ToggleButtonGroup
          onChange={spy}
          options={[{ label: 'Button 1', value: '1' }]}
        />
      );

      const button = buttonGroup.find('.button');
      button.simulate('click');

      expect(spy).toHaveBeenCalled();
    });
  });
});
