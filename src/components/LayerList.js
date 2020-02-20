import React from 'react';
import PropTypes from 'prop-types';

const LayerList = ({ layers, onChange }) => {
  return (
    <>
      {layers &&
        layers.length > 0 &&
        layers.map((layer, i) => (
          <p key={`toggle_${i}`}>
            <label htmlFor={`input_${layer.id}`}>
              <input
                id={`input_${layer.id}`}
                type="checkbox"
                name={`input_${layer.id}`}
                checked={layer.isActive}
                onChange={() => onChange && onChange(layer.id)}
              />
              &nbsp;{layer.name}
            </label>
          </p>
        ))}
    </>
  );
};

const LayerProps = PropTypes.shape({
  id: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired
});

LayerList.propTypes = {
  layers: PropTypes.arrayOf(LayerProps).isRequired,
  onChange: PropTypes.func
};

export default LayerList;
