import React from 'react';
import { storiesOf } from '@storybook/react';

const STORY_COMPONENT = 'Getting Started';
const STORY_NAME = 'Setup';

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
      <h1>Setup</h1>
      <h2>Installing Fogg</h2>
      <p>
        To get started with Fogg, you can install Fogg as a package via npmjs.com
        using your favorite package manager like yarn or npm:
      </p>
      <pre>
        <code>
{`# With Yarn
yarn add fogg gatsby react react-dom

# With npm
npm install fogg gatsby react react-dom`}
        </code>
      </pre>
      <h2>Configuring Fogg</h2>
      <p>
        Fogg currently functions as a Gatsby theme that allows you to add it to a
        Gatsby project much like any other Gatsby plugin.
      </p>
      <p>
        The first step to configuring Fogg is to add it to your <code>gatsby-config.js</code> file:
      </p>
      <pre>
        <code>
{`plugins: [
  'fogg',`}
        </code>
      </pre>
      <h2>Setting Up Fogg</h2>
      <p>
        Before using any component, you'll need to import the Fogg theme. You can do that by importing the
        following Scss file into your project:
      </p>
      <pre>
        <code>
{`// In your .scss file
@import "node_modules/fogg/src/assets/stylesheets/theme";`}
        </code>
      </pre>
    </>
  );
});