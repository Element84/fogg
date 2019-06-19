import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Notice from '../components/Notice';

const Layout = ({ children, notice }) => (
  <Fragment>
    <Helmet>
      <title>Space Jam Gatsby Theme</title>
    </Helmet>
    {/* Header/Nav component goes here */}
    {notice && <LayoutNotice {...notice} />}
    {children}
  </Fragment>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  notice: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ])
};

export default Layout;

const LayoutNotice = ({ text, ...rest }) => {
  const isString = typeof text === 'string';
  const isInstanceOfNotice = text && text.type && text.type.name === 'Notice';

  if (isString || !isInstanceOfNotice) {
    return <Notice {...rest}>{text}</Notice>;
  }
  return text;
};

Layout.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ])
};
