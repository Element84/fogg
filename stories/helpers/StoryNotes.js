import React from 'react';
import PropTypes from 'prop-types';

import ClassName from '../../src/models/classname';

const StoryNotes = ({ children, className, ...rest }) => {
  const componentClass = new ClassName('story-notes');

  componentClass.addIf(className, className);

  return (
    <div className={componentClass.string} {...rest}>
      {children}
    </div>
  );
};

StoryNotes.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string
};

export default StoryNotes;
