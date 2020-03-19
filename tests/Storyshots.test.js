import initStoryshots from '@storybook/addon-storyshots';

// TODO: Figure out how to include excluded components
// TODO: InputRange - Move to https://www.npmjs.com/package/rc-slider?

initStoryshots({
  storyKindRegex: /^((?!.*?(Lens|Map|Search Complete|Input Range|Modal)).)*$/
});
