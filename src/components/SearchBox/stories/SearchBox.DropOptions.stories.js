import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import SearchBox from '../';

const STORY_COMPONENT = 'Search Box Drop Option';
const STORY_NAME = 'Default';
let activeSearchOption;

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

function handleOnInput ({ target }) {
  action(`${STORY_COMPONENT}::onInput`)(target.value);
}

function handleOnSearch (query, date, activeSearchOption) {
  action(`${STORY_COMPONENT}::onSearch`)(query, JSON.stringify(date), activeSearchOption);
}

function handleOptionClick (e) {
    action(`${STORY_COMPONENT}::onActionClick`)(e.target.value);

    // Reset and re-assign the active one.
    searchDropOptions.forEach((item) => item.isChecked = 'false');
    let objIndex = searchDropOptions.findIndex((obj => obj.id == e.target.id));
    searchDropOptions[objIndex].isChecked = e.target.checked;
    
    activeSearchOption = searchDropOptions[objIndex].value;
}

let searchDropOption = true;
let searchDropOptions = [
    {
        label: 'Map Location',
        id: 'search-radio-1',
        onClick: handleOptionClick,
        value: 'default',
        isChecked: true
    },
    {
        label: 'Collect ID',
        id: 'search-radio-2',
        onClick: handleOptionClick,
        value: 'collect-id-007',
        isChecked: false
    },
    {
        label: 'Granule ID',
        id: 'search-radio-3',
        onClick: handleOptionClick,
        value: 'granule-id-007',
        isChecked: false
    }
  ];

stories.add('Default', () => {
    return (
        <Story component={STORY_COMPONENT} name={STORY_NAME}>
            <SearchBox onInput={handleOnInput} onSearch={handleOnSearch} searchDropOption={searchDropOption} searchDropOptions={searchDropOptions} placeholder='Search...' />
        </Story>
    );
});
