import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import '../assets/stylesheets/application.scss';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, header = true, pageName }) => {
  let className = 'layout';

  if (!header) {
    className = `${className} layout-no-header`;
  }

  if (pageName) {
    className = `${className} page-${pageName}`;
  }

  return (
    <>
      <Helmet bodyAttributes={{ class: className }}>
        <title>Gatsby Site</title>
      </Helmet>
      <div className="layout-wrapper">
        {header && <Header />}
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.bool,
  pageName: PropTypes.string
};

export default Layout;
