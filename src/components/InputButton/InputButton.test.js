import React from 'react';
import { shallow } from 'enzyme';

import InputButton from './';

describe('InputButton', () => {
  const text = 'Hello, world!';
  const inputButtonShallow = shallow(
    <InputButton name="checkbox">
      <span>{text}</span>
    </InputButton>
  );
  const inputButtonDive = inputButtonShallow.dive();

  const checkboxButtonShallow = shallow(
    <InputButton type="checkbox" name="checkbox" />
  );
  const checkboxButtonDive = checkboxButtonShallow.dive();

  it('renders an InputButton', () => {
    expect(inputButtonDive.find('.input-button-content span').text()).toEqual(
      text
    );
  });

  it('renders an radio button by default', () => {
    expect(inputButtonDive.find('.radio-button').exists()).toEqual(true);
  });

  it('renders a checkbox button', () => {
    expect(checkboxButtonDive.find('.checkbox-button').exists()).toEqual(true);
  });
});
