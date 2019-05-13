import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

const ListItemButton = ({
  listType = null,
  id = null,
  children = 'View Details'
} = {}) => {
  return (
    <>
      <Button to={`${listType}s/${id}`}>{children}</Button>
    </>
  );
};

ListItemButton.propTypes = {
  listType: PropTypes.string,
  id: PropTypes.string
};

export default ListItemButton;
