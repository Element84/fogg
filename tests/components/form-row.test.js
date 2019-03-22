import React from 'react';
import { shallow } from 'enzyme';

import FormRow from 'components/FormRow';

describe('WonderLink', () => {
  describe('Default', () => {
    const formrow = shallow(<FormRow>Chookity!</FormRow>);

    it('should render the given text', () => {
      expect(formrow.text()).toEqual('Chookity!');
    });

    it('should have the correct class', () => {
      expect(formrow.hasClass('form-row')).toEqual(true);
    });
  });
});
