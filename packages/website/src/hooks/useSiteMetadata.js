import { useStaticQuery, graphql } from 'gatsby';

export default function useSiteMetadata () {
  const query = graphql`
    query SiteMetaData {
      site {
        siteMetadata {
          companyName
          companyUrl
          siteName
          siteUrl
          siteDescription
        }
      }
    }
  `;

  const site = useStaticQuery(query) || {};

  return site && site.site && site.site.siteMetadata;
}
