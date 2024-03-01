# Fogg - Now using Gatsby v5

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

```sh
# With npm
npm install fogg
```

Note: if install fails, try using the `--legacy-peer-deps` flag with the install command.

## Using the Library

### Components

Importing the Lens component:

```javascript
import { Lens } from 'fogg/ui';

const MyComponent = () => {
  return (
    <Lens {...lensSettings} />
  )
}
```

### Hooks

Importing the hook that provides an API to Lens:

```javascript
import { useLens } from 'fogg/hooks';
const { geoSearch = {}, map = {} } = useLens();
const { search } = geoSearch;

search(searchSettings);
```

# Developing

## Prerequisites

- Node version specified in [.nvmrc](.nvmrc)
- NVM is highly recommended

## Installation

Run the following commands in your terminal to install all dependencies:

```sh
nvm use
npm install
```

## Development

Run the following command to start up your development server:

```sh
npm start
```

## Testing

Run the following command to run the test suite:

```sh
npm test
```

Run the following command to run tests while updating the snapshot

```sh
npm run test-clean
```

# Contributions

At this time, we're not accepting contributions until we can fully understand how it ties in to our workflow. If interested, definitely reach out and let us know.

# Need an older version?

We aren't always on top of publishing versions of fogg to NPM, but before cutting major updates (e.g. Gatsby 2 > 4) we at least try to keep a branch available with the legacy versions for anyone who isn't ugprading Gatsby yet. 

- Gatsby 2.x / Node 14.x [https://github.com/Element84/fogg/tree/gatsby-v2]
- Gatsby 4.x / Node 16.x [https://github.com/Element84/fogg/tree/gatsby-v4]
- Gatsby 5.x / Node 18.x (Latest) [https://github.com/Element84/fogg/tree/main]

## TODO

- [ ] Publish current version to NPM
- [ ] Publish `gatsby-v2` & `gatsby-v4` to NPM
- [ ] Add Snyk scan to Github actions
- [ ] Complete stories for each major component
- [ ] Clean out unused components
- [ ] Add basic tests for each component
- [ ] Add tests for lib
- [ ] Add tests for hooks
- [ ] Examples
