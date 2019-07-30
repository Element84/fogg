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
    tileEndpoint: `https://gibs-{s}.earthdata.nasa.gov/wmts/{projection}/best/{product}/default/{time}/{projectionResolution}/{z}/{y}/{x}.{format}`,
    maxZoom: 6,
    maxNativeZoom: 6,
    minNativeZoom: 1
  },
  {
    name: 'coastlines',
    product: 'Coastlines',
    projections: 'epsg3857',
    format: 'png',
    attribution: '&copy; NASA - Coastlines',
    tileSize: 256,
    tileEndpoint:
      'https://gibs-{s}.earthdata.nasa.gov/wmts/{projection}/all/{product}/default//{projectionResolution}/{z}/{y}/{x}.{format}',
    resolution: '250m',
    maxZoom: 18,
    maxNativeZoom: 9
  },
  {
    name: 'MODIS_Aqua_CorrectedReflectance_TrueColor',
    product: 'MODIS_Aqua_CorrectedReflectance_TrueColor',
    projections: 'epsg3857',
    time: '2018-11-08',
    format: 'jpg',
    attribution: '&copy; NASA - MODIS - Corrected Reflectance (True Color)',
    tileSize: 256,
    tileEndpoint:
      'https://gibs-{s}.earthdata.nasa.gov/wmts/{projection}/best/{product}/default/{time}/{projectionResolution}/{z}/{y}/{x}.{format}',
    resolution: '250m',
    maxZoom: 18,
    maxNativeZoom: 9
  },
  {
    name: 'MODIS_Terra_CorrectedReflectance_TrueColor',
    product: 'MODIS_Terra_CorrectedReflectance_TrueColor',
    projections: 'epsg3857',
    time: '2018-11-08',
    format: 'jpg',
    attribution: '&copy; NASA - MODIS - Corrected Reflectance (True Color)',
    tileSize: 256,
    tileEndpoint:
      'https://gibs-{s}.earthdata.nasa.gov/wmts/{projection}/best/{product}/default/{time}/{projectionResolution}/{z}/{y}/{x}.{format}',
    resolution: '250m',
    maxZoom: 18,
    maxNativeZoom: 9
  },
  {
    name: 'open_street_map',
    format: 'png',
    projections: 'epsg3857',
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 18,
    nativeZoom: 18,
    tileSize: 256,
    tileEndpoint: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
  }
];

export default mapServices;
