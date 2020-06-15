test

# 🎩 Fogg
Fogg is a component library that stems from the need to quickly spin up new mapping applications with search capabilities. While the library contains generic components needed within a typical map-based dashboard, the Lens component is what serves as the flagship component to wrap a map.

This library is packaged as a Gatsby theme that  can be easily imported to a project.

## What's inside?
- [Gatsby](https://www.gatsbyjs.org/) for templating and static site generation
- Gatsby relies on [React](https://reactjs.org/) as the UI framework
- [Gatsby Themes](https://www.gatsbyjs.org/blog/2018-11-11-introducing-gatsby-themes/) are utilized to provide a reusable starting point for mapping UIs
- [Storybook](https://storybook.js.org/) is used as the presentational UI and documentation

# 🚀 Getting Started

## Installing Fogg
Add Fogg as a dependency to your project
```
# With Yarn
yarn add fogg

# With npm
npm install fog
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

# 🧰 Developing

## Prerequisites
- [Yarn Package Manager](https://yarnpkg.com/en/)

## Installation
Run the following command in your terminal to install all dependencies:
```
yarn install
```

## Development
Run the following command to start up your development server:
```
yarn develop
```

## Testing
Run the following command to run the test suite:
```
yarn test
```

# 🛠 Contributions
At this time, we're not accepting contributions until we can fully understand how it ties in to our workflow. If interested, definitely reach out and let us know.
