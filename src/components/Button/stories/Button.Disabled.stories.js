import React from 'react';
import { storiesOf } from '@storybook/react';
import { FaBeer } from 'react-icons/fa';

import Story from '../../../../stories/helpers/Story';

import Button from '../';

const STORY_COMPONENT = 'Button';
const STORY_NAME = 'Disabled';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <p>
        <Button disabled={true}>Button No Link</Button>
      </p>
      <p>
        <Button to="/" disabled={true}>
          Button With Link
        </Button>
      </p>
      <p>
        <Button to="/" type="icon-before" disabled={true}>
          <FaBeer />
          Button With Icon Before
        </Button>
      </p>
      <p>
        <Button to="/" type="icon-after" disabled={true}>
          Button With Icon After
          <FaBeer />
        </Button>
      </p>
      <p>
        <Button type="circle" to="/" disabled={true}>
          <span className="visually-hidden">Button Circle</span>
          <FaBeer />
        </Button>
      </p>
      <p>
        <Button type="text" to="/" disabled={true}>
          Button Link
        </Button>
      </p>
      <p>
        <Button type={['text', 'icon-before']} to="/" disabled={true}>
          <FaBeer />
          Button Link with Icon
        </Button>
      </p>
      <p>
        <Button type={['text', 'icon-after']} to="/" disabled={true}>
          Button Link with Icon
          <FaBeer />
        </Button>
      </p>
    </Story>
  );
});
