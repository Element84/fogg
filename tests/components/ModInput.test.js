import React from 'react';
import { shallow } from 'enzyme';

import { ModInput } from '../../ui';

// TODO: Tests need to be filled out for this component once Enzyme fully supports hooks

describe('ModInput', () => {
  describe('Render', () => {
    const text = 'Mooncake';
    const id = 'test';
    const modinput = shallow(<ModInput id={id} defaultValue={text} />);
    it('should render a ModInput', () => {
      expect(modinput.find('FormInput').prop('name')).toEqual(id);
    });
  });
});
