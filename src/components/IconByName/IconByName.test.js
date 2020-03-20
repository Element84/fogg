import React from 'react';
import { shallow } from 'enzyme';

import IconByName from './';

describe('IconByName', () => {
  describe('Render', () => {
    it('should render FaSatellite', () => {
      const icon = 'FaSatellite';
      const component = shallow(<IconByName name={icon} />);
      expect(component.find(icon).length).toBeTruthy();
    });

    it('should render FaRocket', () => {
      const icon = 'FaRocket';
      const component = shallow(<IconByName name={icon} />);
      expect(component.find(icon).length).toBeTruthy();
    });

    it('should render FaPen', () => {
      const icon = 'FaPen';
      const component = shallow(<IconByName name={icon} />);
      expect(component.find(icon).length).toBeTruthy();
    });
  });
});
