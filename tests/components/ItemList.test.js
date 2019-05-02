import React from 'react';
import { shallow } from 'enzyme';
import { FaBeer } from 'react-icons/fa';

import { ItemList } from '../../';

describe('ItemList', () => {
  describe('Render', () => {
    const items = [
      {
        label: 'Philip J. Fry',
        to: '/philip-j-fry'
      },
      {
        label: 'Turanga Leela',
        to: '/turanga-leela'
      },
      {
        label: 'Bender',
        to: 'bender'
      },
      {
        label: 'Hermes Conrad',
        to: 'hermes-conrad'
      },
      {
        label: 'Dr. John A. Zoidberg',
        to: 'dr-john-a-zoidberg'
      }
    ];

    it('should render an ItemList', () => {
      const itemlist = shallow(<ItemList items={items} />);
      const itemlistItems = itemlist.find('li');

      items.forEach((item, index) => {
        const currentItem = itemlistItems.at(index);
        const currentLink = currentItem.find('WonderLink');
        expect(currentLink.dive().text()).toEqual(
          `${item.label}<FaChevronRight />`
        );
        expect(currentLink.prop('to')).toEqual(item.to);
      });
    });

    it('should render an ItemList with a custom action icon', () => {
      const itemlist = shallow(
        <ItemList items={items} actionIcon={<FaBeer />} />
      );
      const itemlistItems = itemlist.find('li');

      items.forEach((item, index) => {
        const currentItem = itemlistItems.at(index);
        expect(currentItem.find('FaBeer').exists()).toEqual(true);
      });
    });
  });
});
