import React from 'react';
import { storiesOf } from '@storybook/react';

const STORY_COMPONENT = 'Docs';
const STORY_NAME = 'Intro';

const stories = storiesOf(`${STORY_COMPONENT}`, module).addParameters({
  options: {
    showAddonPanel: false,
  },
  info: {
    disable: true,
  }
});

stories.add(STORY_NAME, () => {
  return (
    <>
      <h1>Getting Started with Fogg</h1>
      <h2>What is Fogg?</h2>
      <p>
        Fogg is a mapping component library built with React that makes
        it easier to wrangle geospatial data and make it available on a map.
      </p>
      <p>
        This component library was built out of the need
        for <a href="http://element84.com/">Element 84</a> to help smooth
        out some of the painpoints and redundant work faced when building
        mapping apps from scratch.
      </p>
      <h2>What's inside?</h2>
      <p>
        The core of the library is the <a href="/?path=/story/components-lens--default">Lens component</a>.
        This component provides a wrapper around Leaflet and React Leaflet
        to provide a Hook-based search API to make geospatial searches and
        coordinate that data on the map.
      </p>
      <p>
        Other components including Table and Form are useful outside of the
        scope of Lens but really serve as an extension of providing the core
        functionality of Lens.
      </p>
    </>
  );
});
