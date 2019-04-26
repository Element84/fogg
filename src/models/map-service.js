import mapProjections from '../data/map-projections';
import mapServices from '../data/map-services';

class MapService {
  constructor (name) {
    this.name = name;
    this.configure();
  }

  configure () {
    const service = serviceByName(this.name);
    this.product = service.product;
    this.projection = service.projection;
    this.format = service.format;
    this.time = service.time;
    this.resolution = service.resolution;
    this.tileSize = service.tileSize;
    this.attribution = service.attribution;
    this.crs = projectionByName(service.crs);

    // Disable prettier here to preserve the strings as human readable

    // prettier-ignore
    this.projectionResolution = `${this.projection.toUpperCase()}_${this.resolution}`;

    // prettier-ignore
    this.tile = `https://gibs-{s}.earthdata.nasa.gov/wmts/${this.projection}/best/${this.product}/default/${this.time}/${this.projectionResolution}/{z}/{y}/{x}.${this.format}`;
  }

  setService (name) {
    this.name = name;
    this.configure();
  }
}

export default MapService;

/**
 * serviceByName
 */

function serviceByName (name) {
  return mapServices.find(service => service.name === name);
}

/**
 * projectionByName
 */

function projectionByName (name) {
  return mapProjections.find(projection => projection.name === name);
}
