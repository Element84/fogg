import React from 'react';
import { shallow } from 'enzyme';
import SearchFiltersList from './SearchFiltersList';
import { ALL_VALUES_ITEM } from '../../data/search-filters';

const baseFiltersList = {
  id: 'base-list',
  list: ['value1', 'value2', 'value3']
};
const displayList = {
  [baseFiltersList.list[0]]: 'Display Value One',
  [baseFiltersList.list[1]]: 'Display Value Two',
  [baseFiltersList.list[2]]: 'Display Value Three'
};

describe('SearchFiltersList', () => {
  const expectedList = [ALL_VALUES_ITEM, ...baseFiltersList.list];

  describe('Renders default', () => {
    const filterList = baseFiltersList;
    const searchFiltersListComponent = shallow(
      <SearchFiltersList {...filterList} />
    );
    const inputButtonComponents = searchFiltersListComponent.find(
      'InputButtonWithRefs'
    );

    it('should render the filter list items', () => {
      expect(inputButtonComponents).toHaveLength(expectedList.length);
    });

    inputButtonComponents.forEach((inputButtonComponent, index) => {
      it(`component[${index}].value should be ${expectedList[index]}`, () => {
        expect(inputButtonComponent.prop('value')).toBe(expectedList[index]);
      });

      it(`component[${index}].label should be ${expectedList[index]}`, () => {
        expect(inputButtonComponent.prop('label')).toBe(expectedList[index]);
      });

      it(`component[${index}].type should be checkbox`, () => {
        expect(inputButtonComponent.prop('type')).toBe('checkbox');
      });
    });
  });

  describe('Renders radiolist type default', () => {
    const filterList = {
      ...baseFiltersList,
      type: 'radiolist'
    };
    const searchFiltersListComponent = shallow(
      <SearchFiltersList {...filterList} />
    );
    const inputButtonComponents = searchFiltersListComponent.find(
      'InputButtonWithRefs'
    );

    it('should render the filter list items', () => {
      expect(inputButtonComponents).toHaveLength(expectedList.length);
    });

    inputButtonComponents.forEach((inputButtonComponent, index) => {
      it(`component[${index}].value should be ${expectedList[index]}`, () => {
        expect(inputButtonComponent.prop('value')).toBe(expectedList[index]);
      });

      it(`component[${index}].label should be ${expectedList[index]}`, () => {
        expect(inputButtonComponent.prop('label')).toBe(expectedList[index]);
      });

      it(`component[${index}].type should be radio`, () => {
        expect(inputButtonComponent.prop('type')).toBe('radio');
      });
    });
  });

  describe('Renders checklist with friendly display names', () => {
    const filterList = {
      ...baseFiltersList,
      displayList
    };
    const searchFiltersListComponent = shallow(
      <SearchFiltersList {...filterList} />
    );
    const inputButtonComponents = searchFiltersListComponent.find(
      'InputButtonWithRefs'
    );

    it('should render the filter list items', () => {
      expect(inputButtonComponents).toHaveLength(expectedList.length);
    });

    inputButtonComponents.forEach((inputButtonComponent, index) => {
      it(`component[${index}].value should be ${expectedList[index]}`, () => {
        expect(inputButtonComponent.prop('value')).toBe(expectedList[index]);
      });

      // the first item is "All Values", and it's value is the label
      if (index === 0) return;

      const expectedDisplayLabel = displayList[expectedList[index]];

      it(`component[${index}].label should be ${expectedDisplayLabel}`, () => {
        expect(inputButtonComponent.prop('label')).toBe(expectedDisplayLabel);
      });
    });
  });

  describe('Renders radiolist with friendly display names', () => {
    const filterList = {
      ...baseFiltersList,
      displayList,
      type: 'radiolist'
    };
    const searchFiltersListComponent = shallow(
      <SearchFiltersList {...filterList} />
    );
    const inputButtonComponents = searchFiltersListComponent.find(
      'InputButtonWithRefs'
    );

    it('should render the filter list items', () => {
      expect(inputButtonComponents).toHaveLength(expectedList.length);
    });

    inputButtonComponents.forEach((inputButtonComponent, index) => {
      it(`component[${index}].value should be ${expectedList[index]}`, () => {
        expect(inputButtonComponent.prop('value')).toBe(expectedList[index]);
      });

      // the first item is "All Values", and it's value is the label
      if (index === 0) return;

      const expectedDisplayLabel = displayList[expectedList[index]];

      it(`component[${index}].label should be ${expectedDisplayLabel}`, () => {
        expect(inputButtonComponent.prop('label')).toBe(expectedDisplayLabel);
      });
    });
  });

  describe('Renders checklist with no All Values item and a Select All button', () => {
    const filterList = {
      ...baseFiltersList,
      onToggleChecklist: () => {},
      showAllValuesListItem: false
    };
    const searchFiltersListComponent = shallow(
      <SearchFiltersList {...filterList} />
    );
    const inputButtonComponents = searchFiltersListComponent.find(
      'InputButtonWithRefs'
    );

    it('should render the SelectAllButton', () => {
      expect(searchFiltersListComponent.find('SelectAllButton'))
        .toHaveLength(1);
    });

    it('should render the filter list items', () => {
      expect(inputButtonComponents).toHaveLength(baseFiltersList.list.length);
    });

    inputButtonComponents.forEach((inputButtonComponent, index) => {
      it(`component[${index}].value should be ${baseFiltersList.list[index]}`, () => {
        expect(inputButtonComponent.prop('value')).toBe(baseFiltersList.list[index]);
      });
    });
  });
});
