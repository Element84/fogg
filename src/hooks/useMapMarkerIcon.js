import { createMarkerIcon } from '../lib/leaflet';

export default function useMapMarkerIcon () {
  const icon = createMarkerIcon();
  return { icon };
}
