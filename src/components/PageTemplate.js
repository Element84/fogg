import React from 'react';
import PropTypes from 'prop-types';
import NavLinks from './NavLinks';
import * as Fa from 'react-icons/fa';

const PageTemplate = ({ id, children, title, parent, navigation, icon }) => {
  const faIcon = Fa[icon];
  return (
    <div className="page">
      <div className="header">
        {parent && (
          <div className="parent-link">
            <a href={parent.id}>
              <Fa.FaChevronLeft /> Back to {parent.label}
            </a>
          </div>
        )}
        <h1>
          {React.createElement(faIcon)} <span>{title}</span>
        </h1>
      </div>

      <NavLinks active={id} routes={navigation} />

      <div className="content">{children}</div>
    </div>
  );
};

PageTemplate.propTypes = {
  id: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node),
  title: PropTypes.string,
  parent: PropTypes.object,
  navigation: PropTypes.arrayOf(PropTypes.object),
  icon: PropTypes.string
};

export default PageTemplate;
