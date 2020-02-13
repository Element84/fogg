/**
 * buildLayerSet
 * @description Given the available layers and services, build the Map layers
 */

export function buildLayerSet (availableLayers, availableServices = []) {
  // If no layers are provided, use blue marble

  availableLayers = {
    base: [],
    overlay: [],
    ...availableLayers
  };

  if (!availableLayers.base.length) {
    availableLayers.base.push({
      id: 'blue_marble',
      name: 'Blue Marble',
      serviceName: 'blue_marble',
      isActive: true,
      type: 'service'
    });
  }

  return {
    base: availableLayers.base.map(layer => {
      const service = availableServices.find(
        service => service.name === layer.serviceName
      );
      return {
        ...layer,
        service
      };
    }),
    overlay: availableLayers.overlay.map(layer => {
      const service = availableServices.find(
        service => service.name === layer.serviceName
      );
      return {
        ...layer,
        service
      };
    })
  };
}
