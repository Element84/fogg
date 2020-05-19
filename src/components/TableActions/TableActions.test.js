import React from 'react';
import { shallow } from 'enzyme';

import TableActions from './';

const actions = [
  {
    to: '#',
    label: 'Create a New Thingy',
    buttonType: ['text', 'icon-before'],
    icon: 'FaPlusCircle'
  }
];

describe('TableActions', () => {
  describe('Render', () => {
    const component = shallow(<TableActions actions={actions} />);

    it('should render TableActions', () => {
      expect(component.hasClass('table-actions')).toBeTruthy();
    });

    const componentFirstAction = component
      .find('.table-actions-set li')
      .first();
    const componentFirstActionButton = componentFirstAction
      .find('Button')
      .dive();
    const componentFirstActionLink = componentFirstActionButton
      .find('WonderLink')
      .dive();

    it('should render an action', () => {
      expect(componentFirstActionLink.text()).toEqual(
        `<IconByName />${actions[0].label}`
      );
    });
  });
});
