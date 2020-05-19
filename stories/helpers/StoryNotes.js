import React from 'react';
import PropTypes from 'prop-types';

import ClassName from '../../src/models/classname';

const StoryNotes = ({ children, className }) => {
  const componentClass = new ClassName('story-notes');

  componentClass.addIf(className, className);

  return <div className={componentClass.string}>{children}</div>;
};

StoryNotes.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string
};

export default StoryNotes;
