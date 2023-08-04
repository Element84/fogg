import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import SearchFiltersList from '../';

const STORY_COMPONENT = 'Search Filters List';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const searchFilters = [
  {
    label: 'Type',
    id: 'product_type',
    name: 'properties/sar:product_type',
    type: 'radiolist',
    list: ['SLC', 'GEO', 'GEC', 'SICD']
  },
  {
    label: 'Instrument Mode',
    id: 'instrument_mode',
    name: 'properties/sar:instrument_mode',
    type: 'radiolist',
    list: ['sliding_spotlight', 'spotlight', 'stripmap']
  },
  {
    label: 'Collection Time',
    subLabel: 'Day: 6AM - 6PM, Night: 6PM - 6AM',
    id: 'collection_time',
    name: 'properties/locale:time',
    type: 'radiolist',
    list: ['day', 'night']
  },
  {
    label: 'Product Category',
    id: 'product_category',
    name: 'properties/sar:product_category',
    type: 'radiolist',
    list: ['standard', 'extended', 'custom']
  },
  {
    label: 'Orbit State',
    id: 'orbit_state',
    name: 'properties/sat:orbit_state',
    type: 'radiolist',
    list: ['ascending', 'descending']
  },
  {
    label: 'Observation Direction',
    id: 'observation_direction',
    name: 'properties/sar:observation_direction',
    type: 'radiolist',
    list: ['left', 'right']
  },
  {
    label: 'Polarization',
    id: 'polarization',
    name: 'properties/sar:polarizations',
    type: 'radiolist',
    list: ['HH', 'VV']
  },
  {
    label: 'Processing Level',
    id: 'properties/eo:processing_level',
    type: 'checklist',
    list: ['L1GT', 'L1TP', 'L1GS'],
    displayList: {
      L1GT: 'Systematic Terrain Correction L1GT',
      L1TP: 'Standard Terrain Correction L1TP',
      L1GS: 'Systematic Correction L1GS'
    }
  }
];

stories.add(STORY_NAME, () => {
  function handleFilterChange (e) {
    action(`${STORY_COMPONENT}::onFilterChange`)(e);
  }

  function handleChecklistClear (e) {
    action(`${STORY_COMPONENT}::onChecklistClear`)(e);
  }

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      {searchFilters.map((filter = {}, index) => {
        const {
          label,
          subLabel,
          id,
          type = 'default',
          value
        } = filter;
        return (
          <div key={`SearchFilters-Available-${index}`}>
            {(type === 'checklist' || type === 'radiolist') &&
              (() => {
                const { list, displayList } = filter;
                return (
                  <SearchFiltersList
                    id={id}
                    label={label}
                    subLabel={subLabel}
                    list={list}
                    displayList={displayList}
                    activeValues={value || []}
                    type={type}
                    onChange={handleFilterChange}
                    onClearChecklist={handleChecklistClear}
                  />
                );
              })()}
          </div>
        );
      })}
    </Story>
  );
});
