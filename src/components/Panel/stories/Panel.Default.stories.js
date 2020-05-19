import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { FaSatellite, FaRocket, FaSatelliteDish } from 'react-icons/fa';

import Story from '../../../../stories/helpers/Story';

import Panel from '../';
import ItemList from '../../ItemList';
import PanelActions from '../../PanelActions';

const STORY_COMPONENT = 'Panel';
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
      <Panel header="Content Header">
        <p>Content Body</p>
      </Panel>

      <Panel header="Content Header, No Body" />

      <Panel>
        <p>Content Body, No Header</p>
      </Panel>

      <Panel header="Content List Items">
        <ItemList
          items={[
            {
              label: 'One',
              to: '#'
            },
            {
              label: 'Two',
              to: '#'
            },
            {
              label: 'Three',
              to: '#'
            }
          ]}
        />
      </Panel>

      <Panel className="panel-clean" header="Content Clean">
        <p>Should have no padding</p>
      </Panel>

      <Panel header="Actions" actions={<PanelActions actions={panelActions} />}>
        <p>Content Body</p>
      </Panel>
    </Story>
  );
});
