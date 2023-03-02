# Fogg - Now using Gatsby v4
Fogg is a component library that stems from the need to quickly spin up new mapping applications with search capabilities. While the library contains generic components needed within a typical map-based dashboard, the Lens component is what serves as the flagship component to wrap a map.

This library is packaged as a Gatsby theme that  can be easily imported to a project.

## What's inside?
- [Gatsby](https://www.gatsbyjs.org/) for templating and static site generation
- Gatsby relies on [React](https://reactjs.org/) as the UI framework
- [Gatsby Themes](https://www.gatsbyjs.org/blog/2018-11-11-introducing-gatsby-themes/) are utilized to provide a reusable starting point for mapping UIs
- [Storybook](https://storybook.js.org/) is used as the presentational UI and documentation

# Getting Started

## Installing Fogg
Add Fogg as a dependency to your project
```
# With npm
npm install fogg
```

## Using the Library

### Components
Importing the Lens component:
```
import { Lens } from 'fogg/ui';

const MyComponent = () => {
  return (
    <Lens {...lensSettings} />
  )
}
```

### Hooks
Imporing the hook that provides an API to Lens:
```
import { useLens } from 'fogg/hooks';
const { geoSearch = {}, map = {} } = useLens();
const { search } = geoSearch;

search(searchSettings);
```

# Developing

## Prerequisites
- NPM

## Installation
Run the following command in your terminal to install all dependencies:
```
npm install
```

## Development
Run the following command to start up your development server:
```
npm run develop
```

## Testing
Run the following command to run the test suite:
```
npm run test
```

# Contributions
At this time, we're not accepting contributions until we can fully understand how it ties in to our workflow. If interested, definitely reach out and let us know.

## TODO - move to issues
[] Complete stories for each component
[] Clean out unused components
[] Add basic tests for each component
[] Add tests for lib
[] Add tests for hooks
[] Examples
[] Cypress tests for examples
[] documentation for hooks
[] documentation for lib
