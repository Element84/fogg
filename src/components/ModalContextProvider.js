import React from 'react';
import PropTypes from 'prop-types';
import { ModalContext } from '../context';

const ModalContextProvider = ({ dispatch, children }) => {
  return (
    <ModalContext.Provider value={dispatch}>{children}</ModalContext.Provider>
  );
};

export default ModalContextProvider;

ModalContextProvider.propTypes = {
  dispatch: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
