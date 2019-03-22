import React from 'react';
import { shallow } from 'enzyme';

import Button from 'components/Button';

describe('Button', () => {
  describe('Render', () => {
    const text = 'Name';
    const button = shallow(<Button text={text} />);
    it('should render a button', () => {
      expect(button.find('span').text()).toEqual(text);
    });
  });

  describe('Class name', () => {
    const buttonClass = 'test-class';
    const button = shallow(<Button className={buttonClass} />);

    it('should render the correct class name', () => {
      expect(button.find('span').hasClass(buttonClass)).toEqual(true);
    });
  });

  describe('Routing', () => {
    const route = '/';
    const button = shallow(<Button to={route} />);

    it('should route to correct place', () => {
      expect(button.find('WonderLink').prop('to')).toEqual(route);
    });
  });
});
