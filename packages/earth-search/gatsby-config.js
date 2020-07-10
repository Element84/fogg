const siteMetadata = {
  companyName: 'Element 84, Inc.',
  companyUrl: 'https://element84.com/',
  siteName: 'Earth Search',
  siteUrl: 'https://fogg.element84.com/earth-search',
  siteDescription: 'Earth Search demo',
};

module.exports = {
  siteMetadata,
  plugins: ['gatsby-plugin-resolve-src', 'gatsby-plugin-sass', 'gatsby-plugin-react-helmet', 'fogg'],
};
