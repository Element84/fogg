import React from 'react';
import { shallow } from 'enzyme';
import { FaSearch, FaDatabase, FaServer, FaHddO } from 'react-icons/fa';

import { NavBar, Button } from '../../';

describe('Nav Bar', () => {
  const orientation = 'vertical';

  const primary = [
    { label: 'Top Link 1', to: '/top1', icon: { FaSearch } },
    { label: 'Top Link 2', to: '/top2', icon: { FaDatabase } }
  ];

  const secondary = [
    { label: 'Bottom Link 1', to: '/bottom1', icon: { FaServer } },
    { label: 'Bottom Link 2', to: '/bottom2', icon: { FaHddO } }
  ];

  describe('Render', () => {
    const wrapper = shallow(
      <NavBar
        orientation={orientation}
        primary={primary}
        secondary={secondary}
        activePage="/top1"
      />
    );

    it('renders four <Button /> components', () => {
      expect(wrapper.find(Button)).toHaveLength(4);
    });

    primary.forEach(item => {
      it('correctly sets the to atrribute', () => {
        expect(
          wrapper
            .find(Button)
            .findWhere(n => n.prop('to') === item.to)
            .exists()
        ).toEqual(true);
      });

      it('correctly sets the button icon', () => {
        expect(
          wrapper
            .find(Button)
            .findWhere(n => n.prop('children') === item.icon)
            .exists()
        ).toEqual(true);
      });
    });

    secondary.forEach(item => {
      it('correctly sets the to atrribute', () => {
        expect(
          wrapper
            .find(Button)
            .findWhere(n => n.prop('to') === item.to)
            .exists()
        ).toEqual(true);
      });

      it('correctly sets the button icon', () => {
        expect(
          wrapper
            .find(Button)
            .findWhere(n => n.prop('children') === item.icon)
            .exists()
        ).toEqual(true);
      });
    });

    it('correctly sets the active link', () => {
      wrapper
        .find(Button)
        .findWhere(n => n.prop('to') === '/top1')
        .forEach(item => {
          expect(item.hasClass('nav-bar-active-button')).toEqual(true);
        });

      wrapper
        .find(Button)
        .findWhere(n => n.prop('to') !== '/top1')
        .forEach(item => {
          expect(item.hasClass('nav-bar-active-button')).not.toEqual(true);
        });
    });
  });
});
