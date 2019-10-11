import React from 'react';
import { storiesOf } from '@storybook/react';

import LensBasemap from './Lens/LensBasemap.story';
import LensDefault from './Lens/LensDefault.story';
import LensLayers from './Lens/LensLayers.story';
import LensEarthSearchDefault from './Lens/LensEarthSearchDefault.story';
import LensEarthSearchNoFilter from './Lens/LensEarthSearchNoFilter.story';
import LensEarthSearchDateOnly from './Lens/LensEarthSearchDateOnly.story';

const stories = storiesOf('Components|Lens', module);

stories.add('Default', LensDefault);
stories.add('Basemap', LensBasemap);
stories.add('Layers', LensLayers);
stories.add('Earth Search - Default', LensEarthSearchDefault);
stories.add('Earth Search - No Filter', LensEarthSearchNoFilter);
stories.add('Earth Search - Date Only', LensEarthSearchDateOnly);

stories.add('Earth Search - Date Only with Default Date', () => {
  return (
    <LensEarthSearchDateOnly
      defaultDateRange={{
        start: 1568260800000,
        end: 1569007834750
      }}
    />
  );
});
