import React from 'react';
import PropTypes from 'prop-types';

import Notice from '../components/Notice';

const Layout = ({ children, notice }) => {
  return (
    <>
      {notice && <LayoutNotice {...notice} />}
      {children}
    </>
  );
};

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
  return <Notice {...rest}>{text}</Notice>;
};

LayoutNotice.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ])
};
