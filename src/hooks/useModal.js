import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { closeModal, openModal } from '../actions';
import { ui } from '../reducers';
import { ModalContext } from '../context';

const useModal = (initialState) => {
  const [state, dispatch] = useReducer(ui, initialState);
  const handleModalOpen = (e, name) => {
    if (typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    const modal = e.currentTarget.dataset.modal || name;
    dispatch(openModal(modal));
  };
  const handleModalClose = (e, name) => {
    if (typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    const modal = e.currentTarget.dataset.modal || name;
    dispatch(closeModal(modal));
  };

  const ModalContextProvider = ({ children }) => {
    return (
      <ModalContext.Provider value={dispatch}>{children}</ModalContext.Provider>
    );
  };

  ModalContextProvider.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  };

  return {
    state,
    handleModalOpen,
    handleModalClose,
    ModalContextProvider
  };
};

export default useModal;
