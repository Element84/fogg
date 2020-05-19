import React from 'react';
import { shallow } from 'enzyme';
import { FaBeer } from 'react-icons/fa';
import faker from 'faker';

import ItemList from './';

describe('ItemList', () => {
  describe('Render', () => {
    const items = [
      {
        label: faker.name.firstName(),
        to: `/${faker.random.word()}`
      },
      {
        label: faker.name.firstName(),
        to: `/${faker.random.word()}`
      },
      {
        label: faker.name.firstName(),
        to: faker.random.word()
      },
      {
        label: faker.name.firstName(),
        to: faker.random.word()
      },
      {
        label: faker.name.firstName(),
        to: faker.random.word()
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
