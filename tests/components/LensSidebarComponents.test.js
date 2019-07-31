import React from 'react';
import { shallow } from 'enzyme';

import { LensSidebarComponents } from '../../ui';

describe('LensSidebarComponents', () => {
  const SidebarPanel = () => <div>Hi</div>;

  describe('Render', () => {
    const lensSidebarComponents = shallow(
      <LensSidebarComponents SidebarComponents={SidebarPanel} />
    );

    it('should render the component', () => {
      expect(lensSidebarComponents.exists()).toEqual(true);
    });

    it('should render the SidebarComponents prop', () => {
      expect(lensSidebarComponents.find('SidebarPanel').exists()).toEqual(true);
    });
  });
});
