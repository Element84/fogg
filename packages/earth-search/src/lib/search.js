import { Request } from 'fogg/models';

/**
 * handleResolveOnEarthSearch
 * Function that gets used to handle any async lookups
 * or search requests. Resolves as a promise. Here we're
 * using Earth Search as an example endpoint, which
 * makes a request to a STAC API, and resolves the results
 */

export async function handleResolveOnEarthSearch({ geoJson = {}, filters, page, date } = {}) {
  const { features = [] } = geoJson;
  const { geometry } = features[0] || {};

  let response;
  let responseFeatures;

  const request = new Request( 'https://earth-search.aws.element84.com/v0/search' );

  const data = {
    limit: 5,
    time: lensDateToSatTime( date ),
    page,
  };

  if ( geometry ) {
    data.intersects = geometry;
  }

  if ( filters ) {
    data.query = filtersToQuery( filters );
  }

  function filtersToQuery( activeFilters = []) {
    const filterQuery = {};

    activeFilters.forEach(( activeFilter ) => {
      let parent;
      let { id, value } = activeFilter;

      if ( id.includes( '/' )) {
        id = id.split( '/' );
        parent = id[0];
        id = id[1];
      }

      if ( value && parent === 'properties' ) {
        if ( value.min || value.max ) {
          filterQuery[id] = {
            ...( value.min && {
              gte: value.min,
            }),
            ...( value.max && {
              lte: value.max,
            }),
          };
        } else {
          filterQuery[id] = {
            eq: value,
          };
        }
      }
    });

    return filterQuery;
  }

  request.setData( data );

  request.setOptions({
    headers: {
      Accept: 'application/geo+json',
      'Content-Type': 'application/json',
    },
  });

  try {
    response = await request.post();
  } catch ( e ) {
    throw new Error( `Failed to get search results: ${e}` );
  }

  const { data: responseData } = response;

  const numberOfResults = responseData?.numberMatched;
  const hasMoreResults = responseHasMoreResults( responseData?.context );

  if ( Array.isArray( responseData?.features )) {
    responseFeatures = responseData.features.map(( feature = {}) => {
      console.log( 'feature', feature );
      const { properties = {}, assets = {}, id, collection } = feature;

      const sublabels = [`Collection: ${collection}`, `Date: ${properties.datetime}`];

      if ( properties.platform ) {
        sublabels.push( `Platform: ${properties.platform}` );
      }

      if ( properties.instruments ) {
        sublabels.push( `Instruments: ${properties.instruments?.join( ', ' )}` );
      }

      if ( properties.gsd ) {
        sublabels.push( `GSD: ${properties.gsd}` );
      }

      if ( properties['eo:cloud_cover']) {
        sublabels.push( `EO Cloud Cover: ${properties['eo:cloud_cover']}` );
      }

      if ( properties.created ) {
        sublabels.push( `Created: ${properties.created}` );
      }

      if ( properties.updated ) {
        sublabels.push( `Updated: ${properties.updated}` );
      }

      if ( assets ) {
        sublabels.push( `Assets: ${Object.keys( assets ).join( ', ' )}` );
      }

      return {
        label: `${id}`,
        sublabels,
        icon: false,
      };
    });
  }

  return {
    features: responseFeatures || [],
    hasMoreResults,
    numberOfResults,
  };
}

/**
 * lensDateToSatTime
 * @description Converts an Lens date object to SAT API friendly string
 * @see http://sat-utils.github.io/sat-api/#search-stac-items-by-simple-filtering-
 */

export function lensDateToSatTime({ start, end } = {}) {
  let dateStart;
  let dateEnd;
  let dateFull;

  if ( start ) {
    dateStart = new Date( start ).toISOString();
  }

  if ( end ) {
    dateEnd = new Date( end ).toISOString();
  }

  // Return either a period of time or
  if ( dateStart && dateEnd ) {
    dateFull = `${dateStart}/${dateEnd}`;
  } else {
    dateFull = dateStart || dateEnd;
  }

  return dateFull;
}

/**
 * responseHasMoreResults
 * @description Converts an Lens date object to SAT API friendly string
 * @see http://sat-utils.github.io/sat-api/#search-stac-items-by-simple-filtering-
 */

export function responseHasMoreResults({ page, limit, matched } = {}) {
  if ( page * limit < matched ) return true;
  return false;
}
