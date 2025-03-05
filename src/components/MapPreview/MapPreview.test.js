import React from 'react';
import { Circle, Polyline } from 'react-leaflet';
import { SemiCircle } from 'react-leaflet-semicircle';
import { shallow } from 'enzyme';

import MapPreview from './';

import featureCollection from '../../../tests/fixtures/feature-collection.json';

const ALEXANDRIA = {
  lat: 38.8048,
  lng: -77.0469
};

const ALEXANDRIA_COORDINATES = [ALEXANDRIA.lat, ALEXANDRIA.lng];

describe('MapPreview', () => {
  describe('Center Point', () => {
    const mapPreview = shallow(<MapPreview center={ALEXANDRIA} />);
    const map = mapPreview.find('MapWithRefs');

    it('should render a Map component', () => {
      expect(map).toHaveLength(1);
    });

    it('should pass the Map component coordinate props', () => {
      expect(map.prop('center')).toEqual(ALEXANDRIA_COORDINATES);
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
        ` Lat: ${ALEXANDRIA.lat.toFixed(3)}, Long: ${ALEXANDRIA.lng.toFixed(3)}`
      );
    });
  });

  describe('Polygon Shape', () => {
    const mapPreview = shallow(<MapPreview geoJson={featureCollection} />);
    const map = mapPreview.find('MapWithRefs');
    const mapPreviewPolygon = mapPreview.find('ForwardRef(Leaflet(Polygon))');
    const fcCoordinates = featureCollection.features[0].geometry.coordinates[0];
    const fcCoordinatesReverse = fcCoordinates.map((set) => [set[1], set[0]]);
    const fcCoordinatesFirst = fcCoordinates[0];
    const fcCoordinatesLast = fcCoordinates[fcCoordinates.length - 1];

    it('should render a Map component', () => {
      expect(map).toHaveLength(1);
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
        `Lat: ${fcCoordinatesFirst[1].toFixed(3)}, Long: ${fcCoordinatesFirst[0].toFixed(3)}`
      );
      expect(lastCoordinates.text()).toEqual(
        `Lat: ${fcCoordinatesLast[1].toFixed(3)}, Long: ${fcCoordinatesLast[0].toFixed(3)}`
      );
    });
  });

  describe('Azimuth Display', () => {
    const baseAzimuthParams = {
      center: ALEXANDRIA_COORDINATES
    };

    it('should render only a circle if start=0 and stop=360', () => {
      const mapPreview = shallow(
        <MapPreview
          geoJson={featureCollection}
          azimuthDisplay={{
            ...baseAzimuthParams,
            start: 0,
            stop: 360
          }}
        />
      );
      const mapPreviewCircle = mapPreview.find(Circle);
      const mapPreviewSemicircle = mapPreview.find(SemiCircle);
      const mapPreviewPolyline = mapPreview.find(Polyline);

      expect(mapPreviewCircle).toHaveLength(1);
      expect(mapPreviewSemicircle).toHaveLength(0);
      expect(mapPreviewPolyline).toHaveLength(0);
    });

    it('should render only a circle if start=360 and stop=0', () => {
      const mapPreview = shallow(
        <MapPreview
          geoJson={featureCollection}
          azimuthDisplay={{
            ...baseAzimuthParams,
            start: 360,
            stop: 0
          }}
        />
      );
      const mapPreviewCircle = mapPreview.find(Circle);
      const mapPreviewSemicircle = mapPreview.find(SemiCircle);
      const mapPreviewPolyline = mapPreview.find(Polyline);

      expect(mapPreviewCircle).toHaveLength(1);
      expect(mapPreviewSemicircle).toHaveLength(0);
      expect(mapPreviewPolyline).toHaveLength(0);
    });

    it('should render a circle and polyline if start=stop', () => {
      const mapPreview = shallow(
        <MapPreview
          geoJson={featureCollection}
          azimuthDisplay={{
            ...baseAzimuthParams,
            start: 120,
            stop: 120
          }}
        />
      );
      const mapPreviewCircle = mapPreview.find(Circle);
      const mapPreviewSemicircle = mapPreview.find(SemiCircle);
      const mapPreviewPolyline = mapPreview.find(Polyline);

      expect(mapPreviewCircle).toHaveLength(1);
      expect(mapPreviewSemicircle).toHaveLength(0);
      expect(mapPreviewPolyline).toHaveLength(1);
    });

    it('should render a circle and semicircle if start > stop', () => {
      const mapPreview = shallow(
        <MapPreview
          geoJson={featureCollection}
          azimuthDisplay={{
            ...baseAzimuthParams,
            start: 80,
            stop: 120
          }}
        />
      );
      const mapPreviewCircle = mapPreview.find(Circle);
      const mapPreviewSemicircle = mapPreview.find(SemiCircle);
      const mapPreviewPolyline = mapPreview.find(Polyline);

      expect(mapPreviewCircle).toHaveLength(1);
      expect(mapPreviewSemicircle).toHaveLength(1);
      expect(mapPreviewPolyline).toHaveLength(0);
    });

    it('should render a circle and semicircle if start < stop', () => {
      const mapPreview = shallow(
        <MapPreview
          geoJson={featureCollection}
          azimuthDisplay={{
            ...baseAzimuthParams,
            start: 340,
            stop: 20
          }}
        />
      );
      const mapPreviewCircle = mapPreview.find(Circle);
      const mapPreviewSemicircle = mapPreview.find(SemiCircle);
      const mapPreviewPolyline = mapPreview.find(Polyline);

      expect(mapPreviewCircle).toHaveLength(1);
      expect(mapPreviewSemicircle).toHaveLength(1);
      expect(mapPreviewPolyline).toHaveLength(0);
    });
  });
});
