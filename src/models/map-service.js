import mapProjections from '../data/map-projections';
import mapServices from '../data/map-services';

class MapService {
  constructor (projection, { services = [], projections = [] } = {}) {
    this.projection = projection;

    // Combine user specified projections with our defaults

    this.projections = mapProjections;

    if (Array.isArray(projections)) {
      this.projections = this.projections.concat(projections);
    }

    // Combine user specified services with our defaults

    this.services = mapServices;

    console.log('this.services', this.services);

    if (Array.isArray(services)) {
      console.log('serbivces', services);
      this.services = this.services.concat(services);
    }
    console.log('this.services', this.services);

    this.configure();
  }

  configure () {
    this.crs = projectionByName(this.projection);

    const availableServices = this.services.filter(service => {
      console.log('service', service);
      console.log('this.projection', this.projection);
      if (service.projections && Array.isArray(service.projections)) {
        return service.projections.indexOf(this.projection) > -1;
      }
      return service.projections === this.projection;
    });

    this.services = availableServices.map(service => {
      const configuredService = { ...service };

      configuredService.product = service && service.product;
      configuredService.projection = service && this.projection;
      configuredService.format = service && service.format;
      configuredService.time = service && service.time;
      configuredService.resolution = service && service.resolution;
      configuredService.tileSize = service && service.tileSize;
      configuredService.attribution = service && service.attribution;

      // Disable prettier here to preserve the strings as human readable

      if (typeof this.projection === 'string' && service.resolution) {
        // prettier-ignore
        configuredService.projectionResolution = `${this.projection.toUpperCase()}_${service.resolution}`;
      }

      configuredService.url =
        service &&
        configureTileEndpoint(configuredService, service.tileEndpoint);

      return configuredService;
    });
  }

  serviceByName (name) {
    return serviceByName(this.services, name);
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
