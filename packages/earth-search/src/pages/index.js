import React from 'react';
import { Helmet } from 'react-helmet';
import { Lens, Panel, ItemList, Layout } from 'fogg/ui';
import { useLens } from 'fogg/hooks';

import { handleResolveOnEarthSearch } from 'lib/search';

const DEFAULT_CENTER = {
  lat: 0,
  lng: 0,
};

/**
 * Sidebar
 * Lens takes a component as a prop which alows us to utilize the Lens API
 * and do whatever we want whether that's showing the results or creating
 * additional interfaces to manipulate the UI
 */

const Sidebar = () => {
  const lens = useLens() || {};
  const { geoSearch } = lens;
  const { results = {} } = geoSearch;
  console.log( 'results', results );
  const { hasResults, numberOfResults, features } = results;
  return (
    <div className="sidebar-results">
      { hasResults && (
        <Panel header={`Results ${numberOfResults}`}>
          <ItemList items={features} />
        </Panel>
      ) }
    </div>
  );
};

const IndexPage = () => {
  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <Lens
        defaultCenter={DEFAULT_CENTER}
        defaultZoom={2}
        resolveOnSearch={handleResolveOnEarthSearch}
        SidebarComponents={Sidebar}
        placeholder="Search with Earth Search"
      />
    </Layout>
  );
};

export default IndexPage;
