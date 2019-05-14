import mapProjections from '../data/map-projections';
import mapServices from '../data/map-services';

class MapService {
  constructor (name, { services = [], projections = [] } = {}) {
    this.name = name;

    // Combine user specified projections with our defaults

    this.projections = mapProjections;

    if (Array.isArray(projections)) {
      this.projections = this.projections.concat(projections);
    }

    // Combine user specified services with our defaults

    this.services = mapServices;

    if (Array.isArray(services)) {
      this.services = this.services.concat(services);
    }

    this.configure();
  }

  configure () {
    const service = serviceByName(this.services, this.name);

    if (!service) {
      throw new Error(`Map: Can not find service "${this.name}"`);
    }

    this.product = service && service.product;
    this.projection = service && service.projection;
    this.format = service && service.format;
    this.time = service && service.time;
    this.resolution = service && service.resolution;
    this.tileSize = service && service.tileSize;
    this.attribution = service && service.attribution;
    this.crs = service && projectionByName(service.crs);

    // Disable prettier here to preserve the strings as human readable

    if (typeof this.projection === 'string' && this.resolution) {
      // prettier-ignore
      this.projectionResolution = `${this.projection.toUpperCase()}_${this.resolution}`;
    }

    this.tile = service && configureTileEndpoint(this, service.tileEndpoint);
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

function serviceByName (services, name) {
  return services.find(service => service.name === name);
}

/**
 * projectionByName
 */

function projectionByName (name) {
  return mapProjections.find(projection => projection.name === name);
}

/**
 * configureTileEndpoint
 */

function configureTileEndpoint (properties = {}, endpoint) {
  if (typeof endpoint !== 'string') return '';
  let tile = endpoint;
  for (let key in properties) {
    if (!properties.hasOwnProperty(key)) continue;
    tile = tile.replace(`{${key}}`, properties[key]);
  }
  return tile;
}
