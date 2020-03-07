# Fogg
A Gatsby theme that provides out of the box components and tooling for mapmakers!

## TODO
[] Complete stories for each component
[] Clean out unused components
[] Add basic tests for each component
[] Add tests for lib
[] Add tests for hooks
[] Cypress tests for integrations?

## About

Fogg is a Gatsby Theme that provides a starting point for any map based front-end. It's built using the following tools:

- [Gatsby](https://www.gatsbyjs.org/) for templating and static site generation
- Gatsby relies on [React](https://reactjs.org/) as the UI framework
- [Gatsby Themes](https://www.gatsbyjs.org/blog/2018-11-11-introducing-gatsby-themes/) are utilized to provide a reusable starting point for mapping UIs
- The website using the theme imports this repository as a dependency

# Getting Started

## Prerequisites

- [Node & NPM](https://nodejs.org/en/)
- [Yarn Package Manager](https://yarnpkg.com/en/)

## Installation
Run the following command in your terminal to install all dependencies:
```
yarn install
```

## Development

Run the following command to start up your development server.
```
yarn develop
```

After starting, two servers will start up:
- By default, the project runs on on [localhost:8000](http://localhost:8000)
- Additionally, a Storybook will automatically open for component development

### Why both?
Given the project is a Gatsby Theme, we want to make sure that the project will still build and compile with Gatsby. Being able to run it concurrently with Storybook provides us the benefit of catching issues should they occur.

# Deployment & Releases
There is no traditional sense of deployment here. When the development pipeline runs (SIT is updated), the version number will automatically increment.

The version number utilizes [semantic versioning](https://semver.org/) and should be updated accordingly.
