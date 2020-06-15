import React, { useState, useEffect } from 'react';

import { useLens } from '../../hooks';

const LensCursorPosition = () => {
  const { map = {} } = useLens();
  const { refMap } = map;
  const [latlng, setLatLng] = useState(null);
  const [inside, setInside] = useState(false);
  useEffect(() => {
    if (!refMap.current) return;
    if (!refMap.current.leafletElement) return;
    const { leafletElement } = refMap.current;
    leafletElement.on('mousemove', ({ latlng } = {}) => {
      // use wrap to make sure longitude between -180 and 180
      setLatLng(latlng.wrap());
    });
    leafletElement.on('mouseover', () => setInside(true));
    leafletElement.on('mouseout', () => setInside(false));
  }, [refMap.current]);

  if (inside && latlng) {
    const { lat: latitude, lng: longitude } = latlng;
    return (
      <div className="lens-cursor-position">
        {latitude.toFixed(4)}, {longitude.toFixed(4)}
      </div>
    );
  } else {
    return <></>;
  }
};

export default LensCursorPosition;
