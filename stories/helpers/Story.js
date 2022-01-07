import React from 'react';
import PropTypes from 'prop-types';

import ClassName from '../../src/models/classname';

const Story = ({ children, component, name, ...rest }) => {
  const className = new ClassName('story-container');

  const componentClass = component.replace(' ', '');
  const nameClass = name.replace(' ', '');

  className.add(`Story-${componentClass}-${nameClass}`);

  return (
    <div className={className.string} {...rest}>
      <h1>{component}</h1>
      <h2>{name}</h2>

      <div className="story">{children}</div>
    </div>
  );
};

Story.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  component: PropTypes.string,
  name: PropTypes.string
};

export default Story;
