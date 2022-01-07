import React from 'react';
import { action } from '@storybook/addon-actions';

import Lens from '../../../components/Lens';

const DEFAULT_CENTER = {
  lat: 0,
  lng: 0
};

const LensDefault = () => {
  // Function that gets used to handle any async lookups
  // or search requests. Resolves as a promise. Most
  // likely would be used to create a search and resolve
  // the results to Lens for consumption

  function handleResolveOnSearch ({ geoJson, page }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            label: `#1 from ${JSON.stringify(geoJson)}`,
            to: '#'
          },
          {
            label: `#2 from ${JSON.stringify(geoJson)} 2`,
            to: '#'
          }
        ]);
      }, 1000);
    });
  }

  const STORY_COMPONENT = 'Lens Default';

  const searchDropOptions = [
    {
      label: 'Map Perfect',
      id: 'search-radio-1',
      onClick: handleOptionClick,
      value: 'default',
      isChecked: true
    },
    {
      label: 'Collect ID',
      id: 'search-radio-2',
      onClick: handleOptionClick,
      value: 'collect-id-007',
      isChecked: false
    },
    {
      label: 'Granule ID',
      id: 'search-radio-3',
      onClick: handleOptionClick,
      value: 'granule-id-007',
      isChecked: false
    }
  ];

  function handleOptionClick (e) {
    action(`${STORY_COMPONENT}::onActionClick`)(e.target.value);
    // activeSearchOption = e.target.value;
  }

  // Demonstrating the ability to patch custom functionality
  // onto the resolve function. This could be helpful from a component
  // specific implementation

  function testPatchTextQuery (args) {
    const { textInput } = args;
    action('test-testPatchTextQuery')(textInput);
    return handleResolveOnSearch(args);
  }

  function HandleUseMapEffect (args) {}

  return (
    <>
      <Lens
        defaultCenter={DEFAULT_CENTER}
        defaultZoom={4}
        resolveOnSearch={testPatchTextQuery}
        searchDropOption={true}
        searchDropOptions={searchDropOptions}
        hideDatetime={false}
        useMapEffect={HandleUseMapEffect}
      />
    </>
  );
};

export default LensDefault;
