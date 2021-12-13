import React from 'react';
import { shallow } from 'enzyme';

import Modal from './';

describe('Modal', () => {
  describe('Render', () => {
    it('should render a  modal with default close button text', () => {
      const modal = shallow(<Modal />);

      expect(modal.find('Button').dive().text()).toEqual('Close');
    });
  });
});
