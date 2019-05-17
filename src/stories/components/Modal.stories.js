import React, { useReducer } from 'react';
import { storiesOf } from '@storybook/react';

import Modal from '../../components/Modal';
import Button from '../../components/Button';
import ui from '../../reducers/ui';
import Layout from '../../components/Layout';
import { openModal, closeModal } from '../../actions';
import ModalContext from '../../context/modal-context';

const stories = storiesOf('Components|Modal', module);

stories.add('Default', () => {
  const App = () => {
    const initialState = {
      modals: {
        premium: {
          isOpen: false
        },
        other: {
          isOpen: false
        }
      }
    };
    const [state, dispatch] = useReducer(ui, initialState);
    const handleModalOpenClick = e => {
      dispatch(openModal(e.currentTarget.dataset.modal));
    };
    const handleModalCloseClick = e => {
      dispatch(closeModal(e.currentTarget.dataset.modal));
    };
    return (
      <Layout>
        <ModalContext.Provider value={dispatch}>
          <p>
            <Button onClick={handleModalOpenClick} data-modal="premium">
              This will trigger the premium modal
            </Button>
          </p>
          <p>
            <a href="#" onClick={handleModalOpenClick} data-modal="premium">
              Another way to trigger the premium modal!
            </a>
          </p>
          <Modal
            name="premium"
            closeText="Close Modal"
            handleCloseModal={handleModalCloseClick}
            isOpen={state.modals.premium.isOpen}
            appElement="#root"
          >
            <h1>This feature is for premium users only</h1>
            <p>
              <Button to="/user/premium">Sign Up For Premium</Button>
            </p>
          </Modal>
          <p>
            <Button onClick={handleModalOpenClick} data-modal="other">
              This will trigger the other modal
            </Button>
          </p>
          <Modal
            name="other"
            closeText="Close Other modal"
            handleCloseModal={handleModalCloseClick}
            isOpen={state.modals.other.isOpen}
            appElement="#root"
          >
            <h1>This is another modal!</h1>
          </Modal>
        </ModalContext.Provider>
      </Layout>
    );
  };

  return (
    <App />
    // <>
    //   <Button onClick={toggleModal}> This will open the modal</Button>
    //   <a href="#" onClick={toggleModal}>
    //     This will also open the button
    //   </a>
    //   <Modal
    //     name="test"
    //     openText="This is a button modal"
    //     closeText="Close this"
    //     modalIsOpen={isOpen}
    //     TriggerComponent={TriggerComponent}
    //   >
    //     <h1>The feature you are trying to use is for premium users only</h1>
    //   </Modal>
    //   <Modal
    //     name="other"
    //     openText="This is a link modal"
    //     closeText="Close this"
    //     useButton={false}
    //   >
    //     Modal stuff!
    //   </Modal>
    // </>
  );
});
