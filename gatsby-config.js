module.exports = {
  siteMetadata: {
    title: `Space Jam Gatsby Theme`,
    description: `Gatsby theme for E84 Space Jam project`,
    author: `Element 84`
  },
  pathPrefix: '/fogg',
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images` // why does this matter?
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`
        // icon: `src/assets/images/<image-name>`, // This path is relative to the root of the site.
      }
    }
  ]
};
