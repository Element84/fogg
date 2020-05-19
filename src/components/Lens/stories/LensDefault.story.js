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

  // Demonstrating the ability to patch custom functionality
  // onto the resolve function. This could be helpful from a component
  // specific implementation

  function testPatchTextQuery (args) {
    const { textInput } = args;
    action('test-testPatchTextQuery')(textInput);
    return handleResolveOnSearch(args);
  }

  return (
    <>
      <Lens
        defaultCenter={DEFAULT_CENTER}
        defaultZoom={4}
        resolveOnSearch={testPatchTextQuery}
      />
    </>
  );
};

export default LensDefault;
