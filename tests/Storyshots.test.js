import initStoryshots from '@storybook/addon-storyshots';

// TODO: Figure out how to include excluded components
// TODO: Lens, Map - Leaflet, etc
// TODO: InputRange - Mounting issue? Move to https://www.npmjs.com/package/rc-slider?
// TODO: Modal - Can't find the mounting location when ran
// TODO: Search Date, Search Box, Form Input, Datetime, Search Complete - Changes "today" daily, meaning component changes

initStoryshots({
  storyKindRegex: /^((?!.*?(Lens|Map|Earth Search|Input Range|Modal|Search Date|Search Box|Form Input|Datetime|Search Complete)).)*$/
});
