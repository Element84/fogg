import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

const ListItemButton = ({ id = null, children = 'View Details' } = {}) => {
  return (
    <>
      <Button to={`${id}`}>{children}</Button>
    </>
  );
};

ListItemButton.propTypes = {
  id: PropTypes.string
};

export default ListItemButton;
