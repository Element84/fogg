import React from 'react';
import { storiesOf } from '@storybook/react';
import { FaSearch, FaDatabase, FaServer } from 'react-icons/fa';

import NavBar from './';

const stories = storiesOf('Components|NavBar', module);

stories.add('Default', () => {
  return (
    <>
      <NavBar
        primary={[
          { label: 'Top Link 1', to: '/top1.html', icon: <FaSearch /> }
        ]}
        secondary={[
          { label: 'Bottom Link 1', to: '/bottom/', icon: <FaDatabase /> },
          { label: 'Bottom Link 2', to: '/bottom2/', icon: <FaServer /> }
        ]}
        activePage="/bottom"
      />
    </>
  );
});

stories.add('Vertical', () => {
  return (
    <>
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
    </>
  );
});
