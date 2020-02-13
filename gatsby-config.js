module.exports = {
  siteMetadata: {
    title: 'Space Jam Gatsby Theme',
    description: 'Gatsby theme for E84 Space Jam project',
    author: 'Element 84'
  },
  pathPrefix: '/fogg',
  plugins: [
    'gatsby-plugin-sass',
    // This should be a temporary fix in the event gatsby-plugin-react-leaflet removes
    // setting react-leaflet as a null loader. See gatsby-node.js
    // 'gatsby-plugin-react-leaflet',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images` // why does this matter?
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui'
        // icon: 'src/assets/images/<image-name>', // This path is relative to the root of the site.
      }
    }
  ]
};
