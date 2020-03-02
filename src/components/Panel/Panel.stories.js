import React from 'react';
import { storiesOf } from '@storybook/react';
import { FaBeer } from 'react-icons/fa';

import Panel from './';
import ItemList from '../ItemList';
import Button from '../Button';

const stories = storiesOf('Components|Panel', module);

const Actions = () => {
  return (
    <ul>
      <li>
        <Button>
          <span className="visually-hidden">Beer</span>
          <FaBeer />
        </Button>
      </li>
      <li>
        <Button>
          <span className="visually-hidden">Beer</span>
          <FaBeer />
        </Button>
      </li>
    </ul>
  );
};

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

      <Panel className="panel-clean" header="Actions" actions={<Actions />}>
        <p>Should have no padding</p>
      </Panel>
    </>
  );
});
