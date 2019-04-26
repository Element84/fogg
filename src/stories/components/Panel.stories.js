import React from 'react';
import { storiesOf } from '@storybook/react';

import Panel from '../../components/Panel';
import ItemList from '../../components/ItemList';

const stories = storiesOf('Components|Panel', module);

stories.add('Default', () => {
  return (
    <>
      <Panel header="Content Header">
        <p>Content Body</p>
      </Panel>

      <Panel header="Content Header, No Body" />

      <Panel>
        <p>Content Body, No Header</p>
      </Panel>

      <Panel header="Content List Items">
        <ItemList
          items={[
            {
              label: 'One',
              to: '#'
            },
            {
              label: 'Two',
              to: '#'
            },
            {
              label: 'Three',
              to: '#'
            }
          ]}
        />
      </Panel>

      <Panel className="panel-clean" header="Content Clean">
        <p>Should have no padding</p>
      </Panel>
    </>
  );
});
