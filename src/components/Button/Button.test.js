import React from 'react';
import { shallow } from 'enzyme';

import Button from './';

describe('Button', () => {
  describe('Render', () => {
    const text = 'Name';
    const button = shallow(<Button>{text}</Button>);
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

  describe('Type', () => {
    it('should added 1 type class to the button', () => {
      const route = '/';
      const type = 'text';
      const button = shallow(<Button type={type} to={route} />);
      expect(button.hasClass(`button-${type}`)).toEqual(true);
    });

    it('should added 2 type classes to the button', () => {
      const route = '/';
      const types = ['text', 'icon-after'];
      const button = shallow(<Button type={types} to={route} />);
      types.forEach((type) => {
        expect(button.hasClass(`button-${type}`)).toEqual(true);
      });
    });
  });
});
