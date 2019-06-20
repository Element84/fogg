import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Notice from '../../components/Notice';
import WonderLink from '../../components/WonderLink';

const stories = storiesOf('Components|Notice', module);

stories.add('Default', () => {
  return (
    <>
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
    </>
  );
});

stories.add('Custom Content', () => {
  return (
    <>
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
    </>
  );
});

stories.add('Close Action', () => {
  function handleNoticeClose (e) {
    action('notice-close')(e);
  }

  return (
    <>
      <Notice weight="bold" onClose={handleNoticeClose}>
        You shall not pass! (Don&apos;t close me)
      </Notice>
    </>
  );
});
