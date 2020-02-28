import React from 'react';
import { shallow } from 'enzyme';

import Lens from './';

describe('Lens', () => {
  describe('Render', () => {
    const lens = shallow(<Lens />);
    const lensMap = lens.find('LensMapWithRefs');
    const lensSearchCompleteWithRefs = lens.find('LensSearchCompleteWithRefs');
    const lensSearchCompleteWithRefsDive = lensSearchCompleteWithRefs.dive();
    const lensSearchComplete = lensSearchCompleteWithRefsDive.find(
      'LensSearchComplete'
    );

    it('should render a LensMap component', () => {
      expect(lensMap.exists()).toEqual(true);
    });

    it('should render a SearchComplete component', () => {
      expect(lensSearchComplete.exists()).toEqual(true);
    });
  });
});
