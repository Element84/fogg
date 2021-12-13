/**
 * updateModal
 * @description Updates the modal state to trigger globally available modals
 */

export const updateModal = (data) => {
  return {
    type: 'UPDATE_MODAL',
    data: data
  };
};

/**
 * openModal
 * @description Opens the given modal
 */

export const openModal = (modal) => {
  const modalSettings = {};

  modalSettings[modal] = {
    isOpen: true
  };

  return updateModal(modalSettings);
};

/**
 * closeModal
 * @description Closes the given modal
 */

export const closeModal = (modal) => {
  const modalSettings = {};

  modalSettings[modal] = {
    isOpen: false
  };

  return updateModal(modalSettings);
};
