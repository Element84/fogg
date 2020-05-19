import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import Notice from '../';

const STORY_COMPONENT = 'Notice';
const STORY_NAME = 'Close Action';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  function handleNoticeClose (e) {
    action('notice-close')(e);
  }

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <Notice weight="bold" onClose={handleNoticeClose}>
        You shall not pass! (Don&apos;t close me)
      </Notice>
    </Story>
  );
});
