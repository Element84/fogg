import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Panel = ({ children, header, actions, className }) => {
  const [mapPreviewState, updateMapPreviewState] = useState();
  return (
    <div className={`panel ${className || ''}`}>
      {header && (
        <div className="panel-header">
          <div className="panel-header-title">
            <p>{header}</p>
          </div>
          {actions && <div className="panel-header-actions">{actions}</div>}
        </div>
      )}

      {children && <div className="panel-body">{children}</div>}
    </div>
  );
};

Panel.propTypes = {
  children: PropTypes.node,
  header: PropTypes.string,
  actions: PropTypes.node,
  className: PropTypes.string
};

export default Panel;
