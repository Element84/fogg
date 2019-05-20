import React from 'react';
import { storiesOf } from '@storybook/react';
import { FaBeer } from 'react-icons/fa';

import Button from '../../components/Button';

const stories = storiesOf('Components|Button', module);

stories.add('Default', () => {
  return (
    <>
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

stories.add('Disabled', () => {
  return (
    <>
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
    </>
  );
});
