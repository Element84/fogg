import React from 'react';
import { shallow } from 'enzyme';

import TaskAction from './';
import Button from '../Button';

describe('TaskAction', () => {
  describe('Render', () => {
    const bodyClass = 'test';
    const bodyText = 'Chookity';
    const body = <p className={bodyClass}>{bodyText}</p>;

    function handleSubmit () {}

    const positive = {
      onSubmit: handleSubmit,
      label: 'Test label'
    };

    const negative = {
      onSubmit: handleSubmit,
      label: 'Test label'
    };

    it('should render children only', () => {
      const taskAction = shallow(<TaskAction>{body}</TaskAction>);
      expect(taskAction.find(`.${bodyClass}`).text()).toEqual(bodyText);
      expect(taskAction.find(Button)).toHaveLength(0);
    });

    it('should render one button (positive in this case)', () => {
      const taskAction = shallow(
        <TaskAction positive={positive}>{body}</TaskAction>
      );
      expect(taskAction.find(`.${bodyClass}`).text()).toEqual(bodyText);
      expect(taskAction.find(Button)).toHaveLength(1);
    });

    it('should render both buttons', () => {
      const taskAction = shallow(
        <TaskAction positive={positive} negative={negative}>
          {body}
        </TaskAction>
      );
      expect(taskAction.find(`.${bodyClass}`).text()).toEqual(bodyText);
      expect(taskAction.find(Button)).toHaveLength(2);
    });
  });
});
