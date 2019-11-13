const defaultState = {};

/**
 * ui
 * @description Reducers specific to the store's ui state
 */

const ui = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_MODAL':
      return updateModal(state, action.data);
    default:
      return Object.assign({}, state);
  }
};

export default ui;

/**
 * updateModal
 * @description Flips off the active state of all modals before updating any newer modal updates
 */

function updateModal (state, modals) {
  const modalState = Object.assign({}, state);

  // Turn off all modals before any new updates

  for (const stateKey in modalState.modals) {
    modalState.modals[stateKey].isOpen = false;
  }

  // Loop through and set the new state

  for (const modalKey in modals) {
    modalState.modals[modalKey] = Object.assign(
      modalState.modals[modalKey],
      modals[modalKey]
    );
  }

  return modalState;
}
