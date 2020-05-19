import React from 'react';
import { shallow } from 'enzyme';

import InputButtonList from './';

const defaultCheckboxOptions = [
  {
    label: 'Input Button Checkbox Default On',
    value: 'inputbutton-checkbox-1',
    isChecked: true
  },
  {
    label: 'Input Button Checkbox 2',
    value: 'inputbutton-checkbox-2'
  }
];

const defaultRadioOptions = [
  {
    label: 'Input Button Radio Default On',
    value: 'inputbutton-radio-1',
    isChecked: true
  },
  {
    label: 'Input Button radio 2',
    value: 'inputbutton-radio-2'
  }
];

describe('InputButtonList', () => {
  describe('Default, Radio', () => {
    const inputName = 'inputbutton-radio';

    const inputButtonListShallow = shallow(
      <InputButtonList
        name="inputbutton-radio"
        type="radio"
        options={defaultRadioOptions}
        required={true}
      />
    );
    const inputButtons = inputButtonListShallow.find('InputButtonWithRefs');

    it('should render the radio options as radio types', () => {
      inputButtons.forEach((inputButton) => {
        expect(inputButton.prop('type')).toEqual('radio');
      });
    });

    it('renders an InputButtonList', () => {
      expect(
        inputButtonListShallow.find('.input-button-list').exists()
      ).toEqual(true);
    });

    it('should include the same name as a prop for each input button', () => {
      inputButtons.forEach((inputButton) => {
        expect(inputButton.prop('name')).toEqual(inputName);
      });
    });
  });

  describe('Checkbox', () => {
    const inputName = 'inputbutton-checkbox';

    const inputButtonListShallow = shallow(
      <InputButtonList
        name={inputName}
        type="checkbox"
        options={defaultCheckboxOptions}
        required={true}
      />
    );
    const inputButtons = inputButtonListShallow.find('InputButtonWithRefs');

    it('should render the checkbox options as checkbox types', () => {
      inputButtons.forEach((inputButton) => {
        expect(inputButton.prop('type')).toEqual('checkbox');
      });
    });
  });
});
