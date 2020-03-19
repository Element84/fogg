import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { FaSatellite, FaRocket, FaSatelliteDish } from 'react-icons/fa';

import Story from '../../../../stories/helpers/Story';
import StoryNotes from '../../../../stories/helpers/StoryNotes';

import PanelActions from '../';
import Panel from '../../Panel';

const STORY_COMPONENT = 'Panel Actions';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

function handleOnActionClick (e) {
  action(`${STORY_COMPONENT}::onActionClick`)(e);
}

const panelActions = [
  {
    label: 'Satellite',
    icon: <FaSatellite />,
    onClick: handleOnActionClick
  },
  {
    label: 'Rocket',
    icon: <FaRocket />,
    onClick: handleOnActionClick,
    isVisible: true
  },
  {
    label: 'Satellite Dish',
    icon: <FaSatelliteDish />,
    onClick: handleOnActionClick,
    isVisible: false
  }
];

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <StoryNotes>
        <p>
          The PanelActions component is a list (<code>ul</code>) of icon{' '}
          <a href="/?path=/story/components-button--default">Buttons</a>. By
          itself it may appear unstyled, however the primary use case is
          intended to be that the PanelActions component is included as the{' '}
          <code>actions</code> prop within the{' '}
          <a href="/?path=/story/components-panel--default">Panel</a> component
        </p>
      </StoryNotes>

      <PanelActions actions={panelActions} />

      <h3>Included with the Panel Component</h3>

      <Panel header="Actions" actions={<PanelActions actions={panelActions} />}>
        <p>Content Body</p>
      </Panel>
    </Story>
  );
});
