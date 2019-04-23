import React from 'react';
import { shallow } from 'enzyme';

import SearchBox from 'components/SearchBox';

// TODO: seems like some of these tests are difficult to set up without Enzyme having
// Hook support at this time. We should write tests when possible

describe('SearchBox', () => {
  it('renders a SearchBox', () => {
    const searchbox = shallow(<SearchBox />);
    expect(searchbox.find('FormInput').prop('className')).toEqual(
      'search-box-input'
    );
    expect(
      searchbox
        .find('.search-box-controls-date')
        .find('Button')
        .exists()
    ).toEqual(true);
    expect(
      searchbox
        .find('.search-box-controls-search')
        .find('Button')
        .exists()
    ).toEqual(true);
    expect(searchbox.find('DatetimeRange').exists()).toEqual(true);
  });

  describe('Events', () => {
    describe('Search Box Input', () => {
      const inputTestValue = 'Gary';

      it('should open the date picker when the date button is clicked', () => {
        const searchbox = shallow(<SearchBox onInput={handleInput} />);
        const searchboxInput = searchbox.find('FormInput');

        let inputTest = null;

        function handleInput (event) {
          inputTest = event.target.value;
        }

        searchboxInput.prop('onInput')({
          target: {
            value: inputTestValue
          }
        });

        expect(inputTest).toEqual(inputTestValue);
      });
    });
  });
});
