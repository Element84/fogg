const siteMetadata = {
  title: 'Fogg',
  name: 'fogg',
  description: 'Component library and tools for rapidly building maps',
  author: 'Element 84'
};

module.exports = {
  siteMetadata,
  pathPrefix: '/fogg',
  plugins: [
    'gatsby-plugin-sass',
    // This should be a temporary fix in the event gatsby-plugin-react-leaflet removes
    // setting react-leaflet as a null loader. See gatsby-node.js
    'gatsby-plugin-react-leaflet',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images`
      }
    }
  ]
};
