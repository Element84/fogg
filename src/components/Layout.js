import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Footer from '../components/Footer';
import Button from '../components/Button';

const Layout = ({ children }) => (
  <>
    <Helmet>
      <title>Space Jam Gatsby Theme</title>
    </Helmet>
    {/* Header/Nav component goes here */}
    {children}
    <Footer />
  </>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Layout;
