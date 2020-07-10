const siteMetadata = {
  companyName: 'Element 84, Inc.',
  companyUrl: 'https://element84.com/',
  siteName: 'Earth Search',
  siteUrl: 'https://fogg.element84.com/earth-search',
  siteDescription: 'Earth Search demo',
};

module.exports = {
  siteMetadata,
  plugins: [
    'fogg',
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-google-marketing-platform',
      options: {
        dataLayer: {
          gaPropertyId: 'UA-171279226-1',
        },
        tagmanager: {
          id: 'GTM-PLK7R5M',
        },
        analytics: {
          id: 'UA-171279226-1',
        },
      },
    },
  ],
};
