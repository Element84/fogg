import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import WonderLink from '../';

const STORY_COMPONENT = 'Wonder Link';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <ul>
        <li>
          <WonderLink to="/" onClick={handleOnClick}>
            What&apos;s in a WonderLink with &quot;to&quot;?
          </WonderLink>
        </li>
        <li>
          <WonderLink onClick={handleOnClick}>
            What&apos;s in a WonderLink without &quot;to&quot;?
          </WonderLink>
        </li>
      </ul>
    </Story>
  );
});

/**
 * handleOnClick
 */

function handleOnClick (e) {
  action(`${STORY_COMPONENT}::onClick`)(e);
}
