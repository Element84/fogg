import React from 'react';
import { shallow, mount } from 'enzyme';

import InputButton from 'components/InputButton';

describe('InputButton', () => {
  const inputButton = shallow(
    <InputButton>
      <span>hello world</span>
    </InputButton>
  );
  const checkboxButton = mount(<InputButton type="checkbox" name="checkbox" />);

  it('renders an InputButton', () => {
    expect(inputButton.find('.input-button-content span').text()).toEqual(
      'hello world'
    );
  });

  it('renders an radio button by default', () => {
    expect(inputButton.find('.radio-button').exists()).toEqual(true);
  });

  it('renders a checkbox button', () => {
    expect(checkboxButton.find('.checkbox-button').exists()).toEqual(true);
  });
});
