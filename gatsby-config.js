module.exports = {
  siteMetadata: {
    title: 'Fogg',
    name: 'fogg',
    description: 'Component library for rapidly building maps with Gatsby + Leaflet',
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
