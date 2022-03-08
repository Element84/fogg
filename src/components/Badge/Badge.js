import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({
  label = '',
  className = '',
  type = 'default', // 'default' = gray, 'info' = blue, 'success' = green, 'danger' = red
  size = 'medium',
  block = false, // display: block for full width badge
  isLoading = false
}) => {
  if (isLoading) {
    return <span className="badge loading">Loading...</span>;
  }

  return (
    <span className={`badge ${type} ${size} ${block ? 'block' : ''} ${className}`}>
      {label}
    </span>
  );
};

Badge.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  block: PropTypes.bool,
  isLoading: PropTypes.bool
};

export default Badge;
