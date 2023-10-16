import React, { useRef } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Story from '../../../../stories/helpers/Story';

import MapPreview from '../';

const STORY_COMPONENT = 'Map Preview';
const STORY_NAME = 'Map Only & Draw';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  const featureRef = useRef();

  function handleOnDraw (layer) {
    action(`${STORY_COMPONENT}::${STORY_NAME}::onDraw`)(layer);
  }

  function handleOnEdit (layer) {
    action(`${STORY_COMPONENT}::${STORY_NAME}::onEdit`)(layer);
  }

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <MapPreview
          center={{
            lat: 38.8048,
            lng: -77.0469
          }}
          emptyMap={true}
          fitGeoJson={true}
          displayAccessRequests={false}
          displayAOIDetails={false}
          disableDraw={false}
          onCreated={handleOnDraw}
          onEdited={handleOnEdit}
          featureRef={featureRef}
      />
    </Story>
  );
});
