import React from 'react';
import { storiesOf } from '@storybook/react';

import LensBasemap from './stories/LensBasemap.story';
import LensDefault from './stories/LensDefault.story';
import LensLayers from './stories/LensLayers.story';
import LensEarthSearchDynamicLayerDate from './stories/LensEarthSearchDynamicLayerDate.story';
import LensEarthSearchDefault from './stories/LensEarthSearchDefault.story';
import LensEarthSearchNoFilter from './stories/LensEarthSearchNoFilter.story';
import LensEarthSearchDateOnly from './stories/LensEarthSearchDateOnly.story';
import LensEarthSearchCustomDraw from './stories/LensEarthSearchCustomDraw.story';
import LensSearchSearchUpdateFilterSelect from './stories/LensSearchSearchUpdateFilterSelect.story';
import LensEarthSearchResetView from './stories/LensEarthSearchResetView.story';
import LensEarthSearchInitialSearch from './stories/LensEarthSearchInitialSearch.story';
import LensEarthSearchNoGeoSearch from './stories/LensEarthSearchNoGeoSearch.story';
import LensEarthSearchResultsNoFilter from './stories/LensEarthSearchResultsNoFilter.story';

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
stories.add(
  'Earth Search - Dynamic Layer Date',
  LensEarthSearchDynamicLayerDate
);
stories.add('Earth Search - Custom Draw Options', LensEarthSearchCustomDraw);
stories.add(
  'Earth Search - Update Filter on Select',
  LensSearchSearchUpdateFilterSelect
);

stories.add(
  'Earth Search - Reset View on Clear Search',
  LensEarthSearchResetView
);

stories.add('Earth Search - Initial Search', LensEarthSearchInitialSearch);
stories.add('Earth Search - No Geo Search', LensEarthSearchNoGeoSearch);
stories.add(
  'Earth Search - No Filters on Results',
  LensEarthSearchResultsNoFilter
);
