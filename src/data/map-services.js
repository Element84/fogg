const mapServices = [
  {
    name: 'blue_marble',
    projections: ['epsg4326', 'epsg3857'],
    product: 'BlueMarble_ShadedRelief_Bathymetry',
    format: 'jpeg',
    time: '',
    resolution: '500m',
    attribution: '&copy; NASA Blue Marble, image service by OpenGeo',
    tileSize: 512,
    tileEndpoint: `https://gibs-{s}.earthdata.nasa.gov/wmts/{projection}/best/{product}/default/{time}/{projectionResolution}/{z}/{y}/{x}.{format}`
  }
];

export default mapServices;
