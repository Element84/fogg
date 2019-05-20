import React from 'react';
import { storiesOf } from '@storybook/react';

import Modal from '../../components/Modal';
import Button from '../../components/Button';
import Layout from '../../components/Layout';
import { useModal } from '../../hooks';
import ModalContextProvider from '../../components/ModalContextProvider';

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
    const { state, dispatch, handleModalOpen, handleModalClose } = useModal(
      initialState
    );
    return (
      <Layout>
        <ModalContextProvider value={dispatch}>
          <p>
            <Button onClick={handleModalOpen} data-modal="premium">
              This will trigger the premium modal
            </Button>
          </p>
          <p>
            <a href="#" onClick={handleModalOpen} data-modal="premium">
              Another way to trigger the premium modal!
            </a>
          </p>
          <Modal
            name="premium"
            closeText="Close Modal"
            handleCloseModal={handleModalClose}
            isOpen={state.modals.premium.isOpen}
            appElement="#root"
          >
            <h1>This feature is for premium users only</h1>
            <p>
              <Button to="/user/premium">Sign Up For Premium</Button>
            </p>
          </Modal>
          <p>
            <Button onClick={handleModalOpen} data-modal="other">
              This will trigger the other modal
            </Button>
          </p>
          <Modal
            name="other"
            closeText="Close Other modal"
            handleCloseModal={handleModalClose}
            isOpen={state.modals.other.isOpen}
            appElement="#root"
          >
            <h1>This is another modal!</h1>
          </Modal>
        </ModalContextProvider>
      </Layout>
    );
  };

  return <App />;
});
