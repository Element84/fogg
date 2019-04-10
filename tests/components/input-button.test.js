import React from 'react';
import { shallow } from 'enzyme';

import InputButton from 'components/InputButton';

describe('InputButton', () => {
  const inputButton = shallow(
    <InputButton>
      <span>hello world</span>
    </InputButton>
  );
  const checkboxButton = shallow(<InputButton type="checkbox" />);

  it('renders an InputButton', () => {
    expect(inputButton.find('.radio-button-content span').text()).toEqual(
      'hello world'
    );
  });

  it('renders an radio button by default', () => {
    expect(inputButton.find('.radio-button'));
  });

  it('renders a checkbox button', () => {
    expect(checkboxButton.find('.checkbox-button'));
  });
});
