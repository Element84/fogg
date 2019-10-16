import React from 'react';
import PropTypes from 'prop-types';
import { FaRocket } from 'react-icons/fa';

import Panel from '../../../components/Panel';
import ItemList from '../../../components/ItemList';
import Button from '../../../components/Button';

// Lens lets us pass in a component for our Sidebar. The component
// takes a few props as arguments such as the given results and some
// actions that allow us to create a unique sidebar experience for
// whatever app thats getting built

const EarthSearchSidebarPanels = ({
  results,
  loadMoreResults,
  clearActiveSearch,
  filters = {},
  numberOfResults,
  search
}) => {
  const hasResults = Array.isArray(results) && results.length > 0;
  const moreResultsAvailable = typeof loadMoreResults === 'function';
  const { handlers: filtersHandlers } = filters;

  function handleLoadMore (e) {
    if (moreResultsAvailable) {
      loadMoreResults(e);
    }
  }

  function handleClearFilters () {
    if (typeof filtersHandlers.clearActiveFilters === 'function') {
      filtersHandlers.clearActiveFilters();
    }
  }

  function handleClearActiveSearch () {
    if (typeof clearActiveSearch === 'function') {
      clearActiveSearch();
    }
  }

  function handleTriggerQuerySearchTextOnly () {
    search({
      textInput: 'Alexandria, VA',
      activeFilters: [],
      dropMarker: true
    });
  }

  function handleTriggerQuerySearchTextAndFilters () {
    search({
      textInput: 'San Francisco, CA',
      activeFilters: [
        {
          id: 'properties/sentinel:grid_square',
          value: 'EG'
        },
        {
          id: 'properties/collection',
          value: 'sentinel-2-l1c'
        }
      ],
      dropMarker: true
    });
  }

  return (
    <>
      {!hasResults && (
        <>
          {Array.isArray(results) && (
            <Panel header="Explore">
              <p>Sorry, no results were found.</p>
              {filters.active && filters.active.length > 0 && (
                <p>
                  <Button onClick={handleClearFilters}>Clear Filters</Button>
                </p>
              )}
              <p>
                <Button onClick={handleClearActiveSearch}>Clear Search</Button>
              </p>
            </Panel>
          )}
          <Panel header="Explore">
            <p>Explore stuff</p>
          </Panel>
          <Panel header="Past Searches">
            <ItemList
              items={[
                {
                  label: 'Alexandria, VA',
                  onClick: () => {
                    search({
                      textInput: 'Alexandria, VA',
                      activeFilters: [],
                      dropMarker: true
                    });
                  }
                },
                {
                  label: 'Montes Claros, MG',
                  onClick: () => {
                    search({
                      textInput: 'Montes Claros, MG',
                      activeFilters: [],
                      dropMarker: true
                    });
                  }
                }
              ]}
            />
          </Panel>
        </>
      )}

      {hasResults && (
        <>
          <Panel
            header={
              <>
                {'Results '}
                {numberOfResults}
                <FaRocket />
              </>
            }
          >
            <ItemList items={results} />
            {moreResultsAvailable && (
              <p>
                <Button onClick={handleLoadMore}>Load More</Button>
              </p>
            )}
          </Panel>
          <Panel>
            <p>
              <Button onClick={handleClearActiveSearch}>Clear Search</Button>
            </p>
          </Panel>
        </>
      )}

      <Panel header="Test Query Params">
        <h4 className="flat-bottom">Text Only</h4>
        <ItemList
          items={[
            {
              label: 'Query: Alexandria, VA',
              icon: false
            }
          ]}
        />
        <p>
          <Button onClick={handleTriggerQuerySearchTextOnly}>
            Trigger Search
          </Button>
        </p>

        <h4 className="flat-bottom">Text & Filters</h4>
        <ItemList
          items={[
            {
              label: 'Query: San Francisco, CA',
              icon: false
            },
            {
              label: 'Filter: Grid Square - EG',
              icon: false
            },
            {
              label: 'Filter: Collection - sentinel-2-l1c',
              icon: false
            }
          ]}
        />
        <p>
          <Button onClick={handleTriggerQuerySearchTextAndFilters}>
            Trigger Search
          </Button>
        </p>
      </Panel>
    </>
  );
};

EarthSearchSidebarPanels.propTypes = {
  results: PropTypes.array,
  numberOfResults: PropTypes.number,
  loadMoreResults: PropTypes.func,
  clearActiveSearch: PropTypes.func,
  search: PropTypes.func,
  filters: PropTypes.object
};

export default EarthSearchSidebarPanels;
