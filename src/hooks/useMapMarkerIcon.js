import { buildMapMarkerIcon } from '../lib/leaflet';

export default function useMapMarkerIcon () {
  const icon = buildMapMarkerIcon();
  return { icon };
}
