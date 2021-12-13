import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';
import StoryNotes from '../../../../stories/helpers/StoryNotes';

import TableCell from '../';

const STORY_COMPONENT = 'Table Cell';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const Cell = ({ cell: { value } } = {}) => <strong>{value}</strong>;

Cell.propTypes = {
  cell: PropTypes.object
};

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <StoryNotes>
        <p>
          This component is coupled to the expected props when used with the
          Table component.
        </p>
      </StoryNotes>
      <ul>
        <li>
          <TableCell
            cell={{
              value: 'undefined Cell, string value'
            }}
          />
        </li>
        <li>
          <TableCell
            cell={{
              value: <em>undefined Cell, component value</em>
            }}
          />
        </li>
        <li>
          <TableCell
            cell={{
              Cell,
              value: <em>component Cell, string value</em>
            }}
          />
        </li>
      </ul>
    </Story>
  );
});
