import React from 'react';
import { mount } from 'enzyme';

import Repeater from 'components/Repeater';

describe('Repeater', () => {
  describe('Default', () => {
    const repeater = mount(
      <Repeater>
        <div className="unique" />
      </Repeater>
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
