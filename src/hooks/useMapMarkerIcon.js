import L from 'leaflet';

let icon;

export default function useMapMarkerIcon () {
  // Leaflet uses window to bea ble to set up an icon, so we need to
  // make sure it's available otherwise don't return anything of value

  if (!icon && typeof window !== 'undefined') {
    icon = new L.Icon({
      iconUrl: require('../assets/images/map-marker.svg'),
      iconAnchor: [5, 55],
      popupAnchor: [10, -44],
      iconSize: [32], // SVG auto scales, ignore 2nd height value
      shadowUrl: require('../assets/images/map-marker-shadow.svg'),
      shadowSize: [20], // SVG auto scales, ignore 2nd height value
      shadowAnchor: [0, 18],
      className: 'map-marker'
    });
  }

  return { icon };
}
