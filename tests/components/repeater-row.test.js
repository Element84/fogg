import React from 'react';
import { shallow } from 'enzyme';

import RepeaterRow from 'components/RepeaterRow';

describe('RepeaterRow', () => {
  describe('Default', () => {
    const repeaterrow = shallow(
      <RepeaterRow>
        <div className="unique" />
      </RepeaterRow>
    );

    it('should have the correct number of columns', () => {
      expect(repeaterrow.find('[data-col=2]'));
    });

    it('renders children when passed in', () => {
      expect(repeaterrow.contains(<div className="unique" />));
    });
  });
});
