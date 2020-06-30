import React from 'react';
import { Helmet } from 'react-helmet';
import { FaGithub, FaAtlas } from 'react-icons/fa';

import Layout from '../components/Layout';
import Button from '../components/Button';

import '../assets/stylesheets/theme.scss';
import '../assets/stylesheets/page-home.scss';

import logoFogg from '../assets/images/fogg-512x586.png';

const IndexPage = () => (
  <Layout>
    <Helmet>
      <title>Fogg - Mapping Component Library for React</title>
    </Helmet>
    <main className="home">
      <div>
        <img className="logo-fogg" width="256" src={logoFogg} />
        <h1>Fogg</h1>
        <p>
          <Button to="http://fogg.element84.com/docs" type="icon-before">
            <FaAtlas />
            Docs
          </Button>
          <Button to="https://github.com/Element84/fogg" type="icon-before">
            <FaGithub />
            Github
          </Button>
        </p>
      </div>
      <p className="footnote">
        From <a href="https://element84.com/">Element 84</a>
      </p>
    </main>
  </Layout>
);

export default IndexPage;
