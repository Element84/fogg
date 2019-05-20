import { useReducer } from 'react';
import { ModalContext } from '../context';
import { closeModal, openModal } from '../actions';
import ui from '../reducers/ui';

const useModal = initialState => {
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

  return {
    state,
    dispatch,
    handleModalOpen,
    handleModalClose,
    ModalContext
  };
};

export default useModal;
