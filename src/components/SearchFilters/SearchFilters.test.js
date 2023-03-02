import React from 'react';
import { shallow } from 'enzyme';
import SearchFilters from './SearchFilters';

const baseFilters = [
  {
    id: 'id',
    label: 'Label',
    value: false
  }
];

describe('SearchFilters', () => {
  describe('Renders default type', () => {
    const filters = baseFilters;
    const searchFiltersComponent = shallow(<SearchFilters filters={filters} />);
    const inputButtonComponent = searchFiltersComponent.find(
      'InputButtonWithRefs'
    );

    it('should render the component', () => {
      expect(searchFiltersComponent.exists()).toBe(true);
    });

    it('should render an InputButton component', () => {
      expect(inputButtonComponent.exists()).toBe(true);
    });
  });

  describe('Renders list type', () => {
    const filters = [
      ...baseFilters.map((filter) => ({
        ...filter,
        type: 'checklist',
        list: ['check']
      }))
    ];
    const searchFiltersComponent = shallow(<SearchFilters filters={filters} />);
    const searchFiltersListComponent =
      searchFiltersComponent.find('SearchFiltersList');

    it('should render a SearchFiltersList component', () => {
      expect(searchFiltersListComponent.exists()).toBe(true);
    });
  });

  describe('Renders range type', () => {
    const filters = [
      ...baseFilters.map((filter) => ({
        ...filter,
        type: 'range',
        value: { min: 0, max: 10 }
      }))
    ];
    const searchFiltersComponent = shallow(<SearchFilters filters={filters} />);
    const searchFiltersRangeComponent =
      searchFiltersComponent.find('SearchFiltersRange');

    it('should render a SearchFiltersRange component', () => {
      expect(searchFiltersRangeComponent.exists()).toBe(true);
    });
  });
});
