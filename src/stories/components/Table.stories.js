import React from 'react';
import { storiesOf } from '@storybook/react';

import Table from '../../components/Table';

const stories = storiesOf('Components|Table', module);

stories.add('Table', () => {
  return (
    <>
      <Table />
    </>
  );
});
