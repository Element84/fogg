import React from 'react';
import { storiesOf } from '@storybook/react';
import { FaBeer } from 'react-icons/fa';

import Button from '../';

const STORY_COMPONENT = 'Button';
const STORY_NAME = 'Default';

const stories = storiesOf(
  `Components|${STORY_COMPONENT}|${STORY_NAME}`,
  module
);

stories.add(STORY_NAME, () => {
  return (
    <>
      <h1>{STORY_COMPONENT}</h1>
      <h2>{STORY_NAME}</h2>
      <p>
        <Button>Button No Link</Button>
      </p>
      <p>
        <Button to="/">Button With Link</Button>
      </p>
      <p>
        <Button to="/" type="icon-before">
          <FaBeer />
          Button With Icon Before
        </Button>
      </p>
      <p>
        <Button to="/" type="icon-after">
          Button With Icon After
          <FaBeer />
        </Button>
      </p>
      <p>
        <Button type="circle" to="/">
          <span className="visually-hidden">Button Circle</span>
          <FaBeer />
        </Button>
      </p>
      <p>
        <Button type="text" to="/">
          Button Link
        </Button>
      </p>
      <p>
        <Button type={['text', 'icon-before']} to="/">
          <FaBeer />
          Button Link with Icon
        </Button>
      </p>
      <p>
        <Button type={['text', 'icon-after']} to="/">
          Button Link with Icon
          <FaBeer />
        </Button>
      </p>
    </>
  );
});
