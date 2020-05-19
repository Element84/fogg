import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

import WonderLink from './';

describe('WonderLink', () => {
  describe('Default Internal', () => {
    const text = faker.random.word();
    const wonderlink = shallow(<WonderLink to="/">{text}</WonderLink>);
    const wonderlinkRendered = wonderlink.render();

    it('should utilize Gatsby Link for internal links', () => {
      expect(wonderlink.dive().name()).toEqual('GatsbyLink');
    });

    it('should render the given text', () => {
      expect(wonderlink.text()).toEqual(text);
    });

    it('should link to the provided path', () => {
      expect(wonderlinkRendered.attr('href')).toEqual('/');
    });
  });

  describe('Default External', () => {
    const text = faker.random.word();
    const wonderlink = shallow(
      <WonderLink to="https://www.element84.com">{text}</WonderLink>
    );
    const wonderlinkRendered = wonderlink.render();

    it('should render the given text', () => {
      expect(wonderlink.text()).toEqual(text);
    });

    it('should link to the provided path', () => {
      expect(wonderlinkRendered.attr('href')).toEqual(
        'https://www.element84.com'
      );
    });

    it('should include a rel value to prevent link hijacking', () => {
      expect(wonderlinkRendered.attr('rel')).toEqual('noopener noreferrer');
    });
  });

  describe('Attributes', () => {
    const wonderlink = shallow(
      <WonderLink
        to="https://www.element84.com"
        className="awesome"
        asdf="hey!"
      >
        Test
      </WonderLink>
    );
    const wonderlinkRendered = wonderlink.render();

    it('should not filter whitelisted props', () => {
      expect(wonderlinkRendered.attr('class')).toEqual('awesome');
    });

    it('should filter non-whitelisted props', () => {
      expect(wonderlinkRendered.attr('asdf')).toBeUndefined();
    });
  });

  describe('No Link', () => {
    const text = faker.random.word();
    const wonderlink = shallow(<WonderLink>{text}</WonderLink>);

    it('should not render without a link', () => {
      expect(wonderlink.html()).toEqual(`<span>${text}</span>`);
    });
  });
});
