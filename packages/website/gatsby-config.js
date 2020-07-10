const siteMetadata = {
  companyName: 'Element 84, Inc.',
  companyUrl: 'https://element84.com/',
  siteName: 'Fogg',
  siteUrl: 'https://fogg.element84.com/',
  siteDescription: 'Component library and tools for rapidly building maps'
};

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images`
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteMetadata.name,
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: `${__dirname}/src/assets/images/fogg-256x279.png`
      }
    },
    {
      resolve: 'gatsby-plugin-google-marketing-platform',
      options: {
        dataLayer: {
          gaPropertyId: 'UA-171279226-1',
        },
        tagmanager: {
          id: 'GTM-PLK7R5M'
        },
        analytics: {
          id: 'UA-171279226-1'
        }
      },
    }
  ]
};
