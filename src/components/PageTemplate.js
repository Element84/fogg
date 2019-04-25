import React from 'react';
import PropTypes from 'prop-types';
import NavLinks from './NavLinks';
import { FaChevronLeft } from 'react-icons/fa';
import WonderLink from './WonderLink';

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
  children: PropTypes.arrayOf(PropTypes.node),
  title: PropTypes.string,
  parent: PropTypes.object,
  navigation: PropTypes.arrayOf(PropTypes.object),
  icon: PropTypes.node
};

export default PageTemplate;
