import React from 'react';
import { shallow } from 'enzyme';

import { ModForm } from '../../ui';

// TODO: Tests need to be filled out for this component once Enzyme fully supports hooks

describe('ModForm', () => {
  describe('Render', () => {
    const modForm = shallow(<ModForm className="mod-form">Hi</ModForm>);
    it('should render a ModInput', () => {
      expect(modForm.find('Form').prop('className')).toEqual('mod-form');
    });
  });
});
