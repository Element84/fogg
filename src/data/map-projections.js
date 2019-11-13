const mapProjections = [
  {
    name: 'epsg4326',
    code: 'EPSG:4326',
    definition: '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs',
    origin: [-180, 90],
    bounds: [
      [-180, -90],
      [180, 90]
    ],
    resolutions: [
      0.5625,
      0.28125,
      0.140625,
      0.0703125,
      0.03515625,
      0.017578125,
      0.0087890625,
      0.00439453125,
      0.002197265625
    ]
  }
];

export default mapProjections;
