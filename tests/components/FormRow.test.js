import React from 'react';
import { shallow } from 'enzyme';

import { FormRow } from '../../';

describe('WonderLink', () => {
  describe('Default', () => {
    const formrow = shallow(<FormRow>Chookity!</FormRow>);

    const repeaterrow = shallow(
      <FormRow className="repeater-row" col={2}>
        <div className="unique" />
      </FormRow>
    );

    it('should render the given text', () => {
      expect(formrow.text()).toEqual('Chookity!');
    });

    it('should have the correct class', () => {
      expect(formrow.hasClass('form-row')).toEqual(true);
    });

    it('should have the correct number of columns', () => {
      expect(repeaterrow.find('[data-col=2]').exists()).toEqual(true);
    });

    it('should have the correct custom class', () => {
      expect(repeaterrow.hasClass('repeater-row')).toEqual(true);
    });

    it('renders children when passed in', () => {
      expect(repeaterrow.contains(<div className="unique" />)).toEqual(true);
    });
  });
});
