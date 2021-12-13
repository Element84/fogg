import React from 'react';
import { storiesOf } from '@storybook/react';

import { useModal } from '../../../hooks';

import Story from '../../../../stories/helpers/Story';

import Modal from '../';
import Button from '../../Button';
import Layout from '../../Layout';

const STORY_COMPONENT = 'Modal';
const STORY_NAME = 'Load Open';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  const initialState = {
    modals: {
      modal1: {
        isOpen: true
      }
    }
  };

  const {
    state,
    handleModalOpen,
    handleModalClose,
    ModalContextProvider
  } = useModal(initialState);

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <Layout>
        <ModalContextProvider>
          <p>
            <Button onClick={handleModalOpen} data-modal="modal1">
              Trigger Modal #1
            </Button>
          </p>

          <Modal
            name="modal1"
            handleCloseModal={handleModalClose}
            isOpen={state.modals.modal1.isOpen}
            appElement="#root"
          >
            <h1>Modal #1</h1>
          </Modal>
        </ModalContextProvider>
      </Layout>
    </Story>
  );
});
