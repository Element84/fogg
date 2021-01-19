import React from 'react';
import { storiesOf } from '@storybook/react';
import { FaSearch, FaDatabase, FaServer } from 'react-icons/fa';

import Story from '../../../../stories/helpers/Story';

import NavBar from '../';

const STORY_COMPONENT = 'Nav Bar';
const STORY_NAME = 'Vertical';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <NavBar
        orientation="vertical"
        primary={[
          { label: 'Top Link 1', to: '/top1.html', icon: <FaSearch /> }
        ]}
        secondary={[
          { label: 'Bottom Link 1', to: '/bottom/', icon: <FaDatabase /> },
          { label: 'Bottom Link 2', to: '/bottom2/', icon: <FaServer /> }
        ]}
        activePage="/top1.html"
      />
    </Story>
  );
});
