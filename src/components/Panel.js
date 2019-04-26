import React from 'react';
import PropTypes from 'prop-types';

const Panel = ({ children, header, className }) => {
  return (
    <div className={`panel ${className || ''}`}>
      {header && (
        <div className="panel-header">
          <p>{header}</p>
        </div>
      )}

      {children && <div className="panel-body">{children}</div>}
    </div>
  );
};

Panel.propTypes = {
  children: PropTypes.node,
  header: PropTypes.string,
  className: PropTypes.string
};

export default Panel;
