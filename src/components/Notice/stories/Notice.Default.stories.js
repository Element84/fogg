import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import Notice from '../';

const STORY_COMPONENT = 'Notice';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <Notice>Default</Notice>
      <Notice weight="bold" align="center">
        Default Bold Center
      </Notice>
      <Notice type="warning">Warning</Notice>
      <Notice type="warning" weight="bold" align="center">
        Warning Bold Center
      </Notice>
      <Notice type="error">Error</Notice>
      <Notice type="error" weight="bold" align="center">
        Error Bold Center
      </Notice>
      <Notice type="success">Success</Notice>
      <Notice type="success" weight="bold" align="center">
        Success Bold Center
      </Notice>
      <Notice type="info">Info</Notice>
      <Notice type="info" weight="bold" align="center">
        Info Bold Center
      </Notice>
    </Story>
  );
});
