import React from 'react';
import { storiesOf } from '@storybook/react';
import { FaSearch, FaDatabase, FaServer } from 'react-icons/fa';

import NavBar from '../../components/NavBar';

const stories = storiesOf('Components|NavBar', module);

stories.add('Default', () => {
  return (
    <>
      <NavBar
        orientation="vertical"
        primary={[
          { label: 'Top Link 1', to: '/iframe.html', icon: <FaSearch /> }
        ]}
        secondary={[
          { label: 'Bottom Link 1', to: '/bottom', icon: <FaDatabase /> },
          { label: 'Bottom Link 2', to: '/bottom2', icon: <FaServer /> }
        ]}
      />
    </>
  );
});
