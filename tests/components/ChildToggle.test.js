import React from 'react';
import { mount } from 'enzyme';

import { ChildToggle } from '../../ui';

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
});
