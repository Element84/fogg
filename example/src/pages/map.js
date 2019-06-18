import React from 'react';
import { Lens } from 'fogg/ui';

import Layout from '../components/Layout';

const ALEXANDRIA = {
  lat: 38.8048,
  lng: -77.0469
};

const MapPageSidebar = () => {
  return <div>sidebar</div>;
};

const MapPage = () => {
  return (
    <Layout>
      <Lens
        defaultCenter={ALEXANDRIA}
        zoom={3}
        SidebarComponents={MapPageSidebar}
      />
    </Layout>
  );
};

export default MapPage;
