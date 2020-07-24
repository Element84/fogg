import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { FaTimes } from 'react-icons/fa';

import Button from '../Button';

// TODO: the user of the component shouldn't have to control isOpen manually. We can
// set an internal state in useModal and update it if the defaultIsOpen changes

const Modal = ({
  children,
  name,
  closeButtonText = 'Close',
  hasFooter = true,
  isOpen = false,
  contentLabel,
  handleCloseModal,
  appElement
}) => {
  const handleRequestClose = (e) => {
    handleCloseModal(e, name);
  };

  ReactModal.setAppElement(appElement);

  const className = !hasFooter && 'modal-no-footer';

  const modalProperties = {
    isOpen,
    contentLabel,
    shouldCloseOnOverlayClick: true,
    shouldCloseOnEsc: true,
    portalClassName: 'modal ReactModalPortal',
    onRequestClose: handleRequestClose,
    className
  };

  return (
    <ReactModal {...modalProperties}>
      <div className="modal-header">
        <button
          className="modal-header-close"
          aria-label="Close Modal"
          onClick={handleCloseModal}
          data-modal={name}
        >
          <FaTimes />
        </button>
      </div>

      <div className="modal-body">{children}</div>

      {hasFooter && (
        <div className="modal-footer">
          <div className="button">
            <Button onClick={handleCloseModal} data-modal={name}>
              {closeButtonText}
            </Button>
          </div>
        </div>
      )}
    </ReactModal>
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  name: PropTypes.string,
  closeButtonText: PropTypes.string,
  hasFooter: PropTypes.bool,
  isOpen: PropTypes.bool,
  contentLabel: PropTypes.string,
  handleCloseModal: PropTypes.func,
  appElement: PropTypes.string
};
