import React from 'react';
import { shallow } from 'enzyme';

import { InputButton } from '../../ui';

describe('InputButton', () => {
  const inputButtonShallow = shallow(
    <InputButton>
      <span>hello world</span>
    </InputButton>
  );
  const inputButtonDive = inputButtonShallow.dive();

  const checkboxButtonShallow = shallow(
    <InputButton type="checkbox" name="checkbox" />
  );
  const checkboxButtonDive = checkboxButtonShallow.dive();

  it('renders an InputButton', () => {
    expect(inputButtonDive.find('.input-button-content span').text()).toEqual(
      'hello world'
    );
  });

  it('renders an radio button by default', () => {
    expect(inputButtonDive.find('.radio-button').exists()).toEqual(true);
  });

  it('renders a checkbox button', () => {
    expect(checkboxButtonDive.find('.checkbox-button').exists()).toEqual(true);
  });
});
