import React from 'react';
import { shallow, mount } from 'enzyme';

import ChildToggle from './';
import InputButton from '../InputButton';

describe('ChildToggle', () => {
  describe('Default', () => {
    const repeater = mount(
      <ChildToggle name="repeater" id="repeater" label="Repeat">
        <div className="unique" />
      </ChildToggle>
    );

    it('does not render children when not checked', () => {
      expect(repeater.contains(<div className="unique" />)).toBeFalsy();
    });

    it('renders children when input is checked', () => {
      const input = repeater.find('input');

      input.simulate('change', {
        target: {
          checked: true
        }
      });

      expect(repeater.contains(<div className="unique" />)).toBeTruthy();
    });
  });

  describe('Checked', () => {
    const checked = shallow(
      <ChildToggle name="checked" id="checked" label="Checked" isChecked={true}>
        <div className="unique" />
      </ChildToggle>
    );

    it('does should render the children', () => {
      expect(checked.contains(<div className="unique" />)).toBeTruthy();
    });

    it('should set FormInput to isChecked', () => {
      expect(checked.find(InputButton).prop('isChecked')).toEqual(true);
    });
  });
});
