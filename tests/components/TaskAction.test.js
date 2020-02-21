import React from 'react';
import { shallow } from 'enzyme';

import { TaskAction, Button } from '../../ui';

describe('TaskAction', () => {
  describe('Render', () => {
    const bodyClass = 'test';
    const bodyText = 'Chookity';
    const body = <p className={bodyClass}>{bodyText}</p>;

    // Buttons will only render if a function is provided (handleSubmit is just a dummy function here)
    function handleSubmit () {
      console.log('task action test');
    }

    it('should render children only', () => {
      const taskAction = shallow(<TaskAction>{body}</TaskAction>);
      expect(taskAction.find(`.${bodyClass}`).text()).toEqual(bodyText);
      expect(taskAction.find(Button)).toHaveLength(0);
    });

    it('should render one button (positive in this case)', () => {
      const taskAction = shallow(
        <TaskAction onPositiveSubmit={handleSubmit}>{body}</TaskAction>
      );
      expect(taskAction.find(`.${bodyClass}`).text()).toEqual(bodyText);
      expect(taskAction.find(Button)).toHaveLength(1);
    });

    it('should render both buttons', () => {
      const taskAction = shallow(
        <TaskAction
          onPositiveSubmit={handleSubmit}
          onNegativeSubmit={handleSubmit}
        >
          {body}
        </TaskAction>
      );
      expect(taskAction.find(`.${bodyClass}`).text()).toEqual(bodyText);
      expect(taskAction.find(Button)).toHaveLength(2);
    });
  });
});
