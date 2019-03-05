import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Footer from '../components/Footer';

const Layout = ({ children }) => (
  <Fragment>
    <Helmet>
      <title>Space Jam Gatsby Theme</title>
    </Helmet>
    {/* Header/Nav component goes here */}
    {children}
    <Footer />
  </Fragment>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Layout;
