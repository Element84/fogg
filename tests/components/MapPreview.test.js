import React from 'react';
import { shallow } from 'enzyme';

import { MapPreview } from '../../ui';

const ALEXANDRIA = {
  lat: 38.8048,
  lng: -77.0469
};

const ALEXANDRIA_COORDINATES = [ALEXANDRIA.lat, ALEXANDRIA.lng];

describe('MapPreview', () => {
  describe('Render', () => {
    const mapPreview = shallow(<MapPreview position={ALEXANDRIA} />);

    it('should render a Map component', () => {
      expect(mapPreview.find('Map')).toHaveLength(1);
    });

    it('should pass the Map component coordinate props', () => {
      expect(mapPreview.find('Map').prop('center')).toEqual(
        ALEXANDRIA_COORDINATES
      );
    });

    it('should pass the MapMarker component coordinate props', () => {
      expect(mapPreview.find('MapMarker').prop('position')).toEqual(
        ALEXANDRIA_COORDINATES
      );
    });

    it('should pass the MapMarker component coordinate props', () => {
      const mapPreviewText = mapPreview
        .find('.map-preview-marker-location')
        .text();
      expect(mapPreviewText).toEqual(
        `${ALEXANDRIA.lat} °N, ${ALEXANDRIA.lng} °W`
      );
    });
  });
});
