import React from 'react';
import PropTypes from 'prop-types';
import * as Fa from 'react-icons/fa';

import ClassName from '../../models/classname';

const IconByName = ({ className, name }) => {
  const componentClass = new ClassName(`icon-${name}`);

  if (className) componentClass.add(className);

  const Icon = Fa[name];

  if (!Icon) return null;

  return <Icon className={componentClass.string} />;
};

IconByName.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string
};

export default IconByName;
