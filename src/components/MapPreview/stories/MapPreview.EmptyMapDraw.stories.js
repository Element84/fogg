import React, { useRef } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Story from '../../../../stories/helpers/Story';

import MapPreview from '..';

const STORY_COMPONENT = 'Map Preview';
const STORY_NAME = 'Empty Map & Draw Controls';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  const featureRef = useRef();

  function handleOnDraw (drawLayer, leafletElement) {
    action(`${STORY_COMPONENT}::onDraw`)(drawLayer, leafletElement);
  }

  function handleOnEdit (drawLayer, leafletElement) {
    action(`${STORY_COMPONENT}::onEdit`)(drawLayer, leafletElement);
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
          disableEdit={false}
          onDrawCreated={handleOnDraw}
          onDrawEdited={handleOnEdit}
          featureRef={featureRef}
          drawControlOptions={{
            circle: true,
            circlemarker: false,
            marker: false,
            polygon: true,
            polyline: false,
            rectangle: true
          }}
      />
    </Story>
  );
});
