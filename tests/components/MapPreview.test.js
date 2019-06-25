import React from 'react';
import { shallow } from 'enzyme';

import { MapPreview } from '../../ui';

import featureCollection from '../fixtures/feature-collection.json';

const ALEXANDRIA = {
  lat: 38.8048,
  lng: -77.0469
};

const ALEXANDRIA_COORDINATES = [ALEXANDRIA.lat, ALEXANDRIA.lng];

describe('MapPreview', () => {
  describe('Center Point', () => {
    const mapPreview = shallow(<MapPreview center={ALEXANDRIA} />);

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

    it('should display the coordinates of the component', () => {
      const mapPreviewCoordinates = mapPreview.find('.map-preview-coordinates');
      const mapPreviewText = mapPreviewCoordinates.text();
      expect(mapPreviewText).toEqual(
        `Coordinates: ${ALEXANDRIA.lat} °N, ${ALEXANDRIA.lng} °W`
      );
    });
  });

  describe('Polygon Shape', () => {
    const mapPreview = shallow(<MapPreview geoJson={featureCollection} />);
    const mapPreviewPolygon = mapPreview.find('ForwardRef(Leaflet(Polygon))');
    const fcCoordinates = featureCollection.features[0].geometry.coordinates[0];
    const fcCoordinatesReverse = fcCoordinates.map(set => [set[1], set[0]]);
    const fcCoordinatesFirst = fcCoordinates[0];
    const fcCoordinatesLast = fcCoordinates[fcCoordinates.length - 1];

    it('should render a Map component', () => {
      expect(mapPreview.find('Map')).toHaveLength(1);
    });

    it('should determine the center from the geoJson document', () => {
      const expected = [39.239312974951844, -77.4591064453125];
      expect(mapPreview.find('Map').prop('center')).toEqual(expected);
    });

    it('should pass the MapMarker component coordinate props', () => {
      expect(mapPreviewPolygon.prop('positions')).toEqual(fcCoordinatesReverse);
    });

    it('should display the coordinates of the collection shapes', () => {
      const mapPreviewCoordinates = mapPreview.find('.map-preview-coordinates');
      const mapPreviewCoordinatesListItems = mapPreviewCoordinates.find('li');
      const firstCoordinates = mapPreviewCoordinatesListItems.first();
      const lastCoordinates = mapPreviewCoordinatesListItems.first();
      expect(firstCoordinates.text()).toEqual(
        `${fcCoordinatesFirst[1]} °N, ${fcCoordinatesFirst[0]} °W`
      );
      expect(lastCoordinates.text()).toEqual(
        `${fcCoordinatesLast[1]} °N, ${fcCoordinatesLast[0]} °W`
      );
    });
  });
});
