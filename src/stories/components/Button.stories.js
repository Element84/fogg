import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from '../../components/Button';

storiesOf('Button', module).add('with text', () => <Button>Hello Button</Button>)