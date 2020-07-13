import React from 'react';
import { Helmet } from 'react-helmet';
import { FaGithub, FaAtlas } from 'react-icons/fa';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Button from 'components/Button';

import logoFogg from 'assets/images/fogg-512x586.png';

const IndexPage = () => {
  return (
    <Layout pageName="home" header={false}>
      <Helmet>
        <title>Fogg - Mapping Component Library for React</title>
      </Helmet>
      <Container className="home">
        <img className="logo-fogg" width="256" src={logoFogg} />
        <h1>Fogg</h1>
        <p>
          <Button
            to="http://fogg.element84.com/docs"
            type="icon-before"
            external={true}
          >
            <FaAtlas />
            Docs
          </Button>
          <Button
            to="https://github.com/Element84/fogg"
            type="icon-before"
            external={true}
          >
            <FaGithub />
            Github
          </Button>
        </p>
      </Container>
    </Layout>
  );
};

export default IndexPage;
