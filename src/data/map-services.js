const mapServices = [
  {
    name: 'blue_marble',
    projection: 'epsg4326',
    product: 'BlueMarble_ShadedRelief_Bathymetry',
    format: 'jpeg',
    time: '',
    resolution: '500m',
    attribution: '&copy; NASA Blue Marble, image service by OpenGeo',
    crs: 'epsg4326',
    tileSize: 512,
    tileEndpoint: `https://gibs-{s}.earthdata.nasa.gov/wmts/{projection}/best/{product}/default/{time}/{projectionResolution}/{z}/{y}/{x}.{format}`
  }
];

export default mapServices;
