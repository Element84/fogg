import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

const ListItemButton = ({
  itemType = null,
  id = null,
  children = 'View Details'
} = {}) => {
  return (
    <>
      <Button to={`/${itemType}/${id}`}>{children}</Button>
    </>
  );
};

ListItemButton.propTypes = {
  children: PropTypes.node,
  itemType: PropTypes.string,
  id: PropTypes.string
};

export default ListItemButton;
