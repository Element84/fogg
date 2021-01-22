import React from 'react';
import PropTypes from 'prop-types';
import { FaChevronLeft } from 'react-icons/fa';

import NavLinks from '../NavLinks';
import WonderLink from '../WonderLink';

const PageTemplate = ({ id, children, title, parent, navigation, icon }) => {
  return (
    <div className="page">
      <div className="page-header">
        {parent && (
          <div className="page-parent-link">
            <WonderLink to={parent.to}>
              <FaChevronLeft /> Back to {parent.label}
            </WonderLink>
          </div>
        )}
        <h1>
          {icon} <span>{title}</span>
        </h1>
      </div>

      <NavLinks active={id} routes={navigation} />

      <div className="page-content">{children}</div>
    </div>
  );
};

PageTemplate.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  parent: PropTypes.object,
  navigation: PropTypes.arrayOf(PropTypes.object),
  icon: PropTypes.node,
  children: PropTypes.object
};

export default PageTemplate;
