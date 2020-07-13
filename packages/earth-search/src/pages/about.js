import React from 'react';
import { Helmet } from 'react-helmet';

import { useSiteMetadata } from 'hooks';

import Layout from 'components/Layout';
import Container from 'components/Container';

const SecondPage = () => {
  const { companyName, companyUrl, siteDescription } = useSiteMetadata();

  return (
    <Layout pageName="about">
      <Helmet>
        <title>About</title>
      </Helmet>
      <Container type="content">
        <h1>About</h1>

        <h2>{ companyName }</h2>
        <p>{ siteDescription }</p>
        <p>
          <a href={companyUrl}>View on Github</a>
        </p>
      </Container>
    </Layout>
  );
};

export default SecondPage;
