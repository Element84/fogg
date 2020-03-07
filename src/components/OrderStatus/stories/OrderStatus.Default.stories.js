import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import OrderStatus from '../';

const STORY_COMPONENT = 'Order Status';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const data = {
  id: 123456,
  status: 'completed',
  orderDate: 1554782400000
};

function handleClick (e) {
  action('OrderStatus::onClick')(e);
}

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <OrderStatus order={data} onClick={handleClick} />
    </Story>
  );
});
