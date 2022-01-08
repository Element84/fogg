import React from 'react';
import { Helmet } from 'react-helmet';
import { FiGithub } from 'react-icons/fi';

import Layout from '../components/Layout';
import Container from '../components/Container';
import Button from '../components/Button';

import imgMapSearch from '../assets/images/map-search.png';

const IndexPage = () => {
  return (
    <Layout pageName="home">
      <Helmet>
        <title>Fogg - Mapping Component Library for React</title>
      </Helmet>
      <Container className="home">

        <div className="home-hero">
          <div className="home-hero-content">
            <h1 className="home-hero-header">Jumpstart your map-based interfaces with Fogg.</h1>
            <p className="home-hero-blurb">
              Fogg is an open-source, React-based component library that makes building map interfaces easy, consistent, and powerful.
            </p>
            <p className="home-hero-actions">
              <Button
                to="http://fogg.element84.com/docs"
                type="icon-before"
                external={true}
              >
                Documentation
              </Button>
              <Button
                to="https://github.com/Element84/fogg"
                type={['icon-before', 'secondary']}
                external={true}
              >
                <FiGithub />
                Github
              </Button>
            </p>
          </div>
          <div className="home-hero-image">
            <img width="504" src={imgMapSearch} alt="Map illustration" />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default IndexPage;
