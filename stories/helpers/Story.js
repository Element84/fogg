import React from 'react';
import PropTypes from 'prop-types';

const Story = ({ children, component, name }) => {
  return (
    <>
      <h1>{component}</h1>
      <h2>{name}</h2>

      <div className="story">{children}</div>
    </>
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
