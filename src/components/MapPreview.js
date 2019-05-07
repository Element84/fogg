import React from 'react';
import PropTypes from 'prop-types';

import Atlas from './Atlas';

const MapPreview = () => {
  // put map in smaller area with all of its stuff
  // add line at the bottom with area of interest and coordinates
  console.log(<Atlas />);
  return (
    <>
      <Atlas />
      <h1>Area of Interest</h1>
    </>
  );
};

export default MapPreview;
