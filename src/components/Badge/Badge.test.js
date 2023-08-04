import React from 'react';
import { shallow } from 'enzyme';

import Badge from './';

describe('Badge', () => {
  describe('Render', () => {
    it('should include label', () => {
      const text = 'Badge Label';
      const badge = shallow(<Badge label={text} />);
      expect(badge.find('span').text()).toEqual(text);
    });

    it('should include info class', () => {
      const type = 'info';
      const text = 'Info Badge';
      const badge = shallow(<Badge type={type} label={text} />);
      expect(badge.hasClass(`badge ${type}`)).toEqual(true);
    });

    it('should include large and success classes', () => {
      const type = 'success';
      const size = 'large';
      const text = 'Large Badge';
      const badge = shallow(<Badge type={type} size={size} label={text} />);
      expect(badge.hasClass(`badge ${type} ${size}`)).toEqual(true);
    });
  });
});
