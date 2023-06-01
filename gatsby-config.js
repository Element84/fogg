module.exports = {
  siteMetadata: {
    title: 'Fogg Component Library',
    name: 'fogg',
    description: 'Leaflet + Gatsby Component Library',
    author: 'Element 84'
  },
  pathPrefix: '/fogg',
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        cssLoaderOptions: {
          esModule: false,
          modules: {
            namedExport: false,
          },
        },
      },
    },
    // This should be a temporary fix in the event gatsby-plugin-react-leaflet removes
    // setting react-leaflet as a null loader. See gatsby-node.js
    // 'gatsby-plugin-react-leaflet',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/assets/images/Fogg-Logo_Large.png'
      }
    }
  ]
};
