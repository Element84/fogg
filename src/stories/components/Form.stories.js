import React from 'react';
import { storiesOf } from '@storybook/react';

import Form from '../../components/Form';

const stories = storiesOf('Components|Form', module);

stories.add('Default', () => <Form>Hi</Form>);
