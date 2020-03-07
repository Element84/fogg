import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import Notice from '../';
import WonderLink from '../../WonderLink';

const STORY_COMPONENT = 'Notice';
const STORY_NAME = 'Custom Content';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <Notice>
        <p>Standard Paragraph</p>
      </Notice>
      <Notice>
        <h2>Headline</h2>
        <p>Standard Paragraph</p>
      </Notice>
      <Notice>
        <h2>Headline</h2>
        <p>
          Where does this link go?{' '}
          <WonderLink to="https://i.kym-cdn.com/photos/images/newsfeed/000/131/351/eb6.jpg">
            WHERE DO I GO?
          </WonderLink>
        </p>
      </Notice>
    </Story>
  );
});
